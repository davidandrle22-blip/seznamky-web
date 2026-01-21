import { getProdukty, getSettings, getClanky } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import ComparisonTable from '@/components/ComparisonTable'
import Testimonials from '@/components/Testimonials'
import {
  EliteDateBanner,
  TopProductCards,
  UrgencyBanner,
  VictoriaMilanBanner
} from '@/components/HomepageAffiliateLinks'
import {
  ArrowRight, Heart, Shield, TrendingUp,
  Target, Clock, BarChart3, ThumbsUp, CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const [produkty, settings, clanky] = await Promise.all([
    getProdukty(),
    getSettings(),
    getClanky()
  ])

  const topProdukty = produkty.slice(0, 5)
  const recentClanky = clanky.slice(0, 3)

  const benefits = [
    {
      icon: Target,
      title: 'Nezávislé hodnocení',
      description: 'Testujeme každou seznamku osobně a poskytujeme objektivní recenze bez vlivu inzerentů.'
    },
    {
      icon: BarChart3,
      title: 'Detailní srovnání',
      description: 'Porovnáváme ceny, funkce, uživatelskou základnu i úspěšnost párování všech seznamek.'
    },
    {
      icon: Clock,
      title: 'Aktuální informace',
      description: 'Naše recenze pravidelně aktualizujeme, abyste měli vždy nejnovější informace.'
    },
    {
      icon: ThumbsUp,
      title: 'Reálné zkušenosti',
      description: 'Čerpáme z tisíců recenzí skutečných uživatelů a vlastního testování.'
    }
  ]

  const categories = [
    { name: 'Vážné vztahy', count: 5, icon: '💍', color: 'from-romantic-500 to-romantic-600' },
    { name: 'Flirt & zábava', count: 4, icon: '😍', color: 'from-pink-500 to-rose-500' },
    { name: 'Senior 50+', count: 2, icon: '🌹', color: 'from-amber-500 to-orange-500' },
    { name: 'Diskrétní', count: 3, icon: '🔒', color: 'from-purple-500 to-violet-500' },
  ]

  return (
    <div className="min-h-screen">
      {/* Compact Hero with Integrated Seznamky */}
      <section className="relative overflow-hidden bg-gradient-to-br from-romantic-950 via-romantic-900 to-romantic-950 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-romantic-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-crimson-500/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 lg:pt-16 lg:pb-12">
          <div className="text-center mb-8">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
              <Heart className="w-4 h-4 text-romantic-400 animate-heart-beat" fill="#fb7185" />
              <span className="text-sm font-medium text-romantic-200">Nejdůvěryhodnější srovnání seznamek v České republice</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
              Top 10 seznamek
              <span className="block mt-1 bg-gradient-to-r from-romantic-300 via-pink-300 to-ruby-300 bg-clip-text text-transparent">
                roku 2026
              </span>
            </h1>

            <p className="text-lg md:text-xl text-romantic-200/90 max-w-2xl mx-auto mb-6">
              Vyberte si z <span className="text-white font-semibold">ověřených českých seznamek</span> a najděte partnera ještě dnes
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-sm mb-6">
              <div className="flex items-center gap-1.5 text-romantic-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Nezávislé recenze</span>
              </div>
              <div className="flex items-center gap-1.5 text-romantic-200">
                <Shield className="w-4 h-4 text-romantic-400" />
                <span>Ověřené informace</span>
              </div>
              <div className="flex items-center gap-1.5 text-romantic-200">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Aktualizováno leden 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELITE Date - Editor's Choice Banner */}
      {topProdukty[0] && <EliteDateBanner produkt={topProdukty[0]} />}

      {/* TOP 3 Seznamky - Immediately Visible Above the Fold */}
      <section className="relative z-10 pb-8 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 3 Quick Cards */}
          <TopProductCards produkty={topProdukty} />

          {/* Urgency Banner - ELITE Date specific */}
          {topProdukty[0] && <UrgencyBanner produkt={topProdukty[0]} />}

          {/* Victoria Milan Banner - Discretion focused */}
          {produkty.find(p => p.slug === 'victoria-milan') && (
            <VictoriaMilanBanner produkt={produkty.find(p => p.slug === 'victoria-milan')!} />
          )}
        </div>
      </section>

      {/* Complete Comparison Table */}
      <section id="kompletni-srovnani" className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-romantic-100 text-romantic-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              KOMPLETNÍ SROVNÁNÍ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Všech <span className="text-romantic-600">{produkty.length} seznamek</span> na jednom místě
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Porovnejte hodnocení, ceny a funkce a vyberte tu pravou seznamku pro vás
            </p>
          </div>

          <ComparisonTable produkty={produkty} limit={10} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              PROČ NÁM VĚŘIT
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Nezávislé a <span className="text-romantic-600">objektivní</span> hodnocení
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-romantic-100 to-romantic-50 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-romantic-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Product Cards */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-romantic-100 text-romantic-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              PODROBNÉ RECENZE
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Nejlepší seznamky <span className="text-romantic-600">detailně</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kompletní přehled funkcí, cen a výhod každé seznamky
            </p>
          </div>

          <div className="space-y-6">
            {topProdukty.map((produkt, index) => (
              <ProductCard key={produkt.id} produkt={produkt} rank={index + 1} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/seznamky"
              className="inline-flex items-center gap-2 bg-romantic-600 hover:bg-romantic-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
            >
              Zobrazit všech {produkty.length} seznamek
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              KATEGORIE
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Najděte seznamku <span className="text-romantic-600">podle preferencí</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/seznamky?kategorie=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-2xl
                  bg-gradient-to-br ${cat.color}
                  flex items-center justify-center
                  text-3xl shadow-lg
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-romantic-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500">{cat.count} seznamek</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={settings.testimonials} />

      {/* Blog Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-10 gap-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                BLOG
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Rady pro <span className="text-romantic-600">úspěšné seznámení</span>
              </h2>
              <p className="text-gray-600">
                Tipy od expertů, jak najít lásku na internetu
              </p>
            </div>
            <Link
              href="/clanky"
              className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-romantic-500 text-gray-700 hover:text-romantic-600 font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Všechny články
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentClanky.map((clanek) => (
              <ArticleCard key={clanek.id} clanek={clanek} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-romantic-600 via-romantic-700 to-romantic-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-romantic-300 mx-auto animate-heart-beat" fill="#fda4af" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Připraveni najít lásku?
          </h2>

          <p className="text-lg text-romantic-200 mb-8 max-w-xl mx-auto">
            Tisíce lidí už díky nám našlo partnera. Začněte svou cestu za vztahem snů ještě dnes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seznamky"
              className="group inline-flex items-center justify-center gap-2 bg-white text-romantic-600 hover:text-romantic-700 font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Prohlédnout seznamky
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-6 text-romantic-300 text-sm">
            Zcela zdarma a bez jakýchkoliv závazků
          </p>
        </div>
      </section>
    </div>
  )
}
