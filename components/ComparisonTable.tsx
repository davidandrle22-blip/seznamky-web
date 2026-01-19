'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Check, X, ExternalLink, Crown, TrendingUp, Heart, Gift, Zap, Shield } from 'lucide-react'
import { Produkt } from '@/lib/types'

interface ComparisonTableProps {
  produkty: Produkt[]
  limit?: number
}

export default function ComparisonTable({ produkty, limit = 5 }: ComparisonTableProps) {
  const displayProdukty = produkty.slice(0, limit)

  const getRankBadge = (rank: number) => {
    if (rank === 1) return (
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-lg font-bold">
        <Crown className="w-4 h-4" />
        <span>#1</span>
      </div>
    )
    if (rank === 2) return (
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1.5 rounded-lg font-bold">
        <span>#2</span>
      </div>
    )
    if (rank === 3) return (
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1.5 rounded-lg font-bold">
        <span>#3</span>
      </div>
    )
    return (
      <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-bold">
        <span>#{rank}</span>
      </div>
    )
  }

  const getPromoLabel = (produkt: Produkt, rank: number) => {
    if (rank === 1) return { text: 'Nejlepší volba 2026', color: 'bg-green-500' }
    if (produkt.categories.includes('diskretni')) {
      return { text: '100% diskrétní', color: 'bg-purple-500' }
    }
    if (produkt.isNew) {
      return { text: 'Nové!', color: 'bg-pink-500' }
    }
    if (produkt.freeVersion) {
      return { text: 'Zdarma k vyzkoušení', color: 'bg-teal-500' }
    }
    return null
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-xl bg-white">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="bg-gradient-to-r from-romantic-700 via-romantic-600 to-crimson-600">
            <th className="text-white font-bold py-4 px-4 text-left rounded-tl-xl">Pořadí</th>
            <th className="text-white font-bold py-4 px-4 text-left">Seznamka</th>
            <th className="text-white font-bold py-4 px-4 text-center">Hodnocení</th>
            <th className="text-white font-bold py-4 px-4 text-center">Uživatelé</th>
            <th className="text-white font-bold py-4 px-4 text-center">Úspěšnost</th>
            <th className="text-white font-bold py-4 px-4 text-center">Zdarma</th>
            <th className="text-white font-bold py-4 px-6 text-center rounded-tr-xl min-w-[180px]">Akce</th>
          </tr>
        </thead>
        <tbody>
          {displayProdukty.map((produkt, index) => {
            const rank = index + 1
            const promo = getPromoLabel(produkt, rank)

            return (
              <tr
                key={produkt.id}
                className={`
                  border-b border-gray-100 transition-all duration-200 relative
                  ${rank === 1 ? 'bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50/50 shadow-inner' : 'bg-white hover:bg-romantic-50/40'}
                `}
              >
                {/* Special indicator for #1 */}
                {rank === 1 && (
                  <td className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-romantic-500 to-amber-400"></td>
                )}
                {/* Rank */}
                <td className="py-5 px-4">
                  <div className="flex flex-col items-start gap-1">
                    {getRankBadge(rank)}
                    {rank === 1 && (
                      <span className="text-[10px] font-bold text-romantic-600 uppercase tracking-wide">Volba redakce</span>
                    )}
                  </div>
                </td>

                {/* Name with Logo */}
                <td className="py-5 px-4">
                  <Link
                    href={`/seznamky/${produkt.slug}`}
                    className="group flex items-center gap-4"
                  >
                    <div className={`
                      relative w-14 h-14 rounded-xl overflow-hidden
                      bg-gray-100 flex-shrink-0
                      border-2 ${rank === 1 ? 'border-amber-400 shadow-lg shadow-amber-200/50' : 'border-gray-200'}
                      group-hover:scale-105 transition-transform
                    `}>
                      <Image
                        src={produkt.logo}
                        alt={produkt.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-romantic-600 transition-colors flex items-center gap-2 text-lg">
                        {produkt.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {produkt.shortDescription || produkt.categories.join(' • ')}
                      </div>
                      {promo && (
                        <span className={`inline-block mt-1.5 text-[10px] ${promo.color} text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wide`}>
                          {promo.text}
                        </span>
                      )}
                    </div>
                  </Link>
                </td>

                {/* Rating */}
                <td className="py-5 px-4 text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className={`
                      font-bold text-2xl
                      ${produkt.rating >= 9 ? 'text-green-600' :
                        produkt.rating >= 8 ? 'text-romantic-600' :
                        produkt.rating >= 7 ? 'text-amber-600' : 'text-gray-600'}
                    `}>
                      {produkt.rating}
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(produkt.rating / 2)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </td>

                {/* Users */}
                <td className="py-5 px-4 text-center">
                  <span className="font-bold text-gray-800 text-lg">{produkt.users}</span>
                  <div className="text-xs text-gray-500 mt-0.5">registrací</div>
                </td>

                {/* Success Rate */}
                <td className="py-5 px-4 text-center">
                  <div className="inline-flex flex-col items-center gap-1">
                    <span className={`font-bold text-lg ${
                      parseInt(produkt.successRate || '0') >= 80 ? 'text-green-600' :
                      parseInt(produkt.successRate || '0') >= 60 ? 'text-amber-600' : 'text-gray-600'
                    }`}>
                      {produkt.successRate || 'N/A'}
                    </span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all"
                        style={{ width: produkt.successRate || '0%' }}
                      />
                    </div>
                  </div>
                </td>

                {/* Free Version */}
                <td className="py-5 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {produkt.freeVersion ? (
                      <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-semibold">
                        <Gift className="w-4 h-4" />
                        Ano
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">Ne</span>
                    )}
                  </div>
                </td>

                {/* Action CTA */}
                <td className="py-5 px-4 text-center">
                  <a
                    href={produkt.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
                      transition-all duration-300 w-full max-w-[160px]
                      ${rank === 1
                        ? 'bg-gradient-to-r from-romantic-600 to-crimson-500 text-white hover:shadow-xl hover:shadow-romantic-500/30 hover:-translate-y-0.5'
                        : rank <= 3
                        ? 'bg-romantic-600 text-white hover:bg-romantic-700 hover:shadow-lg'
                        : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                      }
                    `}
                  >
                    {rank === 1 ? (
                      <>
                        <Zap className="w-4 h-4" />
                        Registrovat se
                      </>
                    ) : (
                      <>
                        Navštívit
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </a>
                  {rank <= 3 && (
                    <Link
                      href={`/seznamky/${produkt.slug}`}
                      className="block text-xs text-gray-500 hover:text-romantic-600 mt-2 transition-colors"
                    >
                      Zobrazit recenzi →
                    </Link>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Bottom conversion banner */}
      <div className="bg-gradient-to-r from-romantic-50 to-pink-50 p-4 border-t border-romantic-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-900">Všechny seznamky osobně testujeme</span>
              <span className="text-gray-600 ml-1">a hodnotíme nezávisle</span>
            </div>
          </div>
          <Link
            href="/jak-hodnotime"
            className="text-sm text-romantic-600 hover:text-romantic-700 font-semibold flex items-center gap-1"
          >
            Jak hodnotíme
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
