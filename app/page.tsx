import { getProdukty, getSettings, getClanky } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import ComparisonTable from '@/components/ComparisonTable'
import Testimonials from '@/components/Testimonials'
import Image from 'next/image'
import {
  ArrowRight, Heart, Shield, Users, Star, CheckCircle, TrendingUp, Award,
  Sparkles, Target, Clock, Gift, Zap, BarChart3, ThumbsUp, MessageCircle,
  Crown, ExternalLink, Check, Flame
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
              <span className="text-sm font-medium text-romantic-200">Nejdůvěryhodnější srovnávač seznamek v ČR</span>
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

      {/* TOP 3 Seznamky - Immediately Visible Above the Fold */}
      <section className="relative -mt-4 z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 3 Quick Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {topProdukty.slice(0, 3).map((produkt, index) => (
              <div
                key={produkt.id}
                className={`
                  relative bg-white rounded-2xl shadow-xl border-2 overflow-hidden
                  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                  ${index === 0 ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-gray-100'}
                `}
              >
                {/* Rank Badge */}
                <div className={`
                  absolute top-0 left-0 px-4 py-2 rounded-br-xl font-bold text-white
                  ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                    'bg-gradient-to-r from-amber-600 to-amber-700'}
                `}>
                  <div className="flex items-center gap-1.5">
                    {index === 0 && <Crown className="w-4 h-4" />}
                    #{index + 1}
                  </div>
                </div>

                {/* Featured Badge for #1 */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl">
                    DOPORUČUJEME
                  </div>
                )}

                <div className="p-5 pt-12">
                  {/* Logo & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-md">
                      <Image
                        src={produkt.logo}
                        alt={produkt.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{produkt.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="font-bold text-gray-900">{produkt.rating}</span>
                        </div>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm text-gray-600">{produkt.users} uživatelů</span>
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{produkt.description}</p>

                  {/* Key Benefits */}
                  <div className="space-y-1.5 mb-4">
                    {produkt.pros.slice(0, 2).map((pro, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 line-clamp-1">{pro}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Free Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Cena: </span>
                      <span className="font-semibold text-gray-900">{produkt.pricing}</span>
                    </div>
                    {produkt.freeVersion && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        ZDARMA k vyzkoušení
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={produkt.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl
                      transition-all duration-300 group
                      ${index === 0
                        ? 'bg-gradient-to-r from-romantic-500 to-romantic-600 hover:from-romantic-600 hover:to-romantic-700 text-white shadow-lg shadow-romantic-500/30'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'}
                    `}
                  >
                    Navštívit {produkt.name}
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-romantic-50 to-pink-50 border border-romantic-200 rounded-xl p-4 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-romantic-100 rounded-full flex items-center justify-center">
                  <Flame className="w-5 h-5 text-romantic-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Aktuální akce na seznamkách</p>
                  <p className="text-sm text-gray-600">Registrace zdarma + bonusy pro nové uživatele</p>
                </div>
              </div>
              <a
                href="#kompletni-srovnani"
                className="flex items-center gap-2 bg-romantic-600 hover:bg-romantic-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Zobrazit akce
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
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
                Tipy od expertů, jak najít lásku online
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
            Zcela zdarma a bez závazků
          </p>
        </div>
      </section>
    </div>
  )
}
