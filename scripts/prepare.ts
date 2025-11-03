import cp from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import { allBuildScripts, root } from "./utils.ts";

async function run() {
  const dist = path.join(root, "dist");
  await fs.access(dist).catch(() => fs.mkdir(dist));

  for await (const [name, cmd] of allBuildScripts()) {
    console.log("run", name);
    cp.spawn(`npx ${cmd} -c`, {
      stdio: "inherit",
      shell: true,
      cwd: root,
    });
  }
}

run();
