import { getClanekBySlug, getClanky } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const clanky = await getClanky()
  return clanky.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const clanek = await getClanekBySlug(params.slug)
  if (!clanek) return { title: 'Nenalezeno' }

  return {
    title: `${clanek.title} | Srovnání seznamek`,
    description: clanek.excerpt,
  }
}

export default async function ClanekDetailPage({ params }: Props) {
  const clanek = await getClanekBySlug(params.slug)

  if (!clanek) {
    notFound()
  }

  const allClanky = await getClanky()
  const relatedClanky = allClanky
    .filter(c => c.id !== clanek.id)
    .slice(0, 3)

  const formattedDate = new Date(clanek.createdAt).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link href="/clanky" className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zpět na články
        </Link>

        {/* Article header */}
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full capitalize">
                {clanek.category}
              </span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {clanek.author}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {clanek.title}
            </h1>

            <p className="text-xl text-gray-600">
              {clanek.excerpt}
            </p>
          </header>

          {/* Featured image placeholder */}
          <div className="h-64 md:h-96 bg-gradient-to-br from-primary-300 to-primary-500 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-8xl">
              {clanek.category === 'tipy' && '💡'}
              {clanek.category === 'bezpecnost' && '🔒'}
              {clanek.category === 'vztahy' && '❤️'}
              {!['tipy', 'bezpecnost', 'vztahy'].includes(clanek.category) && '📝'}
            </span>
          </div>

          {/* Content */}
          <div className="card p-8 mb-8">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-500 prose-strong:text-gray-900">
              <ReactMarkdown>{clanek.content}</ReactMarkdown>
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Připraveni najít lásku?
          </h2>
          <p className="text-gray-300 mb-6">
            Podívejte se na naše srovnání seznamek a vyberte si tu pravou pro vás.
          </p>
          <Link
            href="/seznamky"
            className="bg-primary-400 hover:bg-primary-500 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center"
          >
            Prohlédnout seznamky
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Related articles */}
        {relatedClanky.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Další články</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedClanky.map((c) => (
                <ArticleCard key={c.id} clanek={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
