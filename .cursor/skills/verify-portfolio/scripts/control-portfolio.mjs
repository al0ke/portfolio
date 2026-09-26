#!/usr/bin/env node
/**
 * control-portfolio — local launch / doctor / browser drive / cleanup for the
 * Ali / al0ke portfolio. Free, local-only. Never invents remote Vercel URLs.
 */

import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = resolve(__dirname, "..");
const REPO_ROOT = resolve(SKILL_ROOT, "../../..");
const STATE_DIR =
  process.env.PORTFOLIO_VERIFY_STATE_DIR || "/tmp/portfolio-verify";
const STATE_FILE = join(STATE_DIR, "state.json");
const DEFAULT_PORT = Number(process.env.PORTFOLIO_VERIFY_PORT || 4310);
const DEFAULT_HOST = "127.0.0.1";

function usage(exitCode = 0) {
  process.stdout.write(`control-portfolio — drive the local Ali / al0ke portfolio

Commands:
  launch [--port <n>] [--host <host>]
  doctor
  goto --path <path>
  click --role <role> --name <name>
  assert-text --text <substring>
  assert-heading --level <n> --name <name>
  assert-href --role <role> --name <name> --href <url>
  title
  screenshot --path <relative-or-absolute>
  snapshot --path <relative-or-absolute>
  cleanup

Environment:
  PORTFOLIO_VERIFY_STATE_DIR  State dir (default /tmp/portfolio-verify)
  PORTFOLIO_VERIFY_PORT       Default launch port (default 4310)

Examples:
  control-portfolio launch --port 4310
  control-portfolio doctor
  control-portfolio goto --path /
  control-portfolio click --role link --name "Selected work"
  control-portfolio assert-text --text "Selected case studies"
  control-portfolio screenshot --path artifacts/home/hero.png
  control-portfolio cleanup
`);
  process.exit(exitCode);
}

function fail(message, hint) {
  process.stderr.write(`Error: ${message}\n`);
  if (hint) process.stderr.write(`  ${hint}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      out.help = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    } else {
      out._.push(arg);
    }
  }
  return out;
}

function readState() {
  if (!existsSync(STATE_FILE)) return null;
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  } catch {
    return null;
  }
}

function writeState(state) {
  mkdirSync(STATE_DIR, { recursive: true });
  writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`);
}

function clearState() {
  if (existsSync(STATE_FILE)) rmSync(STATE_FILE);
}

function evidencePath(pathArg) {
  if (!pathArg) {
    fail("Missing --path", "Example: --path artifacts/home/hero.png");
  }
  if (isAbsolute(pathArg)) return pathArg;
  return resolve(SKILL_ROOT, pathArg);
}

function isAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function waitForHttp(url, { timeoutMs = 90_000, intervalMs = 500 } = {}) {
  const start = Date.now();
  let lastErr = "";
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status >= 200 && res.status < 500) return res.status;
      lastErr = `HTTP ${res.status}`;
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
    }
    await sleep(intervalMs);
  }
  fail(`Timed out waiting for ${url}`, `Last error: ${lastErr}`);
}

function requireState() {
  const state = readState();
  if (!state) {
    fail(
      "No verification instance state found",
      "Run: control-portfolio launch",
    );
  }
  return state;
}

function loadPlaywright() {
  try {
    return require(join(REPO_ROOT, "node_modules", "playwright"));
  } catch {
    fail(
      "playwright is not installed in the repo",
      "From repo root: npm install && npx playwright install chromium",
    );
  }
}

