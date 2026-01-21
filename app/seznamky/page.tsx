import { getProdukty, getKategorie } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import ComparisonTable from '@/components/ComparisonTable'
import { Filter, Heart, Sparkles, Star, Shield, Zap, Crown, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  searchParams: { kategorie?: string; type?: string }
}

export const metadata = {
  title: 'Najít partnera 2026 | Top seznamky pro vážné vztahy',
  description: 'Najděte svou lásku na nejlepších seznamkách. ELITE Date, Victoria Milan, Academic Singles - ověřené platformy s vysokou úspěšností.',
}

export default async function SeznamkyPage({ searchParams }: Props) {
  const [produkty, kategorie] = await Promise.all([
    getProdukty(),
    getKategorie()
  ])

  const eliteDate = produkty.find(p => p.slug === 'elite-date')
  const victoriaMilan = produkty.find(p => p.slug === 'victoria-milan')
  const academicSingles = produkty.find(p => p.slug === 'academic-singles')

  const selectedKategorie = searchParams.kategorie
  const filteredProdukty = selectedKategorie
    ? produkty.filter(p => p.categories.includes(selectedKategorie))
    : produkty

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-romantic-950 via-crimson-900 to-romantic-950 text-white">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-romantic-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-crimson-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ruby-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-6 border border-white/20">
              <Heart className="w-5 h-5 text-romantic-400 animate-pulse" fill="#fb7185" />
              <span className="font-semibold text-romantic-200">Najděte svou lásku ještě dnes</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-romantic-100 to-white bg-clip-text text-transparent">
                Najít partnera
              </span>
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                Top 3 doporučené seznamky
              </span>
            </h1>

            <p className="text-xl text-romantic-100/90 max-w-2xl mx-auto mb-8">
              Ověřené platformy s nejvyšší úspěšností párování. Začněte hledat ještě dnes!
            </p>
          </div>

          {/* TOP 3 Premium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* ELITE Date - #1 */}
            {eliteDate && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                <div className="relative bg-gradient-to-br from-white to-romantic-50 rounded-2xl p-6 shadow-2xl border-2 border-amber-400/50">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-black px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    #1 VOLBA REDAKCE
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl border-4 border-amber-400/30">
                      <Image src={eliteDate.logo} alt={eliteDate.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{eliteDate.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-400" />)}
                      </div>
                      <span className="font-bold text-gray-700">{eliteDate.rating}/10</span>
                    </div>

                    <div className="space-y-2 mb-6 text-left">
                      {eliteDate.pros.slice(0, 3).map((pro, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/api/affiliate/elite-date?source=seznamky&placement=hero-card"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🔥 Vyzkoušet ZDARMA
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Victoria Milan - #2 */}
            {victoriaMilan && (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-2xl border border-purple-300/50">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    #2 DISKRÉTNÍ
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl border-4 border-purple-300/30">
                      <Image src={victoriaMilan.logo} alt={victoriaMilan.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{victoriaMilan.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {[1,2,3,4].map(i => <Star key={i} className="w-5 h-5 text-purple-500 fill-purple-400" />)}
                        <Star className="w-5 h-5 text-purple-300" />
                      </div>
                      <span className="font-bold text-gray-700">{victoriaMilan.rating}/10</span>
                    </div>

                    <div className="space-y-2 mb-6 text-left">
                      {victoriaMilan.pros.slice(0, 3).map((pro, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/api/affiliate/victoria-milan?source=seznamky&placement=hero-card"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🔒 Vyzkoušet ZDARMA
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Singles - #3 */}
            {academicSingles && (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-2xl border border-emerald-300/50">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                    🎓 #3 PRO VZDĚLANÉ
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-300/30">
                      <Image src={academicSingles.logo} alt={academicSingles.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{academicSingles.name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex">
                        {[1,2,3,4].map(i => <Star key={i} className="w-5 h-5 text-emerald-500 fill-emerald-400" />)}
                        <Star className="w-5 h-5 text-emerald-300" />
                      </div>
                      <span className="font-bold text-gray-700">{academicSingles.rating}/10</span>
                    </div>

                    <div className="space-y-2 mb-6 text-left">
                      {academicSingles.pros.slice(0, 3).map((pro, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/api/affiliate/academic-singles?source=seznamky&placement=hero-card"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🎓 Vyzkoušet ZDARMA
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-romantic-200/80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>100% ověřené platformy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Registrace zdarma</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Začněte za 2 minuty</span>
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

      {/* Filters & Full List */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kompletní srovnání všech seznamek</h2>
            <p className="text-gray-600">Vyberte si podle kategorie nebo prohlédněte všech {produkty.length} seznamek</p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <span className="font-medium text-gray-700">Filtrovat podle kategorie:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/seznamky"
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  !selectedKategorie
                    ? 'bg-romantic-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Všechny
              </Link>
              {kategorie.map((kat) => (
                <Link
                  key={kat.id}
                  href={`/seznamky?kategorie=${kat.slug}`}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedKategorie === kat.slug
                      ? 'bg-romantic-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {kat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600 font-medium">
            Nalezeno <span className="text-romantic-600 font-bold">{filteredProdukty.length}</span> seznamek
          </div>

          {/* Comparison Table */}
          <ComparisonTable produkty={filteredProdukty} source="table" />

          {filteredProdukty.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                V této kategorii zatím nemáme žádné seznamky.
              </p>
              <Link href="/seznamky" className="text-romantic-500 hover:text-romantic-600 mt-4 inline-block font-medium">
                Zobrazit všechny seznamky
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-romantic-600 via-crimson-600 to-ruby-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Připraveni najít lásku?
          </h2>
          <p className="text-romantic-100 mb-8 text-lg">
            Více než 92% uživatelů ELITE Date najde partnera do 6 měsíců
          </p>
          <a
            href="/api/affiliate/elite-date?source=seznamky&placement=bottom-cta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-romantic-50 text-romantic-600 font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 text-lg"
          >
            <Heart className="w-6 h-6" fill="currentColor" />
            Začít hledat na ELITE Date
            <Sparkles className="w-5 h-5 text-amber-500" />
          </a>
        </div>
      </section>
    </div>
  )
}
