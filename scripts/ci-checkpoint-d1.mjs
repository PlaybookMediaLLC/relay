// Folds the local D1 database's write-ahead log back into the database file.
//
// `wrangler d1 migrations apply DB --local` leaves a write-ahead log larger
// than the database itself -- 5.8 MB of WAL against 2.1 MB of database after
// the 111 migrations. Caching that state and restoring it in a later job just
// moves the work: the first connection has to replay the log, which measured
// about as long as replaying the migrations would have.
//
// Checkpointing first makes the cached state a plain, consistent database.
//
// Usage:  node scripts/ci-checkpoint-d1.mjs

import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const STATE_DIR = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";

let entries;
try {
  entries = readdirSync(STATE_DIR);
} catch (error) {
  throw new Error(`No local D1 state at ${STATE_DIR}`, { cause: error });
}

const databases = entries.filter((entry) => entry.endsWith(".sqlite"));
if (databases.length === 0)
  throw new Error(`No .sqlite file in ${STATE_DIR}; was the migration run?`);

for (const name of databases) {
  const path = join(STATE_DIR, name);
  const database = new DatabaseSync(path);
  // TRUNCATE checkpoints every frame and then empties the log, so the two
  // sidecar files below carry nothing once it returns.
  database.exec("PRAGMA wal_checkpoint(TRUNCATE)");
  database.close();
  for (const suffix of ["-wal", "-shm"])
    rmSync(`${path}${suffix}`, { force: true });
  console.log(`checkpointed ${path}`);
}