async function withPage(fn) {
  const state = requireState();
  if (!isAlive(state.pid)) {
    fail(
      `Launch pid ${state.pid} is not running`,
      "Run: control-portfolio cleanup && control-portfolio launch",
    );
  }
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({
    headless: true,
    channel: existsSync("/usr/local/bin/google-chrome")
      ? "chrome"
      : undefined,
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const lastUrl = state.lastUrl || state.url;
  try {
    await page.goto(lastUrl, { waitUntil: "domcontentloaded" });
    const result = await fn(page, state);
    state.lastUrl = page.url();
    writeState(state);
    return result;
  } finally {
    await browser.close();
  }
}

function locatorFor(page, role, name) {
  if (!role || !name) {
    fail(
      "Missing --role or --name",
      'Example: --role link --name "Selected work"',
    );
  }
  return page.getByRole(role, { name, exact: false });
}

async function cmdLaunch(args) {
  const existing = readState();
  if (existing?.pid && isAlive(existing.pid)) {
    fail(
      `An instance is already running (pid ${existing.pid} at ${existing.url})`,
      "Run: control-portfolio cleanup — or doctor the existing instance",
    );
  }

  const port = Number(args.port || DEFAULT_PORT);
  const host = args.host || DEFAULT_HOST;
  if (!Number.isInteger(port) || port < 1) fail("Invalid --port");

  mkdirSync(STATE_DIR, { recursive: true });
  const logPath = join(STATE_DIR, "dev-server.log");
  const logFd = openSync(logPath, "w");

  const child = spawn(
    "npm",
    ["run", "dev", "--", "--hostname", host, "--port", String(port)],
    {
      cwd: REPO_ROOT,
      env: {
        ...process.env,
        PORT: String(port),
        BROWSER: "none",
      },
      detached: true,
      stdio: ["ignore", logFd, logFd],
    },
  );
  child.unref();

  const url = `http://${host}:${port}`;
  const state = {
    pid: child.pid,
    port,
    host,
    url,
    lastUrl: url,
    repoRoot: REPO_ROOT,
    logPath,
    startedAt: new Date().toISOString(),
  };
  writeState(state);

  try {
    await waitForHttp(url);
  } catch (err) {
    try {
      if (child.pid) process.kill(-child.pid, "SIGTERM");
    } catch {
      /* ignore */
    }
    clearState();
    throw err;
  }

  process.stdout.write(
    `launched\npid: ${child.pid}\nurl: ${url}\nlog: ${logPath}\nstate: ${STATE_FILE}\n`,
  );
}

async function cmdDoctor() {
  const state = requireState();
  const checks = [];

  const alive = isAlive(state.pid);
  checks.push({ name: "process", ok: alive, detail: `pid ${state.pid}` });

  let httpOk = false;
  let httpStatus = null;
  try {
    const res = await fetch(state.url, { redirect: "manual" });
    httpStatus = res.status;
    httpOk = res.status === 200;
  } catch (err) {
    checks.push({
      name: "http",
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    });
  }
  if (httpStatus !== null) {
    checks.push({
      name: "http",
      ok: httpOk,
      detail: `GET ${state.url} → ${httpStatus}`,
    });
  }

  if (httpOk) {
    const html = await (await fetch(state.url)).text();
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1];
    const hasTitle = title.includes("Ali / al0ke");
    const noBannedSurname = !/Alfarttoosi/i.test(html);
    const brandOk = hasTitle && noBannedSurname;
    checks.push({
      name: "brand",
      ok: brandOk,
      detail: `title=${JSON.stringify(title)}; banned-surname-absent=${noBannedSurname}`,
    });
  }

  checks.push({
    name: "port",
    ok: alive && Number(state.port) > 0,
    detail: `${state.host}:${state.port}`,
  });

  const allOk = checks.every((c) => c.ok);
  for (const c of checks) {
    process.stdout.write(`${c.ok ? "ok" : "FAIL"}  ${c.name}: ${c.detail}\n`);
  }
  process.stdout.write(
    allOk
      ? `doctor: healthy\nurl: ${state.url}\n`
      : `doctor: unhealthy\nurl: ${state.url}\n`,
  );
  if (!allOk) process.exit(1);
}

async function cmdGoto(args) {
  const path = args.path;
  if (!path) fail("Missing --path", "Example: --path /#work");
  await withPage(async (page, state) => {
    const target = new URL(path, state.url).toString();
    await page.goto(target, { waitUntil: "networkidle" });
    process.stdout.write(`goto: ${page.url()}\n`);
  });
}

async function cmdClick(args) {
  await withPage(async (page) => {
    const loc = locatorFor(page, args.role, args.name);
    await loc.first().click();
    await page.waitForLoadState("domcontentloaded");
    process.stdout.write(
      `clicked: ${args.role} ${JSON.stringify(args.name)}\n`,
    );
    process.stdout.write(`url: ${page.url()}\n`);
  });
}

async function cmdAssertText(args) {
  const text = args.text;
  if (!text) fail("Missing --text", 'Example: --text "Selected case studies"');
  await withPage(async (page) => {
    const body = await page.locator("body").innerText();
    if (!body.includes(text)) {
      fail(`Text not found: ${JSON.stringify(text)}`);
    }
    process.stdout.write(`assert-text: ok (${JSON.stringify(text)})\n`);
  });
}

async function cmdAssertHeading(args) {
  const level = Number(args.level || 1);
  const name = args.name;
  if (!name) fail("Missing --name", 'Example: --name "Ali"');
  await withPage(async (page) => {
    const loc = page.getByRole("heading", { level, name, exact: false });
    const count = await loc.count();
    if (count < 1) {
      fail(`Heading h${level} not found: ${JSON.stringify(name)}`);
    }
    process.stdout.write(
      `assert-heading: ok h${level} ${JSON.stringify(name)}\n`,
    );
  });
}

async function cmdAssertHref(args) {
  await withPage(async (page) => {
    const loc = locatorFor(page, args.role, args.name);
    const href = await loc.first().getAttribute("href");
    if (href !== args.href) {
      fail(
        `href mismatch for ${args.role} ${JSON.stringify(args.name)}`,
        `expected ${args.href}, got ${href}`,
      );
    }
    process.stdout.write(`assert-href: ok ${href}\n`);
  });
}

async function cmdTitle() {
  await withPage(async (page) => {
    const title = await page.title();
    process.stdout.write(`title: ${title}\n`);
  });
}

async function cmdScreenshot(args) {
  const out = evidencePath(args.path);
  mkdirSync(dirname(out), { recursive: true });
  await withPage(async (page) => {
    await page.screenshot({ path: out, fullPage: false });
    process.stdout.write(`screenshot: ${out}\n`);
  });
}

async function cmdSnapshot(args) {
  const out = evidencePath(args.path);
  mkdirSync(dirname(out), { recursive: true });
  await withPage(async (page) => {
    const title = await page.title();
    const url = page.url();
    const headings = await page.locator("h1, h2, h3").allTextContents();
    const links = await page.locator("a").evaluateAll((nodes) =>
      nodes.slice(0, 40).map((a) => ({
        text: (a.textContent || "").replace(/\s+/g, " ").trim(),
        href: a.getAttribute("href"),
      })),
    );
    const bodyExcerpt = (await page.locator("body").innerText())
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 80);

    const report = [
      `# Portfolio ARIA / structure snapshot`,
      `url: ${url}`,
      `title: ${title}`,
      ``,
      `## Headings`,
      ...headings.map((h) => `- ${h}`),
      ``,
      `## Links (first 40)`,
      ...links.map((l) => `- ${JSON.stringify(l.text)} → ${l.href}`),
      ``,
      `## Body excerpt`,
      ...bodyExcerpt.map((l) => `- ${l}`),
      ``,
    ].join("\n");
    writeFileSync(out, report);
    process.stdout.write(`snapshot: ${out}\n`);
  });
}

