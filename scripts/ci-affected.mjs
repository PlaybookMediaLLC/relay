// Decides which optional CI jobs a change needs, and records why.
//
// Only jobs whose signal is genuinely confined to a part of the repository are
// selectable here. The static checks and the unit suite always run: they are
// cheap (about two minutes each) and they are the checks most likely to catch
// a cross-cutting break, so no file-path rule is worth the risk of skipping
// them.
//
// Every rule is conservative in the same direction: a path nobody mapped turns
// every selectable job on. Widening a rule is therefore safe by construction,
// and narrowing one is the change that needs review.
//
// Usage:  node scripts/ci-affected.mjs <base-ref> <head-ref>
// Writes `name=true|false` lines to $GITHUB_OUTPUT and an audit table to
// $GITHUB_STEP_SUMMARY. Run it with no $GITHUB_OUTPUT to print the decision.

import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

/**
 * Paths that cannot change what any build or browser suite produces: prose and
 * agent instructions. A change confined to these skips the build jobs. The
 * static checks still run, which is what keeps `.agents/skills/` in sync with
 * `plugins/openseo/skills/` and the Markdown formatted.
 *
 * `content/` is deliberately absent: `content/docs/` is compiled into the app
 * by Fumadocs and `content/marketing/` is imported by the website.
 */
const PROSE_ONLY = [
  /^docs\//,
  /^\.agents\//,
  /^\.claude\//,
  /^\.claude-plugin\//,
  /^\.cursor-plugin\//,
  /^plugins\//,
  /^[^/]+\.md$/,
  /^\.github\/(ISSUE_TEMPLATE|PULL_REQUEST_TEMPLATE)\//,
];

/**
 * Everything the website build reads. `web/` is a separate pnpm workspace with
 * its own lockfile; the only product code it imports is `src/shared/` (by
 * relative path, see AGENTS.md), plus the Markdown under `content/`.
 */
const WEBSITE = [
  /^web\//,
  /^content\//,
  /^src\/shared\//,
  /^\.github\/workflows\/ci\.yml$/,
];

/**
 * Inputs to `deploy/docker/Dockerfile`. That image installs dependencies and
 * compiles the app at container start, not at build time, so the only thing
 * its CI build can regress is the image recipe and the Linux install.
 */
const DOCKER = [
  /^deploy\/docker\//,
  /^package\.json$/,
  /^pnpm-lock\.yaml$/,
  /^pnpm-workspace\.yaml$/,
  /^patches\//,
  /^\.npmrc$/,
  /^\.nvmrc$/,
  /^\.github\/workflows\/ci\.yml$/,
];

/**
 * Inputs to `deploy/standalone/Dockerfile`, on top of DOCKER. The application
 * code it compiles is already covered natively by the `build` job's
 * `pnpm build:standalone`, so only the image recipe, the celld runtime and the
 * standalone build configuration select this one.
 */
const STANDALONE_IMAGE = [
  /^deploy\/standalone\//,
  /^scripts\/celld\//,
  /^src\/standalone-server\.ts$/,
  /^wrangler\.standalone\.json$/,
  /^vite\.config\.ts$/,
  /^vite-plugin-lean-worker-bundle\.ts$/,
];

const matches = (patterns, file) => patterns.some((p) => p.test(file));

/**
 * @param {readonly string[]} files changed paths, repository-relative
 * @returns {{jobs: Record<string, boolean>, reasons: Record<string, string>}}
 */
export function selectChecks(files) {
  // No file list means we could not work out what changed. Run everything.
  if (files.length === 0) {
    const reason = "no changed files resolved — running every job";
    return {
      jobs: { app: true, website: true, docker: true, standalone_image: true },
      reasons: {
        app: reason,
        website: reason,
        docker: reason,
        standalone_image: reason,
      },
    };
  }

  const code = files.filter((file) => !matches(PROSE_ONLY, file));
  const website = code.filter((file) => matches(WEBSITE, file));
  const docker = code.filter((file) => matches(DOCKER, file));
  const standaloneImage = code.filter(
    (file) => matches(STANDALONE_IMAGE, file) || matches(DOCKER, file),
  );

  const first = (list) =>
    `${list.length} file${list.length === 1 ? "" : "s"}, including ${list[0]}`;
  return {
    jobs: {
      app: code.length > 0,
      website: website.length > 0,
      docker: docker.length > 0,
      standalone_image: standaloneImage.length > 0,
    },
    reasons: {
      app:
        code.length > 0
          ? first(code)
          : "every changed file is prose or agent instructions",
      website:
        website.length > 0
          ? first(website)
          : "no change under web/, content/ or src/shared/",
      docker:
        docker.length > 0
          ? first(docker)
          : "no change to the self-host image recipe or the dependency set",
      standalone_image:
        standaloneImage.length > 0
          ? first(standaloneImage)
          : "no change to the standalone image recipe, celld runtime or build config",
    },
  };
}

function changedFiles(base, head) {
  // `base...head` compares against the merge base, so a stale branch does not
  // pick up jobs for changes that only landed on the base branch.
  const output = execFileSync(
    "git",
    ["diff", "--name-only", `${base}...${head}`],
    { encoding: "utf8" },
  );
  return output.split("\n").filter(Boolean);
}

function main() {
  const [base, head] = process.argv.slice(2);
  if (!base || !head) {
    console.error("usage: node scripts/ci-affected.mjs <base-ref> <head-ref>");
    process.exit(2);
  }

  let files = [];
  try {
    files = changedFiles(base, head);
  } catch (error) {
    // A shallow clone or a force-pushed base leaves no merge base. Say so and
    // fall through to the empty-list branch, which runs every job.
    console.error(
      `Could not diff ${base}...${head}; running every job. ${String(error)}`,
    );
  }

  const { jobs, reasons } = selectChecks(files);

  const output = process.env.GITHUB_OUTPUT;
  if (output)
    appendFileSync(
      output,
      Object.entries(jobs)
        .map(([name, run]) => `${name}=${run}\n`)
        .join(""),
    );

  const table = [
    `### Selected CI jobs (${files.length} changed file${files.length === 1 ? "" : "s"})`,
    "",
    "| Job | Runs | Why |",
    "| --- | --- | --- |",
    ...Object.entries(jobs).map(
      ([name, run]) =>
        `| \`${name}\` | ${run ? "yes" : "no"} | ${reasons[name]} |`,
    ),
    "",
    "The static checks and the unit suite always run. Rules live in `scripts/ci-affected.mjs`.",
    "",
  ].join("\n");

  const summary = process.env.GITHUB_STEP_SUMMARY;
  if (summary) appendFileSync(summary, table);
  console.log(table);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main();
