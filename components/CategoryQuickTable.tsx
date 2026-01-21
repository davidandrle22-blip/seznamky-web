'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ExternalLink, Check, Award } from 'lucide-react'
import { Produkt } from '@/lib/types'
import AffiliateLink from './AffiliateLink'

interface CategoryQuickTableProps {
  produkty: Produkt[]
  limit?: number
  categoryName?: string
}

export default function CategoryQuickTable({ produkty, limit = 5, categoryName }: CategoryQuickTableProps) {
  const displayProdukty = produkty.slice(0, limit)

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Top {limit}: {categoryName || 'Nejlepší seznamky'}
        </h2>

        <div className="space-y-4">
          {displayProdukty.map((produkt, index) => {
            const isPriority = produkt.slug === 'elite-date' || produkt.slug === 'victoria-milan' || produkt.slug === 'academic-singles'
            return (
            <div
              key={produkt.id}
              className={`bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                produkt.slug === 'elite-date' ? 'border-yellow-400 shadow-lg ring-2 ring-yellow-200' :
                produkt.slug === 'victoria-milan' ? 'border-purple-400 shadow-md' :
                produkt.slug === 'academic-singles' ? 'border-emerald-400 shadow-md' :
                index === 0 ? 'border-romantic-400 shadow-md' : 'border-gray-100 hover:border-romantic-200'
              }`}
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Rank & Logo */}
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0
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
                      <h3 className="font-bold text-lg text-gray-900">{produkt.name}</h3>
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
                          produkt.slug === 'elite-date' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-orange-500/30' :
                          produkt.slug === 'victoria-milan' ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-purple-500/30' :
                          produkt.slug === 'academic-singles' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-500/30' :
                          'bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-700 hover:to-romantic-600 text-white shadow-romantic-500/25'
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
          )})}
        </div>
      </div>
    </section>
  )
}
