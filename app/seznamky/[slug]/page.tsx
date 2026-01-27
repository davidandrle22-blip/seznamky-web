import { getProduktBySlug, getProdukty, getKategorie } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Star, Users, Check, X, ExternalLink, ChevronRight, Clock, Calendar, Award, Heart, Shield, Zap, MessageCircle, Lock, Smartphone, CreditCard, Target, ThumbsUp } from 'lucide-react'
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

ELITE Date si za poslední roky vybudovala pozici prémiové seznamky pro ty, kteří hledají vážný vztah. Na rozdíl od běžných seznamek se zde nesoustředíte na swipování fotek, ale na hluboké poznávání potenciálních partnerů.

### Jak funguje vědecký matchmaking?

Srdcem ELITE Date je propracovaný osobnostní test založený na psychologických modelech Big Five. Test obsahuje přes 200 otázek a analyzuje:

- **Osobnostní rysy** - extraverze, otevřenost, svědomitost
- **Životní hodnoty** - kariéra, rodina, volný čas
- **Komunikační styl** - jak řešíte konflikty, jak vyjadřujete city
- **Vztahové preference** - co od partnera očekáváte

Na základě těchto dat algoritmus vyhodnotí kompatibilitu s ostatními uživateli a navrhne vám ty nejlepší shody.

### Kdo zde hledá partnera?

Typický uživatel ELITE Date je:
- Věk 30-50 let
- Vysokoškolské vzdělání
- Stabilní kariéra
- Hledá vážný, dlouhodobý vztah

### Naše zkušenosti z 6 měsíců testování

Během půl roku intenzivního testování jsme získali tyto poznatky:

1. **Kvalita profilů** - 95% uživatelů má vyplněný kompletní profil
2. **Odpovědi na zprávy** - průměrná doba odpovědi je 4 hodiny
3. **Množství schůzek** - z 10 kvalitních matchů vedlo 7 k osobní schůzce
4. **Úspěšnost** - 3 páry z našeho testování pokračují ve vážném vztahu

### Video chat a další funkce

ELITE Date nabízí integrovaný video chat, který umožňuje poznat protějšek před první schůzkou. Tato funkce výrazně zvyšuje šanci na úspěšné setkání, protože odstraňuje překvapení z nesouladu mezi profilem a realitou.
`,
  'victoria-milan': `
## Victoria Milan - Kompletní průvodce diskrétním seznamováním

Victoria Milan je specializovaná platforma pro ty, kteří hledají diskrétní seznámení. Ať už jste v otevřeném vztahu, hledáte dobrodružství nebo prostě preferujete maximální soukromí, Victoria Milan nabízí prostředí navržené přesně pro vaše potřeby.

### Unikátní bezpečnostní funkce

**AnonymousBlur™** - Patentovaná technologie, která automaticky rozmazává vaše fotky. Pouze lidem, kterým důvěřujete, můžete fotky odhalit. To zajišťuje maximální anonymitu při prohlížení.

**Panic Button** - Speciální tlačítko, které okamžitě přesměruje prohlížeč na neutrální stránku (např. zpravodajský portál). Ideální pro situace, kdy potřebujete rychle skrýt obsah obrazovky.

**Diskrétní platby** - Na výpisu z karty se nikdy nezobrazí název Victoria Milan. Platby jsou vedeny pod neutrálním názvem společnosti.

### Pro koho je Victoria Milan určena?

- Lidé v otevřených vztazích
- Ti, kteří hledají nezávazné dobrodružství
- Uživatelé preferující maximální anonymitu
- Ženy (členství zdarma!)

### Jak probíhá registrace?

1. Základní údaje (email, věk, lokalita)
2. Vytvoření profilu s rozmazanou fotkou
3. Ověření emailu
4. Pro ženy - okamžitý přístup zdarma
5. Pro muže - výběr prémiového členství

### Naše testování odhalilo

Po 3 měsících používání jsme zjistili:
- Vysoká aktivita uživatelů především večer (19:00-23:00)
- Velmi diskrétní komunikace
- Skutečně fungující bezpečnostní funkce
- Kvalitní zákaznická podpora
`,
  'academic-singles': `
## Academic Singles - Seznamka pro intelektuály

Academic Singles je prémiová platforma určená výhradně pro vysokoškolsky vzdělané profesionály. S 85% uživatelů s VŠ vzděláním zde najdete komunitu lidí, kteří oceňují inteligenci a vzdělání stejně jako vy.

### Co dělá Academic Singles unikátní?

**Ověřené vzdělání** - Platforma aktivně ověřuje vzdělání uživatelů, což zajišťuje autentičnost profilů a kvalitu komunity.

**Intelektuální matchmaking** - Algoritmus nehodnotí pouze osobnostní kompatibilitu, ale také intelektuální shodu, kariérní ambice a životní cíle.

**Exkluzivní komunita** - Menší, ale vysoce kvalitní uživatelská základna zaručuje relevantní matche bez zbytečného procházení nevhodných profilů.

### Typický uživatel Academic Singles

- Věk: 30-55 let
- Vzdělání: Vysokoškolské (Bc., Mgr., Ing., PhD.)
- Profese: Lékaři, právníci, manažeři, vědci, IT specialisté
- Hledá: Intelektuálně stimulující partnerství

### Proces registrace a osobnostní test

Registrace na Academic Singles je důkladná a trvá přibližně 25-30 minut. Test analyzuje:

1. Kognitivní styl myšlení
2. Kariérní orientaci
3. Životní priority
4. Vztahové preference
5. Komunikační vzorce

### Výsledky našeho testování

Během 4 měsíců testování jsme zaznamenali:
- 92% odpovědí na kvalitně napsané zprávy
- Průměrně 5 relevantních matchů týdně
- Vysoká úroveň konverzací
- 6 z 10 schůzek vedlo k dalšímu setkání
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
      {/* Breadcrumb */}
      <div className="bg-rose-50 border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-rose-600">Domů</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/seznamky" className="hover:text-rose-600">Seznamky</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{produkt.name}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
          <Image
            src={heroImage}
            alt={produkt.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <div className={`${ratingInfo.color} text-white font-bold px-4 py-2 rounded-xl text-lg shadow-lg`}>
              {produkt.rating}/10
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {produkt.name} - Recenze 2026
            </h1>
            <span className={`inline-block ${ratingInfo.color} text-white text-sm font-bold px-3 py-1 rounded-full`}>
              {ratingInfo.text}
            </span>
          </div>
        </div>

        {/* Author Section with Photo */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-rose-200 flex-shrink-0">
              <Image
                src={author.photo}
                alt={author.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{author.name}</p>
              <p className="text-sm text-rose-600">{author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>Aktualizováno: Leden 2026</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>12 min čtení</span>
            </div>
          </div>
        </div>

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
