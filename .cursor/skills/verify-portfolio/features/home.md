# Home portfolio

Home is the single-page portfolio at `/`: hero brand mark, Now, Work, Experience, and Contact sections, reachable by primary nav and hero CTAs.

## Sub-features

- `home-hero` shows brand `Ali.` with label `Portfolio / al0ke` and supporting copy.
- `home-nav` jumps to each section via Primary nav links on desktop.
- `home-cta-work` scrolls/jumps to Work via `Selected work`.
- `home-cta-now` jumps to Now via `What I'm doing now`.
- `home-sections` renders headings `Current focus`, `Selected case studies`, `Recent role`, and `Say hello`.
- `home-title` sets document title `Ali / al0ke — Cybersecurity Portfolio`.

## How to get to it (user POV)

- Open `/` (brand link `al0ke_` in the header).
- Choose Primary nav links `Now`, `Work`, `Experience`, or `Contact`.
- Choose hero CTAs `Selected work` or `What I'm doing now`.
- From a case study or 404, follow `← Work` / `Back home` / footer `Work`.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:4310`.
- `control-portfolio doctor` reports healthy brand title.
- Viewport width ≥ 640px when proving Primary nav clicks.

- **Open home.** Navigate to `/`. Run `control-portfolio goto --path /`. URL ends with `/` and the hero heading is present.
- **Brand heading.** Confirm the hero mark. Run `control-portfolio assert-heading --level 1 --name "Ali"`. An `h1` matching `Ali` is found.
- **Document title.** Read the title. Run `control-portfolio title`. Output contains `Ali / al0ke — Cybersecurity Portfolio`.
- **Hero → Work CTA.** Choose `Selected work`. Run `control-portfolio click --role link --name "Selected work"`. URL contains `#work` and body contains `Selected case studies`.
- **Hero → Now CTA.** Return home and choose `What I'm doing now`. Run `control-portfolio goto --path /` then `control-portfolio click --role link --name "What I'm doing now"`. URL contains `#now` and body contains `Current focus`.
- **Primary nav Contact.** Choose `Contact` in Primary nav. Run `control-portfolio click --role link --name "Contact"`. URL contains `#contact` and body contains `Say hello`.
- **Section presence.** From `/`, assert remaining section titles. Run `control-portfolio goto --path /` then `control-portfolio assert-text --text "Recent role"` and `control-portfolio assert-text --text "Selected case studies"`.
- **Proof.** Capture the first viewport with brand visible. Run `control-portfolio goto --path /`, `control-portfolio screenshot --path artifacts/home/hero.png`, and `control-portfolio snapshot --path artifacts/home/hero.aria.txt`. Artifacts show `Ali`, `al0ke`, and home headings.

## Gotchas

- Primary nav is `hidden` below the `sm` breakpoint — do not fail mobile runs for missing `Now`/`Work` header links; use hero CTAs or `/#…` paths.
- Hero `h1` accessible name is `Ali.` (accent dot included); matching `Ali` with `exact: false` is correct.
- Framer Motion `Reveal` only affects opacity/transform — wait for `networkidle` / DOM content, not animation end, before asserting text.
- Do not treat `site.url` (`https://al0ke.vercel.app`) as a live verification target; always drive the local launch URL.
