A lightweight static dashboard for tracking neocloud GPU prices (B200, GB200, Vera Rubin), contract curves, quarterly decline trends, and energy exporter market context.

## Run locally

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.

---

## Updating prices when provider sheets change (Nebius, Lambda, CoreWeave, etc.)

If listed rates changed and current values look too high/low, update `data.js` in 3 steps:

1. **Update the global as-of date**:
   - `dashboardMeta.priceSheetAsOf`
2. **Update provider rows in `pricingData`**:
   - `provider`, `gpu`, `contract`, `hourly`, `sourceType`, `sourceUrl`, `asOf`
3. **Keep source quality explicit**:
   - `published` = directly on provider pricing page
   - `partner-quote` = recent enterprise quote sample
   - `estimated-discount` = modeled contract discount from list pricing
   - `forecast` = pre-launch expectation (e.g., Vera Rubin)

### Example: adjusting Nebius rows

If Nebius revises B200 on-demand price, edit these rows in `data.js`:
- `provider: 'Nebius'`
- `gpu: 'B200'`
- contracts `on-demand` / `monthly` / `yearly`

Also update `asOf` to the date of the revised sheet.

---


### Forecast direction control (up or down)

The dashboard now supports two forecast scenarios in `data.js` via `forecastScenarios`:
- `easing`: supply growth leads to softer pricing
- `memory_shortage_2026`: tighter memory supply drives roughly +40% rental pricing into late 2026

Use the **Forecast Scenario** dropdown in the UI to switch between cases.

---

## How to publish this as a website

Because this project is static (`index.html`, CSS, JS), the easiest hosting options are GitHub Pages, Netlify, or Vercel.

## Option 1: GitHub Pages (fast + free)

1. Push this repo to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or your default) and `/ (root)`
4. Save, then wait 1–2 minutes.
5. Your site will be live at:
   - `https://<your-org-or-user>.github.io/<repo-name>/`

### Important for GitHub Pages
If your site is served from a subpath (`/<repo-name>/`), ensure any absolute asset paths are avoided. This dashboard already uses relative paths, so it is compatible.

---

## Option 2: Netlify (drag-and-drop or Git-connected)

### Drag-and-drop publish
1. Go to Netlify and create a new site.
2. Drag the project folder into Netlify deploy UI.
3. Netlify instantly gives you a URL.

### Git-connected publish
1. In Netlify, click **Add new site → Import an existing project**.
2. Connect GitHub and select this repo.
3. Build settings:
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.`
4. Deploy.

The included `netlify.toml` already sets publish to root and adds a cache header for static assets.

---

## Option 3: Vercel (Git-connected)

1. In Vercel, click **Add New... → Project**.
2. Import this repository.
3. Framework preset: `Other`.
4. Build command: none.
5. Output directory: `.`
6. Deploy.

The included `vercel.json` tells Vercel to serve this as a static site.

---

## Production next steps (recommended)

To make this truly dynamic for CEO-grade planning:

1. Replace hardcoded `data.js` with API-driven data.
2. Add a daily/weekly data pipeline for:
   - provider list pricing pages,
   - enterprise quote snapshots,
   - analyst/market intelligence inputs,
   - power market datasets by country.
3. Store historical snapshots in a database (e.g., Postgres/BigQuery).
4. Add “as-of date” and source citations in UI.
5. Add alerts (e.g., quarterly decline > 8%, or contract spread widening).

## Suggested architecture

- Frontend: this static dashboard (or migrate to React later).
- Backend API: serverless endpoint for normalized price + energy datasets.
- Data jobs: scheduled ETL (GitHub Actions, Cloud Run jobs, or Airflow).
- Storage: analytics table keyed by `provider, gpu, region, contract, date`.
