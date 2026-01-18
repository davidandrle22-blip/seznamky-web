import { getProdukty, getSettings, getClanky } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import ComparisonTable from '@/components/ComparisonTable'
import Testimonials from '@/components/Testimonials'
import {
  ArrowRight, Heart, Shield, Users, Star, CheckCircle, TrendingUp, Award,
  Sparkles, Target, Clock, Gift, Zap, BarChart3, ThumbsUp, MessageCircle
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

  const stats = [
    { icon: Users, value: '2.5M+', label: 'Spokojených uživatelů', color: 'text-romantic-500' },
    { icon: Heart, value: '185K+', label: 'Úspěšných párů', color: 'text-pink-500' },
    { icon: Star, value: '4.9', label: 'Průměrné hodnocení', color: 'text-amber-500' },
    { icon: Shield, value: '100%', label: 'Ověřené recenze', color: 'text-green-500' },
  ]

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-romantic-950 via-romantic-900 to-romantic-950 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-romantic-500/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-crimson-500/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-romantic-600/10 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="text-center mb-16">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10">
              <Heart className="w-5 h-5 text-romantic-400 animate-heart-beat" fill="#fb7185" />
              <span className="text-sm font-medium text-romantic-200">Nejdůvěryhodnější srovnávač seznamek v ČR</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              Najděte svou
              <span className="block mt-2 bg-gradient-to-r from-romantic-300 via-pink-300 to-ruby-300 bg-clip-text text-transparent">
                životní lásku
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-romantic-200/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Porovnejte <span className="text-white font-semibold">10+ českých seznamek</span> a najděte tu pravou cestu k partnerství.
              Nezávislé recenze, reálná hodnocení, ověřené informace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="#srovnani"
                className="group inline-flex items-center justify-center gap-3 bg-white text-romantic-600 hover:text-romantic-700 font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="text-lg">Srovnat seznamky</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/clanky"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                Přečíst rady a tipy
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass p-6 text-center transform hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-romantic-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-medium">Nezávislé recenze</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-romantic-500" />
              <span className="font-medium">Ověřené informace</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Aktualizováno leden 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="font-medium">Od roku 2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section id="srovnani" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-romantic-100 text-romantic-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              RYCHLÉ SROVNÁNÍ
            </span>
            <h2 className="section-title mb-4">
              Top 5 seznamek <span className="gradient-text">roku 2026</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Přehledná tabulka nejlepších seznamek podle našeho hodnocení
            </p>
          </div>

          <ComparisonTable produkty={produkty} limit={5} />

          <div className="text-center mt-8">
            <Link href="/seznamky" className="btn-outline">
              Zobrazit všechny seznamky
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              PROČ NÁM VĚŘIT
            </span>
            <h2 className="section-title mb-4">
              Nezávislé a <span className="gradient-text">objektivní</span> hodnocení
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="card p-6 text-center hover:-translate-y-1 transition-all duration-300"
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

      {/* Top Seznamky - Detailed Cards */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-romantic-100 text-romantic-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              PODROBNÉ RECENZE
            </span>
            <h2 className="section-title mb-4">
              Nejlepší seznamky <span className="gradient-text">detailně</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Kompletní přehled funkcí, cen a výhod každé seznamky
            </p>
          </div>

          <div className="space-y-8">
            {topProdukty.map((produkt, index) => (
              <ProductCard key={produkt.id} produkt={produkt} rank={index + 1} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/seznamky" className="btn-primary-lg">
              Zobrazit všech {produkty.length} seznamek
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              KATEGORIE
            </span>
            <h2 className="section-title mb-4">
              Najděte seznamku <span className="gradient-text">podle vašich preferencí</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/seznamky?kategorie=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group card p-6 text-center hover:-translate-y-2 transition-all duration-300"
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 gap-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                BLOG
              </span>
              <h2 className="section-title mb-2">
                Rady pro <span className="gradient-text">úspěšné seznámení</span>
              </h2>
              <p className="section-subtitle">
                Tipy od expertů, jak najít lásku online
              </p>
            </div>
            <Link
              href="/clanky"
              className="btn-outline whitespace-nowrap"
            >
              Všechny články
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentClanky.map((clanek) => (
              <ArticleCard key={clanek.id} clanek={clanek} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-romantic-600 via-romantic-700 to-romantic-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-romantic-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="w-20 h-20 text-romantic-300 mx-auto animate-heart-beat" fill="#fda4af" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Připraveni najít
            <span className="block text-romantic-200">svou druhou polovičku?</span>
          </h2>

          <p className="text-xl text-romantic-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tisíce lidí už díky nám našlo partnera. Vyberte si z našeho srovnání nejlepší seznamku
            a začněte svou cestu za vztahem snů ještě dnes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/seznamky"
              className="group inline-flex items-center justify-center gap-3 bg-white text-romantic-600 hover:text-romantic-700 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Prohlédnout seznamky
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-8 text-romantic-300 text-sm">
            Zcela zdarma a bez závazků
          </p>
        </div>
      </section>
    </div>
  )
}
