let priceComparisonChart;
let contractCurveChart;
let declineChart;

const gpuFilter = document.getElementById('gpuFilter');
const contractFilter = document.getElementById('contractFilter');
const regionFilter = document.getElementById('regionFilter');

function uniqueValues(data, key) {
  return [...new Set(data.map((item) => item[key]))];
}

function populateFilters() {
  const gpus = uniqueValues(pricingData, 'gpu');
  const regions = uniqueValues(pricingData, 'region');

  gpuFilter.innerHTML = gpus.map((gpu) => `<option value="${gpu}">${gpu}</option>`).join('');
  gpuFilter.value = gpus.includes('B200') ? 'B200' : gpus[0];
  regionFilter.innerHTML =
    '<option value="all">All regions</option>' + regions.map((region) => `<option value="${region}">${region}</option>`).join('');
}

function filteredPricing() {
  return pricingData.filter((row) => {
    const matchesGpu = gpuFilter.value === 'all' || row.gpu === gpuFilter.value;
    const matchesContract = contractFilter.value === 'all' || row.contract === contractFilter.value;
    const matchesRegion = regionFilter.value === 'all' || row.region === regionFilter.value;
    return matchesGpu && matchesContract && matchesRegion;
  });
}

function renderPriceComparison() {
  const data = filteredPricing();
  const labels = data.map((d) => `${d.provider} · ${d.gpu} · ${d.contract}`);
  const rates = data.map((d) => d.hourly);

  if (priceComparisonChart) priceComparisonChart.destroy();
  priceComparisonChart = new Chart(document.getElementById('priceComparisonChart'), {
    type: 'bar',
    data: { labels, datasets: [{ label: '$/GPU-hour', data: rates, backgroundColor: '#54b2ff' }] },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#eaf0ff' } } },
      scales: { x: { ticks: { color: '#c7d3f7' } }, y: { ticks: { color: '#c7d3f7' } } }
    }
  });
}

function renderContractCurve() {
  const data = filteredPricing();
  const providers = uniqueValues(data, 'provider');
  const contracts = ['on-demand', 'monthly', 'yearly'];

  const datasets = providers.map((provider, idx) => ({
    label: provider,
    data: contracts.map((contract) => {
      const found = data.find((row) => row.provider === provider && row.contract === contract);
      return found ? found.hourly : null;
    }),
    borderColor: ['#76f8cc', '#54b2ff', '#f7c873', '#e983ff', '#ff6e6e'][idx % 5],
    backgroundColor: 'transparent',
    tension: 0.2
  }));

  if (contractCurveChart) contractCurveChart.destroy();
  contractCurveChart = new Chart(document.getElementById('contractCurveChart'), {
    type: 'line',
    data: { labels: contracts, datasets },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#eaf0ff' } } },
      scales: { x: { ticks: { color: '#c7d3f7' } }, y: { ticks: { color: '#c7d3f7' } } }
    }
  });
}

