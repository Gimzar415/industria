const dashboardMeta = {
  priceSheetAsOf: '2026-03-01',
  methodologyVersion: 'v2.4'
};

const pricingData = [
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'on-demand', hourly: 4.35, sourceType: 'published', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'monthly', hourly: 3.95, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'B200', contract: 'yearly', hourly: 3.35, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB200', contract: 'on-demand', hourly: 5.9, sourceType: 'published', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB200', contract: 'monthly', hourly: 5.35, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB200', contract: 'yearly', hourly: 4.8, sourceType: 'estimated-discount', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB300', contract: 'on-demand', hourly: 7.45, sourceType: 'forecast', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB300', contract: 'monthly', hourly: 6.7, sourceType: 'forecast', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },
  { provider: 'Nebius', region: 'EU', gpu: 'GB300', contract: 'yearly', hourly: 6.1, sourceType: 'forecast', sourceUrl: 'https://nebius.com', asOf: '2026-03-01' },

  { provider: 'Lambda', region: 'US', gpu: 'B200', contract: 'on-demand', hourly: 5.35, sourceType: 'published', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'B200', contract: 'monthly', hourly: 4.85, sourceType: 'estimated-discount', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'B200', contract: 'yearly', hourly: 4.35, sourceType: 'estimated-discount', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'GB300', contract: 'on-demand', hourly: 7.95, sourceType: 'forecast', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'GB300', contract: 'monthly', hourly: 7.1, sourceType: 'forecast', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },
  { provider: 'Lambda', region: 'US', gpu: 'GB300', contract: 'yearly', hourly: 6.45, sourceType: 'forecast', sourceUrl: 'https://lambdalabs.com', asOf: '2026-03-01' },

  { provider: 'CoreWeave', region: 'US', gpu: 'B200', contract: 'on-demand', hourly: 5.9, sourceType: 'published', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'B200', contract: 'monthly', hourly: 5.25, sourceType: 'estimated-discount', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'B200', contract: 'yearly', hourly: 4.7, sourceType: 'estimated-discount', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'GB300', contract: 'on-demand', hourly: 8.25, sourceType: 'forecast', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'GB300', contract: 'monthly', hourly: 7.35, sourceType: 'forecast', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },
  { provider: 'CoreWeave', region: 'US', gpu: 'GB300', contract: 'yearly', hourly: 6.7, sourceType: 'forecast', sourceUrl: 'https://coreweave.com', asOf: '2026-03-01' },

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
  GB300: { labels: ['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1'], rates: [8.2, 8.7, 9.1, 9.4, 9.0] },
  'Vera Rubin': { labels: ['2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'], rates: [10.2, 10.8, 11.3, 11.0, 10.7] }
};

const energyCountryData = [
  { country: 'Canada', iso3: 'CAN', surplusMw: 25000, costMwh: 62, hydro: true, thermal: true, lat: 56.1, lon: -106.3 },
  { country: 'Norway', iso3: 'NOR', surplusMw: 18000, costMwh: 45, hydro: true, thermal: false, lat: 60.5, lon: 8.5 },
  { country: 'Paraguay', iso3: 'PRY', surplusMw: 9000, costMwh: 43, hydro: true, thermal: true, lat: -23.4, lon: -58.4 },
  { country: 'Brazil', iso3: 'BRA', surplusMw: 21000, costMwh: 58, hydro: true, thermal: true, lat: -14.2, lon: -51.9 },
  { country: 'United States', iso3: 'USA', surplusMw: 30000, costMwh: 73, hydro: true, thermal: true, lat: 39.8, lon: -98.5 },
  { country: 'France', iso3: 'FRA', surplusMw: 2500, costMwh: 81, hydro: true, thermal: true, lat: 46.2, lon: 2.2 },
  { country: 'United Arab Emirates', iso3: 'ARE', surplusMw: 23000, costMwh: 60, hydro: false, thermal: true, lat: 24.3, lon: 54.3 },
  { country: 'Saudi Arabia', iso3: 'SAU', surplusMw: 35000, costMwh: 52, hydro: false, thermal: true, lat: 23.8, lon: 45.1 },
  { country: 'Qatar', iso3: 'QAT', surplusMw: 22000, costMwh: 55, hydro: false, thermal: true, lat: 25.3, lon: 51.2 },
  { country: 'Australia', iso3: 'AUS', surplusMw: 19000, costMwh: 70, hydro: true, thermal: true, lat: -25.3, lon: 133.8 }
];

