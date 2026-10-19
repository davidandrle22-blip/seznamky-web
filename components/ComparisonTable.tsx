import Link from 'next/link'
import Image from 'next/image'
import { Check, Minus } from 'lucide-react'
import { Produkt } from '@/lib/types'
import AffiliateLink, { AffiliateSource } from './AffiliateLink'
import { sortByPriority, isTracked, AWARDS } from '@/lib/monetization'

interface ComparisonTableProps {
  produkty: Produkt[]
  limit?: number
  source?: AffiliateSource
  /** zachovat pořadí z rodiče (např. kategorie s doporučeními) */
  keepOrder?: boolean
}

/**
 * Srovnávací tabulka – data se berou výhradně z produkty.json,
 * žádné hodnoty nejsou v tabulce natvrdo (dřívější chyba: „mobilní aplikace“ a „ověřené profily“ byly vymyšlené).
 */
export default function ComparisonTable({ produkty, limit = 20, source = 'table', keepOrder = false }: ComparisonTableProps) {
  const rows = (keepOrder ? produkty : sortByPriority(produkty)).slice(0, limit)

  const hasApp = (p: Produkt) => Boolean(p.hasApp)

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:block panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-premium min-w-[860px]">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th>Seznamka</th>
                <th className="text-center">Hodnocení</th>
                <th>Pro koho</th>
                <th className="text-center">Věk</th>
                <th className="text-center">Registrace zdarma</th>
                <th className="text-center">Aplikace</th>
                <th className="text-center w-[170px]">Nabídka</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const tracked = isTracked(p.slug)
                return (
                  <tr key={p.id}>
                    <td className="font-display text-lg font-semibold text-ink-400">{i + 1}</td>
                    <td>
                      <Link href={`/seznamky/${p.slug}`} className="flex items-center gap-3 group">
                        <span className="relative w-11 h-11 shrink-0 rounded-lg border border-ivory-300 bg-white overflow-hidden">
                          <Image src={p.logo} alt={`${p.name} logo`} fill sizes="44px" className="object-contain p-1" />
                        </span>
                        <span>
                          <span className="block font-semibold text-ink-900 group-hover:text-rose-700">{p.name}</span>
                          {AWARDS[p.slug] && <span className="block text-[11px] text-gold-700">{AWARDS[p.slug]}</span>}
                        </span>
                      </Link>
                    </td>
                    <td className="text-center">
                      <span className="inline-flex items-center justify-center rounded-lg bg-ink-900 text-white font-semibold px-2.5 py-1 text-sm">
                        {p.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="text-ink-500 max-w-[220px]">
                      <span className="line-clamp-2">{p.targetAudience || p.shortDescription || p.description}</span>
                    </td>
                    <td className="text-center text-ink-600 whitespace-nowrap">{p.ageRange}</td>
                    <td className="text-center">
                      {p.freeVersion ? <Check className="w-5 h-5 mx-auto text-emerald-600" aria-label="Ano" /> : <Minus className="w-5 h-5 mx-auto text-ink-300" aria-label="Ne" />}
                    </td>
                    <td className="text-center">
                      {hasApp(p) ? <Check className="w-5 h-5 mx-auto text-emerald-600" aria-label="Ano" /> : <Minus className="w-5 h-5 mx-auto text-ink-300" aria-label="Ne" />}
                    </td>
                    <td className="text-center">
                      <AffiliateLink
                        produkt={p}
                        source={source}
                        placement="comparison-table"
                        className={`${tracked ? (i === 0 ? 'btn-gold' : 'btn-wine') : 'btn-line'} !py-2.5 !px-4 text-sm w-full whitespace-nowrap`}
                      >
                        {tracked ? 'Vyzkoušet' : 'Navštívit'}
                      </AffiliateLink>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobil */}
      <div className="md:hidden space-y-3">
        {rows.map((p, i) => {
          const tracked = isTracked(p.slug)
          return (
            <div key={p.id} className="panel p-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-semibold text-ink-300 w-5">{i + 1}</span>
                <span className="relative w-12 h-12 shrink-0 rounded-lg border border-ivory-300 bg-white overflow-hidden">
                  <Image src={p.logo} alt={`${p.name} logo`} fill sizes="48px" className="object-contain p-1" />
                </span>
                <div className="flex-1 min-w-0">
                  <Link href={`/seznamky/${p.slug}`} className="font-semibold text-ink-900">{p.name}</Link>
                  <p className="text-xs text-ink-400">Věk {p.ageRange}{p.freeVersion ? ' · registrace zdarma' : ''}</p>
                </div>
                <span className="rounded-lg bg-ink-900 text-white font-semibold px-2.5 py-1 text-sm">{p.rating.toFixed(1)}</span>
              </div>
              <AffiliateLink
                produkt={p}
                source={source}
                placement="comparison-mobile"
                className={`${tracked ? (i === 0 ? 'btn-gold' : 'btn-wine') : 'btn-line'} w-full mt-3 !py-2.5 text-sm`}
              >
                {tracked ? `Vyzkoušet ${p.name} zdarma` : `Navštívit ${p.name}`}
              </AffiliateLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}