function renderOutlookChart() {
  const selectedGpu = gpuFilter.value || 'B200';
  const series = quarterlyOutlookData[selectedGpu] || quarterlyOutlookData.B200;

  if (declineChart) declineChart.destroy();
  declineChart = new Chart(document.getElementById('declineChart'), {
    type: 'line',
    data: {
      labels: series.labels,
      datasets: [
        {
          label: `${selectedGpu} market outlook`,
          data: series.rates,
          borderColor: '#76f8cc',
          backgroundColor: '#76f8cc33',
          fill: true,
          tension: 0.25
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#eaf0ff' } } },
      scales: { x: { ticks: { color: '#c7d3f7' } }, y: { ticks: { color: '#c7d3f7' } } }
    }
  });
}

function renderEnergyMap() {
  const exporterChoropleth = {
    type: 'choropleth',
    locations: energyCountryData.map((c) => c.iso3),
    z: energyCountryData.map((c) => c.surplusMw),
    text: energyCountryData.map(
      (c) => `${c.country}<br>Surplus: ${c.surplusMw.toLocaleString()} MW<br>Avg cost: $${c.costMwh}/MWh`
    ),
    colorscale: 'Blues',
    marker: { line: { color: '#12213f', width: 0.8 } },
    colorbar: { title: 'MW surplus' }
  };

  const hydroLogos = {
    type: 'scattergeo',
    mode: 'text',
    lon: energyCountryData.filter((c) => c.hydro).map((c) => c.lon),
    lat: energyCountryData.filter((c) => c.hydro).map((c) => c.lat),
    text: energyCountryData.filter((c) => c.hydro).map(() => '💧'),
    textposition: 'top center',
    name: 'Hydro',
    hovertext: energyCountryData.filter((c) => c.hydro).map((c) => `${c.country} · Hydro`),
    hoverinfo: 'text'
  };

  const thermalLogos = {
    type: 'scattergeo',
    mode: 'text',
    lon: energyCountryData.filter((c) => c.thermal).map((c) => c.lon),
    lat: energyCountryData.filter((c) => c.thermal).map((c) => c.lat),
    text: energyCountryData.filter((c) => c.thermal).map(() => '🔥'),
    textposition: 'middle right',
    name: 'Thermal',
    hovertext: energyCountryData.filter((c) => c.thermal).map((c) => `${c.country} · Thermal`),
    hoverinfo: 'text'
  };

  const nuclearLogos = {
    type: 'scattergeo',
    mode: 'text',
    lon: nuclearPowerCountries.map((c) => c.lon),
    lat: nuclearPowerCountries.map((c) => c.lat),
    text: nuclearPowerCountries.map(() => '☢️'),
    textposition: 'bottom center',
    name: 'Nuclear',
    hovertext: nuclearPowerCountries.map((c) => `${c.country} · Nuclear`),
    hoverinfo: 'text'
  };

  const layout = {
    paper_bgcolor: '#111829',
    plot_bgcolor: '#111829',
    font: { color: '#eaf0ff' },
    margin: { l: 0, r: 0, t: 6, b: 0 },
    geo: {
      projection: { type: 'natural earth' },
      bgcolor: '#111829',
      showframe: false,
      showcoastlines: true,
      coastlinecolor: '#41547f'
    }
  };

  Plotly.newPlot('energyMap', [exporterChoropleth, hydroLogos, thermalLogos, nuclearLogos], layout, {
    responsive: true,
    displayModeBar: false
  });
}

function renderKpis() {
  const kpiRoot = document.getElementById('kpiCards');
  kpiRoot.innerHTML = strategicKpis
    .map((kpi) => `<article class="kpi-card"><h3>${kpi.title}</h3><p>${kpi.description}</p></article>`)
    .join('');
}

function renderSourceTable() {
  const root = document.getElementById('sourceRows');
  const rows = filteredPricing()
    .sort((a, b) => a.provider.localeCompare(b.provider))
    .map(
      (row) => `<tr>
        <td>${row.provider}</td>
        <td>${row.gpu}</td>
        <td>${row.contract}</td>
        <td>$${row.hourly.toFixed(2)}</td>
        <td>${row.sourceType}</td>
        <td><a href="${row.sourceUrl}" target="_blank" rel="noreferrer">source</a></td>
        <td>${row.asOf}</td>
      </tr>`
    )
    .join('');

  root.innerHTML = rows || '<tr><td colspan="7">No records for current filters.</td></tr>';
}

function renderMetadata() {
  document.getElementById('sheetAsOf').textContent = dashboardMeta.priceSheetAsOf;
  document.getElementById('methodologyVersion').textContent = dashboardMeta.methodologyVersion;
}

function refreshCharts() {
  renderPriceComparison();
  renderContractCurve();
  renderOutlookChart();
  renderSourceTable();
}

[gpuFilter, contractFilter, regionFilter].forEach((el) => {
  el.addEventListener('change', refreshCharts);
});

populateFilters();
renderMetadata();
renderKpis();
refreshCharts();
renderEnergyMap();
