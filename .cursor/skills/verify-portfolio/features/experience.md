# Experience

Experience is the home `#experience` section describing the recent IT Risk Analyst Intern role at a Texas agency CISO office (CSOC).

## Sub-features

- `experience-reach` opens the section from Primary nav or `/#experience`.
- `experience-heading` shows label `Experience` and title `Recent role`.
- `experience-role` shows role `IT Risk Analyst Intern`, org `Texas agency CISO office — CSOC`, and period `Jun 2026 — Aug 2026`.
- `experience-bullets` lists CSOC / risk / audit responsibilities.

## How to get to it (user POV)

- Choose Primary nav `Experience`.
- Open `/#experience` directly.
- Scroll the home page past Work.

## Driving it with control-portfolio

Preconditions:

- Portfolio is healthy at `http://127.0.0.1:4310`.
- Desktop viewport if using Primary nav.

- **Nav entry.** Choose `Experience`. Run `control-portfolio goto --path /` then `control-portfolio click --role link --name "Experience"`. URL contains `#experience`.
- **Headings.** Assert section titles. Run `control-portfolio assert-text --text "Recent role"` and `control-portfolio assert-text --text "IT Risk Analyst Intern"`.
- **Org wording.** Confirm Texas agency phrasing (not a private company brand). Run `control-portfolio assert-text --text "Texas agency CISO office — CSOC"`.
- **Period.** Assert dates. Run `control-portfolio assert-text --text "Jun 2026 — Aug 2026"`.
- **Hash entry.** Jump without nav. Run `control-portfolio goto --path /#experience` then `control-portfolio assert-text --text "Recent role"`.
- **Proof.** Capture the experience region after hash navigation. Run `control-portfolio screenshot --path artifacts/experience/section.png` and `control-portfolio snapshot --path artifacts/experience/section.aria.txt`. Artifacts show `Recent role` and the CSOC org line.

## Gotchas

- Texas internship wording must stay agency/CSOC — do not “fix” a verification failure by inventing a company name.
- Experience is home-only; there is no `/experience` route.
- Bullet text is long — assert stable role/org/period strings, not an entire paragraph.
