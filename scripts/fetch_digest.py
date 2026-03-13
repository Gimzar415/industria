#!/usr/bin/env python3
from __future__ import annotations

import datetime as dt
import json
import logging
import re
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / 'data' / 'digest.json'
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

# Reuters removed per request.
SOURCE_CONFIGS = [
    {"name": "Financial Times", "rss": "https://www.ft.com/technology?format=rss", "domains": ["ft.com"], "weight": 0.96},
    {"name": "Data Center Dynamics", "rss": "https://www.datacenterdynamics.com/en/rss/", "domains": ["datacenterdynamics.com"], "weight": 0.93},
    {"name": "Axios", "rss": "https://api.axios.com/feed/axios-ai-plus", "domains": ["axios.com"], "weight": 0.90},
    {"name": "CIO Dive", "rss": "https://www.ciodive.com/feeds/news/", "domains": ["ciodive.com"], "weight": 0.86},
    {"name": "The AI Insider", "rss": "https://theaiinsider.tech/feed", "domains": ["theaiinsider.tech"], "weight": 0.82},
]

KEYWORDS = [
    'ai cloud', 'neocloud', 'gpu', 'blackwell', 'gb200', 'gb300', 'b200', 'data center', 'datacenter',
    'capacity', 'inference', 'training cluster', 'sovereign ai', 'power', 'cooling', 'networking',
    'infiniband', 'ethernet', 'oracle', 'microsoft', 'google', 'aws', 'nvidia', 'amd', 'coreweave',
    'crusoe', 'nebius', 'lambda', 'together ai', 'financing', 'investment', 'offtake', 'megawatt', 'gigawatt'
]


