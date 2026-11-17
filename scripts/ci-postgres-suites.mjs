// Lists the test files that run real SQL, so CI can run them against a real
// Postgres instead of only SQLite.
//
// `src/server/features/opportunities/repositories/opportunityRepositoryTestDb.ts`
// is the one module that reads OPPORTUNITY_TEST_PG_URL: with it set, every
// suite that reaches that module talks to Postgres, and without it they fall
// back to in-memory SQLite. Several suites reach it through a second helper
// (`publishingTestDb.ts`, `experimentTestDb.ts`, ...), so membership is the
// transitive closure of "imports the root, or imports something that does".
//
// This used to be a list of directories in
// .github/workflows/postgres-tests-playbook.yml. The list fell behind: eleven
// feature areas, including billing and spend, were reaching real SQL and
// being checked on SQLite alone.
//
// Usage:  node scripts/ci-postgres-suites.mjs [--count]
// Prints one path per line, repository-relative, sorted.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

/** The module that chooses between Postgres and in-memory SQLite. */
const ROOT =
  "src/server/features/opportunities/repositories/opportunityRepositoryTestDb.ts";

/**
 * A list this short would mean the import closure broke rather than that the
 * real-SQL surface shrank, so the CLI fails instead of quietly checking less.
 * The real count is around sixty.
 */
const MINIMUM_SUITES = 30;

function sourceFiles() {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) walk(path);
      else if (path.endsWith(".ts") || path.endsWith(".tsx")) files.push(path);
    }
  };
  walk(join(repoRoot, "src"));
  return files.map((path) => relative(repoRoot, path));
}

const IMPORT_SPECIFIER =
  /\bfrom\s+["']([^"']+)["']|\bimport\(["']([^"']+)["']\)/g;

/** Resolves one specifier to a repository-relative path, or null. */
function resolveSpecifier(fromFile, specifier) {
  let base;
  if (specifier.startsWith("."))
    base = resolve(repoRoot, dirname(fromFile), specifier);
  else if (specifier.startsWith("@/"))
    base = resolve(repoRoot, "src", specifier.slice(2));
  else return null;

  const candidates = base.endsWith(".ts")
    ? [base]
    : [`${base}.ts`, `${base}.tsx`, join(base, "index.ts")];
  for (const candidate of candidates) {
    try {
      if (statSync(candidate).isFile()) return relative(repoRoot, candidate);
    } catch {
      // Not this candidate; try the next spelling.
    }
  }
  return null;
}

/**
 * @returns {Map<string, string[]>} file -> the repository files it imports
 */
function importGraph(files) {
  const graph = new Map();
  for (const file of files) {
    const source = readFileSync(join(repoRoot, file), "utf8");
    const targets = [];
    for (const match of source.matchAll(IMPORT_SPECIFIER)) {
      const resolved = resolveSpecifier(file, match[1] ?? match[2]);
      if (resolved) targets.push(resolved);
    }
    graph.set(file, targets);
  }
  return graph;
}

/** Test files that reach {@link ROOT} directly or through other helpers. */
export function realSqlSuites() {
  const files = sourceFiles();
  const graph = importGraph(files);

  const reaches = new Set([ROOT]);
  // Each pass adds the files that import something already in the set. The
  // chains here are two links deep, but iterating to a fixed point costs
  // nothing and does not care how deep they get.
  for (let changed = true; changed; ) {
    changed = false;
    for (const [file, targets] of graph) {
      if (reaches.has(file)) continue;
      if (targets.some((target) => reaches.has(target))) {
        reaches.add(file);
        changed = true;
      }
    }
  }

  return [...reaches].filter((file) => file.endsWith(".test.ts")).sort();
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const suites = realSqlSuites();
  if (suites.length < MINIMUM_SUITES) {
    console.error(
      `Found only ${suites.length} real-SQL suites, expected at least ` +
        `${MINIMUM_SUITES}. The import closure from ${ROOT} is probably broken.`,
    );
    process.exit(1);
  }
  if (process.argv.includes("--count")) console.log(suites.length);
  else console.log(suites.join("\n"));
}
