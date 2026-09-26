# Contact

Contact is the home `#contact` section (`Say hello`) with mailto Email plus GitHub and X outbound buttons.

## Sub-features

- `contact-reach` opens the section from Primary nav, footer, or `/#contact`.
- `contact-heading` shows label `Contact` and title `Say hello`.
- `contact-email` exposes a mailto Email button.
- `contact-github` links to `https://github.com/al0ke`.
- `contact-x` links to `https://x.com/0xal0ke`.

## How to get to it (user POV)

- Choose Primary nav `Contact`.
- Open `/#contact` directly.
- Use footer `GitHub` / `X` (footer socials, not the Contact buttons).

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:4310`.
- Contact hrefs match `src/data/site.ts`.

- **Reach Contact.** Choose `Contact`. Run `control-portfolio goto --path /` then `control-portfolio click --role link --name "Contact"`. Body contains `Say hello`.
- **GitHub href.** Assert the Contact GitHub button. Run `control-portfolio assert-href --role link --name "GitHub" --href "https://github.com/al0ke"`. Exact href match.
- **X href.** Assert the Contact X button. Run `control-portfolio assert-href --role link --name "X" --href "https://x.com/0xal0ke"`. Exact href match.
- **Email mailto.** Assert the Email button uses mailto. Run `control-portfolio assert-href --role link --name "Email" --href "mailto:alifarttoosi98@gmail.com"`. Exact href match from `site.email`.
- **Hash entry.** Jump without nav. Run `control-portfolio goto --path /#contact` then `control-portfolio assert-text --text "Say hello"`.
- **Proof.** Capture Contact after hash navigation. Run `control-portfolio screenshot --path artifacts/contact/section.png` and `control-portfolio snapshot --path artifacts/contact/section.aria.txt`. Artifacts show `Say hello` and the three outbound controls.

## Gotchas

- Accessible names include the handle suffix (`GitHub /al0ke`, `X /0xal0ke`, Email + address). Matching on `GitHub` / `X` / `Email` with non-exact role queries is intentional.
- Header `github/al0ke` is a separate link — when asserting Contact GitHub, prefer being on `/#contact` so the first match is the Contact button, or accept either identical href.
- There is no LinkedIn URL by design; do not fail verification for its absence.
- Do not open external sites in the harness to “prove” GitHub/X — href assertion is the proof.
