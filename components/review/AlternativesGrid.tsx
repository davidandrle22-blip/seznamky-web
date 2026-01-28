'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import AffiliateLink from '@/components/AffiliateLink'
import type { Produkt } from '@/lib/types'

interface AlternativesGridProps {
  alternatives: Produkt[]
  title?: string
  currentSlug?: string
}

export default function AlternativesGrid({
  alternatives,
  title = 'Alternativy k porovnání',
  currentSlug
}: AlternativesGridProps) {
  const filteredAlternatives = currentSlug
    ? alternatives.filter(p => p.slug !== currentSlug)
    : alternatives

  if (filteredAlternatives.length === 0) return null

  return (
    <div className="alternatives-section">
      <h3 className="alternatives-title">{title}</h3>
      <div className="alternatives-grid">
        {filteredAlternatives.slice(0, 3).map((product) => (
          <div key={product.id} className="alternative-card">
            <div className="alternative-card-header">
              <div className="alternative-card-logo">
                {product.logo ? (
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-400">
                    {product.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="alternative-card-info">
                <h4>{product.name}</h4>
                <p>{product.users} uživatelů</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="alternative-card-rating">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-900">{product.rating}/10</span>
              </div>
              <span className="text-xs text-gray-500">{product.ageRange}</span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/seznamky/${product.slug}`}
                className="flex-1 text-center py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
              >
                Recenze
              </Link>
              <AffiliateLink
                produkt={product}
                source="detail"
                placement="alternative"
                className="flex-1 text-center py-2 px-3 bg-romantic-500 hover:bg-romantic-600 text-white font-medium rounded-lg text-sm transition-colors"
              >
                Navštívit
              </AffiliateLink>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/seznamky"
          className="inline-flex items-center gap-2 text-romantic-600 hover:text-romantic-700 font-medium"
        >
          Zobrazit všechny seznamky
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
