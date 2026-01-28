# Lead Magnet System - Dokumentace

## Přehled

Kompletní systém pro sběr e-mailů za odměnu (e-book). Uživatel zadá email → přijde mu email s odkazem na stažení → může si stáhnout e-book.

## Architektura

```
Uživatel vyplní formulář
        ↓
/api/lead-magnet (POST)
  - Rate limit (5/IP/hodina)
  - Honeypot check
  - Validace emailu
  - Uložení do JSON DB
        ↓
Resend API
  - Odeslání HTML emailu
  - Obsahuje secure download link
        ↓
/api/download/ebook?token=...
  - Ověření HMAC tokenu
  - Kontrola expirace (72h)
  - Vrácení PDF souboru
```

## Soubory

### Nové soubory

| Soubor | Účel |
|--------|------|
| `lib/leads.ts` | Databáze leadů (CRUD operace, statistiky, export) |
| `lib/email.ts` | Resend integrace, HTML email template |
| `lib/download-token.ts` | HMAC token generování/verifikace |
| `lib/rate-limit.ts` | In-memory rate limiter |
| `hooks/useAnalytics.ts` | Analytics tracking hook |
| `components/LeadMagnet.tsx` | UI komponenta (3 varianty) |
| `app/api/lead-magnet/route.ts` | API endpoint pro submit |
| `app/api/download/ebook/route.ts` | Secure download endpoint |
| `app/api/admin/leads/route.ts` | Admin API pro správu leadů |
| `app/admin/leads/page.tsx` | Admin dashboard pro leady |
| `data/leads.json` | Databáze leadů |

### Upravené soubory

| Soubor | Změna |
|--------|-------|
| `app/admin/layout.tsx` | Přidán link na /admin/leads |
| `app/seznamky/[slug]/page.tsx` | Přidána LeadMagnet komponenta |
| `app/clanky/[slug]/page.tsx` | Přidána LeadMagnet komponenta |

## Nastavení ENV proměnných

Přidejte do `.env.local` a do Vercel:

```bash
# Resend (odesílání emailů)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email odesílatele
FROM_EMAIL=Seznamky.info <noreply@seznamky.info>
REPLY_TO_EMAIL=info@seznamky.info

# Bezpečnost
DOWNLOAD_TOKEN_SECRET=vase-tajne-heslo-pro-tokeny
IP_HASH_SALT=vase-sol-pro-hashovani-ip

# URL webu (pro generování download linků)
NEXT_PUBLIC_SITE_URL=https://www.seznamky.info
```

## Nastavení Resend

1. Registrace na https://resend.com
2. Vytvořte API key
3. Ověřte doménu (DNS záznamy)
4. Nastavte `RESEND_API_KEY` v env

### Proč Resend?

- **Nejlepší pro Next.js/Vercel** - oficiálně doporučovaný
- **Jednoduchá API** - pouze fetch, žádné SDK
- **Spolehlivá doručitelnost**
- **Free tier** - 3000 emailů/měsíc zdarma
- **Moderní dashboard**

## E-book umístění

Umístěte PDF soubor na jednu z těchto lokací:

```
/private/ebook.pdf    (doporučeno - není veřejně přístupný)
/ebook.pdf            (fallback v rootu projektu)
```

**Důležité:** Složka `/private/` není servírována jako static, takže soubor je chráněný.

## Lokální testování

### 1. Development mód

V development módu se email pouze loguje do konzole:

```bash
npm run dev
```

Zadejte email ve formuláři a v terminálu uvidíte:
```
📧 [DEV] Would send email: { to: 'test@example.com', subject: '...' }
```

### 2. Test s reálným Resend

Nastavte `RESEND_API_KEY` v `.env.local` a emaily se odešlou skutečně.

### 3. Test download endpointu

```bash
# Vygenerovat token ručně (v Node.js konzoli)
node -e "
const crypto = require('crypto');
const payload = Buffer.from(JSON.stringify({
  email: 'test@test.com',
  timestamp: Date.now()
})).toString('base64url');
const sig = crypto.createHmac('sha256', 'seznamky-ebook-secret-2026').update(payload).digest('base64url');
console.log(payload + '.' + sig);
"

# Otestovat download
curl "http://localhost:3000/api/download/ebook?token=VYGENEROVANY_TOKEN"
```

## Admin Panel

Přístup: `/admin/leads`

### Funkce:

- **Statistiky**: Celkem, aktivní, odhlášení, dnes, tento týden, měsíc
- **Tabulka leadů**: Filtrování, řazení, hledání
- **Export CSV**: Stažení všech leadů
- **Smazání** (GDPR): Permanentní odstranění záznamu

### Zabezpečení

Admin panel používá NextAuth - přihlášení pomocí `ADMIN_EMAIL` a `ADMIN_PASSWORD` z env.

## Databáze leadů

### Struktura záznamu

```typescript
interface Lead {
  id: string           // UUID
  email: string        // Normalizovaný email
  source: string       // 'ebook' | 'newsletter' | 'popup' | ...
  sourcePage?: string  // URL stránky, kde se registroval
  ipHash?: string      // Anonymizovaná IP (GDPR)
  status: string       // 'active' | 'unsubscribed'
  createdAt: string    // ISO timestamp
  updatedAt: string    // ISO timestamp
  emailSentAt?: string // Kdy byl odeslán email
  downloadedAt?: string// Kdy stáhl ebook
}
```

### Umístění

`/data/leads.json`

### Budoucí migrace

Struktura je připravená pro migraci na:
- PostgreSQL + Prisma
- Supabase
- MongoDB

## Analytics Events

Komponenta trackuje tyto eventy:

| Event | Kdy |
|-------|-----|
| `lead_magnet:view` | Zobrazení formuláře |
| `lead_magnet:submit` | Odeslání formuláře |
| `lead_magnet:success` | Úspěšná registrace |
| `lead_magnet:error` | Chyba při registraci |
| `lead_magnet:download` | Stažení e-booku |

### Integrace s GA4

Pokud máte GA4, přidejte do `layout.tsx`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

Eventy se automaticky posílají přes `gtag()`.

## Přidání dalšího lead magnetu

1. Vytvořte nový soubor v `/private/` (např. `checklist.pdf`)

2. Vytvořte nový API endpoint:
```typescript
// app/api/download/checklist/route.ts
// Zkopírujte strukturu z /api/download/ebook
// Změňte cestu k souboru
```

3. Vytvořte variantu LeadMagnet komponenty:
```typescript
<LeadMagnet
  source="checklist"
  placement="homepage"
  // případně nový variant prop pro jiný design
/>
```

4. Upravte email template v `lib/email.ts` pro nový lead magnet

## Troubleshooting

### Email se neodesílá

1. Zkontrolujte `RESEND_API_KEY`
2. Ověřte doménu v Resend dashboardu
3. Zkontrolujte logy v terminálu

### Download nefunguje

1. Ověřte, že existuje soubor `/private/ebook.pdf` nebo `/ebook.pdf`
2. Zkontrolujte expiraci tokenu (72 hodin)
3. Token musí být URL-encoded

### Rate limit

Maximálně 5 requestů z jedné IP za hodinu. Reset je automatický.

## Bezpečnost

- **Honeypot field**: Skryté pole pro odchycení botů
- **Rate limiting**: 5 req/IP/hodina
- **HMAC tokeny**: Podepsané, expirují za 72 hodin
- **GDPR compliant**: Anonymizace IP, právo na výmaz
- **No indexing**: Download endpoint má `X-Robots-Tag: noindex`

## Kontakt

Pro dotazy ohledně implementace kontaktujte tým Seznamky.info.
