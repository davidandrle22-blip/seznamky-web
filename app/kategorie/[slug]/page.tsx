import { getKategorie, getKategorieBySlug, getProduktyByKategorie, getCategoryContentBySlug, getProdukty } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CategoryHero from '@/components/CategoryHero'
import CategoryQuickTable from '@/components/CategoryQuickTable'
import CategorySeoContent from '@/components/CategorySeoContent'
import FaqSection from '@/components/FaqSection'
import ComparisonTable from '@/components/ComparisonTable'
import { CategoryEliteDateBanner, CategoryVictoriaMilanBanner, CategoryBottomCTA } from '@/components/CategoryAffiliateLinks'
import { ArrowRight, Crown, Heart, Smile, Flame, Users, EyeOff, Rainbow, Gift } from 'lucide-react'

interface Props {
  params: { slug: string }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  heart: Heart,
  smile: Smile,
  flame: Flame,
  users: Users,
  'eye-off': EyeOff,
  rainbow: Rainbow,
  gift: Gift,
}

export async function generateStaticParams() {
  const kategorie = await getKategorie()
  return kategorie.map((k) => ({ slug: k.slug }))
}

export async function generateMetadata({ params }: Props) {
  const kategorie = await getKategorieBySlug(params.slug)
  if (!kategorie) return { title: 'Nenalezeno' }

  return {
    title: kategorie.metaTitle || `${kategorie.name} | Srovnání seznamek`,
    description: kategorie.metaDescription || kategorie.description,
  }
}

export default async function KategoriePage({ params }: Props) {
  const kategorie = await getKategorieBySlug(params.slug)

  if (!kategorie) {
    notFound()
  }

  const produkty = await getProduktyByKategorie(kategorie.id)
  const categoryContent = await getCategoryContentBySlug(params.slug)
  const allKategorie = await getKategorie()
  const allProdukty = await getProdukty()
  const eliteDate = allProdukty[0] // ELITE Date is always first
  const victoriaMilan = allProdukty.find(p => p.slug === 'victoria-milan') // Victoria Milan

  const relatedCategories = categoryContent?.relatedCategories
    ? allKategorie.filter(k => categoryContent.relatedCategories.includes(k.slug))
    : allKategorie.filter(k => k.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero kategorie={kategorie} productCount={produkty.length} />

      {/* Top 2 Recommendations - ELITE Date & Victoria Milan */}
      <section className="py-6 bg-gradient-to-r from-romantic-50 via-white to-romantic-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* ELITE Date */}
          {eliteDate && <CategoryEliteDateBanner produkt={eliteDate} />}

          {/* Victoria Milan - Especially for sex-seznamky and seznamky-pro-zadane */}
          {victoriaMilan && (params.slug === 'sex-seznamky' || params.slug === 'seznamky-pro-zadane' || params.slug === 'nejlepsi-seznamky') && (
            <CategoryVictoriaMilanBanner produkt={victoriaMilan} />
          )}
        </div>
      </section>

      {/* Quick Conversion Table - Above the fold */}
      {produkty.length > 0 && (
        <CategoryQuickTable produkty={produkty} limit={5} />
      )}

      {/* Full Comparison Table */}
      {produkty.length > 0 && (
        <section className="py-8 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Kompletní srovnání všech seznamek
            </h2>
            <ComparisonTable produkty={produkty} source="category" />
          </div>
        </section>
      )}

      {/* SEO Content */}
      {categoryContent && (
        <CategorySeoContent content={categoryContent} />
      )}

      {/* FAQ Section */}
      {categoryContent?.faq && categoryContent.faq.length > 0 && (
        <FaqSection items={categoryContent.faq} />
      )}

      {/* Related Categories */}
      {relatedCategories.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Související kategorie
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCategories.map((kat) => {
                const IconComponent = iconMap[kat.icon] || Heart
                return (
                  <Link
                    key={kat.id}
                    href={`/kategorie/${kat.slug}`}
                    className="bg-white rounded-2xl border-2 border-gray-100 hover:border-romantic-300 p-6 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-romantic-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-romantic-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-romantic-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-romantic-600 transition-colors">
                          {kat.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {kat.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-romantic-600 font-medium text-sm">
                      Prohlédnout
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-romantic-600 to-crimson-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Připraveni najít lásku?
          </h2>
          <p className="text-romantic-100 mb-8 text-lg">
            Vyzkoušejte naši doporučenou seznamku a začněte hledat ještě dnes.
          </p>
          {produkty.length > 0 && <CategoryBottomCTA produkt={produkty[0]} />}
        </div>
      </section>
    </div>
  )
}
