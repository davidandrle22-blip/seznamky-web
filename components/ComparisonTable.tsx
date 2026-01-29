'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Check, X, Star, BookOpen, ExternalLink } from 'lucide-react'
import { Produkt } from '@/lib/types'
import AffiliateLink, { AffiliateSource } from './AffiliateLink'

interface ComparisonTableProps {
  produkty: Produkt[]
  limit?: number
  source?: AffiliateSource
}

// Prioritní pořadí seznamek - vždy dodrženo
const PRIORITY_ORDER = ['elite-date', 'victoria-milan', 'academic-singles']

function sortByPriority(produkty: Produkt[]): Produkt[] {
  const priorityMap = new Map(PRIORITY_ORDER.map((slug, index) => [slug, index]))

  return [...produkty].sort((a, b) => {
    const aPriority = priorityMap.get(a.slug) ?? 999
    const bPriority = priorityMap.get(b.slug) ?? 999

    if (aPriority !== bPriority) {
      return aPriority - bPriority
    }

    // Fallback to rating for non-priority items
    return b.rating - a.rating
  })
}

function getBadgeInfo(slug: string, rank: number) {
  if (slug === 'elite-date') {
    return { text: '#1 Doporučujeme', variant: 'elite' as const }
  }
  if (slug === 'victoria-milan') {
    return { text: 'Diskrétní vztahy', variant: 'victoria' as const }
  }
  if (slug === 'academic-singles') {
    return { text: 'Pro vzdělané', variant: 'academic' as const }
  }
  if (rank <= 5) {
    return { text: `#${rank} v žebříčku`, variant: 'default' as const }
  }
  return { text: 'Dobrá volba', variant: 'default' as const }
}

function getCardVariant(slug: string) {
  if (slug === 'elite-date') return 'elite'
  if (slug === 'victoria-milan') return 'victoria'
  if (slug === 'academic-singles') return 'academic'
  return 'default'
}

export default function ComparisonTable({ produkty, limit = 20, source = 'table' }: ComparisonTableProps) {
  const sortedProdukty = sortByPriority(produkty).slice(0, limit)

  const getHodnoceni = (rating: number) => {
    if (rating >= 9) return { text: 'Výborné', bg: 'bg-green-100 text-green-800' }
    if (rating >= 8) return { text: 'Velmi dobré', bg: 'bg-blue-100 text-blue-800' }
    if (rating >= 7) return { text: 'Dobré', bg: 'bg-yellow-100 text-yellow-800' }
    return { text: 'Průměrné', bg: 'bg-gray-100 text-gray-800' }
  }

  return (
    <div>
      {/* Desktop Table View */}
      <div className="comparison-table-desktop overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full min-w-[800px] border-collapse">
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
            {sortedProdukty.map((produkt, index) => {
              const rank = index + 1
              const hodnoceni = getHodnoceni(produkt.rating)
              const badge = getBadgeInfo(produkt.slug, rank)
              const variant = getCardVariant(produkt.slug)
              const isPriority = PRIORITY_ORDER.includes(produkt.slug)

              return (
                <tr
                  key={produkt.id}
                  className={`
                    border-b border-gray-200
                    ${variant === 'elite' ? 'bg-yellow-50 ring-2 ring-yellow-400 ring-inset' :
                      variant === 'victoria' ? 'bg-purple-50' :
                      variant === 'academic' ? 'bg-emerald-50' :
                      rank % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    hover:bg-blue-50 transition-colors
                  `}
                >
                  {/* Ocenění */}
                  <td className="py-4 px-3 align-middle border-r border-gray-200 w-[140px]">
                    <span className={`
                      inline-block text-xs font-bold px-2 py-1 rounded
                      ${variant === 'elite' ? 'bg-yellow-400 text-yellow-900' :
                        variant === 'victoria' ? 'bg-purple-200 text-purple-800' :
                        variant === 'academic' ? 'bg-emerald-200 text-emerald-800' :
                        'bg-gray-100 text-gray-700'}
                    `}>
                      {badge.text}
                    </span>
                  </td>

                  {/* Hodnocení */}
                  <td className="py-4 px-3 align-middle border-r border-gray-200 w-[100px]">
                    <div className="text-center">
                      <div className={`text-sm font-bold px-2 py-1 rounded ${hodnoceni.bg}`}>
                        {hodnoceni.text}
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
                        ${variant === 'elite'
                          ? 'cta-elite'
                          : variant === 'victoria'
                          ? 'cta-victoria'
                          : variant === 'academic'
                          ? 'cta-academic'
                          : 'cta-default'}
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

      {/* Mobile Cards View */}
      <div className="comparison-cards-mobile space-y-4 px-4">
        {sortedProdukty.map((produkt, index) => {
          const rank = index + 1
          const badge = getBadgeInfo(produkt.slug, rank)
          const variant = getCardVariant(produkt.slug)
          const isPriority = PRIORITY_ORDER.includes(produkt.slug)

          return (
            <div
              key={produkt.id}
              className={`dating-card ${variant !== 'default' ? `dating-card--${variant}` : ''}`}
            >
              {/* Card Header */}
              <div className="card-header">
                <div className="card-header-content">
                  <div className="card-header-logo">
                    <Image
                      src={produkt.logo}
                      alt={produkt.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="card-header-info">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="card-header-name">{produkt.name}</h3>
                      <span className={`card-badge card-badge--${variant}`}>
                        {badge.text}
                      </span>
                    </div>
                    <div className="card-header-rating">
                      <span className={`card-header-rating-badge ${
                        produkt.rating >= 9 ? 'bg-green-100 text-green-800' :
                        produkt.rating >= 8 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        <Star className="w-3 h-3 inline mr-1" fill="currentColor" />
                        {produkt.rating}/10
                      </span>
                      <span className="card-header-users">{produkt.users} uživatelů</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body - Pros & Cons */}
              <div className="card-body">
                <div className="card-pros-cons">
                  {/* Pros */}
                  <div className="card-pros">
                    <div className="card-section-title">
                      <Check className="card-section-icon" />
                      <span>Klady</span>
                    </div>
                    <ul className="card-section-list">
                      {produkt.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="card-section-item">
                          <Check className="card-section-icon" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="card-cons">
                    <div className="card-section-title">
                      <X className="card-section-icon" />
                      <span>Zápory</span>
                    </div>
                    <ul className="card-section-list">
                      {produkt.cons.slice(0, 2).map((con, i) => (
                        <li key={i} className="card-section-item">
                          <X className="card-section-icon" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <div className="card-cta">
                <AffiliateLink
                  produkt={produkt}
                  source={source}
                  placement="mobile-card"
                  className={`card-cta-primary card-cta-primary--${variant}`}
                >
                  {isPriority ? '🔥 Vyzkoušet ZDARMA' : 'Navštívit web'}
                  <ExternalLink className="w-4 h-4" />
                </AffiliateLink>

                <Link href={`/seznamky/${produkt.slug}`} className="card-cta-secondary">
                  Přečíst recenzi
                </Link>

                {/* E-book fallback CTA */}
                <div className="card-ebook-cta">
                  <Link href="/ebook">
                    <BookOpen className="w-4 h-4" />
                    <span>E-book zdarma: Tipy pro seznamování</span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
