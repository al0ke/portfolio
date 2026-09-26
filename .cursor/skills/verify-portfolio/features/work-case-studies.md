# Work case studies

Work lists featured and archive projects on the home `#work` section and opens a problem → approach → outcome case study at `/work/<slug>`.

## Sub-features

- `work-list` shows heading `Selected case studies` and featured project rows.
- `work-open-featured` opens a featured case study from its title link.
- `work-case-structure` shows Problem / Approach / Outcome / Tech stack and the no-public-code message when `links` is empty.
- `work-back` returns to `/#work` via `← Work`.
- `work-archive` opens the archive project `Content Empire (archive)` at `/work/content-empire`.

## How to get to it (user POV)

- Choose Primary nav `Work` or hero `Selected work` → `/#work`.
- Choose a featured row by title (e.g. `MCP / Agent Skill Security Audit`).
- Choose the archive row `Content Empire (archive)`.
- Open a slug directly: `/work/mcp-skill-audit`, `/work/mcp-secret-leak`, `/work/hermes`, `/work/prism`, `/work/content-empire`.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:4310`.
- Featured project titles match `src/data/projects.ts` (status `current`).

- **Reach Work list.** From home choose `Selected work`. Run `control-portfolio goto --path /` then `control-portfolio click --role link --name "Selected work"`. Body contains `Selected case studies`.
- **Open featured study.** Choose `MCP / Agent Skill Security Audit`. Run `control-portfolio click --role link --name "MCP / Agent Skill Security Audit"`. URL is `/work/mcp-skill-audit` and an `h1` matches that title.
- **Case study body.** Assert structure. Run `control-portfolio assert-text --text "Problem"`, `control-portfolio assert-text --text "Approach"`, `control-portfolio assert-text --text "Outcome"`, and `control-portfolio assert-text --text "No public Code link — private or archived work."`.
- **Back to Work.** Choose `← Work`. Run `control-portfolio click --role link --name "Work"`. URL contains `#work` (or `/#work`).
- **Direct slug.** Open Hermes without the list. Run `control-portfolio goto --path /work/hermes` then `control-portfolio assert-heading --level 1 --name "Hermes"`.
- **Archive entry.** Open the archive study. Run `control-portfolio goto --path /work/content-empire` then `control-portfolio assert-text --text "Archive case study"`.
- **Proof.** Capture the featured case study. Run `control-portfolio goto --path /work/mcp-skill-audit`, `control-portfolio screenshot --path artifacts/work/mcp-skill-audit.png`, and `control-portfolio snapshot --path artifacts/work/mcp-skill-audit.aria.txt`. Artifacts identify the project title and Problem heading.

## Gotchas

- Project title links wrap year + title + `Case study →` / `Archive →`; accessible name still matches the project title substring.
- All five projects currently ship `links: []` — expecting a `Code` button fails. Assert the “No public Code link…” message instead.
- Document title on case studies uses the template `%s — al0ke` (e.g. `Hermes — al0ke`).
- Invalid slugs render the not-found feature, not an empty case study.
