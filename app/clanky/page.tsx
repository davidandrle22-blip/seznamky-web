import { getClanky } from '@/lib/data'
import { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { BookOpen, ChevronRight, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog o seznamování | Tipy, rady a recenze 2026 | Seznamky.info',
  description: 'Tipy, rady a návody pro úspěšné online seznamování. Recenze seznamek, psychologie vztahů, bezpečnost a jak najít lásku online.',
  keywords: 'blog seznamování, tipy pro seznamky, jak najít partnera, online dating tipy, psychologie vztahů',
  openGraph: {
    title: 'Blog o seznamování | Seznamky.info',
    description: 'Tipy, rady a návody pro úspěšné online seznamování.',
    type: 'website',
    locale: 'cs_CZ',
  },
}

const categoryLabels: Record<string, string> = {
  tipy: 'Tipy',
  bezpecnost: 'Bezpečnost',
  vztahy: 'Vztahy',
  psychologie: 'Psychologie',
  recenze: 'Recenze',
}

export default async function ClankyPage() {
  const clanky = await getClanky()

  const categories = Array.from(new Set(clanky.map(c => c.category)))
  const featuredClanky = clanky.filter(c => c.isFeatured).slice(0, 3)
  const regularClanky = clanky.filter(c => !c.isFeatured || !featuredClanky.includes(c))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blog o <span className="text-rose-600">seznamování</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tipy, rady a návody pro úspěšné online seznamování a hledání lásky
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Všechny ({clanky.length})
            </span>
            {categories.map((category) => {
              const count = clanky.filter(c => c.category === category).length
              return (
                <span
                  key={category}
                  className="bg-rose-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {categoryLabels[category] || category} ({count})
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredClanky.length > 0 && (
        <section className="py-10 bg-gradient-to-b from-rose-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-600" />
              Doporučené články
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredClanky.map((clanek) => (
                <ArticleCard key={clanek.id} clanek={clanek} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Všechny články
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularClanky.map((clanek) => (
              <ArticleCard key={clanek.id} clanek={clanek} />
            ))}
          </div>

          {clanky.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Zatím nemáme žádné publikované články.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-rose-200 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Hledáte partnera?
          </h2>
          <p className="text-rose-100 mb-6">
            Podívejte se na naše srovnání nejlepších seznamek a najděte tu pravou pro vás
          </p>
          <Link
            href="/seznamky"
            className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Srovnat seznamky
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
