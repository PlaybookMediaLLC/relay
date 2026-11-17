import { APIError, getOAuthState } from "better-auth/api";
import { validateAuthorizationCode } from "better-auth/oauth2";
import { genericOAuth } from "better-auth/plugins";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { z } from "zod";
import { isHostedAuthMode } from "@/lib/auth-mode";
import { FeatureFlag, isFeatureFlagOn } from "@/server/lib/featureFlags";
import {
  CHATGPT_EMAIL_NOT_VERIFIED_CODE,
  CHATGPT_PROVIDER_ID,
} from "@/shared/chatgpt-sign-in";

// OpenAI's production OpenID configuration, as published at
// https://auth.openai.com/.well-known/openid-configuration.
const ISSUER = "https://auth.openai.com";
const AUTHORIZATION_URL = `${ISSUER}/api/accounts/authorize`;
const TOKEN_URL = `${ISSUER}/api/accounts/oauth/token`;
const jwks = createRemoteJWKSet(new URL(`${ISSUER}/.well-known/jwks.json`));

// playbook-seam: better-auth 1.7 serves generic OAuth providers on the core
// social routes, so ChatGPT starts at /sign-in/social and returns to
// /callback/:id like Google.
/** The Better Auth route OpenAI redirects back to, as hooks see it. */
const CALLBACK_PATH = "/callback/:id";
const chatGptCallbackSchema = z.object({ id: z.literal(CHATGPT_PROVIDER_ID) });
const chatGptStartSchema = z.object({
  provider: z.literal(CHATGPT_PROVIDER_ID),
});

const identitySchema = z.object({
  sub: z.string().min(1),
  email: z.string().optional(),
  email_verified: z.boolean().optional(),
  name: z.string().optional(),
  picture: z.string().optional(),
});

// playbook-seam: better-auth 1.7 keeps its own server-made nonce in the state.
const stateSchema = z.object({ idTokenNonce: z.string().min(1) });

type CallbackContext = { path?: string; params?: unknown } | null | undefined;

/** Whether this request is OpenAI's redirect back to the ChatGPT callback. */
export function isChatGptCallback(ctx: CallbackContext): boolean {
  return (
    ctx?.path === CALLBACK_PATH &&
    chatGptCallbackSchema.safeParse(ctx.params).success
  );
}

type ChatGptEnv = {
  OPENAI_SIWC_CLIENT_ID?: string;
  OPENAI_SIWC_CLIENT_SECRET?: string;
};

/**
 * Whether Sign in with ChatGPT is on: the button shows and the server takes
 * its sign-ins. Production (the only place with feature flags) also needs its
 * flag on; local and preview builds need only a client ID.
 */
export async function isChatGptSignInOffered(
  env: ChatGptEnv & { AUTH_MODE?: string; FLAGS?: unknown },
): Promise<boolean> {
  if (!isHostedAuthMode(env.AUTH_MODE)) return false;
  if (!env.OPENAI_SIWC_CLIENT_ID?.trim()) return false;
  return !env.FLAGS || isFeatureFlagOn(FeatureFlag.ChatGptSignIn);
}

/**
 * Refuses to start or finish a ChatGPT sign-in while it is off, so hiding the
 * button is not the only thing keeping people out.
 */
export async function assertChatGptSignInOffered(
  env: Parameters<typeof isChatGptSignInOffered>[0],
  ctx: { path?: string; body?: unknown; params?: unknown },
) {
  const isChatGpt =
    (ctx.path === "/sign-in/social" &&
      chatGptStartSchema.safeParse(ctx.body).success) ||
    isChatGptCallback(ctx);
  if (isChatGpt && !(await isChatGptSignInOffered(env))) {
    throw new APIError("NOT_FOUND");
  }
}

/**
 * "Continue with ChatGPT": OpenID Connect with PKCE against OpenAI. Optional:
 * with no client ID there is no plugin, and the sign-in pages show no button.
 * A client OpenAI registered as confidential also has a secret; a public one
 * has none.
 */
export function chatGptSignInPlugins(env: ChatGptEnv) {
  const clientId = env.OPENAI_SIWC_CLIENT_ID?.trim();
  if (!clientId) return [];
  const clientSecret = env.OPENAI_SIWC_CLIENT_SECRET?.trim() || undefined;

  return [
    genericOAuth({
      config: [
        {
          providerId: CHATGPT_PROVIDER_ID,
          clientId,
          clientSecret,
          authorizationUrl: AUTHORIZATION_URL,
          tokenUrl: TOKEN_URL,
          scopes: ["openid", "profile", "email"],
          pkce: true,
          // playbook-seam: better-auth 1.7 sends a nonce of its own only for a
          // provider whose discovery document names its issuer and JWKS. It
          // keeps the nonce in the sign-in state (server-side, with the PKCE
          // verifier), and the exchange below requires the ID token to carry
          // it back. Without that metadata the provider is not registered.
          discoveryUrl: `${ISSUER}/.well-known/openid-configuration`,
          requireIdTokenVerification: true,
          // Better Auth's own exchange only decodes the ID token. This one
          // verifies it, and returns the verified claims alone, so no OpenAI
          // token is stored on the account row: sign-in needs none of them.
          getToken: async ({ code, redirectURI, codeVerifier }) => {
            const tokens = await validateAuthorizationCode({
              code,
              codeVerifier,
              redirectURI,
              options: { clientId, clientSecret },
              tokenEndpoint: TOKEN_URL,
              // The secret travels only in the Basic header.
              authentication: clientSecret ? "basic" : "post",
              additionalParams: { client_id: clientId },
            });
            if (!tokens.idToken) {
              throw new Error("OpenAI returned no ID token");
            }
            const { payload } = await jwtVerify(tokens.idToken, jwks, {
              issuer: ISSUER,
              audience: clientId,
              algorithms: ["RS256"],
              requiredClaims: ["sub", "exp", "iat"],
              clockTolerance: 5,
            });
            const state = stateSchema.safeParse(await getOAuthState());
            if (!state.success || payload.nonce !== state.data.idTokenNonce) {
              throw new Error("The ChatGPT ID token nonce did not match");
            }
            return { raw: payload };
          },
          getUserInfo: async (tokens) => {
            const identity = identitySchema.safeParse(tokens.raw);
            if (!identity.success) return null;
            const { sub, email, email_verified, name, picture } = identity.data;
            return {
              id: sub,
              // playbook-seam: better-auth 1.7 keys an OIDC account on sub.
              sub,
              email,
              // Better Auth links this sign-in to an existing account with
              // the same email only when this is true.
              emailVerified: email_verified === true,
              // The same fallback the email sign-up form uses.
              name: name || email?.split("@")[0] || "OpenSEO User",
              image: picture,
            };
          },
        },
      ],
    }),
  ];
}

/**
 * Refuses a new account for a ChatGPT address OpenAI has not verified. An
 * email sign-up verifies the address before its first session; without this,
 * someone could open an account on another person's address and still hold a
 * ChatGPT sign-in to it after that person takes the account over with a
 * password reset.
 */
export function assertChatGptSignUpEmailVerified(
  user: { emailVerified?: boolean },
  ctx: CallbackContext,
) {
  if (isChatGptCallback(ctx) && !user.emailVerified) {
    // Better Auth redirects to the error page with this as the code.
    throw new APIError("BAD_REQUEST", {
      message: CHATGPT_EMAIL_NOT_VERIFIED_CODE,
      // playbook-seam: better-auth 1.7 redirects with the code, not the message.
      code: CHATGPT_EMAIL_NOT_VERIFIED_CODE,
    });
  }
}
