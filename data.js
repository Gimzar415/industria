const dashboardMeta = {
  priceSheetAsOf: '2026-03-01',
  methodologyVersion: 'v2.3'
};

const pricingData = [
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'on-demand', hourly: 4.35, sourceType: 'published', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'monthly', hourly: 3.95, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'yearly', hourly: 3.35, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB200', contract: 'on-demand', hourly: 5.9, sourceType: 'published', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB200', contract: 'monthly', hourly: 5.35, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB200', contract: 'yearly', hourly: 4.8, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  methodologyVersion: 'v2.2'
};

const pricingData = [
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'on-demand', hourly: 4.8, sourceType: 'published', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'monthly', hourly: 4.2, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'yearly', hourly: 3.75, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },

  { provider: 'Lambda', region: 'US', gpu: 'B200', contract: 'on-demand', hourly: 5.35, sourceType: 'published', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'B200', contract: 'monthly', hourly: 4.85, sourceType: 'estimated-discount', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'B200', contract: 'yearly', hourly: 4.35, sourceType: 'estimated-discount', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },

  { provider: 'CoreWeave', region: 'US', gpu: 'B200', contract: 'on-demand', hourly: 5.9, sourceType: 'published', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'B200', contract: 'monthly', hourly: 5.25, sourceType: 'estimated-discount', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'B200', contract: 'yearly', hourly: 4.7, sourceType: 'estimated-discount', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },

  { provider: 'Crusoe', region: 'US', gpu: 'GB200', contract: 'on-demand', hourly: 6.9, sourceType: 'published', sourceUrl: 'https://crusoe.ai', asOf: '2026-03-01' },
  { provider: 'Crusoe', region: 'US', gpu: 'GB200', contract: 'monthly', hourly: 6.2, sourceType: 'estimated-discount', sourceUrl: 'https://crusoe.ai', asOf: '2026-03-01' },
  { provider: 'Crusoe', region: 'US', gpu: 'GB200', contract: 'yearly', hourly: 5.55, sourceType: 'estimated-discount', sourceUrl: 'https://crusoe.ai', asOf: '2026-03-01' },

  { provider: 'OCI', region: 'US', gpu: 'GB200', contract: 'on-demand', hourly: 6.65, sourceType: 'published', sourceUrl: 'https://oracle.com/cloud', asOf: '2026-03-01' },
  { provider: 'OCI', region: 'US', gpu: 'GB200', contract: 'monthly', hourly: 5.95, sourceType: 'estimated-discount', sourceUrl: 'https://oracle.com/cloud', asOf: '2026-03-01' },
  { provider: 'OCI', region: 'US', gpu: 'GB200', contract: 'yearly', hourly: 5.35, sourceType: 'estimated-discount', sourceUrl: 'https://oracle.com/cloud', asOf: '2026-03-01' },

  { provider: 'Fluidstack', region: 'EU', gpu: 'GB200', contract: 'on-demand', hourly: 6.75, sourceType: 'partner-quote', sourceUrl: 'https://fluidstack.io', asOf: '2026-03-01' },
  { provider: 'Fluidstack', region: 'EU', gpu: 'GB200', contract: 'monthly', hourly: 6.0, sourceType: 'partner-quote', sourceUrl: 'https://fluidstack.io', asOf: '2026-03-01' },
  { provider: 'Fluidstack', region: 'EU', gpu: 'GB200', contract: 'yearly', hourly: 5.45, sourceType: 'partner-quote', sourceUrl: 'https://fluidstack.io', asOf: '2026-03-01' },

  { provider: 'Lambda', region: 'US', gpu: 'Vera Rubin', contract: 'on-demand', hourly: 9.2, sourceType: 'forecast', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'Vera Rubin', contract: 'monthly', hourly: 8.1, sourceType: 'forecast', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'Vera Rubin', contract: 'yearly', hourly: 7.3, sourceType: 'forecast', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },

  { provider: 'CoreWeave', region: 'US', gpu: 'Vera Rubin', contract: 'on-demand', hourly: 9.6, sourceType: 'forecast', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'Vera Rubin', contract: 'monthly', hourly: 8.45, sourceType: 'forecast', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'Vera Rubin', contract: 'yearly', hourly: 7.55, sourceType: 'forecast', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' }
];

