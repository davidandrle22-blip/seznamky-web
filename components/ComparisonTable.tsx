'use client'

import Link from 'next/link'
import { Star, Check, X, ExternalLink, Crown, TrendingUp, Heart } from 'lucide-react'
import { Produkt } from '@/lib/types'

interface ComparisonTableProps {
  produkty: Produkt[]
  limit?: number
}

export default function ComparisonTable({ produkty, limit = 5 }: ComparisonTableProps) {
  const displayProdukty = produkty.slice(0, limit)

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-500" />
    if (rank === 2) return <TrendingUp className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Heart className="w-5 h-5 text-amber-600" />
    return null
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-gradient-to-r from-romantic-600 via-romantic-500 to-crimson-500">
            <th className="text-white font-bold py-4 px-6 text-left rounded-tl-xl">#</th>
            <th className="text-white font-bold py-4 px-6 text-left">Seznamka</th>
            <th className="text-white font-bold py-4 px-6 text-center">Hodnocení</th>
            <th className="text-white font-bold py-4 px-6 text-center">Uživatelé</th>
            <th className="text-white font-bold py-4 px-6 text-center">Úspěšnost</th>
            <th className="text-white font-bold py-4 px-6 text-center">Věk</th>
            <th className="text-white font-bold py-4 px-6 text-center">Zdarma</th>
            <th className="text-white font-bold py-4 px-6 text-center">Cena</th>
            <th className="text-white font-bold py-4 px-6 text-center rounded-tr-xl">Akce</th>
          </tr>
        </thead>
        <tbody>
          {displayProdukty.map((produkt, index) => {
            const rank = index + 1
            const isTop = rank <= 3

            return (
              <tr
                key={produkt.id}
                className={`
                  border-b border-gray-100 transition-colors
                  ${rank === 1 ? 'bg-amber-50/50' : 'bg-white hover:bg-romantic-50/30'}
                `}
              >
                {/* Rank */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {getRankIcon(rank)}
                    <span className={`
                      font-bold text-lg
                      ${rank === 1 ? 'text-amber-600' : rank <= 3 ? 'text-gray-700' : 'text-gray-500'}
                    `}>
                      {rank}
                    </span>
                  </div>
                </td>

                {/* Name */}
                <td className="py-4 px-6">
                  <Link
                    href={`/seznamky/${produkt.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <div className={`
                      w-12 h-12 rounded-xl
                      bg-gradient-to-br from-romantic-100 to-romantic-50
                      flex items-center justify-center
                      text-xl font-bold text-romantic-600
                      border ${rank === 1 ? 'border-amber-300' : 'border-romantic-200'}
                      group-hover:scale-105 transition-transform
                    `}>
                      {produkt.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-romantic-600 transition-colors flex items-center gap-2">
                        {produkt.name}
                        {produkt.isNew && (
                          <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded uppercase font-bold">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {produkt.shortDescription || produkt.categories.join(', ')}
                      </div>
                    </div>
                  </Link>
                </td>

                {/* Rating */}
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className={`
                      font-bold text-xl
                      ${produkt.rating >= 9 ? 'text-green-600' :
                        produkt.rating >= 8 ? 'text-romantic-600' :
                        produkt.rating >= 7 ? 'text-amber-600' : 'text-gray-600'}
                    `}>
                      {produkt.rating}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
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
                <td className="py-4 px-6 text-center">
                  <span className="font-semibold text-gray-700">{produkt.users}</span>
                </td>

                {/* Success Rate */}
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center gap-1">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: produkt.successRate || '70%' }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {produkt.successRate || '70%'}
                    </span>
                  </div>
                </td>

                {/* Age Range */}
                <td className="py-4 px-6 text-center">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm font-medium">
                    {produkt.ageRange}
                  </span>
                </td>

                {/* Free Version */}
                <td className="py-4 px-6 text-center">
                  {produkt.freeVersion ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                      <X className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </td>

                {/* Price */}
                <td className="py-4 px-6 text-center">
                  <span className="font-bold text-romantic-600">{produkt.pricing}</span>
                </td>

                {/* Action */}
                <td className="py-4 px-6 text-center">
                  <a
                    href={produkt.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm
                      transition-all duration-300
                      ${rank === 1
                        ? 'bg-gradient-to-r from-romantic-600 to-crimson-500 text-white hover:shadow-lg hover:-translate-y-0.5'
                        : 'bg-romantic-100 text-romantic-700 hover:bg-romantic-200'
                      }
                    `}
                  >
                    Navštívit
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