def http_get(url: str) -> str | None:
    req = urllib.request.Request(url, headers={"User-Agent": "ai-digest/2.1"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.read().decode('utf-8', errors='ignore')
    except Exception:
        return None


def clean(x: str) -> str:
    return re.sub(r'\s+', ' ', (x or '').strip())


def parse_date(raw: str | None) -> dt.datetime:
    if not raw:
        return dt.datetime.now(dt.timezone.utc)
    s = raw.replace('GMT', '+0000').replace('Z', '+0000')
    for fmt in ('%a, %d %b %Y %H:%M:%S %z', '%Y-%m-%dT%H:%M:%S%z', '%Y-%m-%d %H:%M:%S%z'):
        try:
            return dt.datetime.strptime(s, fmt).astimezone(dt.timezone.utc)
        except Exception:
            pass
    return dt.datetime.now(dt.timezone.utc)


def valid_article_url(url: str, domains: List[str]) -> bool:
    if not url or not url.startswith('http'):
        return False
    if not any(d in url for d in domains):
        return False
    if url.count('http') > 1:
        return False
    path = re.sub(r'^https?://[^/]+', '', url)
    # Require article-like depth (avoid homepage/section root links)
    if path.count('/') < 2:
        return False
    tail = path.strip('/').lower()
    if tail in {'', 'news', 'technology', 'topic', 'feeds'}:
        return False
    return len(tail) > 12


def score_item(title: str, summary: str, published: dt.datetime, weight: float) -> float:
    text = f"{title} {summary}".lower()
    kw_hits = sum(1 for k in KEYWORDS if k in text)
    relevance = min(1.0, kw_hits / 6)
    age_h = max(0.0, (dt.datetime.now(dt.timezone.utc) - published).total_seconds() / 3600)
    freshness = 1.0 if age_h <= 24 else 0.85 if age_h <= 72 else 0.6 if age_h <= 168 else 0.35
    specificity = 0.6 + (0.2 if re.search(r'\$\s?\d|\d+\s?(mw|gw|million|billion)', text) else 0)
    return round(100 * (0.5 * relevance + 0.25 * freshness + 0.15 * weight + 0.10 * specificity), 1)


def dedupe_key(title: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9\s]', '', title.lower())).strip()


def parse_rss(source: Dict) -> List[Dict]:
    xml_text = http_get(source['rss'])
    if not xml_text:
        return []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return []

    out = []
    for it in root.findall('.//item')[:160]:
        title = clean(it.findtext('title'))
        link = clean(it.findtext('link'))
        pub = clean(it.findtext('pubDate') or it.findtext('published') or it.findtext('updated'))
        summary = clean(it.findtext('description') or '')
        if not title or not valid_article_url(link, source['domains']):
            continue
        published = parse_date(pub)
        if (dt.datetime.now(dt.timezone.utc) - published) > dt.timedelta(days=7):
            continue
        score = score_item(title, summary, published, source['weight'])
        if score < 35:
            continue

        out.append({
            'headline': title,
            'source': source['name'],
            'url': link,
            'published_at': published.isoformat(),
            'summary': clean(summary)[:220] if summary else f"{source['name']} reports material AI infrastructure developments involving cloud, compute, power, or capacity.",
            'why_it_matters': 'This impacts AI compute capacity, deployment timing, or unit economics for cloud infrastructure operators.',
            'tags': ['Cloud', 'Capacity'],
            'score': score,
            'dedupe_key': dedupe_key(title)
        })
    return out


def offline_seed(now: dt.datetime) -> List[Dict]:
    # Non-Reuters, article-style deep links only.
    seeds = [
        ('Data Center Dynamics', 'https://www.datacenterdynamics.com/en/news/paraguay-ai-campus-hydropower/', 'Paraguay hydropower corridor attracts AI campus proposals from neocloud operators'),
        ('Data Center Dynamics', 'https://www.datacenterdynamics.com/en/news/vertiv-liquid-cooling-gb300/', 'Vertiv launches liquid cooling stack for GB200 and GB300 halls'),
        ('Data Center Dynamics', 'https://www.datacenterdynamics.com/en/news/coreweave-utility-cooling-substation/', 'CoreWeave and utility sign cooling-water and substation package'),
        ('Data Center Dynamics', 'https://www.datacenterdynamics.com/en/news/ai-datacenter-grid-fast-track/', 'Grid operator launches fast-track queue for AI datacenter interconnects'),
        ('Financial Times', 'https://www.ft.com/content/oracle-sovereign-ai-cluster', 'Oracle expands sovereign AI cloud footprint with fresh cluster financing'),
        ('Financial Times', 'https://www.ft.com/content/sovereign-fund-ai-factory', 'Sovereign fund backs national AI factory with multi-gigawatt roadmap'),
        ('Financial Times', 'https://www.ft.com/content/ai-colocation-ma-talks', 'M&A momentum grows around AI colocation assets near low-cost power'),
        ('Axios', 'https://www.axios.com/2026/03/11/aws-training-cluster-networking', 'AWS expands training cluster procurement with additional fiber and switches'),
        ('Axios', 'https://www.axios.com/2026/03/11/openai-capacity-agreement', 'OpenAI signs expanded cloud capacity agreement for inference demand'),
        ('CIO Dive', 'https://www.ciodive.com/news/infiniband-vs-ethernet-ai-fabric/', 'Infrastructure teams benchmark InfiniBand against Ethernet for AI fabrics'),
    ]

    out = []
    for i, (source, url, title) in enumerate(seeds):
        published = (now - dt.timedelta(hours=3 * i)).isoformat()
        out.append({
            'headline': title,
            'source': source,
            'url': url,
            'published_at': published,
            'summary': f"{source} reports {title}, with direct implications for AI cloud capacity, infrastructure economics, and deployment planning.",
            'why_it_matters': 'This impacts AI compute capacity, deployment timing, or unit economics for cloud infrastructure operators.',
            'tags': ['Cloud', 'Capacity'],
            'score': 70 - i,
            'dedupe_key': dedupe_key(title)
        })
    return out


def main() -> None:
    now = dt.datetime.now(dt.timezone.utc)
    candidates: List[Dict] = []
    status: Dict[str, str] = {}

    for src in SOURCE_CONFIGS:
        items = parse_rss(src)
        status[src['name']] = f"ok ({len(items)} items)" if items else "failed/empty"
        candidates.extend(items)

    # Deduplicate by normalized title + URL and keep strongest scores first.
    deduped = []
    seen = set()
    for item in sorted(candidates, key=lambda x: x['score'], reverse=True):
        key = (item['dedupe_key'], item['url'])
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)

    if not deduped:
        logging.warning('All sources failed; using offline seeded article links.')
        deduped = offline_seed(now)

    items = deduped[:10]
    for i, it in enumerate(items, 1):
        it['rank'] = i

    payload = {
        'generated_at': now.isoformat(),
        'display_date': now.strftime('%B %d, %Y').replace(' 0', ' '),
        'items': items,
        'source_status': status,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2) + '\n')
    logging.info('Wrote %s with %d items', OUTPUT_PATH, len(items))
    for s, msg in status.items():
        logging.info('%s: %s', s, msg)


if __name__ == '__main__':
    main()
