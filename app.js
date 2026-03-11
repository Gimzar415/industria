let digestItems = [];

const root = document.getElementById('digestRoot');
const fallback = document.getElementById('fallback');
const dateEl = document.getElementById('displayDate');
const updatedEl = document.getElementById('generatedAt');
const sourceFilter = document.getElementById('sourceFilter');
const tagFilter = document.getElementById('tagFilter');
const searchBox = document.getElementById('searchBox');

function formatDate(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

function cardTemplate(item) {
  const tags = item.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
  return `<article class="story-card">
    <div class="story-top">
      <span class="rank">#${item.rank}</span>
      <a class="headline" target="_blank" rel="noreferrer" href="${item.url}">${item.headline}</a>
    </div>
    <p class="meta">${item.source} · ${formatDate(item.published_at)} · score ${item.score.toFixed(1)}</p>
    <p class="summary">${item.summary}</p>
    <div class="tags">${tags}</div>
    ${item.why_it_matters ? `<details><summary>Why it matters</summary><p>${item.why_it_matters}</p></details>` : ''}
  </article>`;
}

function repopulateFilters(items) {
  const sources = [...new Set(items.map((x) => x.source))].sort();
  const tags = [...new Set(items.flatMap((x) => x.tags))].sort();
  sourceFilter.innerHTML = '<option value="all">All sources</option>' + sources.map((s) => `<option value="${s}">${s}</option>`).join('');
  tagFilter.innerHTML = '<option value="all">All tags</option>' + tags.map((t) => `<option value="${t}">${t}</option>`).join('');
}

function filteredItems() {
  const source = sourceFilter.value;
  const tag = tagFilter.value;
  const q = searchBox.value.toLowerCase().trim();
  return digestItems.filter((item) => {
    const sourceMatch = source === 'all' || item.source === source;
    const tagMatch = tag === 'all' || item.tags.includes(tag);
    const text = `${item.headline} ${item.summary} ${item.why_it_matters || ''}`.toLowerCase();
    const searchMatch = !q || text.includes(q);
    return sourceMatch && tagMatch && searchMatch;
  });
}

function render() {
  const items = filteredItems().sort((a, b) => a.rank - b.rank);
  root.innerHTML = items.map(cardTemplate).join('');
}

async function init() {
  try {
    const data = await fetch('data/digest.json', { cache: 'no-store' }).then((r) => r.json());
    if (!data?.items || !Array.isArray(data.items)) throw new Error('Invalid digest.json');
    digestItems = data.items.slice(0, 20);
    dateEl.textContent = `— ${data.display_date || ''}`;
    updatedEl.textContent = formatDate(data.generated_at || '');
    repopulateFilters(digestItems);
    render();
  } catch (err) {
    console.error(err);
    fallback.hidden = false;
    root.innerHTML = '';
  }
}

[sourceFilter, tagFilter, searchBox].forEach((el) => el.addEventListener('input', render));
init();
