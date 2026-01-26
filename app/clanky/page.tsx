import { getClanky } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { BookOpen, Heart, Sparkles, TrendingUp, Shield, Lightbulb } from 'lucide-react'

export const metadata = {
  title: 'Blog o seznamování | Tipy, rady a recenze 2026',
  description: 'Tipy, rady a návody pro úspěšné online seznamování. Recenze seznamek, psychologie vztahů a bezpečnost.',
}

const categoryIcons: Record<string, React.ReactNode> = {
  tipy: <Lightbulb className="w-5 h-5" />,
  bezpecnost: <Shield className="w-5 h-5" />,
  vztahy: <Heart className="w-5 h-5" />,
  psychologie: <BookOpen className="w-5 h-5" />,
  recenze: <TrendingUp className="w-5 h-5" />,
}

const categoryColors: Record<string, string> = {
  tipy: 'bg-amber-500',
  bezpecnost: 'bg-emerald-500',
  vztahy: 'bg-romantic-500',
  psychologie: 'bg-purple-500',
  recenze: 'bg-blue-500',
}

export default async function ClankyPage() {
  const clanky = await getClanky()

  const categories = Array.from(new Set(clanky.map(c => c.category)))
  const featuredClanky = clanky.filter(c => c.isFeatured).slice(0, 3)
  const regularClanky = clanky.filter(c => !c.isFeatured || !featuredClanky.includes(c))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-romantic-950 via-romantic-900 to-crimson-950 text-white">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-romantic-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-crimson-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <BookOpen className="w-5 h-5 text-romantic-400" />
              <span className="font-medium text-romantic-200">Rady od expertů</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl mb-6 border border-white/20 shadow-2xl">
              <Heart className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-romantic-100 to-white bg-clip-text text-transparent">
                Blog o seznamování
              </span>
            </h1>

            <p className="text-lg md:text-xl text-romantic-100/90 max-w-2xl mx-auto mb-8">
              Tipy, rady, recenze a návody pro úspěšné online seznamování.
              Vše, co potřebujete vědět, abyste našli lásku.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-romantic-200/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{clanky.length}</span>
                <span>článků</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{categories.length}</span>
                <span>kategorií</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Affiliate CTA Banner */}
      <section className="bg-gradient-to-r from-amber-50 via-white to-amber-50 py-6 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-bold text-gray-900">Nejlepší seznamka 2026</p>
                <p className="text-sm text-gray-600">92% úspěšnost párování na ELITE Date</p>
              </div>
            </div>
            <a
              href="/api/affiliate/elite-date?source=blog&placement=banner"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Vyzkoušet ZDARMA →
            </a>
          </div>
        </div>
      </section>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="bg-romantic-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg">
              Všechny
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className={`${categoryColors[category] || 'bg-gray-500'} text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-md`}
              >
                {categoryIcons[category]}
                <span className="capitalize">{category}</span>
              </span>
            ))}
          </div>

          {/* Featured Articles */}
          {featuredClanky.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-500" />
                Doporučené články
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredClanky.map((clanek, index) => (
                  <div key={clanek.id} className={index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}>
                    <ArticleCard clanek={clanek} featured={index === 0} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-romantic-500" />
            Všechny články
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularClanky.map((clanek) => (
              <ArticleCard key={clanek.id} clanek={clanek} />
            ))}
          </div>

          {clanky.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Zatím nemáme žádné publikované články.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-romantic-600 via-crimson-600 to-ruby-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Připraveni začít?
          </h2>
          <p className="text-romantic-100 mb-8 text-lg">
            Vyzkoušejte naše doporučené seznamky a najděte svou lásku
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/api/affiliate/elite-date?source=blog&placement=bottom-cta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-romantic-50 text-romantic-600 font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:scale-105"
            >
              🏆 ELITE Date
            </a>
            <a
              href="/api/affiliate/victoria-milan?source=blog&placement=bottom-cta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:scale-105"
            >
              🔒 Victoria Milan
            </a>
            <a
              href="/api/affiliate/academic-singles?source=blog&placement=bottom-cta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:scale-105"
            >
              🎓 Academic Singles
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
