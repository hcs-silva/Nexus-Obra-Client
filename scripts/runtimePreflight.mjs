import path from "node:path";

const cwd = process.cwd();
const cwdLeaf = path.basename(cwd);

const fail = (message) => {
  console.error(`❌ ${message}`);
  process.exit(1);
};

if (cwdLeaf !== "Client") {
  fail(
    `Workspace path casing mismatch. Run commands from a path ending in '/Client' (current leaf: '${cwdLeaf}').`,
  );
}

const [major, minor] = process.versions.node.split(".").map(Number);
const isNode20Supported = major === 20 && minor >= 19;
const isNode22Supported = major === 22 && minor >= 12;
const isSupportedRuntime = isNode20Supported || isNode22Supported;

if (!isSupportedRuntime) {
  const warning =
    `Node ${process.versions.node} is outside project-supported range (20.19+ or 22.12+ LTS). ` +
    "Use Node 22.12.0 for stable render-level Vitest/RTL behavior.";

  if (process.env.NEXUS_STRICT_RUNTIME === "1") {
    fail(warning);
  }

  console.warn(`⚠️ ${warning}`);
} else {
  console.log(
    `✅ Runtime preflight OK (Node ${process.versions.node}, path '${cwdLeaf}').`,
  );
}
