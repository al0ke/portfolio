# Ali / al0ke — Portfolio

Employer-facing cybersecurity portfolio for **Ali** (`al0ke`).

- Current old live URL: [https://al0ke.vercel.app](https://al0ke.vercel.app) (separate project until cutover)
- Target project name: `al0ke-portfolio` → `https://al0ke-portfolio.vercel.app` (not deployed yet)

See [DEPLOY.md](./DEPLOY.md) for import, domain cutover, and About scrub steps.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion (light scroll reveals; respects `prefers-reduced-motion`)

## Local

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

## Verify (agents)

Project-local skill: [`.cursor/skills/verify-portfolio/SKILL.md`](./.cursor/skills/verify-portfolio/SKILL.md).

```bash
npm install
npx playwright install chromium
npm run verify -- launch --port 4310
npm run verify -- doctor
npm run verify -- cleanup
```

Proof artifacts land in `.cursor/skills/verify-portfolio/artifacts/` and survive cleanup.

## Content rules

- Public display name: **Ali** / **al0ke** only
- Texas internship wording: **Texas agency CISO office** / CSOC
- Contact: GitHub `al0ke`, X `@0xal0ke`, optional mailto — no LinkedIn URL
- Public Code buttons only when a verified public GitHub repo exists
