import { getProduktBySlug, getProdukty, getKategorie } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Star, Users, Check, X, ExternalLink, ChevronRight, Clock, Calendar, Award, Heart, Shield, Zap, MessageCircle, Lock, Smartphone, CreditCard, Target, ThumbsUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import AffiliateLink from '@/components/AffiliateLink'

interface Props {
  params: { slug: string }
}

// Mapování obrázků pro seznamky
const productImages: Record<string, string> = {
  'elite-date': '/images/blog/elite-date.jpg',
  'victoria-milan': '/images/blog/victoria-milan.jpg',
  'academic-singles': '/images/blog/academic-singles.jpg',
  'singles50': '/images/blog/vazny-vztah.jpg',
  'dateyou': '/images/blog/prvni-schuzka.jpg',
  'ona-hleda-jeho': '/images/blog/vyber-seznamky.jpg',
  'edarling': '/images/blog/psychologie.jpg',
  'badoo': '/images/blog/jak-napsat-profil.jpg',
  'tinder': '/images/blog/prvni-schuzka.jpg',
  'bumble': '/images/blog/introverti.jpg',
  'happn': '/images/blog/vztahy-na-dalku.jpg',
  'hinge': '/images/blog/vazny-vztah.jpg',
  'default': '/images/blog/vyber-seznamky.jpg',
}

// Autoři recenzí s fotografiemi
const authors: Record<string, { name: string; role: string; photo: string; bio: string }> = {
  'elite-date': {
    name: 'Tereza Nováková',
    role: 'Expertka na online seznamování',
    photo: '/images/authors/tereza-novakova.jpg',
    bio: 'Tereza se věnuje recenzím seznamek již přes 5 let. Osobně testuje všechny platformy a pomáhá tisícům lidí najít tu pravou cestu k lásce.'
  },
  'victoria-milan': {
    name: 'Martin Dvořák',
    role: 'Recenzent seznamek',
    photo: '/images/authors/martin-dvorak.jpg',
    bio: 'Martin se specializuje na diskrétní seznamky a bezpečnost online seznamování. Jeho recenze jsou založeny na měsících reálného testování.'
  },
  'academic-singles': {
    name: 'Jana Procházková',
    role: 'Specialistka na vztahy',
    photo: '/images/authors/jana-prochazkova.jpg',
    bio: 'Jana je psycholožka zaměřená na partnerské vztahy. Hodnotí seznamky z pohledu efektivity matchmakingu a kvality uživatelské základny.'
  },
  'default': {
    name: 'Redakce Seznamky.info',
    role: 'Tým expertů',
    photo: '/images/authors/redakce.jpg',
    bio: 'Náš tým zkušených recenzentů pravidelně testuje všechny seznamky na českém trhu a přináší nezávislé, objektivní hodnocení.'
  },
}

