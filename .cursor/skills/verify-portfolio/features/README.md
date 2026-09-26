# Portfolio verification map

This directory is the maintained source for verifying user-facing behavior of the Ali / al0ke Next.js portfolio. Read this index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch with `.cursor/skills/verify-portfolio/scripts/control-portfolio launch --port 4310`.
- Require `control-portfolio doctor` → `doctor: healthy` at `http://127.0.0.1:4310`.
- Public brand checks: title contains `Ali / al0ke`; HTML must not contain `Alfarttoosi`.
- Never drive an instance that was not started by this verification run.
- Prefer desktop viewport (≥640px) so `nav[aria-label="Primary"]` is visible; on mobile use hero/footer/hash paths instead.

## Driving conventions

- Start every recipe from `/` unless preconditions say otherwise.
- Prefer ARIA roles and accessible names over CSS selectors or DOM position.
- Treat every command as literal. Keep quoted names and flags unchanged.
- Run browser actions through `control-portfolio`.
- Cleanup removes the launched server only — never proof artifacts under `artifacts/`.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes a structure snapshot and a screenshot with `Ali` / `al0ke` visible.
- Outbound contact proof includes exact `href` assertions.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with control-portfolio` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

## Features

- [Home portfolio](./home.md) — hero brand, Now/Work/Experience/Contact sections, primary nav and hero CTAs.
- [Work case studies](./work-case-studies.md) — featured and archive project pages under `/work/<slug>`.
- [Experience](./experience.md) — Recent role section for the Texas agency CISO office internship.
- [Contact](./contact.md) — Email / GitHub / X outbound links.
- [Not found](./not-found.md) — unknown route recovery via Back home.
