import { getProduktBySlug, getProdukty } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Star, Users, ExternalLink, Check, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const produkty = await getProdukty()
  return produkty.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) return { title: 'Nenalezeno' }

  return {
    title: `${produkt.name} recenze | Srovnání seznamek`,
    description: produkt.description,
  }
}

export default async function ProduktDetailPage({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)

  if (!produkt) {
    notFound()
  }

  const allProdukty = await getProdukty()
  const relatedProdukty = allProdukty
    .filter(p => p.id !== produkt.id && p.categories.some(c => produkt.categories.includes(c)))
    .slice(0, 3)

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/seznamky" className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na seznam
        </Link>

        {/* Header */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-4xl font-bold text-primary-500 flex-shrink-0">
              {produkt.name.charAt(0)}
            </div>

            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{produkt.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{produkt.description}</p>

              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div className="flex items-center bg-primary-100 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-primary-500 fill-primary-400" />
                  <span className="ml-1 font-semibold text-gray-900">{produkt.rating}/5</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {produkt.users} uživatelů
                </div>
                <div className="text-gray-600">
                  Věk: {produkt.ageRange}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {produkt.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/seznamky?kategorie=${cat}`}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <a
              href={produkt.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center whitespace-nowrap"
            >
              Navštívit {produkt.name}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
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

          <div className="card p-6">
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
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hlavní funkce</h2>
          <div className="flex flex-wrap gap-3">
            {produkt.features.map((feature, index) => (
              <span key={index} className="bg-primary-100 text-gray-800 px-4 py-2 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Full description */}
        <div className="card p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{produkt.fullDescription}</ReactMarkdown>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-400 rounded-2xl p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vyzkoušejte {produkt.name} ještě dnes
          </h2>
          <p className="text-gray-800 mb-6">
            Registrace je zdarma a můžete ihned začít hledat svého partnera.
          </p>
          <a
            href={produkt.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center"
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
                <Link key={p.id} href={`/seznamky/${p.slug}`} className="card p-6 hover:border-primary-400 border-2 border-transparent">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-primary-500 mb-3">
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{p.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-primary-400 fill-primary-400 mr-1" />
                    {p.rating}
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