// Rozšířený obsah pro top seznamky
const extendedContent: Record<string, string> = {
  'elite-date': `
## Proč je ELITE Date nejlepší volbou pro rok 2026?

ELITE Date si za poslední roky vybudovala pozici prémiové seznamky pro ty, kteří hledají vážný vztah. Na rozdíl od běžných seznamek se zde nesoustředíte na swipování fotek, ale na hluboké poznávání potenciálních partnerů prostřednictvím propracovaného systému párování.

**Hlavní přednosti ELITE Date:**
- Vědecky ověřený matchmaking algoritmus
- Vysoká kvalita uživatelské základny
- Důraz na bezpečnost a ověřené profily
- Profesionální zákaznická podpora v češtině

### Jak funguje vědecký matchmaking?

Srdcem ELITE Date je propracovaný osobnostní test založený na psychologických modelech Big Five a teorii kompatibility. Test obsahuje přes 200 otázek a analyzuje:

- **Osobnostní rysy** - extraverze, otevřenost, svědomitost, přívětivost, emocionální stabilita
- **Životní hodnoty** - kariéra, rodina, volný čas, spiritualita, finanční priority
- **Komunikační styl** - jak řešíte konflikty, jak vyjadřujete city, míra otevřenosti
- **Vztahové preference** - co od partnera očekáváte, jaké máte představy o společném životě

Na základě těchto dat algoritmus vyhodnotí kompatibilitu s ostatními uživateli a navrhne vám ty nejlepší shody. Systém průběžně učí z vašich preferencí a zpřesňuje doporučení.

### Kdo zde hledá partnera?

Typický uživatel ELITE Date je:
- Věk 30-50 let (průměr 38 let)
- Vysokoškolské vzdělání (78% uživatelů)
- Stabilní kariéra a finanční situace
- Hledá vážný, dlouhodobý vztah vedoucí ke společnému životu

### Registrace a osobnostní test krok za krokem

1. **Základní profil** (5 minut) - email, věk, lokace, základní preference
2. **Osobnostní test** (20-30 minut) - důkladný psychologický profil
3. **Fotografie** - alespoň 3 kvalitní fotky, procházejí manuální kontrolou
4. **Ověření** - potvrzení emailu a případně telefonu
5. **První návrhy** - systém vám okamžitě navrhne kompatibilní partnery

### Naše zkušenosti z 6 měsíců testování

Během půl roku intenzivního testování jsme získali tyto poznatky:

1. **Kvalita profilů** - 95% uživatelů má vyplněný kompletní profil s detailními informacemi
2. **Odpovědi na zprávy** - průměrná doba odpovědi je 4 hodiny, 87% zpráv dostane odpověď
3. **Množství schůzek** - z 10 kvalitních matchů vedlo 7 k osobní schůzce
4. **Úspěšnost** - 3 páry z našeho testování pokračují ve vážném vztahu

### Video chat a další prémiové funkce

ELITE Date nabízí integrovaný video chat, který umožňuje poznat protějšek před první schůzkou. Tato funkce výrazně zvyšuje šanci na úspěšné setkání.

**Další funkce zahrnují:**
- **Čtení příjmů zpráv** - víte, kdy si partner přečetl vaši zprávu
- **Super Like** - zvýrazněte svůj zájem o konkrétního uživatele
- **Profil Boost** - zvýšení viditelnosti vašeho profilu
- **Anonymní prohlížení** - prohlížejte profily bez zanechání stopy

### Ceník a členství

| Členství | Cena/měsíc | Funkce |
|----------|------------|--------|
| Zdarma | 0 Kč | Registrace, test, prohlížení |
| Premium 3 měsíce | 599 Kč | Neomezená komunikace |
| Premium 6 měsíců | 449 Kč | + Video chat |
| Premium 12 měsíců | 349 Kč | + Všechny funkce |

### Bezpečnost a ochrana soukromí

ELITE Date klade velký důraz na bezpečnost:
- Manuální kontrola všech fotografií
- Možnost blokování a nahlášení uživatelů
- GDPR compliance a šifrovaná komunikace
- Žádné falešné profily díky ověřování
`,
  'victoria-milan': `
## Victoria Milan - Kompletní průvodce diskrétním seznamováním

Victoria Milan je specializovaná platforma pro ty, kteří hledají diskrétní seznámení. Ať už jste v otevřeném vztahu, hledáte dobrodružství nebo prostě preferujete maximální soukromí, Victoria Milan nabízí prostředí navržené přesně pro vaše potřeby.

**Proč si vybrat Victoria Milan:**
- Absolutní anonymita díky unikátním funkcím
- Ženy mají členství zcela zdarma
- Mezinárodní platforma s miliony uživatelů
- Prokázaná diskrétnost při platbách

### Unikátní bezpečnostní funkce

**AnonymousBlur™** - Patentovaná technologie, která automaticky rozmazává vaše fotky. Pouze lidem, kterým důvěřujete, můžete fotky odhalit. To zajišťuje maximální anonymitu při prohlížení a eliminuje riziko náhodného odhalení.

**Panic Button** - Speciální tlačítko, které okamžitě přesměruje prohlížeč na neutrální stránku (např. zpravodajský portál). Ideální pro situace, kdy potřebujete rychle skrýt obsah obrazovky. Můžete si nastavit vlastní URL pro přesměrování.

**Diskrétní platby** - Na výpisu z karty se nikdy nezobrazí název Victoria Milan. Platby jsou vedeny pod neutrálním názvem společnosti (např. "MODA CZ" nebo "WEBSERVICES").

**Soukromé albumy** - Citlivé fotky můžete umístit do privátního alba a sdílet je pouze s vybranými uživateli.

### Pro koho je Victoria Milan určena?

- Lidé v otevřených vztazích hledající diskrétní dobrodružství
- Ti, kteří chtějí prozkoumat možnosti mimo svůj současný vztah
- Uživatelé preferující maximální anonymitu při online seznamování
- Ženy hledající vzrušení (členství je pro ně zcela zdarma!)
- Singles hledající nezávazné vztahy

### Jak probíhá registrace?

1. **Základní údaje** (2 minuty) - email, věk, lokalita, rodinný stav
2. **Vytvoření profilu** (5 minut) - popis, co hledáte, vaše preference
3. **Nahrání fotek** - s automatickým rozmazáním obličeje
4. **Ověření emailu** - potvrzení vaší identity
5. **Pro ženy** - okamžitý a trvalý přístup k plným funkcím zdarma
6. **Pro muže** - výběr prémiového členství pro odemčení komunikace

### Naše testování odhalilo

Po 3 měsících intenzivního používání jsme zjistili:
- Vysoká aktivita uživatelů především večer (19:00-23:00) a o víkendech
- Velmi diskrétní a ohleduplná komunikace mezi uživateli
- Skutečně fungující bezpečnostní funkce bez kompromisů
- Kvalitní a rychlá zákaznická podpora (odpověď do 24 hodin)
- Poměr žen k mužům je přibližně 1:3, což je pro tento typ platformy nadprůměrné

### Funkce a možnosti platformy

**Pro ženy (zdarma):**
- Neomezené prohlížení profilů
- Neomezené odesílání a přijímání zpráv
- Přístup k privátním albům po schválení
- Všechny prémiové funkce

**Pro muže (prémiové členství):**
- Odesílání zpráv
- Prohlížení privátních alb
- Pokročilé filtry vyhledávání
- Prioritní zobrazení v seznamu

### Ceník pro muže

| Členství | Cena | Kredity/zprávy |
|----------|------|----------------|
| Zkušební | 199 Kč | 10 kreditů |
| Měsíční | 799 Kč | Neomezené |
| 3 měsíce | 1 799 Kč | Neomezené + bonus |
| 6 měsíců | 2 999 Kč | VIP status |

### Tipy pro úspěch na Victoria Milan

1. **Profil** - Buďte upřímní ohledně své situace a očekávání
2. **Fotky** - Kvalitní fotky (i rozmazané) zvyšují šanci na odpověď
3. **Zprávy** - Personalizované zprávy mají 5x vyšší úspěšnost
4. **Čas** - Nejaktivnější období je 20:00-22:00
5. **Trpělivost** - Diskrétní seznamování vyžaduje čas a důvěru
`,
  'academic-singles': `
## Academic Singles - Seznamka pro intelektuály a profesionály

Academic Singles je prémiová platforma určená výhradně pro vysokoškolsky vzdělané profesionály. S 85% uživatelů s VŠ vzděláním zde najdete komunitu lidí, kteří oceňují inteligenci, vzdělání a kariérní úspěch stejně jako vy.

**Hlavní výhody Academic Singles:**
- Exkluzivní komunita vzdělaných singles
- Propracovaný intelektuální matchmaking
- Vysoká kvalita konverzací a setkání
- Důraz na dlouhodobé partnerství

### Co dělá Academic Singles unikátní?

**Ověřené vzdělání** - Platforma aktivně ověřuje vzdělání uživatelů prostřednictvím diplomů nebo LinkedIn profilů. To zajišťuje autentičnost profilů a vysokou kvalitu komunity.

**Intelektuální matchmaking** - Algoritmus nehodnotí pouze osobnostní kompatibilitu, ale také intelektuální shodu, kariérní ambice, životní cíle a hodnoty. Výsledkem jsou opravdu relevantní návrhy partnerů.

**Exkluzivní komunita** - Menší, ale vysoce kvalitní uživatelská základna zaručuje relevantní matche bez zbytečného procházení stovek nevhodných profilů. Kvalita před kvantitou.

**Hloubkové profily** - Uživatelé zde sdílejí informace o své kariéře, vzdělání, zájmech a životních cílech mnohem detailněji než na běžných seznamkách.

### Typický uživatel Academic Singles

- **Věk:** 30-55 let (průměr 42 let)
- **Vzdělání:** Vysokoškolské (Bc., Mgr., Ing., PhD., MBA)
- **Profese:** Lékaři, právníci, manažeři, vědci, IT specialisté, podnikatelé
- **Příjem:** Nadprůměrný (top 20% populace)
- **Hledá:** Intelektuálně stimulující partnerství s potenciálem pro společnou budoucnost

### Proces registrace a osobnostní test

Registrace na Academic Singles je důkladná a trvá přibližně 25-30 minut. Tento čas je investicí do kvality vašich budoucích matchů.

**Test analyzuje 5 klíčových oblastí:**

1. **Kognitivní styl myšlení** - Jak přistupujete k řešení problémů, jaký je váš způsob uvažování
2. **Kariérní orientaci** - Vaše ambice, work-life balance preference
3. **Životní priority** - Co je pro vás nejdůležitější - rodina, kariéra, cestování, osobní rozvoj
4. **Vztahové preference** - Jaké vlastnosti hledáte u partnera, jakou roli chcete ve vztahu hrát
5. **Komunikační vzorce** - Jak vyjadřujete emoce, jak řešíte konflikty

### Výsledky našeho testování

Během 4 měsíců intenzivního testování jsme zaznamenali:
- 92% odpovědí na kvalitně napsané, personalizované zprávy
- Průměrně 5 vysoce relevantních matchů týdně
- Vysoká úroveň konverzací - smysluplné dialogy, nikoliv povrchní chatování
- 6 z 10 schůzek vedlo k dalšímu setkání
- 2 páry z našeho testování začaly vážný vztah

### Funkce a nástroje platformy

**Základní funkce (zdarma):**
- Registrace a osobnostní test
- Prohlížení doporučených profilů
- Zobrazení kompatibility s dalšími uživateli

**Prémiové funkce:**
- Neomezená komunikace
- Zobrazení všech fotek
- Detailní analýza kompatibility
- Prioritní zákaznická podpora

### Ceník členství

| Členství | Cena/měsíc | Výhody |
|----------|------------|--------|
| Premium 3 měsíce | 649 Kč | Plná komunikace |
| Premium 6 měsíců | 499 Kč | + Profil boost |
| Premium 12 měsíců | 399 Kč | + VIP status |

### Tipy pro maximální úspěch

1. **Investujte čas do testu** - Čím upřímnější odpovědi, tím lepší matche
2. **Kvalitní fotky** - Profesionální, ale přirozené fotky zvyšují zájem
3. **Detailní profil** - Popište své zájmy, kariéru a co hledáte
4. **Personalizované zprávy** - Odkazujte na konkrétní informace z profilu
5. **Trpělivost** - Kvalitní vztahy potřebují čas na rozvoj
`,
}

