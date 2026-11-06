import { describe, expect, it } from "vitest";
import { selectChecks } from "./ci-affected.mjs";

const run = (files: readonly string[]): Record<string, boolean> =>
  selectChecks(files).jobs;

describe("selectChecks", () => {
  it("runs every job when the changed files could not be resolved", () => {
    expect(run([])).toEqual({
      app: true,
      website: true,
      docker: true,
      standalone_image: true,
    });
  });

  it("runs every job for a path no rule knows about", () => {
    expect(run(["some/new/top-level/thing.ts"])).toMatchObject({ app: true });
  });

  it("skips the image builds for an ordinary application change", () => {
    expect(run(["src/server/features/audit/services/AuditService.ts"])).toEqual(
      {
        app: true,
        website: false,
        docker: false,
        standalone_image: false,
      },
    );
  });

  it("skips every build when the change is prose or agent instructions", () => {
    expect(
      run(["docs/maintainers/README.md", ".agents/skills/deslop/SKILL.md"]),
    ).toEqual({
      app: false,
      website: false,
      docker: false,
      standalone_image: false,
    });
  });

  it("treats content/ as application and website input, not prose", () => {
    expect(run(["content/docs/getting-started.mdx"])).toMatchObject({
      app: true,
      website: true,
    });
  });

  it("selects the website for the shared code web/ imports", () => {
    expect(run(["src/shared/keyword-locations.ts"])).toMatchObject({
      website: true,
    });
  });

  it("selects both images when the dependency set changes", () => {
    expect(run(["pnpm-lock.yaml"])).toMatchObject({
      docker: true,
      standalone_image: true,
    });
  });

  it("selects only the standalone image for the celld runtime", () => {
    expect(run(["scripts/celld/runtime/crawl-gateway.mjs"])).toMatchObject({
      docker: false,
      standalone_image: true,
    });
  });
});
