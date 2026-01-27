import { getProduktBySlug, getProdukty, getKategorie } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Star, Users, Check, X, ExternalLink, ChevronRight, Clock, Calendar, Award, Heart, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import AffiliateLink from '@/components/AffiliateLink'

interface Props {
  params: { slug: string }
}

// Mapování obrázků pro seznamky
const productImages: Record<string, string> = {
  'elite-date': '/images/blog/elite-date.jpg',
  'victoria-milan': '/images/blog/victoria-milan.jpg',
  'academic-singles': '/images/blog/academic-singles.jpg',
  'singles50': '/images/blog/vazny-vztah.jpg',
  'dateyou': '/images/blog/prvni-schuzka.jpg',
  'ona-hleda-jeho': '/images/blog/vyber-seznamky.jpg',
  'edarling': '/images/blog/psychologie.jpg',
  'badoo': '/images/blog/jak-napsat-profil.jpg',
  'tinder': '/images/blog/prvni-schuzka.jpg',
  'bumble': '/images/blog/introverti.jpg',
  'happn': '/images/blog/vztahy-na-dalku.jpg',
  'hinge': '/images/blog/vazny-vztah.jpg',
  'default': '/images/blog/vyber-seznamky.jpg',
}

// Autoři recenzí
const authors: Record<string, { name: string; role: string; avatar: string }> = {
  'elite-date': { name: 'Tereza Nováková', role: 'Expertka na online seznamování', avatar: 'TN' },
  'victoria-milan': { name: 'Martin Dvořák', role: 'Recenzent seznamek', avatar: 'MD' },
  'academic-singles': { name: 'Jana Procházková', role: 'Specialistka na vztahy', avatar: 'JP' },
  'default': { name: 'Redakce Seznamky.info', role: 'Tým expertů', avatar: 'SI' },
}

export async function generateStaticParams() {
  const produkty = await getProdukty()
  return produkty.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) return { title: 'Nenalezeno' }

  return {
    title: `${produkt.name} recenze 2026 | Zkušenosti a hodnocení | Seznamky.info`,
    description: `Podrobná recenze ${produkt.name} - hodnocení ${produkt.rating}/10, ${produkt.users} uživatelů. ${produkt.description}`,
  }
}

