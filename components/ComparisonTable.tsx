'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Produkt } from '@/lib/types'
import AffiliateLink, { AffiliateSource } from './AffiliateLink'

interface ComparisonTableProps {
  produkty: Produkt[]
  limit?: number
  source?: AffiliateSource
}

export default function ComparisonTable({ produkty, limit = 20, source = 'table' }: ComparisonTableProps) {
  const displayProdukty = produkty.slice(0, limit)

  const getHodnoceni = (rating: number) => {
    if (rating >= 9) return 'Výborné'
    if (rating >= 8) return 'Velmi dobré'
    if (rating >= 7) return 'Dobré'
    return 'Průměrné'
  }

  const getOceneni = (rank: number, name: string) => {
    // Speciální ocenění pro prioritní seznamky
    if (name === 'ELITE Date') return 'Vítěz srovnání'
    if (name === 'Victoria Milan') return 'Nejlepší pro diskrétní'
    if (name === 'Academic Singles') return 'Nejlepší pro vzdělané'

    // Ostatní podle pořadí
    if (rank === 1) return 'Vítěz srovnání'
    if (rank === 2) return 'Nejlepší alternativa'
    if (rank === 3) return 'Doporučujeme'
    if (rank <= 5) return 'Oblíbená volba'
    if (rank <= 8) return 'Kvalitní služba'
    return 'Dobrá volba'
  }

  const getOceneniBg = (rank: number, name: string) => {
    if (name === 'ELITE Date') return 'bg-yellow-400 text-yellow-900'
    if (name === 'Victoria Milan') return 'bg-purple-200 text-purple-800'
    if (name === 'Academic Singles') return 'bg-blue-200 text-blue-800'

    if (rank === 1) return 'bg-yellow-400 text-yellow-900'
    if (rank === 2) return 'bg-gray-300 text-gray-800'
    if (rank === 3) return 'bg-orange-200 text-orange-800'
    if (rank <= 5) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[800px] border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-[#24447b] text-white text-sm">
            <th className="py-3 px-3 text-left font-semibold border-r border-[#1a3460]">Ocenění</th>
            <th className="py-3 px-3 text-left font-semibold border-r border-[#1a3460]">Hodnocení</th>
            <th className="py-3 px-3 text-left font-semibold border-r border-[#1a3460]">Produkt</th>
            <th className="py-3 px-3 text-left font-semibold border-r border-[#1a3460]">Klady</th>
            <th className="py-3 px-3 text-left font-semibold border-r border-[#1a3460]">Zápory</th>
            <th className="py-3 px-4 text-center font-semibold">Aktuální nabídka</th>
          </tr>
        </thead>

        <tbody>
          {displayProdukty.map((produkt, index) => {
            const rank = index + 1
            const hodnoceni = getHodnoceni(produkt.rating)
            const oceneni = getOceneni(rank, produkt.name)
            const oceneniBg = getOceneniBg(rank, produkt.name)
            const isPriority = produkt.slug === 'elite-date' || produkt.slug === 'victoria-milan' || produkt.slug === 'academic-singles'
            const isFirst = rank === 1 || produkt.slug === 'elite-date'

            return (
              <tr
                key={produkt.id}
                className={`
                  border-b border-gray-200
                  ${produkt.slug === 'elite-date' ? 'bg-yellow-50 ring-2 ring-yellow-400 ring-inset' :
                    produkt.slug === 'victoria-milan' ? 'bg-purple-50' :
                    produkt.slug === 'academic-singles' ? 'bg-emerald-50' :
                    rank % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  hover:bg-blue-50 transition-colors
                `}
              >
                {/* Ocenění */}
                <td className="py-4 px-3 align-middle border-r border-gray-200 w-[140px]">
                  <span className={`
                    inline-block text-xs font-bold px-2 py-1 rounded
                    ${oceneniBg}
                  `}>
                    {oceneni}
                  </span>
                </td>

                {/* Hodnocení */}
                <td className="py-4 px-3 align-middle border-r border-gray-200 w-[100px]">
                  <div className="text-center">
                    <div className={`
                      text-sm font-bold px-2 py-1 rounded
                      ${hodnoceni === 'Výborné' ? 'bg-green-100 text-green-800' :
                        hodnoceni === 'Velmi dobré' ? 'bg-blue-100 text-blue-800' :
                        hodnoceni === 'Dobré' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {hodnoceni}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{produkt.rating}/10</div>
                  </div>
                </td>

                {/* Produkt - Logo a název */}
                <td className="py-4 px-3 align-middle border-r border-gray-200 w-[180px]">
                  <Link href={`/seznamky/${produkt.slug}`} className="flex items-center gap-3 group">
                    <div className="relative w-[60px] h-[60px] flex-shrink-0 bg-white rounded border border-gray-200 overflow-hidden">
                      <Image
                        src={produkt.logo}
                        alt={produkt.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="font-semibold text-gray-900 group-hover:text-[#24447b] transition-colors">
                      {produkt.name}
                    </span>
                  </Link>
                </td>

                {/* Klady */}
                <td className="py-4 px-3 align-top border-r border-gray-200">
                  <ul className="text-sm space-y-1">
                    {produkt.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>

                {/* Zápory */}
                <td className="py-4 px-3 align-top border-r border-gray-200">
                  <ul className="text-sm space-y-1">
                    {produkt.cons.slice(0, 2).map((con, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-red-500 font-bold">•</span>
                        <span className="text-gray-600">{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>

                {/* CTA */}
                <td className="py-4 px-4 align-middle text-center w-[160px]">
                  <AffiliateLink
                    produkt={produkt}
                    source={source}
                    placement="table-row"
                    className={`
                      inline-block text-white text-sm font-semibold py-2.5 px-4 rounded transition-all w-full
                      ${produkt.slug === 'elite-date'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg shadow-orange-500/30 animate-pulse'
                        : produkt.slug === 'victoria-milan'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/30'
                        : produkt.slug === 'academic-singles'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-500/30'
                        : 'bg-[#24447b] hover:bg-[#1a3460]'}
                    `}
                  >
                    {isPriority ? '🔥 Vyzkoušet ZDARMA' : 'Registrace do seznamky'}
                  </AffiliateLink>
                  <Link
                    href={`/seznamky/${produkt.slug}`}
                    className="block text-xs text-[#24447b] hover:underline mt-2"
                  >
                    Zobrazit recenzi
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
