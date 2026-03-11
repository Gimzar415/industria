# AI Daily Digest

Production-ready static news page for executive monitoring of AI cloud and infrastructure developments.

## What this project does

- Builds a clean static site titled **AI Daily Digest — [Month Day, Year]**.
- Publishes the top **20 unique** headlines for AI cloud, GPU infrastructure, datacenter, power, and neocloud developments.
- Uses `data/digest.json` as the content layer.
- Refreshes daily with GitHub Actions.

## Project structure

- `index.html` — page shell and controls.
- `styles.css` — premium minimal styling.
- `app.js` — client rendering logic, filters, search, fallback handling.
- `scripts/fetch_digest.py` — ingestion, scoring, dedupe, JSON generation.
- `data/digest.json` — generated digest payload.
- `.github/workflows/daily-digest.yml` — daily and manual refresh workflow.

## Source ingestion model

Preferred source order:
1. Reuters
2. Financial Times
3. Data Center Dynamics
4. Axios
5. CIO Dive
6. The AI Insider

The generator defines source adapters with:
- source name
- homepage/section URL
- parsing strategy (`rss` or `html`)
- allowed domains
- source weight
- preferred topic keywords

RSS is used where possible; HTML parsing is used as fallback.

## Ranking model (0–100)

Weighted score:
- 35% significance
- 25% direct relevance
- 20% freshness
- 10% source authority
- 10% specificity

Sub-rules are explicit in `scripts/fetch_digest.py`:
- significance: financing amounts, launches, capacity/offtake, sovereign initiatives, partnerships
- relevance: AI cloud / infrastructure terms boosted; consumer-style terms penalized
- freshness: same-day highest; decays through 7 days
- authority: Reuters 1.00, FT 0.96, DCD 0.93, Axios 0.90, CIO Dive 0.86, AI Insider 0.82
- specificity: numbers, named entities, MW/GW and deployment details

## Deduplication model

Multi-step dedupe combines:
1. normalized headline text
2. named-entity overlap
3. core phrase overlap
4. publish-time proximity
5. URL slug similarity

When duplicates collide, winner selection favors:
1. stronger source preference
2. better specificity
3. clearer/more detailed headline
4. newer materially improved version

## Local run

```bash
python -m pip install feedparser requests beautifulsoup4 python-dateutil
python scripts/fetch_digest.py
python -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.

## Refresh cadence

GitHub Actions workflow runs daily and can be run manually with `workflow_dispatch`.
It commits `data/digest.json` only if content changed.

## Deploy to GitHub Pages

1. Push repository to GitHub.
2. Open **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main`, folder `/ (root)`.
5. Save.

Your static digest page will publish at:
`https://<org-or-user>.github.io/<repo>/`

## Maintenance tips

- Update source adapters in `scripts/fetch_digest.py` as site structures evolve.
- Tune keyword and scoring rules to match editorial quality goals.
- Keep `allowed_domains` strict to avoid ingesting unrelated links.
