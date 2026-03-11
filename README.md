# Inudstria x Tokenomics Global Dashboard

A lightweight static dashboard for tracking neocloud GPU prices (B200, GB200, GB300, Vera Rubin), contract curves, daily infra-rate snapshots, and energy-market context.

## Run locally

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.

## New live datasets

- `data/infra-rates.json`: daily storage/memory/CPU input-rate snapshots for AI datacenter planning.
- `data/stock-ticker.json`: daily stock ticker values for CoreWeave, Nebius, Oracle, NVIDIA.

## Automated refresh cadence

This repo now includes `.github/workflows/refresh-market-data.yml`:
- **Daily** refresh of stock ticker JSON.
- **Daily** roll-forward of infra-rate time series.

### Weekly GPU price refresh policy (Nebius / Lambda / CoreWeave)

To keep GPU hourly rental prices current when providers change list sheets:
1. Review provider pages weekly.
2. Update `pricingData` rows in `data.js` for B200/GB200/GB300.
3. Bump `dashboardMeta.priceSheetAsOf` date.
4. Commit and redeploy.

(If you want fully automated scraping, we can add provider-specific parsers in a next step once exact pricing URLs/DOM patterns are finalized.)

## Energy map notes

- Choropleth color = estimated power surplus MW.
- Logos:
  - 💧 hydro
  - 🔥 thermal
  - ☢️ nuclear
- Nuclear markers include countries from the maintained nuclear list (`nuclearPowerCountries`).

## How to publish

Use GitHub Pages, Netlify, or Vercel as described in prior instructions. This remains a static site.
