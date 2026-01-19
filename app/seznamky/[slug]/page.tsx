import { getProduktBySlug, getProdukty, getKategorie } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Star, Users, ExternalLink, Check, X, ArrowLeft, Shield, Heart, Zap, Globe, Smartphone, Gift, Award, Clock, MapPin, Video, Brain, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import FaqSection from '@/components/FaqSection'

interface Props {
  params: { slug: string }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  heart: Heart,
  users: Users,
  zap: Zap,
  globe: Globe,
  smartphone: Smartphone,
  gift: Gift,
  award: Award,
  clock: Clock,
  'map-pin': MapPin,
  video: Video,
  brain: Brain,
  'graduation-cap': GraduationCap,
  star: Star,
}

export async function generateStaticParams() {
  const produkty = await getProdukty()
  return produkty.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) return { title: 'Nenalezeno' }

  return {
    title: `${produkt.name} recenze 2026 | Srovnani seznamek`,
    description: produkt.description,
  }
}

export default async function ProduktDetailPage({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)

  if (!produkt) {
    notFound()
  }

  const allProdukty = await getProdukty()
  const allKategorie = await getKategorie()
  const relatedProdukty = allProdukty
    .filter(p => p.id !== produkt.id && p.categories.some(c => produkt.categories.includes(c)))
    .slice(0, 3)

  const produktKategorie = allKategorie.filter(k => produkt.categories.includes(k.id))

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/seznamky" className="inline-flex items-center text-gray-600 hover:text-romantic-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na srovnání
        </Link>

        {/* Hero Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-romantic-100 to-romantic-50 rounded-2xl flex items-center justify-center text-4xl font-bold text-romantic-600 flex-shrink-0 shadow-sm">
              {produkt.name.charAt(0)}
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{produkt.name}</h1>
                {produkt.isNew && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">NOVÉ</span>
                )}
                {produkt.isFeatured && (
                  <span className="bg-romantic-100 text-romantic-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" /> DOPORUČENO
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-4 text-lg">{produkt.description}</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center bg-romantic-50 px-3 py-1.5 rounded-full">
                  <Star className="w-5 h-5 text-romantic-500 fill-romantic-400" />
                  <span className="ml-1.5 font-bold text-romantic-700">{produkt.rating}/10</span>
                </div>
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                  <Users className="w-4 h-4 mr-1.5" />
                  {produkt.users} uživatelů
                </div>
                {produkt.successRate && (
                  <div className="flex items-center bg-green-50 px-3 py-1.5 rounded-full text-green-700">
                    <Heart className="w-4 h-4 mr-1.5" />
                    {produkt.successRate} úspěšnost
                  </div>
                )}
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                  Věk: {produkt.ageRange}
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {produktKategorie.map((kat) => (
                  <Link
                    key={kat.id}
                    href={`/kategorie/${kat.slug}`}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-romantic-100 hover:text-romantic-700 transition-colors"
                  >
                    {kat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="w-full lg:w-auto flex flex-col gap-3">
              <a
                href={produkt.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-700 hover:to-romantic-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-romantic-500/25"
              >
                Navštívit {produkt.name}
                <ExternalLink className="w-4 h-4" />
              </a>
              <div className="text-center text-sm text-gray-500">
                {produkt.freeVersion && <span className="text-green-600 font-medium">Registrace zdarma</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {produkt.highlights && produkt.highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {produkt.highlights.map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon] || Star
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-romantic-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-romantic-600" />
                  </div>
                  <span className="font-medium text-gray-900">{highlight.text}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-green-600 mb-4 flex items-center">
              <Check className="w-6 h-6 mr-2" />
              Výhody
            </h2>
            <ul className="space-y-3">
              {produkt.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <X className="w-6 h-6 mr-2" />
              Nevýhody
            </h2>
            <ul className="space-y-3">
              {produkt.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hlavní funkce</h2>
          <div className="flex flex-wrap gap-3">
            {produkt.features.map((feature, index) => (
              <span key={index} className="bg-romantic-50 text-romantic-800 px-4 py-2 rounded-full font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Full description */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 mb-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900">
            <ReactMarkdown>{produkt.fullDescription}</ReactMarkdown>
          </div>
        </div>

        {/* FAQ Section */}
        {produkt.faq && produkt.faq.length > 0 && (
          <FaqSection title={`Časté dotazy k ${produkt.name}`} items={produkt.faq} />
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-romantic-600 to-crimson-600 rounded-2xl p-8 text-center my-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vyzkoušejte {produkt.name} ještě dnes
          </h2>
          <p className="text-romantic-100 mb-6">
            {produkt.freeVersion
              ? 'Registrace je zdarma a můžete ihned začít hledat svého partnera.'
              : 'Začněte hledat svého partnera ještě dnes.'}
          </p>
          <a
            href={produkt.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-romantic-600 hover:bg-romantic-50 font-bold py-4 px-8 rounded-xl transition-colors inline-flex items-center shadow-lg"
          >
            Registrovat se na {produkt.name}
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </div>

        {/* Related */}
        {relatedProdukty.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Podobné seznamky</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProdukty.map((p) => (
                <Link key={p.id} href={`/seznamky/${p.slug}`} className="bg-white rounded-2xl border-2 border-gray-100 hover:border-romantic-300 p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="w-12 h-12 bg-romantic-100 rounded-xl flex items-center justify-center text-xl font-bold text-romantic-600 mb-3">
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{p.shortDescription || p.description}</p>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-romantic-500 fill-romantic-400 mr-1" />
                    <span className="font-semibold text-gray-900">{p.rating}/10</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
