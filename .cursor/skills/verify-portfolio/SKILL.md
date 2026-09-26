---
name: verify-portfolio
description: "Drive the Ali / al0ke Next.js portfolio locally the way a user does — launch npm run dev, doctor the instance, click real nav/CTAs with Playwright, and capture screenshot/ARIA proof. Use when proving portfolio UI changes, routes, branding, or contact links."
---

# Verify portfolio (Ali / al0ke)

Project-local verification for this employer-facing Next.js site. Public brand is **Ali / al0ke** only. Drive the real browser surface; do not invent remote Vercel URLs.

Helper path (from repo root):

```bash
CTRL=".cursor/skills/verify-portfolio/scripts/control-portfolio"
```

Evidence root (survives cleanup):

```text
.cursor/skills/verify-portfolio/artifacts/
```

Feature map: [features/README.md](./features/README.md)

## Launch

Starts an isolated `next dev --turbopack` on `127.0.0.1:4310` (override with `--port` / `PORTFOLIO_VERIFY_PORT`). State lives in `/tmp/portfolio-verify/state.json` — never drive a server you did not launch.

```bash
npm install
npx playwright install chromium   # once per machine; uses system Chrome when present
"$CTRL" launch --port 4310
```

Ready when `launch` prints `url: http://127.0.0.1:4310` and returns. Dev log: `/tmp/portfolio-verify/dev-server.log`.

Teardown is `cleanup` (below). Do not `killall node` / `pkill next`.

## Doctor

Read-only health check. Run before driving whenever anything looks off.

```bash
"$CTRL" doctor
```

Requires:

- Launch pid still alive
- `GET http://127.0.0.1:<port>/` → `200`
- Document title contains `Ali / al0ke`
- Page HTML does not contain the banned surname string `Alfarttoosi`
- Port recorded in state

Exit `0` + `doctor: healthy` means the instance is worth driving. Otherwise cleanup + relaunch.

## Drive

Browser actions go through Playwright via `control-portfolio`. Prefer ARIA roles and accessible names from this repo:

| Handle | Notes |
| --- | --- |
| `nav[aria-label="Primary"]` | Desktop only (`hidden` below `sm`) |
| Link `Now` / `Work` / `Experience` / `Contact` | → `/#now`, `/#work`, `/#experience`, `/#contact` |
| Link `Selected work` / `What I'm doing now` | Hero CTAs |
| Heading level 1 name `Ali` | Hero brand mark (`Ali.`) |
| Section ids `#hero` `#now` `#work` `#experience` `#contact` | Hash targets |
| Case study links by project title | e.g. `MCP / Agent Skill Security Audit` → `/work/mcp-skill-audit` |
| Link `← Work` | Back to `/#work` from a case study |
| Link `Back home` | 404 recovery → `/` |

Recipes:

```bash
"$CTRL" doctor
"$CTRL" goto --path /
"$CTRL" assert-heading --level 1 --name "Ali"
"$CTRL" title                                          # → Ali / al0ke — Cybersecurity Portfolio
"$CTRL" click --role link --name "Selected work"
"$CTRL" assert-text --text "Selected case studies"
"$CTRL" click --role link --name "MCP / Agent Skill Security Audit"
"$CTRL" assert-text --text "Problem"
"$CTRL" goto --path /does-not-exist
"$CTRL" click --role link --name "Back home"
```

Mobile note: Primary nav is CSS-hidden under `sm`. On narrow viewports drive hero CTAs, footer links, brand `al0ke_`, or direct `--path /#contact` instead of header nav clicks.

Never call internal setters or invent test-only endpoints — this app has none. Prove user-visible paths only.

## Evidence

Proof standards:

1. Exercise the real user path (click or hash navigation a visitor would use).
2. Capture the action and the resulting state, not only the final screen.
3. UI proof includes a structure snapshot and a viewport screenshot with brand identity visible (`Ali` / `al0ke`).
4. For outbound contact links, assert exact `href` values (side effect the user cares about).
5. Record the feature file id with every artifact directory.

```bash
"$CTRL" goto --path /
"$CTRL" screenshot --path artifacts/home/hero.png
"$CTRL" snapshot --path artifacts/home/hero.aria.txt
```

Relative `--path` values resolve under `.cursor/skills/verify-portfolio/`. Absolute paths are allowed.

Commit or attach artifacts from a proof run under `artifacts/<feature>/`. Cleanup must not delete them.

## Cleanup

Stops only the process recorded in `/tmp/portfolio-verify/state.json`, then removes that state file. Leaves `artifacts/` untouched.

```bash
"$CTRL" cleanup
ls .cursor/skills/verify-portfolio/artifacts/
```

If a failed iteration leaves a stuck port, run `cleanup` before the next `launch`. Never kill by process name.

## Helpers

Executable CLI: `.cursor/skills/verify-portfolio/scripts/control-portfolio` (symlink to `control-portfolio.mjs`).

| Command | Purpose |
| --- | --- |
| `launch [--port n]` | Start local Next on an isolated port |
| `doctor` | Process + HTTP + brand sanity |
| `goto --path <path>` | Navigate (supports `/`, `/#work`, `/work/hermes`) |
| `click --role <role> --name <name>` | ARIA click |
| `assert-text --text <s>` | Body text contains |
| `assert-heading --level <n> --name <name>` | Heading present |
| `assert-href --role --name --href` | Exact link target |
| `title` | Print `document.title` |
| `screenshot --path …` | Viewport PNG into artifacts |
| `snapshot --path …` | Headings/links/body excerpt |
| `cleanup` | Tear down launched instance only |

```bash
"$CTRL" --help
```

Isolation: two agents may run side by side with different `--port` values and `PORTFOLIO_VERIFY_STATE_DIR` values. Prefer separate state dirs if concurrent. Do not share one launch state across agents.

## Maintenance

When routes, nav labels, or case-study titles change, update `features/` and re-prove one mapped feature. Use `/maintain-verification-skill` to keep the map honest.
