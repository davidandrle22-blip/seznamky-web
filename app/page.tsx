import { Metadata } from 'next'
import { getProdukty, getClanky, getKategorie } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Check, X, ExternalLink, ChevronRight, Shield, Users, Award, TrendingUp, Heart, Sparkles } from 'lucide-react'
import AffiliateLink from '@/components/AffiliateLink'
import ArticleCard from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Nejlepší seznamky 2026 | Srovnání a recenze | Seznamky.info',
  description: 'Nezávislé srovnání 24+ online seznamek v České republice. ELITE Date, Academic Singles, Victoria Milan a další. Kompletní recenze, hodnocení a zkušenosti uživatelů. Najděte svou lásku ještě dnes!',
  keywords: 'nejlepší seznamky 2026, srovnání seznamek, online seznamky, ELITE Date, Victoria Milan, Academic Singles, online dating, najít partnera, seznamka pro vážný vztah',
  openGraph: {
    title: 'Nejlepší seznamky 2026 | Srovnání a recenze | Seznamky.info',
    description: 'Nezávislé srovnání 24+ online seznamek. Najděte svou lásku ještě dnes!',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export default async function Home() {
  const [produkty, clanky, kategorie] = await Promise.all([
    getProdukty(),
    getClanky(),
    getKategorie()
  ])

  // Top 3 priority products
  const eliteDate = produkty.find(p => p.slug === 'elite-date')
  const academicSingles = produkty.find(p => p.slug === 'academic-singles')
  const victoriaMilan = produkty.find(p => p.slug === 'victoria-milan')

  const topProdukty = [eliteDate, victoriaMilan, academicSingles].filter(Boolean)
  const otherProdukty = produkty.filter(p => !['elite-date', 'victoria-milan', 'academic-singles'].includes(p.slug)).slice(0, 7)
  const allDisplayProdukty = [...topProdukty, ...otherProdukty]

  const recentClanky = clanky.slice(0, 3)

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return { text: 'Výborné', color: 'bg-green-500' }
    if (rating >= 8) return { text: 'Velmi dobré', color: 'bg-green-400' }
    if (rating >= 7) return { text: 'Dobré', color: 'bg-yellow-500' }
    return { text: 'Průměrné', color: 'bg-gray-400' }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Romantic Red */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-rose-100 relative overflow-hidden">
        {/* Decorative hearts */}
        <div className="absolute top-10 left-10 text-rose-200 opacity-30 text-6xl">💕</div>
        <div className="absolute bottom-10 right-10 text-rose-200 opacity-30 text-4xl">❤️</div>
        <div className="absolute top-1/2 right-1/4 text-rose-200 opacity-20 text-3xl">💗</div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Aktualizováno: Leden 2026
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Najděte svou <span className="text-rose-600">lásku</span> online
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Nezávislé srovnání a recenze {produkty.length}+ ověřených seznamek v ČR.
              Pomůžeme vám najít tu pravou pro vážný vztah, flirt nebo diskrétní seznámení.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-500" />
                <span>Nezávislé hodnocení</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-500" />
                <span>2M+ uživatelů</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Tisíce úspěšných párů</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Comparison Section */}
      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Top 10 seznamek v České republice
          </h2>
          <p className="text-gray-600 mb-8">Vybráno a testováno naší redakcí</p>

          {/* Product Cards */}
          <div className="space-y-6">
            {allDisplayProdukty.slice(0, 10).map((produkt, index) => {
              if (!produkt) return null
              const ratingInfo = getRatingLabel(produkt.rating)
              const isWinner = index === 0
              const isTop3 = index < 3

              return (
                <div
                  key={produkt.id}
                  className={`bg-white rounded-xl border-2 transition-all hover:shadow-lg ${
                    isWinner ? 'border-rose-500 shadow-md shadow-rose-100' :
                    isTop3 ? 'border-rose-300' : 'border-gray-200'
                  }`}
                >
                  {/* Winner Badge */}
                  {isWinner && (
                    <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white text-center py-2 px-4 rounded-t-lg font-bold text-sm flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" />
                      VÍTĚZ SROVNÁNÍ 2026 - NEJLEPŠÍ VOLBA PRO VÁŽNÝ VZTAH
                    </div>
                  )}
                  {index === 1 && (
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-4 rounded-t-lg font-bold text-sm">
                      NEJLEPŠÍ PRO DISKRÉTNÍ SEZNÁMENÍ
                    </div>
                  )}
                  {index === 2 && (
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-2 px-4 rounded-t-lg font-bold text-sm">
                      NEJLEPŠÍ PRO VZDĚLANÉ SINGLES
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left: Rank + Logo + Basic Info */}
                      <div className="flex items-start gap-4 lg:w-72 flex-shrink-0">
                        {/* Rank */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                          isWinner ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white' :
                          index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' :
                          index === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                            {produkt.logo ? (
                              <Image
                                src={produkt.logo}
                                alt={produkt.name}
                                width={72}
                                height={72}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-2xl font-bold text-gray-400">{produkt.name.charAt(0)}</span>
                            )}
                          </div>
                        </div>

                        {/* Name & Rating */}
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{produkt.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1,2,3,4,5].map(i => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i <= Math.round(produkt.rating/2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="font-bold text-gray-900">{produkt.rating}/10</span>
                          </div>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold text-white ${ratingInfo.color}`}>
                            {ratingInfo.text}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Pros & Cons */}
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Pros */}
                        <div>
                          <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Výhody
                          </h4>
                          <ul className="space-y-1.5">
                            {produkt.pros.slice(0, 3).map((pro, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons */}
                        <div>
                          <h4 className="text-sm font-bold text-red-700 mb-2 flex items-center gap-1">
                            <X className="w-4 h-4" />
                            Nevýhody
                          </h4>
                          <ul className="space-y-1.5">
                            {produkt.cons.slice(0, 2).map((con, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <div className="flex flex-col items-center justify-center gap-3 lg:w-48 flex-shrink-0">
                        <div className="text-center mb-2">
                          <div className="text-sm text-gray-500">Uživatelů</div>
                          <div className="font-bold text-gray-900">{produkt.users}</div>
                        </div>

                        <AffiliateLink
                          produkt={produkt}
                          source="homepage"
                          placement="main-table"
                          className={`w-full text-center font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 ${
                            isWinner
                              ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-200'
                              : isTop3
                              ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white'
                              : 'bg-gray-800 hover:bg-gray-900 text-white'
                          }`}
                        >
                          Registrace zdarma
                          <ExternalLink className="w-4 h-4" />
                        </AffiliateLink>

                        <Link
                          href={`/seznamky/${produkt.slug}`}
                          className="text-rose-600 hover:text-rose-700 text-sm font-medium flex items-center gap-1"
                        >
                          Přečíst recenzi
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* See All Button */}
          <div className="text-center mt-10">
            <Link
              href="/seznamky"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-rose-200"
            >
              Zobrazit všech {produkty.length} seznamek
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Parameters Table */}
      <section className="py-10 lg:py-14 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Srovnání top 3 seznamek
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-rose-200 text-sm shadow-sm">
              <thead>
                <tr className="bg-rose-50">
                  <th className="text-left p-4 font-bold text-gray-700 border-b border-rose-100">Parametr</th>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <th key={p.id} className="text-center p-4 font-bold text-gray-700 border-b border-rose-100 min-w-[140px]">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-rose-50">
                  <td className="p-4 text-gray-600">Hodnocení</td>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <td key={p.id} className="p-4 text-center font-bold text-gray-900">{p.rating}/10</td>
                  ))}
                </tr>
                <tr className="border-b border-rose-50 bg-rose-50/30">
                  <td className="p-4 text-gray-600">Počet uživatelů</td>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <td key={p.id} className="p-4 text-center text-gray-900">{p.users}</td>
                  ))}
                </tr>
                <tr className="border-b border-rose-50">
                  <td className="p-4 text-gray-600">Úspěšnost párování</td>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <td key={p.id} className="p-4 text-center text-gray-900">{p.successRate || '—'}</td>
                  ))}
                </tr>
                <tr className="border-b border-rose-50 bg-rose-50/30">
                  <td className="p-4 text-gray-600">Věková skupina</td>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <td key={p.id} className="p-4 text-center text-gray-900">{p.ageRange}</td>
                  ))}
                </tr>
                <tr className="border-b border-rose-50">
                  <td className="p-4 text-gray-600">Bezplatná verze</td>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <td key={p.id} className="p-4 text-center">
                      {p.freeVersion ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-rose-50 bg-rose-50/30">
                  <td className="p-4 text-gray-600">Ověřené profily</td>
                  {topProdukty.slice(0, 3).map(p => p && (
                    <td key={p.id} className="p-4 text-center">
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-gray-600">Mobilní aplikace</td>
                  {topProdukty.slice(0, 3).map((p, i) => p && (
                    <td key={p.id} className="p-4 text-center">
                      {i !== 1 ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Proč věřit našim recenzím?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Nezávislé hodnocení', desc: 'Testujeme každou seznamku osobně' },
              { icon: Users, title: 'Reálné zkušenosti', desc: 'Čerpáme z tisíců uživatelských recenzí' },
              { icon: TrendingUp, title: 'Aktuální data', desc: 'Informace pravidelně aktualizujeme' },
              { icon: Award, title: 'Transparentnost', desc: 'Jasná metodika hodnocení' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-gradient-to-b from-rose-50 to-white rounded-xl border border-rose-100">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 lg:py-14 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Seznamky podle kategorie
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kategorie.slice(0, 8).map((kat) => (
              <Link
                key={kat.id}
                href={`/kategorie/${kat.slug}`}
                className="bg-white p-5 rounded-xl border border-rose-100 hover:border-rose-400 hover:shadow-lg hover:shadow-rose-100/50 transition-all text-center group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors mb-1">
                  {kat.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {produkty.filter(p => p.categories?.includes(kat.slug)).length} seznamek
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Rady a tipy pro seznamování
            </h2>
            <Link
              href="/clanky"
              className="text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
            >
              Všechny články
              <ChevronRight className="w-4 h-4" />
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
      <section className="py-12 lg:py-16 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 text-rose-200 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Připraveni najít svou lásku?
          </h2>
          <p className="text-rose-100 mb-6 max-w-xl mx-auto">
            Tisíce lidí již našly partnera díky našim doporučeným seznamkám. Začněte ještě dnes!
          </p>
          <Link
            href="/seznamky"
            className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Prohlédnout seznamky
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
