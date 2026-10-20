import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ShieldCheck, ClipboardCheck, RefreshCw, Scale, Heart, Sparkles, EyeOff, GraduationCap, Flame, Gift } from 'lucide-react'
import { getProdukty, getClanky, getKategorie } from '@/lib/data'
import AffiliateLink from '@/components/AffiliateLink'
import ArticleCard from '@/components/ArticleCard'
import RankedList, { ScoreBadge } from '@/components/RankedList'
import ComparisonTable from '@/components/ComparisonTable'
import FaqSection from '@/components/FaqSection'
import { ItemListSchema, FAQSchema } from '@/components/seo'
import { AWARDS } from '@/lib/monetization'
import { CURRENT_YEAR, monthYear, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: `Nejlepší seznamky ${CURRENT_YEAR} – srovnání a recenze seznamek v ČR | Seznamky.info` },
  description: `Které seznamky v ČR opravdu fungují? Nezávislé srovnání a recenze seznamek ${CURRENT_YEAR}: ELITE Date, Victoria Milan, Academic Singles, Singles50, be2 a další. Ceny, výhody, nevýhody a tipy redakce.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `Nejlepší seznamky ${CURRENT_YEAR} – srovnání a recenze`,
    description: 'Nezávislé srovnání online seznamek v ČR. Najděte seznamku pro vážný vztah, flirt i 50+.',
    url: SITE_URL,
  },
}

const finder = [
  { label: 'Vážný vztah', desc: 'Párování podle osobnosti', href: '/kategorie/vazne-vztahy', icon: Heart },
  { label: 'Seznámení 50+', desc: 'Pro zralé singles', href: '/kategorie/senior-seznamky', icon: Sparkles },
  { label: 'Diskrétní seznámení', desc: 'Anonymita na prvním místě', href: '/kategorie/seznamky-pro-zadane', icon: EyeOff },
  { label: 'Vzdělaní a úspěšní', desc: 'Luxusní seznamky', href: '/kategorie/luxusni-seznamky', icon: GraduationCap },
  { label: 'Flirt a zábava', desc: 'Nezávazné seznámení', href: '/kategorie/flirt-seznamky', icon: Flame },
  { label: 'Seznamky zdarma', desc: 'Bez placení', href: '/kategorie/seznamky-zdarma', icon: Gift },
]

const homeFaq = [
  {
    question: 'Která seznamka je v ČR nejlepší?',
    answer: `Podle našeho srovnání (${monthYear()}) vychází nejlépe ELITE Date. Je česká, páruje podle osobnostního testu a ručně kontroluje profily. Pro lidi nad 50 let doporučujeme Singles50, pro vysokoškoláky Academic Singles a pro diskrétní seznámení Victoria Milan.`,
  },
  {
    question: 'Jsou seznamky zdarma?',
    answer: 'Registrace je zdarma téměř všude. Seriózní seznamky pro vážný vztah ale za plnou komunikaci (psaní zpráv, fotky) chtějí placené členství. Obvykle stojí 150–700 Kč měsíčně podle délky předplatného. Platit se vyplatí hlavně proto, že tam najdete lidi, kteří to s hledáním partnera myslí vážně.',
  },
  {
    question: 'Jak poznám falešný profil?',
    answer: 'Varovné signály jsou dokonalé fotky jako z modelingu a profil bez textu. Dále rychlé vyznávání lásky, snaha přesunout konverzaci mimo seznamku a hlavně jakákoli žádost o peníze. Seriózní seznamky profily ručně kontrolují a nabízejí ověření fotkou.',
  },
  {
    question: 'Jak vybíráte a řadíte seznamky?',
    answer: 'Každou seznamku hodnotíme podle šesti kritérií: kvalita a aktivita uživatelů, párování, bezpečnost, cena, ovládání a podpora. Detaily najdete na stránce Jak hodnotíme. Web financujeme z affiliate provizí, o tom informujeme transparentně v patičce.',
  },
  {
    question: 'Je online seznamování bezpečné?',
    answer: 'Ano, pokud dodržíte základní pravidla. Neposílejte nikomu peníze, první schůzku si domluvte na veřejném místě a řekněte o ní někomu blízkému. Osobní údaje sdílejte až s člověkem, kterému důvěřujete. Podrobně to rozebíráme v článku o bezpečném seznamování.',
  },
]

export default async function Home() {
  const [produkty, clanky, kategorie] = await Promise.all([getProdukty(), getClanky(), getKategorie()])
  const top3 = produkty.slice(0, 3)
  const top10 = produkty.slice(0, 10)
  const recentClanky = clanky.slice(0, 6)

  return (
    <div>
      <ItemListSchema
        name={`Nejlepší seznamky ${CURRENT_YEAR}`}
        items={top10.map(p => ({ name: p.name, url: `${SITE_URL}/seznamky/${p.slug}` }))}
      />
      <FAQSchema items={homeFaq} />

      {/* HERO */}
      <section className="hero-dark">
        <div className="relative z-10 container-wide pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
          <div className="min-w-0">
            <p className="eyebrow-light">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" /> Aktualizováno: {monthYear()} · {produkty.length} hodnocených seznamek
            </p>
            <h1 className="mt-5 text-[2.15rem] sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.05] text-white text-balance">
              Nejlepší seznamky {CURRENT_YEAR}: <span className="italic text-gold-300">upřímné</span> srovnání a recenze
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              Prošli jsme české i zahraniční seznamky. Porovnali jsme, kolik stojí, kdo na nich je a jak dobře párují.
              Vyberte si tu, která sedí k tomu, co hledáte: vážný vztah, seznámení po padesátce nebo diskrétní dobrodružství.
            </p>
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 [&>*]:justify-center">
              {top3[0] && (
                <AffiliateLink produkt={top3[0]} source="homepage" placement="hero-cta" className="btn-gold">
                  Vyzkoušet vítěze {top3[0].name} zdarma <ChevronRight className="w-4 h-4" />
                </AffiliateLink>
              )}
              <Link href="#zebricek" className="btn-ghost-light">Zobrazit žebříček</Link>
            </div>
            <div className="mt-9 sm:mt-10 grid grid-cols-3 max-w-lg gap-4 sm:gap-6 text-white/60 text-xs sm:text-sm leading-snug">
              <div><span className="block font-display text-2xl text-white">{produkty.length}</span>seznamek v testu</div>
              <div><span className="block font-display text-2xl text-white">6</span>hodnoticích kritérií</div>
              <div><span className="block font-display text-2xl text-white">1×</span>měsíčně aktualizace</div>
            </div>
          </div>

          {/* Top 3 panel */}
          <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl p-3.5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-3 mb-4 px-1 sm:px-0">
              <p className="eyebrow-light">Top 3 podle redakce</p>
              <span className="text-xs text-white/40">{monthYear()}</span>
            </div>
            <ol className="space-y-3">
              {top3.map((p, i) => (
                <li key={p.id} className="flex items-center gap-2.5 sm:gap-4 rounded-2xl bg-white p-2.5 sm:p-3.5 text-ink-900">
                  <span className={`rank-medal ${i === 0 ? 'bg-gradient-to-b from-gold-200 to-gold-500 text-ink-950' : 'bg-ivory-100 text-ink-500'}`}>{i + 1}</span>
                  <span className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-ivory-300 overflow-hidden bg-white">
                    <Image src={p.logo} alt={`${p.name} logo`} fill sizes="48px" className="object-contain p-1" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link href={`/seznamky/${p.slug}`} className="block truncate font-semibold hover:text-rose-700">{p.name}</Link>
                    <p className="text-xs text-ink-400 truncate">{AWARDS[p.slug]}</p>
                  </div>
                  <span className="hidden sm:inline-flex rounded-lg bg-ink-900 text-white text-sm font-semibold px-2.5 py-1">{p.rating.toFixed(1)}</span>
                  <AffiliateLink produkt={p} source="homepage" placement={`hero-top3-${i + 1}`} className={`${i === 0 ? 'btn-gold' : 'btn-wine'} shrink-0 !px-3.5 !py-2 text-sm`}>
                    Web
                  </AffiliateLink>
                </li>
              ))}
            </ol>
            <p className="mt-4 px-1 sm:px-0 text-[11px] leading-relaxed text-white/40">
              Obsahuje affiliate odkazy. Při registraci můžeme získat provizi, cena se pro vás nemění.
            </p>
          </div>
        </div>
      </section>

      {/* FINDER */}
      <section className="container-wide -mt-8 relative z-20">
        <div className="panel p-4 sm:p-6">
          <p className="eyebrow mb-4">Co hledáte?</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {finder.map(f => (
              <Link key={f.href} href={f.href} className="group rounded-xl border border-ivory-300/80 p-4 hover:border-gold-300 hover:bg-gold-50/50 transition-colors">
                <f.icon className="w-5 h-5 text-rose-700" />
                <span className="mt-3 block font-semibold text-ink-900">{f.label}</span>
                <span className="block text-xs text-ink-400">{f.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RANKING */}
      <section id="zebricek" className="container-wide pt-16 lg:pt-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Žebříček {monthYear()}</p>
            <h2 className="h-section mt-2">Top 10 seznamek v České republice</h2>
            <p className="lead mt-3 max-w-2xl">Pořadí sestavuje redakce podle hodnocení, vhodnosti pro české uživatele a spolupráce s partnery. Body u každé seznamky počítáme stejně.</p>
          </div>
          <Link href="/seznamky" className="btn-line self-start md:self-auto">Kompletní srovnání <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <RankedList produkty={top10} source="homepage" />
      </section>

      {/* TABLE */}
      <section className="container-wide pt-16 lg:pt-20">
        <p className="eyebrow">Přehledně v tabulce</p>
        <h2 className="h-section mt-2 mb-8">Srovnání seznamek podle parametrů</h2>
        <ComparisonTable produkty={produkty} limit={8} source="homepage" />
      </section>

      {/* METHODOLOGY */}
      <section className="container-wide pt-16 lg:pt-20">
        <div className="rounded-3xl bg-ink-900 text-white p-8 md:p-12 grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <p className="eyebrow-light">Metodika</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Jak hodnotíme seznamky</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Každou seznamku procházíme podle stejných pravidel: registrace, profil, párování, komunikace, ceník a zrušení členství.
              Body přidělujeme v šesti oblastech.
            </p>
            <Link href="/jak-hodnotime" className="mt-6 inline-flex items-center gap-1 text-gold-300 hover:text-gold-200 font-medium">
              Celá metodika <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, t: 'Bezpečnost a ověřování', d: 'Kontrola profilů, ochrana dat, nahlašování.' },
              { icon: Heart, t: 'Kvalita párování', d: 'Jak dobře seznamka doporučuje vhodné lidi.' },
              { icon: ClipboardCheck, t: 'Aktivita uživatelů', d: 'Kolik lidí z ČR reálně odpovídá.' },
              { icon: Scale, t: 'Cena a férovost', d: 'Co dostanete zdarma, skryté poplatky, prodlužování.' },
              { icon: Sparkles, t: 'Ovládání a aplikace', d: 'Web i mobil, rychlost, přehlednost.' },
              { icon: RefreshCw, t: 'Aktuálnost', d: 'Ceny a funkce ověřujeme každý měsíc.' },
            ].map(c => (
              <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <c.icon className="w-5 h-5 text-gold-300" />
                <p className="mt-3 font-semibold">{c.t}</p>
                <p className="mt-1 text-sm text-white/55">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-wide pt-16 lg:pt-20">
        <p className="eyebrow">Kategorie</p>
        <h2 className="h-section mt-2 mb-8">Seznamky podle toho, co hledáte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kategorie.filter(k => k.slug !== 'vsechny-seznamky').map(kat => {
            const count = produkty.filter(p => p.categories?.includes(kat.slug)).length
            return (
              <Link key={kat.id} href={`/kategorie/${kat.slug}`} className="panel-hover p-6 group">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-ink-900 group-hover:text-rose-700">{kat.name}</h3>
                  <span className="chip-ink whitespace-nowrap">{count} {count === 1 ? 'seznamka' : count < 5 ? 'seznamky' : 'seznamek'}</span>
                </div>
                <p className="mt-2 text-sm text-ink-500 line-clamp-2">{kat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rose-700">
                  Zobrazit srovnání <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="container-x pt-16 lg:pt-20">
        <div className="prose-review mx-auto">
          <h2>Jak vybrat seznamku, která bude fungovat</h2>
          <p>
            Online seznamování je dnes nejčastější způsob, jak se v Česku páry potkávají. Ne každá seznamka se ale hodí pro každého.
            Aplikace typu Tinder nebo Badoo stojí na rychlém swipování podle fotek. Fungují hlavně pro lidi do třiceti a pro flirt.
            Kdo hledá <Link href="/kategorie/vazne-vztahy">vážný vztah</Link>, většinou dopadne lépe na seznamce, která páruje podle osobnostního testu.
            Příkladem jsou <Link href="/seznamky/elite-date">ELITE Date</Link>, <Link href="/seznamky/academic-singles">Academic Singles</Link> nebo <Link href="/seznamky/be2">be2</Link>.
          </p>
          <p>
            Při výběru sledujte tři věci. První je <strong>věk a záměr uživatelů</strong>: jestli tam jsou lidé ve vašem věku a se stejným cílem.
            Druhá je <strong>cena a podmínky</strong>: kolik stojí členství, jestli se automaticky prodlužuje a co dostanete zdarma.
            Třetí je <strong>bezpečnost</strong>: jestli seznamka kontroluje profily a jak rychle řeší nahlášení.
            Lidem nad 50 let doporučujeme specializované <Link href="/kategorie/senior-seznamky">seznamky pro seniory</Link>, kde je víc vrstevníků a méně falešných profilů.
          </p>
          <p>
            Nevíte, kde začít? Přečtěte si průvodce <Link href="/clanky/jak-vybrat-spravnou-seznamku">jak vybrat správnou seznamku</Link>{" "}
            a tipy, <Link href="/clanky/jak-napsat-atraktivni-profil">jak napsat profil</Link>, na který lidé odpovídají.
          </p>
        </div>
      </section>

      {/* MAGAZINE */}
      <section className="container-wide pt-16 lg:pt-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Magazín</p>
            <h2 className="h-section mt-2">Rady a tipy pro seznamování</h2>
          </div>
          <Link href="/clanky" className="hidden sm:inline-flex btn-line">Všechny články <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentClanky.map(c => <ArticleCard key={c.id} clanek={c} />)}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={homeFaq} title="Časté otázky o seznamkách" />

      {/* FINAL CTA */}
      {top3[0] && (
        <section className="container-wide pt-4">
          <div className="hero-dark rounded-3xl px-6 py-12 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 flex items-center gap-5">
              <ScoreBadge rating={top3[0].rating} size="lg" />
              <div>
                <p className="eyebrow-light">Vítěz srovnání {CURRENT_YEAR}</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">{top3[0].name}</h2>
                <p className="mt-1 text-white/60">{top3[0].shortDescription || top3[0].description}</p>
              </div>
            </div>
            <AffiliateLink produkt={top3[0]} source="homepage" placement="bottom-cta" className="relative z-10 btn-gold whitespace-nowrap">
              Registrovat se zdarma <ChevronRight className="w-4 h-4" />
            </AffiliateLink>
          </div>
        </section>
      )}
    </div>
  )
}
