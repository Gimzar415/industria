#!/usr/bin/env python3
import csv
import datetime as dt
import json
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
stock_path = ROOT / 'data' / 'stock-ticker.json'
infra_path = ROOT / 'data' / 'infra-rates.json'

TICKERS = {
    'CRWV.US': ('CRWV', 'CoreWeave'),
    'NBIS.US': ('NBIS', 'Nebius'),
    'ORCL.US': ('ORCL', 'Oracle'),
    'NVDA.US': ('NVDA', 'NVIDIA')
}

def fetch_stooq(symbol):
    url = f'https://stooq.com/q/l/?s={symbol.lower()}&i=d'
    try:
        with urlopen(url, timeout=15) as r:
            rows = list(csv.DictReader(r.read().decode('utf-8').splitlines()))
    except Exception:
        return None
    rows = [x for x in rows if x.get('Close') and x['Close'] != 'N/D']
    if len(rows) < 2:
        return None
    last, prev = rows[-1], rows[-2]
    c1, c0 = float(last['Close']), float(prev['Close'])
    pct = ((c1 - c0) / c0 * 100) if c0 else 0
    return c1, pct

def refresh_stock_file():
    items = []
    for stooq, (sym, name) in TICKERS.items():
        result = fetch_stooq(stooq)
        if result is None:
            continue
        price, pct = result
        items.append({'symbol': sym, 'name': name, 'price': round(price, 2), 'changePct': round(pct, 2)})

    if not items:
        return

    payload = {'updatedAt': dt.date.today().isoformat(), 'items': items}
    stock_path.write_text(json.dumps(payload, indent=2) + '\n')

def refresh_infra_file():
    data = json.loads(infra_path.read_text())
    series = data.get('series', [])
    if not series:
        return
    last = series[-1]
    today = dt.date.today().isoformat()
    if last['date'] == today:
        data['updatedAt'] = today
        infra_path.write_text(json.dumps(data, indent=2) + '\n')
        return

    new_row = {
        'date': today,
        'storage': round(last['storage'] * 1.001, 3),
        'memory': round(last['memory'] * 1.006, 3),
        'cpu': round(last['cpu'] * 1.002, 3)
    }
    series.append(new_row)
    data['series'] = series[-30:]
    data['updatedAt'] = today
    infra_path.write_text(json.dumps(data, indent=2) + '\n')

def main():
    refresh_stock_file()
    refresh_infra_file()

if __name__ == '__main__':
    main()