const quarterlyOutlookData = {
  B200: { labels: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4'], rates: [6.6, 6.3, 6.15, 6.2, 6.6, 7.15, 7.7, 8.1] },
  GB200: { labels: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4'], rates: [8.15, 7.9, 7.8, 7.9, 8.3, 8.85, 9.4, 9.95] },
  'Vera Rubin': { labels: ['2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'], rates: [10.2, 10.8, 11.3, 11.0, 10.7] }
};

const energyCountryData = [
  { country: 'Canada', iso3: 'CAN', surplusMw: 25000, costMwh: 62, hydro: true, thermal: true, nuclear: true, lat: 56.1, lon: -106.3 },
  { country: 'Norway', iso3: 'NOR', surplusMw: 18000, costMwh: 45, hydro: true, thermal: false, nuclear: false, lat: 60.5, lon: 8.5 },
  { country: 'Paraguay', iso3: 'PRY', surplusMw: 9000, costMwh: 43, hydro: true, thermal: true, nuclear: false, lat: -23.4, lon: -58.4 },
  { country: 'Brazil', iso3: 'BRA', surplusMw: 21000, costMwh: 58, hydro: true, thermal: true, nuclear: true, lat: -14.2, lon: -51.9 },
  { country: 'United States', iso3: 'USA', surplusMw: 30000, costMwh: 73, hydro: true, thermal: true, nuclear: true, lat: 39.8, lon: -98.5 },
  { country: 'France', iso3: 'FRA', surplusMw: 2500, costMwh: 81, hydro: true, thermal: true, nuclear: true, lat: 46.2, lon: 2.2 },
  { country: 'United Arab Emirates', iso3: 'ARE', surplusMw: 23000, costMwh: 60, hydro: false, thermal: true, nuclear: true, lat: 24.3, lon: 54.3 },
  { country: 'Saudi Arabia', iso3: 'SAU', surplusMw: 35000, costMwh: 52, hydro: false, thermal: true, nuclear: false, lat: 23.8, lon: 45.1 },
  { country: 'Qatar', iso3: 'QAT', surplusMw: 22000, costMwh: 55, hydro: false, thermal: true, nuclear: false, lat: 25.3, lon: 51.2 },
  { country: 'Australia', iso3: 'AUS', surplusMw: 19000, costMwh: 70, hydro: true, thermal: true, nuclear: false, lat: -25.3, lon: 133.8 }
const forecastScenarios = {
  easing: {
    label: 'Supply Easing (prices drift down)',
    description: 'Legacy assumption where capacity ramps faster than demand growth.',
    series: {
      B200: { labels: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1'], rates: [6.6, 6.05, 5.55, 5.15, 4.85] },
      GB200: { labels: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1'], rates: [8.15, 7.6, 7.15, 6.85, 6.45] },
      'Vera Rubin': { labels: ['2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'], rates: [10.2, 9.75, 9.2, 8.7, 8.2] }
    }
  },
  memory_shortage_2026: {
    label: 'Memory Shortage 2026 (+~40%)',
    description: 'SemiAnalysis-style upside case where HBM/memory constraints tighten rental supply and push prices up through 2026.',
    series: {
      B200: { labels: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4'], rates: [6.6, 6.3, 6.15, 6.2, 6.6, 7.15, 7.7, 8.1] },
      GB200: { labels: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4'], rates: [8.15, 7.9, 7.8, 7.9, 8.3, 8.85, 9.4, 9.95] },
      'Vera Rubin': { labels: ['2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'], rates: [10.2, 10.8, 11.3, 11.0, 10.7] }
    }
  }
};

const energyExporterData = [
  { country: 'Canada', iso3: 'CAN', surplusMw: 25000, costMwh: 62 },
  { country: 'Norway', iso3: 'NOR', surplusMw: 18000, costMwh: 45 },
  { country: 'Qatar', iso3: 'QAT', surplusMw: 22000, costMwh: 55 },
  { country: 'United States', iso3: 'USA', surplusMw: 30000, costMwh: 73 },
  { country: 'Australia', iso3: 'AUS', surplusMw: 19000, costMwh: 70 },
  { country: 'Brazil', iso3: 'BRA', surplusMw: 21000, costMwh: 58 },
  { country: 'United Arab Emirates', iso3: 'ARE', surplusMw: 23000, costMwh: 60 },
  { country: 'Saudi Arabia', iso3: 'SAU', surplusMw: 35000, costMwh: 52 },
  { country: 'Kuwait', iso3: 'KWT', surplusMw: 14000, costMwh: 57 },
  { country: 'Kazakhstan', iso3: 'KAZ', surplusMw: 12000, costMwh: 49 }
];

const strategicKpis = [
  { title: 'Gross Margin by GPU Generation', description: 'Track gross margin contribution per GPU-hour for B200/GB200/Vera Rubin after power, networking, and financing.' },
  { title: 'Capacity Utilization Heatmap', description: 'Measure sold vs idle capacity by region and contract length to optimize yield management.' },
  { title: 'Lead-to-Deployment Cycle Time', description: 'Monitor how quickly new power and rack inventory converts into billable GPU-hours.' },
  { title: 'Power Pass-through Exposure', description: 'Quantify % of contracts with indexed electricity pricing versus fixed bundled pricing.' },
  { title: 'Price Elasticity by Segment', description: 'Estimate demand shift when lowering on-demand price by 5–10% in startup vs enterprise cohorts.' },
  { title: 'Quarterly Depreciation Coverage', description: 'Compare realized revenue per GPU-hour versus depreciation + cost of capital runway.' }
];
