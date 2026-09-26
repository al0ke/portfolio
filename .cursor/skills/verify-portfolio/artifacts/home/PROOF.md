# Proof run — home feature

Date: 2026-09-26

Commands (from repo root):

```bash
CTRL=".cursor/skills/verify-portfolio/scripts/control-portfolio"
"$CTRL" launch --port 4310
"$CTRL" doctor
"$CTRL" goto --path /
"$CTRL" assert-heading --level 1 --name "Ali"
"$CTRL" title
"$CTRL" click --role link --name "Selected work"
"$CTRL" assert-text --text "Selected case studies"
"$CTRL" goto --path /
"$CTRL" screenshot --path artifacts/home/hero.png
"$CTRL" snapshot --path artifacts/home/hero.aria.txt
"$CTRL" cleanup
```

Results:

- doctor: healthy (title `Ali / al0ke — Cybersecurity Portfolio`, banned surname absent)
- home feature driven via hero CTA `Selected work` → asserted `Selected case studies`
- evidence files present after cleanup:
  - `hero.png`
  - `hero.aria.txt`
