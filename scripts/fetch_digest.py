#!/usr/bin/env python3
from __future__ import annotations

import datetime as dt
import json
import logging
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / 'data' / 'digest.json'
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

KEYWORDS = ['neocloud', 'nvidia', 'coreweave', 'nebius', 'lamda', 'lambda']
QUERIES = [
    'neocloud nvidia coreweave nebius lamda',
    'nvidia blackwell neocloud',
    'coreweave nebius lambda gpu cloud',
    'ai datacenter neocloud financing',
]


def http_get(url: str) -> str | None:
    req = urllib.request.Request(url, headers={'User-Agent': 'gpu-digest-bot/3.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as exc:
        logging.warning('Fetch failed for %s (%s)', url, exc)
        return None


def clean(text: str | None) -> str:
    return re.sub(r'\s+', ' ', (text or '').strip())


def parse_date(raw: str | None) -> dt.datetime:
    if not raw:
        return dt.datetime.now(dt.timezone.utc)
    raw = raw.replace('Z', '+00:00')
    for fmt in (
        '%a, %d %b %Y %H:%M:%S %z',
        '%Y-%m-%dT%H:%M:%S%z',
        '%Y-%m-%dT%H:%M:%S.%f%z',
    ):
        try:
            return dt.datetime.strptime(raw, fmt).astimezone(dt.timezone.utc)
        except ValueError:
            continue
    try:
        return dt.datetime.fromisoformat(raw).astimezone(dt.timezone.utc)
    except Exception:
        return dt.datetime.now(dt.timezone.utc)


def unwrap_google_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    if 'news.google.com' not in parsed.netloc:
        return url
    query = urllib.parse.parse_qs(parsed.query)
    if 'url' in query and query['url']:
        return query['url'][0]
    return url


def keyword_hits(text: str) -> int:
    text = text.lower()
    return sum(1 for kw in KEYWORDS if kw in text)


def build_google_news_url(query: str) -> str:
    encoded = urllib.parse.quote_plus(query)
    return f'https://news.google.com/rss/search?q={encoded}+when:1d&hl=en-US&gl=US&ceid=US:en'


def parse_feed(xml_text: str, query: str) -> List[Dict]:
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return []

    now = dt.datetime.now(dt.timezone.utc)
    items: List[Dict] = []

    # RSS items
    for item in root.findall('.//item'):
        title = clean(item.findtext('title'))
        link = clean(item.findtext('link'))
        pub_raw = clean(item.findtext('pubDate') or item.findtext('published') or item.findtext('updated'))
        source = clean(item.findtext('source')) or 'Google News'
        desc = clean(item.findtext('description'))
        if not title or not link:
            continue
        published = parse_date(pub_raw)
        if now - published > dt.timedelta(days=2):
            continue

        link = unwrap_google_url(link)
        text_blob = f'{title} {desc}'
        hits = keyword_hits(text_blob)
        if hits == 0:
            continue

        score = round(65 + min(30, hits * 8), 1)
        items.append({
            'headline': title,
            'source': source,
            'url': link,
            'published_at': published.isoformat(),
            'summary': desc[:220] if desc else f'Story pulled from daily web search query: {query}',
            'why_it_matters': 'Impacts GPU cloud competition, AI infrastructure supply, or neocloud capacity/pricing dynamics.',
            'tags': ['AI Infra', 'Neocloud', 'GPU'],
            'score': score,
            'dedupe_key': re.sub(r'[^a-z0-9]+', ' ', title.lower()).strip(),
        })

    return items


def load_previous_items() -> List[Dict]:
    if not OUTPUT_PATH.exists():
        return []
    try:
        prior = json.loads(OUTPUT_PATH.read_text(encoding='utf-8'))
        return prior.get('items', []) if isinstance(prior, dict) else []
    except Exception:
        return []


def build_digest() -> Dict:
    gathered: List[Dict] = []
    for query in QUERIES:
        feed_url = build_google_news_url(query)
        xml_text = http_get(feed_url)
        if not xml_text:
            continue
        gathered.extend(parse_feed(xml_text, query))

    deduped: Dict[str, Dict] = {}
    for row in gathered:
        key = row['dedupe_key']
        existing = deduped.get(key)
        if not existing or row['score'] > existing['score']:
            deduped[key] = row

    top_items = sorted(deduped.values(), key=lambda x: x['score'], reverse=True)[:10]
    if not top_items:
        logging.warning('No new items found; preserving previous digest items if available.')
        top_items = load_previous_items()[:10]

    now = dt.datetime.now(dt.timezone.utc)
    display_date = now.strftime('%Y-%m-%d')
    methodology = 'Daily web search pull via Google News RSS queries focused on neocloud/nvidia/coreweave/nebius/lamda keywords; dedupe by headline; rank by keyword hit score.'
    return {
        # Backward-compatible fields to reduce merge/consumer conflicts
        'generated_at': now.isoformat(),
        'display_date': display_date,
        # New metadata fields
        'as_of_utc': now.isoformat(),
        'methodology': methodology,
        'items': top_items,
    }


def main() -> int:
    payload = build_digest()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2) + '\n', encoding='utf-8')
    logging.info('Wrote %d digest items to %s', len(payload.get('items', [])), OUTPUT_PATH)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
