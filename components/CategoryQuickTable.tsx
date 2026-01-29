'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ExternalLink, Check, X, Award, BookOpen } from 'lucide-react'
import { Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'

interface CategoryQuickTableProps {
  produkty: Produkt[]
  limit?: number
  categoryName?: string
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

    return b.rating - a.rating
  })
}

function getBadgeInfo(slug: string) {
  if (slug === 'elite-date') {
    return { text: '#1 Doporučujeme', variant: 'elite' as const }
  }
  if (slug === 'victoria-milan') {
    return { text: 'Diskrétní vztahy', variant: 'victoria' as const }
  }
  if (slug === 'academic-singles') {
    return { text: 'Pro vzdělané', variant: 'academic' as const }
  }
  return null
}

function getVariant(slug: string) {
  if (slug === 'elite-date') return 'elite'
  if (slug === 'victoria-milan') return 'victoria'
  if (slug === 'academic-singles') return 'academic'
  return 'default'
}

export default function CategoryQuickTable({ produkty, limit = 5, categoryName }: CategoryQuickTableProps) {
  const sortedProdukty = sortByPriority(produkty).slice(0, limit)

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="comparison-title">
          Top {limit}: {categoryName || 'Nejlepší seznamky'}
        </h2>

        {/* Desktop view */}
        <div className="hidden md:block space-y-4">
          {sortedProdukty.map((produkt, index) => {
            const isPriority = PRIORITY_ORDER.includes(produkt.slug)
            const badge = getBadgeInfo(produkt.slug)
            const variant = getVariant(produkt.slug)

            return (
              <div
                key={produkt.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                  variant === 'elite' ? 'border-yellow-400 shadow-lg ring-2 ring-yellow-200' :
                  variant === 'victoria' ? 'border-purple-400 shadow-md' :
                  variant === 'academic' ? 'border-emerald-400 shadow-md' :
                  index === 0 ? 'border-romantic-400 shadow-md' : 'border-gray-100 hover:border-romantic-200'
                }`}
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Rank & Logo */}
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        variant === 'elite'
                          ? 'bg-yellow-400 text-yellow-900'
                          : variant === 'victoria'
                            ? 'bg-purple-500 text-white'
                            : variant === 'academic'
                              ? 'bg-emerald-500 text-white'
                              : index === 0
                                ? 'bg-romantic-500 text-white'
                                : index === 1
                                  ? 'bg-gray-300 text-gray-700'
                                  : index === 2
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index === 0 && <Award className="w-5 h-5" />}
                        {index !== 0 && `#${index + 1}`}
                      </div>

                      <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <Image
                          src={produkt.logo}
                          alt={produkt.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-lg text-gray-900">{produkt.name}</h3>
                          {badge && (
                            <span className={`
                              inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full
                              ${variant === 'elite' ? 'bg-yellow-400 text-yellow-900' :
                                variant === 'victoria' ? 'bg-purple-200 text-purple-800' :
                                'bg-emerald-200 text-emerald-800'}
                            `}>
                              {badge.text}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center bg-romantic-50 px-2 py-0.5 rounded-full">
                            <Star className="w-4 h-4 text-romantic-500 fill-romantic-400" />
                            <span className="ml-1 font-semibold text-romantic-700">{produkt.rating}</span>
                          </div>
                          <span className="text-gray-500">{produkt.users} uživatelů</span>
                        </div>
                      </div>
                    </div>

                    {/* Pros */}
                    <div className="flex-grow hidden lg:block">
                      <div className="flex flex-wrap gap-2">
                        {produkt.pros.slice(0, 3).map((pro, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" />
                            <span className="truncate max-w-[200px]">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 md:flex-shrink-0">
                      {produkt.freeVersion && (
                        <span className="hidden sm:inline-flex items-center bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                          Zdarma
                        </span>
                      )}

                      <div className="flex gap-2">
                        <AffiliateLink
                          produkt={produkt}
                          source="category"
                          placement="quick-table"
                          className={`font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg ${
                            variant === 'elite' ? 'cta-elite' :
                            variant === 'victoria' ? 'cta-victoria' :
                            variant === 'academic' ? 'cta-academic' :
                            'cta-default'
                          }`}
                        >
                          {isPriority ? '🔥 Vyzkoušet' : 'Navštívit'}
                          <ExternalLink className="w-4 h-4" />
                        </AffiliateLink>
                        <Link
                          href={`/seznamky/${produkt.slug}`}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors"
                        >
                          Recenze
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile cards view */}
        <div className="md:hidden space-y-4">
          {sortedProdukty.map((produkt, index) => {
            const isPriority = PRIORITY_ORDER.includes(produkt.slug)
            const badge = getBadgeInfo(produkt.slug)
            const variant = getVariant(produkt.slug)

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
                        {badge && (
                          <span className={`card-badge card-badge--${variant}`}>
                            {badge.text}
                          </span>
                        )}
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

                {/* Card Body */}
                <div className="card-body">
                  <div className="card-pros-cons">
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
                    source="category"
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
    </section>
  )
}
