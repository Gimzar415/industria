# Inudstria x Tokenomics Global Dashboard

A lightweight static dashboard for tracking neocloud GPU prices (B200, GB200, GB300, Vera Rubin), contract curves, quarterly outlook trends, and energy-market context.

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

### Nebius focus

Nebius rows are now included for both B200 and GB200 contracts. When Nebius updates published pricing, refresh these records first and bump the `asOf` date.

---

## Energy map data (hydro / thermal / nuclear)

The map uses:
- choropleth color for estimated country surplus MW,
- emoji logos for energy profile:
  - 💧 hydro
  - 🔥 thermal
  - ☢️ nuclear

Nuclear markers include every country in the maintained nuclear generation list, even if surplus is not highlighted.

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

## Option 2: Netlify (drag-and-drop or Git-connected)

1. In Netlify, click **Add new site → Import an existing project**.
2. Connect GitHub and select this repo.
3. Build settings:
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.`
4. Deploy.

## Option 3: Vercel (Git-connected)

1. In Vercel, click **Add New... → Project**.
2. Import this repository.
3. Framework preset: `Other`.
4. Build command: none.
5. Output directory: `.`
6. Deploy.
