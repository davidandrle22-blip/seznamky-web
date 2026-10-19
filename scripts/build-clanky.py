#!/usr/bin/env python3
"""Sestaví data/clanky.json z markdown souborů v content/clanky/*.md (frontmatter + tělo).
Zkontroluje interní odkazy na /clanky/, /seznamky/ a /kategorie/."""
import json, re, sys, pathlib, math

root = pathlib.Path(__file__).resolve().parent.parent
src = root / 'content' / 'clanky'
produkty = {p['slug'] for p in json.load(open(root / 'data' / 'produkty.json')) if p['isActive']}
kategorie = {k['slug'] for k in json.load(open(root / 'data' / 'kategorie.json'))}

articles = []
for f in sorted(src.glob('*.md')):
    text = f.read_text(encoding='utf-8')
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    if not m:
        sys.exit(f'Chybí frontmatter: {f.name}')
    meta = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(':')
        meta[k.strip()] = v.strip()
    body = m.group(2).strip()
    words = len(re.findall(r'\w+', body))
    slug = f.stem
    articles.append({
        'id': slug,
        'slug': slug,
        'title': meta['title'],
        'metaTitle': meta.get('metaTitle') or meta['title'],
        'excerpt': meta['excerpt'],
        'content': body,
        'image': meta.get('image', '/images/blog/vyber-seznamky.jpg'),
        'category': meta['category'],
        'author': 'Redakce Seznamky.info',
        'createdAt': meta['createdAt'],
        'updatedAt': meta.get('updatedAt', meta['createdAt']),
        'readTime': max(3, math.ceil(words / 200)),
        'isPublished': True,
        'isFeatured': meta.get('featured') == 'true',
        'tags': [t.strip() for t in meta.get('tags', '').split(',') if t.strip()],
        'relatedProducts': [t.strip() for t in meta.get('relatedProducts', '').split(',') if t.strip()],
        '_words': words,
    })

slugs = {a['slug'] for a in articles}
errors = []
for a in articles:
    for link in re.findall(r'\]\((/[^)\s]+)\)', a['content']):
        path = link.split('#')[0]
        parts = path.strip('/').split('/')
        if parts[0] == 'clanky' and len(parts) == 2 and parts[1] not in slugs:
            errors.append(f'{a["slug"]}: neexistující článek {link}')
        elif parts[0] == 'seznamky' and len(parts) == 2 and parts[1] not in produkty:
            errors.append(f'{a["slug"]}: neexistující/neaktivní recenze {link}')
        elif parts[0] == 'kategorie' and len(parts) == 2 and parts[1] not in kategorie:
            errors.append(f'{a["slug"]}: neexistující kategorie {link}')
    for p in a['relatedProducts']:
        if p not in produkty:
            errors.append(f'{a["slug"]}: relatedProducts obsahuje neaktivní {p}')

if errors:
    print('\n'.join(errors))
    sys.exit(1)

total = sum(a['_words'] for a in articles)
for a in articles:
    a.pop('_words')
articles.sort(key=lambda a: a['createdAt'], reverse=True)
json.dump(articles, open(root / 'data' / 'clanky.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(f'OK: {len(articles)} článků, {total} slov celkem')
