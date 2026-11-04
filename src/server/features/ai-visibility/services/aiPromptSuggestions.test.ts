import { beforeEach, describe, expect, it, vi } from "vitest";

const { generateText, holdResearch, settleResearch } = vi.hoisted(() => ({
  generateText: vi.fn(),
  holdResearch: vi.fn(),
  settleResearch: vi.fn(),
}));

vi.mock("ai", () => ({
  generateText,
  Output: { object: (value: unknown) => value },
}));
vi.mock("@/server/lib/openrouter", () => ({
  buildChatAgentModel: vi.fn(),
  requireOpenRouterAccess: async () => ({ apiKey: "key" }),
}));
vi.mock("@/server/lib/chatAgent", () => ({
  requireOpenRouterCostUsd: async () => 0.003,
}));
vi.mock("@/server/lib/runtime-env", () => ({
  getOptionalEnvValue: async () => undefined,
  isHostedServerAuthMode: async () => true,
}));
vi.mock("@/server/billing/subscription", () => ({
  checkUsageCreditsDepleted: async () => ({ depleted: false }),
}));
// playbook-seam: RFC-0009 holds the estimate and settles the steps on it.
vi.mock("@/server/billing/researchHold", () => ({
  holdResearch,
  settleResearch,
}));
vi.mock("../repositories/AiVisibilityRepository", () => ({
  AiVisibilityRepository: { getConfiguration: async () => null },
}));
vi.mock("./aiVisibilityConfiguration", () => ({ aiTopics: () => [] }));
vi.mock("@/server/features/projects/repositories/ProjectRepository", () => ({
  ProjectRepository: {
    getProjectForOrganization: async () => ({
      name: "OpenSEO",
      domain: "openseo.so",
    }),
  },
}));
vi.mock(
  "@/server/features/project-context/repositories/ProjectContextRepository",
  () => ({
    ProjectContextRepository: {
      listSections: async () => [],
      listCompetitors: async () => [],
    },
  }),
);

import { generateAiPrompts } from "./aiPromptSuggestions";
import { customer } from "./aiVisibilityTestFixtures";

const input = {
  projectId: "project",
  locationCode: 2840,
  languageCode: "en",
  excludePrompts: [],
};
const billed = { ...customer, projectId: "project" };
const hold = { lockId: "generation-hold" };
const prompts = ["One?", "Two?", "Three?", "Four?", "Five?"];

describe("generateAiPrompts billing", () => {
  beforeEach(() => {
    holdResearch.mockResolvedValue(hold);
    settleResearch.mockResolvedValue(undefined);
  });

  it("holds the estimate inside the limits and settles the generation's cost on it", async () => {
    generateText.mockImplementation(
      async ({ onStepFinish }: { onStepFinish: (step: object) => unknown }) => {
        await onStepFinish({});
        return { output: { name: "SEO tools", prompts } };
      },
    );

    await expect(generateAiPrompts(input, customer)).resolves.toEqual({
      topic: "SEO tools",
      prompts,
    });
    expect(holdResearch).toHaveBeenCalledWith(billed, {
      estimatedCredits: 50,
      ledgerFeature: "ai_research",
    });
    expect(settleResearch).toHaveBeenCalledExactlyOnceWith(billed, hold, [
      {
        provider: "openrouter",
        creditFeature: "agent",
        operation: "ai_prompt_generation",
        costUsd: 0.003,
      },
    ]);
  });

  it.each([false, true])(
    "settles the hold after model failure, with recorded spend: %s",
    async (paidStep) => {
      generateText.mockImplementation(
        async ({
          onStepFinish,
        }: {
          onStepFinish: (step: object) => unknown;
        }) => {
          if (paidStep) await onStepFinish({});
          throw new Error("model failed");
        },
      );

      await expect(generateAiPrompts(input, customer)).rejects.toThrow(
        "model failed",
      );
      expect(settleResearch).toHaveBeenCalledExactlyOnceWith(
        billed,
        hold,
        paidStep ? [expect.objectContaining({ costUsd: 0.003 })] : [],
      );
    },
  );
});