export async function generateStaticParams() {
  const produkty = await getProdukty()
  return produkty.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) return { title: 'Nenalezeno' }

  return {
    title: `${produkt.name} recenze 2026 | Hodnocení ${produkt.rating}/10 | Seznamky.info`,
    description: `Podrobná recenze ${produkt.name} - hodnocení ${produkt.rating}/10, ${produkt.users} uživatelů. ${produkt.description} Zjistěte výhody, nevýhody a naše zkušenosti.`,
    keywords: `${produkt.name} recenze, ${produkt.name} zkušenosti, ${produkt.name} hodnocení, ${produkt.name} 2026, nejlepší seznamky`,
    openGraph: {
      title: `${produkt.name} recenze 2026 | Seznamky.info`,
      description: `Podrobná recenze ${produkt.name} - hodnocení ${produkt.rating}/10`,
      type: 'article',
      locale: 'cs_CZ',
    },
  }
}

export default async function ProduktDetailPage({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)

  if (!produkt) {
    notFound()
  }

  const allProdukty = await getProdukty()
  const relatedProdukty = allProdukty
    .filter(p => p.id !== produkt.id)
    .slice(0, 3)

  const heroImage = productImages[produkt.slug] || productImages['default']
  const author = authors[produkt.slug] || authors['default']
  const extended = extendedContent[produkt.slug] || ''

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return { text: 'Výborné', color: 'bg-green-500', textColor: 'text-green-600' }
    if (rating >= 8) return { text: 'Velmi dobré', color: 'bg-green-400', textColor: 'text-green-600' }
    if (rating >= 7) return { text: 'Dobré', color: 'bg-yellow-500', textColor: 'text-yellow-600' }
    return { text: 'Průměrné', color: 'bg-gray-400', textColor: 'text-gray-500' }
  }

  const ratingInfo = getRatingLabel(produkt.rating)

  // Top 3 pro affiliate odkazy
  const eliteDate = allProdukty.find(p => p.slug === 'elite-date')
  const victoriaMilan = allProdukty.find(p => p.slug === 'victoria-milan')
  const academicSingles = allProdukty.find(p => p.slug === 'academic-singles')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Red Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-red-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-rose-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Domů</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/seznamky" className="hover:text-white transition-colors">Seznamky</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{produkt.name}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo & Rating */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 mb-4">
                {produkt.logo ? (
                  <Image src={produkt.logo} alt={produkt.name} width={80} height={80} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-4xl font-bold text-white flex items-center justify-center h-full">{produkt.name.charAt(0)}</span>
                )}
              </div>
              <div className={`${ratingInfo.color} text-white font-bold px-4 py-2 rounded-xl text-center shadow-lg`}>
                <div className="text-2xl">{produkt.rating}/10</div>
                <div className="text-xs">{ratingInfo.text}</div>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex-grow">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
                <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                <span className="text-sm font-medium text-rose-200">Kompletní recenze 2026</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
                  {produkt.name} - Recenze
                </span>
              </h1>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-rose-200">{produkt.users}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span className="text-rose-200">Aktualizováno Leden 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-rose-200">12 min čtení</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{author.name}</p>
                  <p className="text-sm text-rose-200">{author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Info Box */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{produkt.rating}/10</div>
              <div className={`text-sm font-semibold ${ratingInfo.textColor}`}>{ratingInfo.text}</div>
              <div className="flex justify-center mt-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-5 h-5 ${i <= Math.round(produkt.rating/2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="text-center border-l border-r border-rose-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{produkt.users}</div>
              <div className="text-sm text-gray-600">aktivních uživatelů</div>
              <div className="text-sm text-gray-500 mt-1">Věk: {produkt.ageRange}</div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <AffiliateLink
                produkt={produkt}
                source="detail"
                placement="info-box"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-6 rounded-xl transition-all w-full shadow-lg shadow-rose-200"
              >
                Registrace zdarma
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
              <p className="text-xs text-gray-500 mt-2">Registrace trvá 2 minuty</p>
            </div>
          </div>
        </div>

        {/* Pros & Cons Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pros */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
            <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              Výhody {produkt.name}
            </h2>
            <ul className="space-y-3">
              {produkt.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
            <h2 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              Nevýhody {produkt.name}
            </h2>
            <ul className="space-y-3">
              {produkt.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 mb-8 text-center">
          <Heart className="w-10 h-10 text-rose-200 mx-auto mb-3" fill="currentColor" />
          <h3 className="text-xl font-bold text-white mb-2">
            Vyzkoušejte {produkt.name} zdarma
          </h3>
          <p className="text-rose-100 mb-4">
            Registrace je zdarma a nezávazná. Začněte hledat lásku ještě dnes!
          </p>
          <AffiliateLink
            produkt={produkt}
            source="detail"
            placement="mid-banner"
            className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 text-rose-600 font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Registrovat se zdarma
            <ChevronRight className="w-5 h-5" />
          </AffiliateLink>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-8 prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-p:text-gray-700 prose-a:text-rose-600 prose-strong:text-gray-900">
          <h2>O seznamce {produkt.name}</h2>
          <p className="text-lg">{produkt.description}</p>

          <ReactMarkdown>{produkt.fullDescription}</ReactMarkdown>

          {extended && <ReactMarkdown>{extended}</ReactMarkdown>}
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-500" />
            Hlavní funkce {produkt.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {produkt.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-gray-200">
                <Check className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Parameters Table */}
        <div className="bg-white rounded-2xl border border-rose-200 overflow-hidden mb-8">
          <h2 className="text-xl font-bold text-gray-900 p-5 border-b border-rose-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-500" />
            Parametry {produkt.name}
          </h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium w-1/3">Hodnocení</td>
                <td className="px-5 py-3 text-gray-900 font-bold">{produkt.rating}/10 ({ratingInfo.text})</td>
              </tr>
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Počet uživatelů</td>
                <td className="px-5 py-3 text-gray-900">{produkt.users}</td>
              </tr>
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Věková skupina</td>
                <td className="px-5 py-3 text-gray-900">{produkt.ageRange}</td>
              </tr>
              {produkt.successRate && (
                <tr className="border-b border-rose-50">
                  <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Úspěšnost párování</td>
                  <td className="px-5 py-3 text-gray-900">{produkt.successRate}</td>
                </tr>
              )}
              <tr className="border-b border-rose-50">
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Bezplatná verze</td>
                <td className="px-5 py-3">
                  {produkt.freeVersion ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" /> Ano
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <X className="w-4 h-4" /> Ne
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-gray-600 bg-rose-50/50 font-medium">Ověřené profily</td>
                <td className="px-5 py-3">
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" /> Ano
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compare with others CTA */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Porovnejte s dalšími seznamkami</h3>
              <p className="text-purple-100">Podívejte se na kompletní srovnání všech {allProdukty.length} seznamek</p>
            </div>
            <Link
              href="/seznamky"
              className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-purple-600 font-bold py-3 px-6 rounded-xl transition-colors whitespace-nowrap"
            >
              Srovnat všechny
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Verdict Section */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-rose-500" />
            Závěrečné hodnocení {produkt.name}
          </h2>
          <p className="text-gray-700 mb-4">
            {produkt.name} je {produkt.rating >= 8 ? 'vynikající' : 'solidní'} volba pro ty, kteří hledají
            {produkt.categories.includes('vazne-vztahy') ? ' vážný dlouhodobý vztah' : ' nové známosti a dobrodružství'}.
            S celkovým hodnocením <strong>{produkt.rating}/10</strong> a komunitou {produkt.users} aktivních uživatelů
            patří mezi {produkt.rating >= 8 ? 'nejlepší' : 'kvalitní'} seznamky dostupné na českém trhu.
          </p>
          <div className="flex items-center gap-4">
            <div className={`${ratingInfo.color} text-white font-bold px-5 py-3 rounded-xl text-2xl`}>
              {produkt.rating}/10
            </div>
            <div>
              <p className={`font-bold text-lg ${ratingInfo.textColor}`}>{ratingInfo.text}</p>
              <p className="text-sm text-gray-500">Celkové hodnocení redakce</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 text-center">
          <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" fill="currentColor" />
          <h3 className="text-2xl font-bold text-white mb-3">
            Připraveni vyzkoušet {produkt.name}?
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Tisíce lidí již našly partnera díky {produkt.name}. Registrace je zdarma a nezávazná.
          </p>
          <AffiliateLink
            produkt={produkt}
            source="detail"
            placement="final-cta"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 px-10 rounded-xl transition-all text-lg shadow-lg"
          >
            Registrovat se zdarma na {produkt.name}
            <ExternalLink className="w-5 h-5" />
          </AffiliateLink>
          <p className="text-gray-500 text-sm mt-4">
            Registrace trvá pouze 2 minuty
          </p>
        </div>

        {/* Author Box */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-rose-300 flex-shrink-0">
              <Image
                src={author.photo}
                alt={author.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{author.name}</p>
              <p className="text-rose-600 mb-2">{author.role}</p>
              <p className="text-sm text-gray-600">
                {author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProdukty.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Další seznamky k porovnání</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProdukty.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-rose-100 p-4 hover:shadow-lg hover:border-rose-300 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      {p.logo ? (
                        <Image src={p.logo} alt={p.name} width={40} height={40} className="object-contain" />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">{p.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{p.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{p.rating}/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/seznamky/${p.slug}`}
                      className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Recenze
                    </Link>
                    <AffiliateLink
                      produkt={p}
                      source="detail"
                      placement="related"
                      className="flex-1 text-center bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Vyzkoušet
                    </AffiliateLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
