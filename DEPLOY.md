# Deploy notes (Vercel)

## Current URL reality

| URL | Status (audited) |
| --- | --- |
| `https://al0ke.vercel.app` | Resolves (HTTP 200). Appears to be an **older separate Vercel project** still serving a previous portfolio build — not this repo (this repo was README-only until this PR). |
| `https://al0ke-portfolio.vercel.app` | `DEPLOYMENT_NOT_FOUND` — project name / deployment does not exist yet. |

Prefer keeping **`al0ke.vercel.app`** healthy as the public URL. Optionally add `al0ke-portfolio` as a project name or alias after the first green build.

## Recommended: import this repo as `al0ke-portfolio`, then point `al0ke`

1. In Vercel → **Add New… → Project**.
2. Import **`al0ke/portfolio`** from GitHub.
3. Set project name to **`al0ke-portfolio`** (this unlocks `al0ke-portfolio.vercel.app` after deploy).
4. Framework preset: **Next.js**. Build command `npm run build`, output default.
5. Deploy. Confirm preview + `https://al0ke-portfolio.vercel.app`.
6. To make **`al0ke.vercel.app`** serve *this* project instead of the old one:
   - Open the **old** project that currently owns `al0ke.vercel.app`.
   - Either remove that domain from the old project, **or** transfer/reassign the `al0ke` Vercel subdomain to the new `al0ke-portfolio` project (Project → Settings → Domains).
   - Add domain `al0ke.vercel.app` on the new project if Vercel does not attach it automatically.
7. Optional: add a custom domain later under the same Domains panel.

## If you only want to rename an existing project

If Ali already has a Vercel project connected to this repo:

1. Project → **Settings → General → Project Name** → set to `al0ke-portfolio`.
2. Project → **Settings → Domains** → ensure both `al0ke-portfolio.vercel.app` and (if desired) `al0ke.vercel.app` are attached.
3. Redeploy Production.

## GitHub repo description (manual)

`gh` write access is not available from this agent. In GitHub → **al0ke/portfolio → About → Settings (gear)**, set the description to:

> Employer portfolio — Ali / al0ke

(Remove any previous About text that included a surname.)

## Post-deploy checklist for Ali

- [ ] Confirm production serves this PR’s build (hero breath-line + Now + case studies).
- [ ] Decide whether `al0ke.vercel.app` or `al0ke-portfolio.vercel.app` is canonical; redirect the other if needed.
- [ ] Replace case-study cover placeholders with real screenshots when ready.
- [ ] Pin exact Now bullets if anything changed for Handshake / Hermes status.
- [ ] PhishGuard demo is behind Basic auth (`401`) — expected; keep or document credentials separately (do not put secrets in this repo).