export default async function ProduktDetailPage({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)

  if (!produkt) {
    notFound()
  }

  const allProdukty = await getProdukty()
  const relatedProdukty = allProdukty
    .filter(p => p.id !== produkt.id)
    .slice(0, 3)

  const heroImage = productImages[produkt.slug] || productImages['default']
  const author = authors[produkt.slug] || authors['default']

  const getRatingLabel = (rating: number) => {
    if (rating >= 9) return { text: 'Výborné', color: 'bg-green-500', textColor: 'text-green-500' }
    if (rating >= 8) return { text: 'Velmi dobré', color: 'bg-green-400', textColor: 'text-green-500' }
    if (rating >= 7) return { text: 'Dobré', color: 'bg-yellow-500', textColor: 'text-yellow-600' }
    return { text: 'Průměrné', color: 'bg-gray-400', textColor: 'text-gray-500' }
  }

  const ratingInfo = getRatingLabel(produkt.rating)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Domů</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/seznamky" className="hover:text-blue-600">Seznamky</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{produkt.name}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
          <Image
            src={heroImage}
            alt={produkt.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <div className={`${ratingInfo.color} text-white font-bold px-4 py-2 rounded-lg text-lg shadow-lg`}>
              {produkt.rating}/10
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {produkt.name} - Recenze 2026
            </h1>
            <span className={`inline-block ${ratingInfo.color} text-white text-sm font-bold px-3 py-1 rounded`}>
              {ratingInfo.text}
            </span>
          </div>
        </div>

        {/* Author & Meta */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {author.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{author.name}</p>
              <p className="text-sm text-gray-500">{author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Aktualizováno: Leden 2026</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>8 min čtení</span>
            </div>
          </div>
        </div>

        {/* Quick Info Box */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">{produkt.rating}/10</div>
              <div className={`text-sm font-semibold ${ratingInfo.textColor}`}>{ratingInfo.text}</div>
              <div className="flex justify-center mt-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-5 h-5 ${i <= Math.round(produkt.rating/2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="text-center border-l border-r border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">{produkt.users}</div>
              <div className="text-sm text-gray-600">aktivních uživatelů</div>
              <div className="text-sm text-gray-500 mt-1">Věk: {produkt.ageRange}</div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <AffiliateLink
                produkt={produkt}
                source="detail"
                placement="info-box"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
              >
                Registrace zdarma
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
              <p className="text-xs text-gray-500 mt-2">Registrace trvá 2 minuty</p>
            </div>
          </div>
        </div>

        {/* Pros & Cons Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pros */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-5">
            <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5" />
              Výhody
            </h2>
            <ul className="space-y-3">
              {produkt.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-red-50 rounded-xl border border-red-200 p-5">
            <h2 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              Nevýhody
            </h2>
            <ul className="space-y-3">
              {produkt.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-blue-600 rounded-xl p-6 mb-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Vyzkoušejte {produkt.name} zdarma
          </h3>
          <p className="text-blue-100 mb-4">
            Registrace je zdarma a trvá jen 2 minuty
          </p>
          <AffiliateLink
            produkt={produkt}
            source="detail"
            placement="mid-banner"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Registrovat se zdarma
            <ChevronRight className="w-5 h-5" />
          </AffiliateLink>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <h2>O seznamce {produkt.name}</h2>
          <p>{produkt.description}</p>

          <ReactMarkdown>{produkt.fullDescription}</ReactMarkdown>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hlavní funkce</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {produkt.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Parameters Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <h2 className="text-xl font-bold text-gray-900 p-5 border-b border-gray-200">
            Parametry {produkt.name}
          </h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 text-gray-600 bg-gray-50 font-medium w-1/3">Hodnocení</td>
                <td className="px-5 py-3 text-gray-900 font-bold">{produkt.rating}/10 ({ratingInfo.text})</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 text-gray-600 bg-gray-50 font-medium">Počet uživatelů</td>
                <td className="px-5 py-3 text-gray-900">{produkt.users}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 text-gray-600 bg-gray-50 font-medium">Věková skupina</td>
                <td className="px-5 py-3 text-gray-900">{produkt.ageRange}</td>
              </tr>
              {produkt.successRate && (
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-3 text-gray-600 bg-gray-50 font-medium">Úspěšnost párování</td>
                  <td className="px-5 py-3 text-gray-900">{produkt.successRate}</td>
                </tr>
              )}
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 text-gray-600 bg-gray-50 font-medium">Bezplatná verze</td>
                <td className="px-5 py-3">
                  {produkt.freeVersion ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" /> Ano
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <X className="w-4 h-4" /> Ne
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-gray-600 bg-gray-50 font-medium">Ověřené profily</td>
                <td className="px-5 py-3">
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" /> Ano
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Another CTA */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Začněte hledat partnera ještě dnes</h3>
              <p className="text-green-100">Připojte se k {produkt.users} uživatelům na {produkt.name}</p>
            </div>
            <AffiliateLink
              produkt={produkt}
              source="detail"
              placement="green-banner"
              className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-600 font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              Registrace zdarma
              <ExternalLink className="w-4 h-4" />
            </AffiliateLink>
          </div>
        </div>

        {/* Verdict Section */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            Závěrečné hodnocení
          </h2>
          <p className="text-gray-700 mb-4">
            {produkt.name} je {produkt.rating >= 8 ? 'výborná' : 'dobrá'} volba pro ty, kteří hledají
            {produkt.categories.includes('vazne-vztahy') ? ' vážný vztah' : ' nové známosti'}.
            S hodnocením <strong>{produkt.rating}/10</strong> a {produkt.users} aktivními uživateli
            patří mezi {produkt.rating >= 8 ? 'nejlepší' : 'kvalitní'} seznamky na českém trhu.
          </p>
          <div className="flex items-center gap-4">
            <div className={`${ratingInfo.color} text-white font-bold px-4 py-2 rounded-lg text-2xl`}>
              {produkt.rating}/10
            </div>
            <div>
              <p className={`font-bold ${ratingInfo.textColor}`}>{ratingInfo.text}</p>
              <p className="text-sm text-gray-500">Celkové hodnocení redakce</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Připraveni vyzkoušet {produkt.name}?
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Tisíce lidí již našly partnera díky {produkt.name}. Registrace je zdarma a nezávazná.
          </p>
          <AffiliateLink
            produkt={produkt}
            source="detail"
            placement="final-cta"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl transition-colors text-lg"
          >
            Registrovat se zdarma na {produkt.name}
            <ExternalLink className="w-5 h-5" />
          </AffiliateLink>
          <p className="text-gray-500 text-sm mt-4">
            Registrace trvá pouze 2 minuty
          </p>
        </div>

        {/* Author Box */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {author.avatar}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{author.name}</p>
              <p className="text-gray-600 mb-2">{author.role}</p>
              <p className="text-sm text-gray-500">
                Specializuji se na recenze online seznamek a pomáhám lidem najít tu pravou platformu
                pro hledání partnera. Testuji seznamky osobně a poskytuji nezávislé hodnocení.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProdukty.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Další seznamky k porovnání</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProdukty.map((p) => (
                <div key={p.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {p.logo ? (
                        <Image src={p.logo} alt={p.name} width={40} height={40} className="object-contain" />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">{p.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{p.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-700">{p.rating}/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/seznamky/${p.slug}`}
                      className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Recenze
                    </Link>
                    <AffiliateLink
                      produkt={p}
                      source="detail"
                      placement="related"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      Vyzkoušet
                    </AffiliateLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
