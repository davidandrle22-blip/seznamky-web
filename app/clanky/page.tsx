import { getClanky } from '@/lib/data'
import { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { BookOpen, ChevronRight, Heart, Sparkles, PenTool } from 'lucide-react'

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
  tipy: 'Tipy & rady',
  bezpecnost: 'Bezpečnost',
  vztahy: 'Vztahy',
  psychologie: 'Psychologie',
  recenze: 'Recenze',
  profil: 'Profil & fotky',
  prvni_schuzka: 'První schůzka',
  online_dating: 'Online dating',
}

export default async function ClankyPage() {
  const clanky = await getClanky()

  const categories = Array.from(new Set(clanky.map(c => c.category)))
  const featuredClanky = clanky.filter(c => c.isFeatured).slice(0, 3)
  const regularClanky = clanky.filter(c => !c.isFeatured || !featuredClanky.includes(c))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-red-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <PenTool className="w-4 h-4 text-rose-300" />
              <span className="text-sm font-medium text-rose-200">Tipy od expertů</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
                Blog o seznamování
              </span>
            </h1>
            <p className="text-lg text-rose-100/90 max-w-2xl mx-auto">
              Tipy, rady a návody pro úspěšné online seznamování a hledání lásky
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
          </svg>
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
