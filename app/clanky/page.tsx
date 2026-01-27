import { getClanky } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Blog o seznamování | Tipy, rady a recenze 2026',
  description: 'Tipy, rady a návody pro úspěšné online seznamování. Recenze seznamek, psychologie vztahů a bezpečnost.',
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
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Blog o seznamování
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Tipy, rady a návody pro úspěšné online seznamování
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Všechny ({clanky.length})
            </span>
            {categories.map((category) => {
              const count = clanky.filter(c => c.category === category).length
              return (
                <span
                  key={category}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
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
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
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
      <section className="py-12 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Hledáte partnera?
          </h2>
          <p className="text-blue-100 mb-6">
            Podívejte se na naše srovnání nejlepších seznamek
          </p>
          <Link
            href="/seznamky"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Srovnat seznamky
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
