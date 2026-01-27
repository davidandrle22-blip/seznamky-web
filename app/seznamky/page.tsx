import { getProdukty, getKategorie } from '@/lib/data'
import { Metadata } from 'next'
import { Star, Check, X, ExternalLink, ChevronRight, Award, Shield, Heart, Sparkles, ListChecks } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AffiliateLink from '@/components/AffiliateLink'

interface Props {
  searchParams: { kategorie?: string }
}

export const metadata: Metadata = {
  title: 'Srovnání seznamek 2026 | Kompletní přehled 24+ seznamek | Seznamky.info',
  description: 'Kompletní srovnání 24+ online seznamek v České republice. Nezávislé recenze, hodnocení a zkušenosti uživatelů. ELITE Date, Victoria Milan, Academic Singles a další.',
  keywords: 'srovnání seznamek, online seznamky 2026, ELITE Date, Victoria Milan, Academic Singles, nejlepší seznamky, recenze seznamek',
  openGraph: {
    title: 'Srovnání seznamek 2026 | Kompletní přehled | Seznamky.info',
    description: 'Kompletní srovnání 24+ online seznamek. Nezávislé recenze a hodnocení.',
    type: 'website',
    locale: 'cs_CZ',
  },
}

export default async function SeznamkyPage({ searchParams }: Props) {
  const [produkty, kategorie] = await Promise.all([
    getProdukty(),
    getKategorie()
  ])

  const eliteDate = produkty.find(p => p.slug === 'elite-date')
  const victoriaMilan = produkty.find(p => p.slug === 'victoria-milan')
  const academicSingles = produkty.find(p => p.slug === 'academic-singles')

  const topProdukty = [eliteDate, victoriaMilan, academicSingles].filter(Boolean)
  const otherProdukty = produkty.filter(p => !['elite-date', 'victoria-milan', 'academic-singles'].includes(p.slug))

  const selectedKategorie = searchParams.kategorie
  const allProdukty = [...topProdukty, ...otherProdukty]
  const filteredProdukty = selectedKategorie
    ? allProdukty.filter(p => p?.categories?.includes(selectedKategorie))
    : allProdukty

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return { text: 'Výborné', color: 'bg-green-500' }
    if (rating >= 8) return { text: 'Velmi dobré', color: 'bg-green-400' }
    if (rating >= 7) return { text: 'Dobré', color: 'bg-yellow-500' }
    return { text: 'Průměrné', color: 'bg-gray-400' }
  }

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
              <Heart className="w-4 h-4 text-rose-300 animate-pulse" fill="#fda4af" />
              <span className="text-sm font-medium text-rose-200">Nezávislé hodnocení 2026</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <ListChecks className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
                Srovnání online seznamek 2026
              </span>
            </h1>
            <p className="text-lg text-rose-100/90 max-w-2xl mx-auto mb-8">
              Kompletní přehled {produkty.length} ověřených seznamek seřazených podle hodnocení.
              Najděte tu pravou pro vás!
            </p>

            {/* Stats badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
                <Star className="w-5 h-5 text-amber-400" fill="#fbbf24" />
                <span className="font-bold text-white text-lg">{produkty.length}</span>
                <span className="text-rose-200">seznamek</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-rose-200">Aktualizováno</span>
                <span className="font-bold text-white">Leden 2026</span>
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

      {/* Filters */}
      <section className="py-6 border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/seznamky"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedKategorie
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white'
                  : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
              }`}
            >
              Všechny ({produkty.length})
            </Link>
            {kategorie.map((kat) => {
              const count = produkty.filter(p => p.categories?.includes(kat.slug)).length
              return (
                <Link
                  key={kat.id}
                  href={`/seznamky?kategorie=${kat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedKategorie === kat.slug
                      ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white'
                      : 'bg-rose-50 text-gray-700 hover:bg-rose-100'
                  }`}
                >
                  {kat.name} ({count})
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredProdukty.map((produkt, index) => {
              if (!produkt) return null
              const ratingInfo = getRatingLabel(produkt.rating)
              const isWinner = index === 0 && !selectedKategorie
              const isTop3 = index < 3 && !selectedKategorie

              return (
                <div
                  key={produkt.id}
                  className={`bg-white rounded-xl border-2 transition-all hover:shadow-lg ${
                    isWinner ? 'border-rose-500 shadow-md shadow-rose-100' :
                    isTop3 ? 'border-rose-300' : 'border-gray-200'
                  }`}
                >
                  {/* Badge */}
                  {isWinner && (
                    <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white text-center py-2 px-4 rounded-t-lg font-bold text-sm flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" />
                      VÍTĚZ SROVNÁNÍ 2026
                    </div>
                  )}
                  {index === 1 && !selectedKategorie && (
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-4 rounded-t-lg font-bold text-sm">
                      NEJLEPŠÍ PRO DISKRÉTNÍ SEZNÁMENÍ
                    </div>
                  )}
                  {index === 2 && !selectedKategorie && (
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-2 px-4 rounded-t-lg font-bold text-sm">
                      NEJLEPŠÍ PRO VZDĚLANÉ SINGLES
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row gap-5">
                      {/* Rank + Logo + Info */}
                      <div className="flex items-start gap-4 lg:w-64 flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          isWinner ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white' :
                          index === 1 && !selectedKategorie ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' :
                          index === 2 && !selectedKategorie ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>

                        <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {produkt.logo ? (
                            <Image src={produkt.logo} alt={produkt.name} width={56} height={56} className="object-contain" />
                          ) : (
                            <span className="text-xl font-bold text-gray-400">{produkt.name.charAt(0)}</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-gray-900">{produkt.name}</h3>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex">
                              {[1,2,3,4,5].map(i => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(produkt.rating/2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="font-bold text-gray-900 text-sm">{produkt.rating}/10</span>
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white ${ratingInfo.color}`}>
                            {ratingInfo.text}
                          </span>
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-bold text-green-700 mb-1.5 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Výhody
                          </h4>
                          <ul className="space-y-1">
                            {produkt.pros.slice(0, 3).map((pro, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                                <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-red-700 mb-1.5 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> Nevýhody
                          </h4>
                          <ul className="space-y-1">
                            {produkt.cons.slice(0, 2).map((con, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-sm text-gray-600">
                                <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col items-center justify-center gap-2 lg:w-40 flex-shrink-0">
                        <div className="text-center text-sm">
                          <span className="text-gray-500">Uživatelů: </span>
                          <span className="font-bold text-gray-900">{produkt.users}</span>
                        </div>

                        <AffiliateLink
                          produkt={produkt}
                          source="seznamky"
                          placement="list"
                          className={`w-full text-center font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm ${
                            isWinner
                              ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white'
                              : isTop3
                              ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white'
                              : 'bg-gray-800 hover:bg-gray-900 text-white'
                          }`}
                        >
                          Registrace
                          <ExternalLink className="w-3.5 h-3.5" />
                        </AffiliateLink>

                        <Link
                          href={`/seznamky/${produkt.slug}`}
                          className="text-rose-600 hover:text-rose-700 text-sm font-medium flex items-center gap-1"
                        >
                          Recenze <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredProdukty.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">V této kategorii nejsou žádné seznamky.</p>
              <Link href="/seznamky" className="text-rose-600 hover:text-rose-700 mt-2 inline-block">
                Zobrazit všechny
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-rose-200 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Nejste si jistí, kterou vybrat?
          </h2>
          <p className="text-rose-100 mb-6">
            Doporučujeme začít s ELITE Date - má nejvyšší úspěšnost párování a registrace je zdarma.
          </p>
          {eliteDate && (
            <AffiliateLink
              produkt={eliteDate}
              source="seznamky"
              placement="bottom-cta"
              className="inline-flex items-center gap-2 bg-white text-rose-600 hover:bg-rose-50 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Vyzkoušet ELITE Date zdarma
              <ChevronRight className="w-5 h-5" />
            </AffiliateLink>
          )}
        </div>
      </section>
    </div>
  )
}
