import { getClanekBySlug, getClanky, getProdukty } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ChevronRight, ExternalLink, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import ArticleCard from '@/components/ArticleCard'
import AffiliateLink from '@/components/AffiliateLink'

interface Props {
  params: { slug: string }
}

// Mapování autorů na fotografie
const authorPhotos: Record<string, string> = {
  'Tereza Nováková': '/images/authors/tereza-novakova.jpg',
  'Martin Dvořák': '/images/authors/martin-dvorak.jpg',
  'Jana Procházková': '/images/authors/jana-prochazkova.jpg',
  'Petr Svoboda': '/images/authors/petr-svoboda.jpg',
  'Lucie Králová': '/images/authors/lucie-kralova.jpg',
  'Tomáš Marek': '/images/authors/tomas-marek.jpg',
  'Kateřina Novotná': '/images/authors/katerina-novotna.jpg',
  'PhDr. Jan Malý': '/images/authors/martin-dvorak.jpg',
  'Mgr. Anna Černá': '/images/authors/jana-prochazkova.jpg',
  'Mgr. Pavel Novotný': '/images/authors/petr-svoboda.jpg',
  'Kateřina Veselá': '/images/authors/katerina-novotna.jpg',
  'Finanční tým Seznamky.info': '/images/authors/redakce.jpg',
  'Anonymní přispěvatel': '/images/authors/redakce.jpg',
  'Redakce Seznamky.info': '/images/authors/redakce.jpg',
  'default': '/images/authors/redakce.jpg',
}

// Bio pro autory
const authorBios: Record<string, string> = {
  'Tereza Nováková': 'Tereza se věnuje recenzím seznamek již přes 5 let a pomáhá tisícům lidí najít tu pravou cestu k lásce.',
  'Martin Dvořák': 'Martin se specializuje na diskrétní seznamky a bezpečnost online seznamování.',
  'Jana Procházková': 'Jana je psycholožka zaměřená na partnerské vztahy a pomáhá čtenářům porozumět dynamice online seznamování.',
  'Petr Svoboda': 'Petr je expert na vztahy na dálku a pomáhá párům udržet silné pouto i přes vzdálenost.',
  'default': 'Náš tým expertů přináší nezávislé, objektivní rady pro úspěšné online seznamování.',
}

export async function generateStaticParams() {
  const clanky = await getClanky()
  return clanky.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const clanek = await getClanekBySlug(params.slug)
  if (!clanek) return { title: 'Nenalezeno' }

  return {
    title: `${clanek.title} | Seznamky.info`,
    description: clanek.excerpt,
    keywords: `${clanek.category}, seznamování, online dating, ${clanek.title.toLowerCase()}`,
    openGraph: {
      title: clanek.title,
      description: clanek.excerpt,
      type: 'article',
      locale: 'cs_CZ',
    },
  }
}

export default async function ClanekDetailPage({ params }: Props) {
  const clanek = await getClanekBySlug(params.slug)

  if (!clanek) {
    notFound()
  }

  const [allClanky, produkty] = await Promise.all([
    getClanky(),
    getProdukty()
  ])

  const relatedClanky = allClanky
    .filter(c => c.id !== clanek.id)
    .slice(0, 3)

  // Top 3 produkty pro affiliate odkazy
  const eliteDate = produkty.find(p => p.slug === 'elite-date')
  const victoriaMilan = produkty.find(p => p.slug === 'victoria-milan')
  const academicSingles = produkty.find(p => p.slug === 'academic-singles')

  const formattedDate = new Date(clanek.createdAt).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const authorPhoto = authorPhotos[clanek.author] || authorPhotos['default']
  const authorBio = authorBios[clanek.author] || authorBios['default']
  const hasImage = clanek.image && clanek.image.startsWith('/images/')

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-rose-50 border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-rose-600">Domů</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/clanky" className="hover:text-rose-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate">{clanek.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
          {hasImage ? (
            <Image
              src={clanek.image}
              alt={clanek.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
              <span className="text-8xl">
                {clanek.category === 'tipy' && '💡'}
                {clanek.category === 'bezpecnost' && '🔒'}
                {clanek.category === 'vztahy' && '❤️'}
                {clanek.category === 'recenze' && '⭐'}
                {clanek.category === 'psychologie' && '🧠'}
                {!['tipy', 'bezpecnost', 'vztahy', 'recenze', 'psychologie'].includes(clanek.category) && '📝'}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block bg-rose-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-3 capitalize">
              {clanek.category}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {clanek.title}
            </h1>
          </div>
        </div>

        {/* Author & Meta with Photo */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-rose-200 flex-shrink-0">
              <Image
                src={authorPhoto}
                alt={clanek.author}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{clanek.author}</p>
              <p className="text-sm text-rose-600">Autor článku</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>{clanek.readTime || 5} min čtení</span>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {clanek.excerpt}
        </p>

        {/* Top Affiliate Banner */}
        {eliteDate && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-5 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-xl border border-rose-200 flex items-center justify-center overflow-hidden">
                  {eliteDate.logo && (
                    <Image src={eliteDate.logo} alt={eliteDate.name} width={48} height={48} className="object-contain" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900">Doporučujeme: {eliteDate.name}</p>
                  <p className="text-sm text-gray-600">{eliteDate.rating}/10 • {eliteDate.users} uživatelů</p>
                </div>
              </div>
              <AffiliateLink
                produkt={eliteDate}
                source="category"
                placement="article-top"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all"
              >
                Vyzkoušet zdarma
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-8
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-rose-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-ul:my-4 prose-li:text-gray-700
          prose-blockquote:border-rose-500 prose-blockquote:bg-rose-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        ">
          <ReactMarkdown>{clanek.content}</ReactMarkdown>
        </div>

        {/* Mid-Article CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-6 mb-8 text-center">
          <Heart className="w-10 h-10 text-rose-200 mx-auto mb-3" fill="currentColor" />
          <h3 className="text-xl font-bold text-white mb-2">
            Hledáte partnera?
          </h3>
          <p className="text-rose-100 mb-4">
            Podívejte se na naše doporučené seznamky s nejvyšším hodnocením
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {eliteDate && (
              <AffiliateLink
                produkt={eliteDate}
                source="category"
                placement="article-mid"
                className="inline-flex items-center gap-2 bg-white hover:bg-rose-50 text-rose-600 font-bold py-2.5 px-5 rounded-xl transition-colors"
              >
                ELITE Date
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
            )}
            {victoriaMilan && (
              <AffiliateLink
                produkt={victoriaMilan}
                source="category"
                placement="article-mid"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
              >
                Victoria Milan
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
            )}
            {academicSingles && (
              <AffiliateLink
                produkt={academicSingles}
                source="category"
                placement="article-mid"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
              >
                Academic Singles
                <ExternalLink className="w-4 h-4" />
              </AffiliateLink>
            )}
          </div>
        </div>

        {/* Author Box */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl border border-rose-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-rose-300 flex-shrink-0">
              <Image
                src={authorPhoto}
                alt={clanek.author}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{clanek.author}</p>
              <p className="text-rose-600 mb-2">Autor článku</p>
              <p className="text-sm text-gray-600">
                {authorBio}
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 text-center">
          <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Připraveni najít lásku?
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Prohlédněte si naše srovnání nejlepších seznamek a vyberte tu pravou pro vás.
          </p>
          <Link
            href="/seznamky"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
          >
            Srovnat seznamky
            <ChevronRight className="w-5 h-5" />
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
      </article>
    </div>
  )
}
