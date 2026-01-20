'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Check, X, ExternalLink, Crown, Trophy, Medal, Heart, Gift, Zap, Shield, Award } from 'lucide-react'
import { Produkt } from '@/lib/types'

interface ComparisonTableProps {
  produkty: Produkt[]
  limit?: number
}

export default function ComparisonTable({ produkty, limit = 5 }: ComparisonTableProps) {
  const displayProdukty = produkty.slice(0, limit)

  const getRankBadge = (rank: number) => {
    if (rank === 1) return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Vítěz</span>
      </div>
    )
    if (rank === 2) return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-md">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-bold text-gray-500">#{rank}</span>
      </div>
    )
    if (rank === 3) return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
          <Medal className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-bold text-amber-700">#{rank}</span>
      </div>
    )
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-gray-600">#{rank}</span>
        </div>
      </div>
    )
  }

  const getRatingBadge = (rating: number) => {
    if (rating >= 9) return { bg: 'bg-green-500', text: 'Výborné' }
    if (rating >= 8) return { bg: 'bg-green-400', text: 'Velmi dobré' }
    if (rating >= 7) return { bg: 'bg-amber-500', text: 'Dobré' }
    return { bg: 'bg-gray-400', text: 'Průměrné' }
  }

  return (
    <div className="space-y-4">
      {displayProdukty.map((produkt, index) => {
        const rank = index + 1
        const ratingInfo = getRatingBadge(produkt.rating)
        const isWinner = rank === 1

        return (
          <div
            key={produkt.id}
            className={`
              relative bg-white rounded-2xl border-2 overflow-hidden
              transition-all duration-300 hover:shadow-xl
              ${isWinner
                ? 'border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-200'
                : 'border-gray-100 hover:border-romantic-200'}
            `}
          >
            {/* Winner banner */}
            {isWinner && (
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-white py-2 px-4 flex items-center justify-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-bold text-sm">🏆 Vítěz srovnání 2026 - Nejlepší volba redakce</span>
                <Award className="w-5 h-5" />
              </div>
            )}

            <div className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">

                {/* Rank badge */}
                <div className="flex-shrink-0 hidden md:block">
                  {getRankBadge(rank)}
                </div>

                {/* Logo & Name */}
                <div className="flex items-center gap-4 flex-shrink-0 lg:w-56">
                  <div className="md:hidden">
                    {getRankBadge(rank)}
                  </div>
                  <Link
                    href={`/seznamky/${produkt.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <div className={`
                      relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden
                      bg-gray-50 flex-shrink-0 border-2
                      ${isWinner ? 'border-amber-300' : 'border-gray-100'}
                      group-hover:scale-105 transition-transform
                    `}>
                      <Image
                        src={produkt.logo}
                        alt={produkt.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-romantic-600 transition-colors text-lg">
                        {produkt.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {produkt.users} uživatelů
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Rating */}
                <div className="flex-shrink-0 lg:w-24 text-center">
                  <div className={`
                    inline-flex flex-col items-center justify-center
                    ${ratingInfo.bg} text-white rounded-xl px-3 py-2 min-w-[70px]
                  `}>
                    <span className="text-2xl font-bold">{produkt.rating}</span>
                    <span className="text-[10px] uppercase tracking-wide opacity-90">{ratingInfo.text}</span>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {/* Pros */}
                  <div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Výhody
                    </div>
                    <ul className="space-y-1.5">
                      {produkt.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Nevýhody
                    </div>
                    <ul className="space-y-1.5">
                      {produkt.cons.slice(0, 2).map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-2 flex-shrink-0 w-full lg:w-auto">
                  <a
                    href={produkt.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm
                      transition-all duration-300 w-full lg:w-auto min-w-[160px]
                      ${isWinner
                        ? 'bg-gradient-to-r from-romantic-600 to-crimson-500 text-white hover:shadow-xl hover:shadow-romantic-500/30 hover:-translate-y-0.5'
                        : rank <= 3
                        ? 'bg-romantic-600 text-white hover:bg-romantic-700 hover:shadow-lg'
                        : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                      }
                    `}
                  >
                    {isWinner ? (
                      <>
                        <Zap className="w-4 h-4" />
                        Registrovat se
                      </>
                    ) : (
                      <>
                        Navštívit web
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </a>
                  <Link
                    href={`/seznamky/${produkt.slug}`}
                    className="text-center text-sm text-gray-500 hover:text-romantic-600 transition-colors"
                  >
                    Zobrazit recenzi →
                  </Link>
                  {produkt.freeVersion && (
                    <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                      <Gift className="w-3.5 h-3.5" />
                      <span>Registrace zdarma</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Bottom trust banner */}
      <div className="bg-gradient-to-r from-romantic-50 to-pink-50 rounded-xl p-4 border border-romantic-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-900">✅ Všechny seznamky osobně testujeme</span>
              <span className="text-gray-600 ml-1">a hodnotíme nezávisle</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>📅 Aktualizováno: Leden 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
