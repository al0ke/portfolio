# Deploy notes (Vercel)

## Current URL reality

| URL | Status |
| --- | --- |
| `https://al0ke.vercel.app` | **OLD deploy still HTTP 200** — separate Vercel project serving a previous portfolio. Not this repo until Ali re-points the domain. |
| `https://al0ke-portfolio.vercel.app` | **`DEPLOYMENT_NOT_FOUND`** — project / deployment does not exist yet. |

## What Ali must click (after merging this PR)

1. **Merge** this PR into `main` on GitHub.
2. **Vercel → Add New… → Project** → import **`al0ke/portfolio`**.
3. Set the Vercel project name to **`al0ke-portfolio`** (creates `al0ke-portfolio.vercel.app` after the first green deploy).
4. Framework: **Next.js**. Build: `npm run build`. Deploy Production.
5. **Domain cutover for `al0ke.vercel.app`:**
   - Open the **old** Vercel project that currently owns `al0ke.vercel.app`.
   - Remove `al0ke.vercel.app` from that project (Settings → Domains), **or** transfer it.
   - On the new **`al0ke-portfolio`** project → Settings → Domains → add `al0ke.vercel.app`.
6. **GitHub About scrub:** repo → About (gear) → description:

   > Employer portfolio — Ali / al0ke

   Remove any previous About text that included a surname.

## Optional rename path

If a Vercel project is already linked to this repo: Settings → General → Project Name → `al0ke-portfolio`, then Domains as above, then Redeploy.

## Post-deploy checklist

- [ ] Production HTML matches this PR (MCP skill case studies; no banned product names).
- [ ] Canonical URL chosen (`al0ke.vercel.app` and/or `al0ke-portfolio.vercel.app`).
- [ ] Replace case-study cover placeholders with real screenshots when ready.
- [ ] Confirm Gumroad / public repo status before adding purchase or Code links for the MCP skills.
