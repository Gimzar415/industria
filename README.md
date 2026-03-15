# Inudstria x Tokenomics Global Dashboard

This project keeps the GPU infrastructure dashboard and appends AI news + neocloud tracking at the bottom.

## What changed

- Bottom news list now shows **Top 10** headlines only (one line each, hyperlinked).
- Digest generation now keeps only **actual article-style links** from supported sources and rejects malformed/double URLs.
- If source fetch fails, the generator preserves the previous working digest instead of publishing broken fallback links.
- Digest JSON now includes both legacy (`generated_at`, `display_date`) and new (`as_of_utc`, `methodology`) metadata fields for compatibility across branches and easier conflict resolution.
- Added bottom neocloud table with:
  - name
  - link
  - capital raised
  - current MW
  - planned MW additions
  - as-of date

## News refresh workflow

Workflow: `.github/workflows/daily-digest.yml`
- scheduled daily at **5:00 AM EST** (`10:00 UTC` cron)
- manual `workflow_dispatch`

## Local run

```bash
python3 scripts/fetch_digest.py
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173`.

## Source focus

Digest ingestion now performs a **daily web pull** via Google News RSS search queries, prioritizing these keywords:
- neocloud
- nvidia
- coreweave
- nebius
- lamda (and lambda spelling variant)

The generator deduplicates stories by headline and ranks them by keyword relevance so the bottom feed stays fresh even when a specific publisher feed is unavailable.

## GitHub Pages deploy

1. Push to GitHub.
2. Settings → Pages.
3. Source: Deploy from branch.
4. Branch: `main`, folder `/ (root)`.
