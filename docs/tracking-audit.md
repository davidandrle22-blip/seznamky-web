# Tracking Audit Report

## Datum: 2026-01-29

## Affiliate Tracking Komponenta

Všechny CTA odkazy využívají centrální `AffiliateLink` komponentu (`components/AffiliateLink.tsx`).

### Implementované funkce:
- ✅ Server-side tracking přes `/api/affiliate/[slug]`
- ✅ Client-side backup tracking přes `/api/affiliate/track`
- ✅ GA4/GTM dataLayer events (`affiliate_click`)
- ✅ SEO atributy: `rel="sponsored nofollow noopener noreferrer"`
- ✅ `target="_blank"` pro externí odkazy

### Komponenty využívající AffiliateLink:
- `components/ComparisonTable.tsx` - srovnávací tabulky
- `components/CategoryQuickTable.tsx` - rychlé přehledy kategorií
- `components/ProductCard.tsx` - karty produktů
- `components/HomepageAffiliateLinks.tsx` - homepage CTA
- `components/CategoryAffiliateLinks.tsx` - category CTA
- `components/DetailAffiliateLinks.tsx` - detail pages CTA

## Deaktivované seznamky (chybějící logo)

| Seznamka | Důvod |
|----------|-------|
| Be2 | Chybí soubor `/images/seznamky/be2.png` |
| Rich Meet Beautiful | Chybí soubor `/images/seznamky/rich-meet-beautiful.png` |

## Změněné soubory

1. `app/provozovatel/page.tsx` - NOVÝ (stránka provozovatele)
2. `components/Footer.tsx` - přidán odkaz na provozovatele
3. `data/produkty.json` - deaktivovány Be2 a Rich Meet Beautiful

## Testování

```bash
# Lokální testování
npm run dev

# URL k otestování:
# - http://localhost:3000/provozovatel
# - http://localhost:3000/seznamky
# - http://localhost:3000/kategorie/nejlepsi-seznamky
```