async function cmdCleanup() {
  const state = readState();
  if (!state) {
    process.stdout.write("cleanup: no state file (nothing to stop)\n");
    process.stdout.write(
      `evidence retained under: ${join(SKILL_ROOT, "artifacts")}\n`,
    );
    return;
  }

  if (state.pid && isAlive(state.pid)) {
    try {
      process.kill(-state.pid, "SIGTERM");
    } catch {
      try {
        process.kill(state.pid, "SIGTERM");
      } catch {
        /* ignore */
      }
    }
    const start = Date.now();
    while (isAlive(state.pid) && Date.now() - start < 5_000) {
      await sleep(200);
    }
    if (isAlive(state.pid)) {
      try {
        process.kill(-state.pid, "SIGKILL");
      } catch {
        try {
          process.kill(state.pid, "SIGKILL");
        } catch {
          /* ignore */
        }
      }
    }
    process.stdout.write(`cleanup: stopped pid ${state.pid}\n`);
  } else {
    process.stdout.write("cleanup: process already stopped\n");
  }

  clearState();
  process.stdout.write(`cleanup: removed ${STATE_FILE}\n`);
  process.stdout.write(
    `evidence retained under: ${join(SKILL_ROOT, "artifacts")}\n`,
  );
}

const args = parseArgs(process.argv.slice(2));
const command = args._[0];

if (!command || args.help) usage(command ? 0 : 1);

const handlers = {
  launch: cmdLaunch,
  doctor: cmdDoctor,
  goto: cmdGoto,
  click: cmdClick,
  "assert-text": cmdAssertText,
  "assert-heading": cmdAssertHeading,
  "assert-href": cmdAssertHref,
  title: cmdTitle,
  screenshot: cmdScreenshot,
  snapshot: cmdSnapshot,
  cleanup: cmdCleanup,
};

const handler = handlers[command];
if (!handler) {
  fail(`Unknown command: ${command}`, "Run: control-portfolio --help");
}

try {
  await handler(args);
} catch (err) {
  fail(err instanceof Error ? err.message : String(err));
}
