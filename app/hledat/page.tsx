import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getProdukty } from '@/lib/data'
import RankedList from '@/components/RankedList'
import SeznamkaFinder, { CIL_OPTIONS } from '@/components/SeznamkaFinder'
import { isTracked, priorityIndex } from '@/lib/monetization'
import { Produkt } from '@/lib/types'

export const metadata = {
  title: 'Vyhledávač seznamek – najděte seznamku podle věku a toho, co hledáte',
  description: 'Zadejte, kdo jste, koho hledáte, svůj věk a co hledáte. Vyhledávač vám doporučí seznamky, které se k vám hodí nejvíc.',
  alternates: { canonical: '/hledat' },
  robots: { index: false, follow: true },
}

interface Props {
  searchParams: { ja?: string; hledam?: string; vek?: string; cil?: string }
}

const GAY = new Set(['gkontakt', 'kerl', 'grindr', 'planetromeo', 'tsdates'])
const LESBIAN = new Set(['her', 'okcupid'])
/** Seznamky, kde lze hledat i stejné pohlaví */
const SAME_SEX_OK = new Set(['academic-singles', 'okcupid', 'adult-friend-finder'])
const COUPLES = new Set(['adult-friend-finder', 'swapfinder', 'victoria-milan', 'alt-com', 'eroticky-kontakt', 'bezzavazku', 'freerande'])

/** Rozsah věku seznamky („30-55“, „40+“, „18+“) */
function ageBounds(range: string): [number, number] {
  const m = range.match(/(\d+)\s*[-–]\s*(\d+)/)
  if (m) return [Number(m[1]), Number(m[2])]
  const p = range.match(/(\d+)\s*\+/)
  if (p) return [Number(p[1]), 99]
  return [18, 99]
}

function vekBounds(vek?: string): [number, number] {
  if (!vek) return [25, 34]
  if (vek.endsWith('+')) return [Number(vek.slice(0, -1)), 99]
  const [a, b] = vek.split('-').map(Number)
  return [a || 18, b || 99]
}

const CIL_CATS: Record<string, string[]> = {
  vztah: ['vazne-vztahy', 'nejlepsi-seznamky'],
  flirt: ['flirt-seznamky', 'seznamky-zdarma'],
  sex: ['sex-seznamky'],
  diskretni: ['seznamky-pro-zadane', 'luxusni-seznamky'],
  vse: [],
}

function score(p: Produkt, q: Props['searchParams']): number | null {
  const ja = q.ja === 'zena' ? 'zena' : 'muz'
  const hledam = q.hledam === 'muze' || q.hledam === 'par' ? q.hledam : 'zenu'
  const sameSex = (ja === 'muz' && hledam === 'muze') || (ja === 'zena' && hledam === 'zenu')

  // Orientace: tvrdé filtry
  if (sameSex) {
    const ok = ja === 'muz' ? GAY.has(p.slug) || SAME_SEX_OK.has(p.slug) : LESBIAN.has(p.slug) || SAME_SEX_OK.has(p.slug)
    if (!ok) return null
  } else if (GAY.has(p.slug) || LESBIAN.has(p.slug)) {
    return null
  }
  if (hledam === 'par' && !COUPLES.has(p.slug)) return null

  // Věk: seznamka musí pokrývat věk uživatele
  const [ua, ub] = vekBounds(q.vek)
  const [pa, pb] = ageBounds(p.ageRange)
  if (ub < pa || ua > pb) return null

  let s = p.rating * 10
  const cats = CIL_CATS[q.cil || 'vse'] || []
  if (cats.length) {
    if (p.categories.some(c => cats.includes(c))) s += 40
    else s -= 60
  }
  if (sameSex && (GAY.has(p.slug) || LESBIAN.has(p.slug))) s += 80
  if (ua >= 50 && p.categories.includes('senior-seznamky')) s += 35
  if (ua >= 45 && p.slug === 'singles50') s += 15
  if (isTracked(p.slug)) s += 30
  s -= Math.min(priorityIndex(p.slug), 60) * 0.3
  return s
}

const LABEL: Record<string, string> = { muz: 'muž', zena: 'žena', zenu: 'ženu', muze: 'muže', par: 'pár' }

export default async function HledatPage({ searchParams }: Props) {
  const all = await getProdukty()
  const results = all
    .map(p => ({ p, s: score(p, searchParams) }))
    .filter((x): x is { p: Produkt; s: number } => x.s !== null)
    .sort((a, b) => b.s - a.s)
    .slice(0, 10)
    .map(x => x.p)

  const asked = Boolean(searchParams.ja || searchParams.hledam || searchParams.vek || searchParams.cil)
  const cilLabel = CIL_OPTIONS.find(c => c.value === searchParams.cil)?.label.toLowerCase()

  return (
    <div>
      <section className="hero-dark">
        <div className="relative z-10 container-wide py-12 lg:py-16">
          <nav className="text-sm text-white/50 mb-6" aria-label="Drobečková navigace">
            <Link href="/" className="hover:text-white">Domů</Link><span className="mx-1.5">/</span>
            <span className="text-white/80">Vyhledávač seznamek</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-semibold text-white text-balance">
            {asked ? 'Seznamky vybrané pro vás' : 'Vyhledávač seznamek'}
          </h1>
          {asked && (
            <p className="mt-4 text-lg text-white/65">
              Jsem {LABEL[searchParams.ja || 'muz']}, hledám {LABEL[searchParams.hledam || 'zenu']}
              {searchParams.vek ? `, věk ${searchParams.vek} let` : ''}{cilLabel && searchParams.cil !== 'vse' ? `, ${cilLabel}` : ''}.
            </p>
          )}
        </div>
      </section>

      <section className="container-wide pt-10">
        <SeznamkaFinder defaults={searchParams} compact />
      </section>

      <section className="container-wide pt-12">
        {results.length > 0 ? (
          <>
            <h2 className="h-section mb-8">{results.length} doporučených seznamek</h2>
            <RankedList produkty={results} source="seznamky" />
          </>
        ) : (
          <div className="panel p-8 text-center">
            <p className="text-ink-700">Pro tuto kombinaci jsme nenašli vhodnou seznamku. Zkuste upravit věk nebo cíl.</p>
            <Link href="/seznamky" className="mt-4 inline-flex items-center gap-1 text-rose-700 font-medium">Zobrazit všechny seznamky <ChevronRight className="w-4 h-4" /></Link>
          </div>
        )}
      </section>

      <section className="container-wide pt-12">
        <p className="text-sm text-ink-500">
          Hledáte podle místa? Projděte <Link href="/seznameni" className="text-rose-700 font-medium">seznámení podle měst a krajů</Link>.
        </p>
      </section>
    </div>
  )
}
