import { getKategorie, getKategorieBySlug, getProduktyByKategorie, getCategoryContentBySlug, getProdukty } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import CategoryHero from '@/components/CategoryHero'
import CategoryQuickTable from '@/components/CategoryQuickTable'
import CategorySeoContent from '@/components/CategorySeoContent'
import FaqSection from '@/components/FaqSection'
import ComparisonTable from '@/components/ComparisonTable'
import { ArrowRight, Crown, Heart, Smile, Flame, Users, EyeOff, Rainbow, Gift, Star, CheckCircle, Zap } from 'lucide-react'

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

  const relatedCategories = categoryContent?.relatedCategories
    ? allKategorie.filter(k => categoryContent.relatedCategories.includes(k.slug))
    : allKategorie.filter(k => k.slug !== params.slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero kategorie={kategorie} productCount={produkty.length} />

      {/* ELITE Date Recommendation - Always visible */}
      {eliteDate && (
        <section className="py-6 bg-gradient-to-r from-romantic-50 via-white to-romantic-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-romantic-200 shadow-lg p-5 lg:p-6">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-romantic-200">
                    <Image
                      src={eliteDate.logo}
                      alt={eliteDate.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-romantic-600 uppercase">Naše doporučení</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{eliteDate.name}</h3>
                  </div>
                </div>

                <div className="flex-grow hidden lg:block">
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span className="font-bold">{eliteDate.rating}/10</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>92% úspěšnost</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-romantic-500" />
                      <span>{eliteDate.users}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={eliteDate.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-romantic-600 to-crimson-600 hover:from-romantic-700 hover:to-crimson-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-romantic-500/20 hover:shadow-xl whitespace-nowrap"
                >
                  <Zap className="w-4 h-4" />
                  Vyzkoušet zdarma
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

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
            <ComparisonTable produkty={produkty} />
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
          {produkty.length > 0 && (
            <a
              href={produkty[0].affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-romantic-600 font-bold py-4 px-8 rounded-xl hover:bg-romantic-50 transition-colors shadow-lg"
            >
              Navštívit {produkty[0].name}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
