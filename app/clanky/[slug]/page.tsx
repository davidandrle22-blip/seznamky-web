import { getClanekBySlug, getClanky, getProdukty } from '@/lib/data'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ChevronRight, ExternalLink, Heart, Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import ArticleCard from '@/components/ArticleCard'
import AffiliateLink from '@/components/AffiliateLink'
import LeadMagnet from '@/components/LeadMagnet'

interface Props {
  params: { slug: string }
}

// Mapování autorů na fotografie - ženy mají ženské fotky, muži mužské
const authorPhotos: Record<string, string> = {
  // Ženská jména → ženské fotografie
  'Tereza Nováková': '/images/authors/tereza-novakova.jpg',
  'Jana Procházková': '/images/authors/jana-prochazkova.jpg',
  'Lucie Králová': '/images/authors/lucie-kralova.jpg',
  'Kateřina Novotná': '/images/authors/katerina-novotna.jpg',
  'Kateřina Veselá': '/images/authors/lucie-kralova.jpg',
  'Mgr. Anna Černá': '/images/authors/tereza-novakova.jpg',
  // Mužská jména → mužské fotografie
  'Martin Dvořák': '/images/authors/martin-dvorak.jpg',
  'Petr Svoboda': '/images/authors/petr-svoboda.jpg',
  'Tomáš Marek': '/images/authors/tomas-marek.jpg',
  'PhDr. Jan Malý': '/images/authors/tomas-marek.jpg',
  'Mgr. Pavel Novotný': '/images/authors/martin-dvorak.jpg',
  // Redakce a týmy
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
      {/* Hero with Red Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-red-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-rose-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Domů</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/clanky" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium truncate">{clanek.title}</span>
          </div>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
            <BookOpen className="w-4 h-4 text-rose-300" />
            <span className="text-sm font-medium text-rose-200 capitalize">{clanek.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
              {clanek.title}
            </span>
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src={authorPhoto}
                  alt={clanek.author}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{clanek.author}</p>
                <p className="text-sm text-rose-200">Autor článku</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-rose-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{clanek.readTime || 5} min čtení</span>
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Image */}
        {hasImage && (
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 -mt-8 shadow-xl">
            <Image
              src={clanek.image}
              alt={clanek.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

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

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Article Content */}
          <div className="flex-grow prose prose-lg max-w-none
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

          {/* Sidebar with Affiliate Links */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Top Picks Sidebar */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200 p-4">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" fill="currentColor" />
                  Nejlepší seznamky
                </h4>
                <div className="space-y-3">
                  {eliteDate && (
                    <AffiliateLink
                      produkt={eliteDate}
                      source="article"
                      placement="sidebar-top"
                      className="flex items-center gap-3 bg-white rounded-lg p-3 border border-rose-100 hover:border-rose-300 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {eliteDate.logo && (
                          <Image src={eliteDate.logo} alt={eliteDate.name} width={32} height={32} className="object-contain" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-rose-600 transition-colors">{eliteDate.name}</p>
                        <p className="text-xs text-gray-500">{eliteDate.rating}/10 ⭐</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    </AffiliateLink>
                  )}
                  {victoriaMilan && (
                    <AffiliateLink
                      produkt={victoriaMilan}
                      source="article"
                      placement="sidebar-mid"
                      className="flex items-center gap-3 bg-white rounded-lg p-3 border border-purple-100 hover:border-purple-300 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {victoriaMilan.logo && (
                          <Image src={victoriaMilan.logo} alt={victoriaMilan.name} width={32} height={32} className="object-contain" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-purple-600 transition-colors">{victoriaMilan.name}</p>
                        <p className="text-xs text-gray-500">{victoriaMilan.rating}/10 ⭐</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    </AffiliateLink>
                  )}
                  {academicSingles && (
                    <AffiliateLink
                      produkt={academicSingles}
                      source="article"
                      placement="sidebar-bottom"
                      className="flex items-center gap-3 bg-white rounded-lg p-3 border border-amber-100 hover:border-amber-300 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {academicSingles.logo && (
                          <Image src={academicSingles.logo} alt={academicSingles.name} width={32} height={32} className="object-contain" />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-amber-600 transition-colors">{academicSingles.name}</p>
                        <p className="text-xs text-gray-500">{academicSingles.rating}/10 ⭐</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    </AffiliateLink>
                  )}
                </div>
              </div>

              {/* Quick CTA Box */}
              <div className="bg-gray-900 rounded-xl p-4 text-center">
                <p className="text-white font-semibold mb-2">Připraveni na lásku?</p>
                <AffiliateLink
                  produkt={eliteDate!}
                  source="article"
                  placement="sidebar-cta"
                  className="block w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-sm"
                >
                  Registrace zdarma →
                </AffiliateLink>
              </div>
            </div>
          </aside>
        </div>

        {/* Inline Recommendation Box */}
        <div className="bg-white rounded-xl border-2 border-rose-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow">
              <p className="text-sm text-rose-600 font-semibold mb-1">💡 Tip redakce</p>
              <p className="text-gray-700">
                Pro vážné vztahy doporučujeme <strong>ELITE Date</strong> - má nejvyšší úspěšnost párování v ČR.
                Pro diskrétní seznámení je ideální <strong>Victoria Milan</strong>.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {eliteDate && (
                <AffiliateLink
                  produkt={eliteDate}
                  source="article"
                  placement="inline-tip"
                  className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  ELITE Date
                </AffiliateLink>
              )}
              {victoriaMilan && (
                <AffiliateLink
                  produkt={victoriaMilan}
                  source="article"
                  placement="inline-tip"
                  className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Victoria Milan
                </AffiliateLink>
              )}
            </div>
          </div>
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

        {/* Lead Magnet - E-book */}
        <LeadMagnet
          source="ebook"
          placement="blog-post-bottom"
          className="mb-8"
        />

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
