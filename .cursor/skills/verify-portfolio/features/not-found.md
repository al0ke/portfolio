# Not found

Unknown routes render a 404 page with heading `Page not found` and a `Back home` link that returns to the portfolio home.

## Sub-features

- `not-found-render` shows label `404`, title `Page not found`, and recovery copy.
- `not-found-home` returns to `/` via `Back home`.

## How to get to it (user POV)

- Visit any unknown path (e.g. `/does-not-exist`).
- Visit an unknown work slug (e.g. `/work/not-a-real-project`).

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:4310`.

- **Open unknown path.** Navigate to a missing route. Run `control-portfolio goto --path /does-not-exist`. Body contains `Page not found`.
- **Heading.** Assert the title. Run `control-portfolio assert-heading --level 1 --name "Page not found"`.
- **Recover home.** Choose `Back home`. Run `control-portfolio click --role link --name "Back home"`. URL is `/` and hero heading `Ali` is present (`control-portfolio assert-heading --level 1 --name "Ali"`).
- **Unknown work slug.** Confirm slug miss uses the same page. Run `control-portfolio goto --path /work/not-a-real-project` then `control-portfolio assert-text --text "Page not found"`.
- **Proof.** Capture the 404 state before recovery. Run `control-portfolio goto --path /does-not-exist`, `control-portfolio screenshot --path artifacts/not-found/page.png`, and `control-portfolio snapshot --path artifacts/not-found/page.aria.txt`. Artifacts show `Page not found` and `Back home`.

## Gotchas

- Next may serve 404 with HTTP 404 — `goto` still loads the document; assert on body text, not only status codes.
- After `Back home`, re-assert home brand before calling the path verified.
- Do not treat a soft client redirect without the 404 heading as success for this feature.
