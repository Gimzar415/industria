# Inudstria x Tokenomics Global Dashboard

This project keeps your original GPU infrastructure dashboard and adds a lightweight **AI Daily Digest headlines strip at the very bottom**.

## What is included

- Main dashboard (pricing filters, benchmark bar chart, provider contract curves, quarterly outlook, energy map, pricing source table, KPI cards).
- Bottom news module: **20 one-line hyperlinked headlines** from `data/digest.json`.
- Daily digest generator: `scripts/fetch_digest.py`.
- Daily GitHub Action refresh: `.github/workflows/daily-digest.yml`.

## Key behavior

- The dashboard remains primary content.
- News is appended at the bottom only (not at top).
- Headlines are deduplicated and capped at 20.
- If source fetching fails, the generator uses deterministic fallback headlines.

## Notable headline policy

The digest now force-includes this major event if missing from scraped candidates:
- **NVIDIA invests $2 billion in Nebius to expand AI cloud and Blackwell infrastructure capacity**.

## Local run

```bash
python3 scripts/fetch_digest.py
python3 -m http.server 4173 --bind 0.0.0.0
```

Open `http://localhost:4173`.

## Daily refresh in GitHub

Workflow: `.github/workflows/daily-digest.yml`
- scheduled daily
- manual `workflow_dispatch`
- commits updated `data/digest.json` when changed

## GitHub Pages deploy

1. Push to GitHub.
2. Settings → Pages.
3. Source: Deploy from branch.
4. Branch: `main`, folder `/ (root)`.