const nuclearPowerCountries = [
  { country: 'Argentina', iso3: 'ARG', lat: -38.4, lon: -63.6 },
  { country: 'Armenia', iso3: 'ARM', lat: 40.1, lon: 44.5 },
  { country: 'Belarus', iso3: 'BLR', lat: 53.7, lon: 27.9 },
  { country: 'Belgium', iso3: 'BEL', lat: 50.8, lon: 4.5 },
  { country: 'Brazil', iso3: 'BRA', lat: -14.2, lon: -51.9 },
  { country: 'Bulgaria', iso3: 'BGR', lat: 42.7, lon: 25.5 },
  { country: 'Canada', iso3: 'CAN', lat: 56.1, lon: -106.3 },
  { country: 'China', iso3: 'CHN', lat: 35.8, lon: 104.2 },
  { country: 'Czech Republic', iso3: 'CZE', lat: 49.8, lon: 15.5 },
  { country: 'Finland', iso3: 'FIN', lat: 64.5, lon: 26.0 },
  { country: 'France', iso3: 'FRA', lat: 46.2, lon: 2.2 },
  { country: 'Hungary', iso3: 'HUN', lat: 47.1, lon: 19.3 },
  { country: 'India', iso3: 'IND', lat: 22.8, lon: 79.0 },
  { country: 'Iran', iso3: 'IRN', lat: 32.4, lon: 53.7 },
  { country: 'Japan', iso3: 'JPN', lat: 36.2, lon: 138.2 },
  { country: 'Mexico', iso3: 'MEX', lat: 23.6, lon: -102.5 },
  { country: 'Netherlands', iso3: 'NLD', lat: 52.1, lon: 5.3 },
  { country: 'Pakistan', iso3: 'PAK', lat: 30.4, lon: 69.3 },
  { country: 'Romania', iso3: 'ROU', lat: 45.9, lon: 24.9 },
  { country: 'Russia', iso3: 'RUS', lat: 61.5, lon: 105.3 },
  { country: 'Slovakia', iso3: 'SVK', lat: 48.7, lon: 19.7 },
  { country: 'Slovenia', iso3: 'SVN', lat: 46.1, lon: 14.9 },
  { country: 'South Africa', iso3: 'ZAF', lat: -30.6, lon: 22.9 },
  { country: 'South Korea', iso3: 'KOR', lat: 36.5, lon: 127.9 },
  { country: 'Spain', iso3: 'ESP', lat: 40.2, lon: -3.7 },
  { country: 'Sweden', iso3: 'SWE', lat: 62.1, lon: 15.2 },
  { country: 'Switzerland', iso3: 'CHE', lat: 46.8, lon: 8.2 },
  { country: 'Taiwan', iso3: 'TWN', lat: 23.7, lon: 121.0 },
  { country: 'Ukraine', iso3: 'UKR', lat: 48.4, lon: 31.2 },
  { country: 'United Arab Emirates', iso3: 'ARE', lat: 24.3, lon: 54.3 },
  { country: 'United Kingdom', iso3: 'GBR', lat: 55.4, lon: -3.4 },
  { country: 'United States', iso3: 'USA', lat: 39.8, lon: -98.5 }
];

const strategicKpis = [
  { title: 'Gross Margin by GPU Generation', description: 'Track gross margin contribution per GPU-hour for B200/GB200/GB300/Vera Rubin after power, networking, and financing.' },
  { title: 'Capacity Utilization Heatmap', description: 'Measure sold vs idle capacity by region and contract length to optimize yield management.' },
  { title: 'Lead-to-Deployment Cycle Time', description: 'Monitor how quickly new power and rack inventory converts into billable GPU-hours.' },
  { title: 'Power Pass-through Exposure', description: 'Quantify % of contracts with indexed electricity pricing versus fixed bundled pricing.' },
  { title: 'Price Elasticity by Segment', description: 'Estimate demand shift when lowering on-demand price by 5–10% in startup vs enterprise cohorts.' },
  { title: 'Quarterly Depreciation Coverage', description: 'Compare realized revenue per GPU-hour versus depreciation + cost of capital runway.' }
];

const neocloudTracker = [
  { name: 'CoreWeave', url: 'https://www.coreweave.com', capitalRaised: '$12.2B+', currentMw: '360', plannedMw: '+750', asOf: '2026-03' },
  { name: 'Crusoe', url: 'https://www.crusoe.ai', capitalRaised: '$1.6B+', currentMw: '120', plannedMw: '+300', asOf: '2026-03' },
  { name: 'Firmus', url: 'https://www.firmus.com', capitalRaised: 'Undisclosed', currentMw: '40', plannedMw: '+110', asOf: '2026-03' },
  { name: 'Foxconn', url: 'https://www.foxconn.com', capitalRaised: 'Corporate balance sheet', currentMw: '95', plannedMw: '+220', asOf: '2026-03' },
  { name: 'Lambda', url: 'https://lambdalabs.com', capitalRaised: '$900M+', currentMw: '140', plannedMw: '+280', asOf: '2026-03' },
  { name: 'Nebius (Nebius AI)', url: 'https://nebius.com', capitalRaised: '$1.4B+', currentMw: '85', plannedMw: '+260', asOf: '2026-03' },
  { name: 'Nscale', url: 'https://www.nscale.com', capitalRaised: '$250M+', currentMw: '60', plannedMw: '+180', asOf: '2026-03' },
  { name: 'Together AI', url: 'https://www.together.ai', capitalRaised: '$530M+', currentMw: '70', plannedMw: '+150', asOf: '2026-03' }
];
