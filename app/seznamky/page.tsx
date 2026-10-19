import { Metadata } from 'next'
import Link from 'next/link'
import { getProdukty, getKategorie } from '@/lib/data'
import RankedList from '@/components/RankedList'
import ComparisonTable from '@/components/ComparisonTable'
import { ItemListSchema, BreadcrumbSchema } from '@/components/seo'
import { CURRENT_YEAR, monthYear, SITE_URL } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `Srovnání seznamek ${CURRENT_YEAR} – kompletní žebříček online seznamek v ČR`,
  description: `Kompletní srovnání online seznamek v ČR (${monthYear()}). Hodnocení, ceny, věk uživatelů, aplikace a registrace zdarma u ELITE Date, Victoria Milan, Academic Singles, Singles50, be2, Badoo, Tinder a dalších.`,
  alternates: { canonical: '/seznamky' },
  openGraph: {
    title: `Srovnání seznamek ${CURRENT_YEAR}`,
    description: 'Kompletní žebříček online seznamek v ČR podle hodnocení redakce.',
    url: `${SITE_URL}/seznamky`,
  },
}

interface Props {
  searchParams: { kategorie?: string }
}

export default async function SeznamkyPage({ searchParams }: Props) {
  const [produkty, kategorie] = await Promise.all([getProdukty(), getKategorie()])
  const selected = searchParams.kategorie
  const filtered = selected ? produkty.filter(p => p.categories?.includes(selected)) : produkty

  return (
    <div>
      <ItemListSchema name={`Srovnání seznamek ${CURRENT_YEAR}`} items={produkty.map(p => ({ name: p.name, url: `${SITE_URL}/seznamky/${p.slug}` }))} />
      <BreadcrumbSchema items={[{ name: 'Domů', url: `${SITE_URL}/` }, { name: 'Srovnání seznamek', url: `${SITE_URL}/seznamky` }]} />

      <section className="hero-dark">
        <div className="relative z-10 container-wide py-14 lg:py-20">
          <nav className="text-sm text-white/50 mb-6" aria-label="Drobečková navigace">
            <Link href="/" className="hover:text-white">Domů</Link> <span className="mx-1.5">/</span> <span className="text-white/80">Srovnání seznamek</span>
          </nav>
          <p className="eyebrow-light">Aktualizováno: {monthYear()}</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-white max-w-3xl text-balance">
            Srovnání seznamek {CURRENT_YEAR}: kompletní žebříček
          </h1>
          <p className="mt-5 text-lg text-white/65 max-w-2xl">
            Všech {produkty.length} seznamek, které jsme hodnotili, na jednom místě. Pořadí sestavuje redakce podle hodnocení
            a vhodnosti pro české uživatele.
          </p>
        </div>
      </section>

      <section className="container-wide -mt-6 relative z-20">
        <div className="panel p-3 flex gap-2 overflow-x-auto">
          <Link
            href="/seznamky"
            scroll={false}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${!selected ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ivory-100'}`}
          >
            Všechny ({produkty.length})
          </Link>
          {kategorie.filter(k => k.slug !== 'vsechny-seznamky').map(k => {
            const count = produkty.filter(p => p.categories?.includes(k.slug)).length
            if (!count) return null
            return (
              <Link
                key={k.id}
                href={`/seznamky?kategorie=${k.slug}`}
                scroll={false}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${selected === k.slug ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ivory-100'}`}
              >
                {k.name} ({count})
              </Link>
            )
          })}
        </div>
      </section>

      <section className="container-wide pt-10">
        <RankedList produkty={filtered} source="seznamky" highlightFirst={!selected} />
      </section>

      <section className="container-wide pt-16">
        <p className="eyebrow">Tabulka</p>
        <h2 className="h-section mt-2 mb-8">Parametry všech seznamek v přehledu</h2>
        <ComparisonTable produkty={filtered} limit={40} source="seznamky" />
        <p className="disclosure mt-4">
          Údaje o počtu registrací a věku vycházejí z informací provozovatelů a našeho testování. Ceny a funkce se mohou měnit,
          aktuální podmínky vždy ověřte na webu seznamky. Stránka obsahuje affiliate odkazy.
        </p>
      </section>
    </div>
  )
}
