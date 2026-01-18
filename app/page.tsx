import { getProdukty, getSettings, getClanky } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import CategoryCard from '@/components/CategoryCard'
import MatchmakerFilter from '@/components/MatchmakerFilter'
import Testimonials from '@/components/Testimonials'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const [produkty, settings, clanky] = await Promise.all([
    getProdukty(),
    getSettings(),
    getClanky()
  ])

  const topProdukty = produkty.slice(0, 5)
  const recentClanky = clanky.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {settings.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {settings.heroSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <MatchmakerFilter />
          </div>
        </div>
      </section>

      {/* Top seznamky */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Top 5 Seznamek</h2>
            <Link href="/seznamky" className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
              Zobrazit vše
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-6">
            {topProdukty.map((produkt, index) => (
              <ProductCard key={produkt.id} produkt={produkt} rank={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Kategorie */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Procházet podle kategorie</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {settings.categories.map((kategorie) => (
              <CategoryCard key={kategorie.id} kategorie={kategorie} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials testimonials={settings.testimonials} />

      {/* Blog sekce */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Nejnovější články</h2>
            <Link href="/clanky" className="text-primary-500 hover:text-primary-600 font-medium flex items-center">
              Všechny články
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentClanky.map((clanek) => (
              <ArticleCard key={clanek.id} clanek={clanek} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Připraveni najít lásku?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Vyberte si z našeho srovnání nejlepší seznamku pro vás a začněte svou cestu za vztahem snů.
          </p>
          <Link href="/seznamky" className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center">
            Prohlédnout seznamky
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
