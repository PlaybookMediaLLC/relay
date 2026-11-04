import { ClaudeIcon, OpenAIIcon } from "./AgentIcons";

// playbook-seam: marketplace listings connect to upstream, so Relay uses its setup guides.
// newChatUrl opens a new chat with the prompt filled in. Neither link is
// documented by its chat app.
export const ONE_CLICK_INSTALLS = [
  {
    agent: "chatgpt",
    name: "ChatGPT",
    href: "/docs/chatgpt",
    newChatUrl: (prompt: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
    Icon: OpenAIIcon,
  },
  {
    agent: "claude",
    name: "Claude",
    href: "/docs/claude-code-plugin",
    newChatUrl: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    Icon: ClaudeIcon,
  },
];
