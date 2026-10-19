import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Clock, ChevronRight } from 'lucide-react'
import { getClanekBySlug, getClanky, getProdukty } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'
import AffiliateLink from '@/components/AffiliateLink'
import { ScoreBadge } from '@/components/RankedList'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo'
import { categoryLabel } from '@/lib/article-categories'
import { AWARDS, isTracked } from '@/lib/monetization'
import { EDITORIAL_NAME, formatDateCz, SITE_URL } from '@/lib/site'
import type { Clanek, Produkt } from '@/lib/types'

interface Props {
  params: { slug: string }
}

const slugify = (s: unknown) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')

// Výchozí doporučené seznamky podle rubriky článku
const CATEGORY_PRODUCTS: Record<string, string[]> = {
  '50plus': ['singles50', 'elite-date', 'academic-singles'],
  vztahy: ['elite-date', 'academic-singles', 'be2'],
  psychologie: ['elite-date', 'be2', 'academic-singles'],
  default: ['elite-date', 'academic-singles', 'victoria-milan'],
}

function textOf(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(textOf).join('')
  return ''
}

function headings(md: string) {
  return md.split('\n').filter(l => l.startsWith('## ')).map(l => {
    const t = l.replace(/^## /, '').trim()
    return { title: t, id: slugify(t) }
  })
}

export async function generateStaticParams() {
  const clanky = await getClanky()
  return clanky.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const clanek = await getClanekBySlug(params.slug)
  if (!clanek) return { title: 'Nenalezeno' }
  const title = clanek.metaTitle || clanek.title
  return {
    title,
    description: clanek.excerpt,
    alternates: { canonical: `/clanky/${clanek.slug}` },
    openGraph: {
      title: clanek.title,
      description: clanek.excerpt,
      type: 'article',
      url: `${SITE_URL}/clanky/${clanek.slug}`,
      publishedTime: clanek.createdAt,
      modifiedTime: clanek.updatedAt || clanek.createdAt,
      images: clanek.image ? [{ url: clanek.image }] : undefined,
    },
  }
}

export default async function ClanekDetailPage({ params }: Props) {
  const clanek = await getClanekBySlug(params.slug)
  if (!clanek || !clanek.isPublished) notFound()

  const [allClanky, produkty] = await Promise.all([getClanky(), getProdukty()])

  const relatedClanky = pickRelated(clanek, allClanky)
  const productSlugs = clanek.relatedProducts?.length ? clanek.relatedProducts : (CATEGORY_PRODUCTS[clanek.category] || CATEGORY_PRODUCTS.default)
  const recommended = productSlugs.map(s => produkty.find(p => p.slug === s)).filter((p): p is Produkt => Boolean(p))
  const main = recommended[0]
  const toc = headings(clanek.content)
  const url = `${SITE_URL}/clanky/${clanek.slug}`

  // Doporučovací box vložíme do článku za ~třetinu obsahu (před 2. nebo 3. nadpis H2)
  const parts = clanek.content.split(/\n(?=## )/)
  const insertAt = Math.min(parts.length - 1, Math.max(1, Math.round(parts.length / 3)))
  const first = parts.slice(0, insertAt).join('\n')
  const second = parts.slice(insertAt).join('\n')

  const md = {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
    table: ({ children }: { children?: React.ReactNode }) => <div className="table-wrapper overflow-x-auto"><table>{children}</table></div>,
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
      href?.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  }

  return (
    <div>
      <ArticleSchema
        headline={clanek.title}
        description={clanek.excerpt}
        url={url}
        image={clanek.image ? `${SITE_URL}${clanek.image}` : undefined}
        datePublished={clanek.createdAt}
        dateModified={clanek.updatedAt}
        section={categoryLabel(clanek.category)}
      />
      <BreadcrumbSchema items={[
        { name: 'Domů', url: `${SITE_URL}/` },
        { name: 'Magazín', url: `${SITE_URL}/clanky` },
        { name: clanek.title, url },
      ]} />

      <header className="container-x pt-10">
        <nav className="text-sm text-ink-400" aria-label="Drobečková navigace">
          <Link href="/" className="hover:text-ink-800">Domů</Link><span className="mx-1.5">/</span>
          <Link href="/clanky" className="hover:text-ink-800">Magazín</Link><span className="mx-1.5">/</span>
          <Link href={`/clanky?kategorie=${clanek.category}`} className="hover:text-ink-800">{categoryLabel(clanek.category)}</Link>
        </nav>
        <h1 className="mt-6 text-4xl md:text-[3.1rem] font-semibold leading-[1.1] text-ink-900 text-balance">{clanek.title}</h1>
        <p className="mt-5 text-xl text-ink-500 leading-relaxed">{clanek.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400 border-y border-ivory-300 py-4">
          <span className="font-semibold text-ink-700">{EDITORIAL_NAME}</span>
          <span>Publikováno {formatDateCz(clanek.createdAt)}</span>
          {clanek.updatedAt && clanek.updatedAt !== clanek.createdAt && <span>Aktualizováno {formatDateCz(clanek.updatedAt)}</span>}
          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {clanek.readTime || 6} min čtení</span>
        </div>
      </header>

      {clanek.image?.startsWith('/images/') && (
        <div className="container-x mt-8">
          <div className="relative aspect-[16/8] rounded-3xl overflow-hidden bg-ink-100">
            <Image src={clanek.image} alt={clanek.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="container-x mt-10">
        {toc.length >= 3 && (
          <nav className="panel p-5 mb-10" aria-label="Obsah článku">
            <p className="eyebrow mb-3">Obsah článku</p>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 list-decimal list-inside text-[15px] text-ink-600 marker:text-gold-500">
              {toc.map(h => <li key={h.id}><a href={`#${h.id}`} className="hover:text-rose-700">{h.title}</a></li>)}
            </ol>
          </nav>
        )}

        <article className="prose-review max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>{first}</ReactMarkdown>

          {main && (
            <aside className="not-prose my-10 rounded-2xl border border-gold-200 bg-gold-50/70 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
              <ScoreBadge rating={main.rating} />
              <div className="flex-1 text-center sm:text-left">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700">Tip redakce · {AWARDS[main.slug] || 'Doporučujeme'}</div>
                <div className="mt-1 font-display text-2xl font-semibold text-ink-900">{main.name}</div>
                <div className="mt-1 text-sm text-ink-500">{main.description}</div>
              </div>
              <AffiliateLink produkt={main} source="article" placement={`inline-${clanek.slug}`} className={`${isTracked(main.slug) ? 'btn-gold' : 'btn-line'} whitespace-nowrap`}>
                Vyzkoušet zdarma <ChevronRight className="w-4 h-4" />
              </AffiliateLink>
            </aside>
          )}

          <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>{second}</ReactMarkdown>
        </article>

        {recommended.length > 0 && (
          <section className="mt-14 panel p-6 md:p-8">
            <p className="eyebrow">Kde začít</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink-900">Seznamky, které redakce doporučuje</h2>
            <ul className="mt-6 divide-y divide-ivory-200">
              {recommended.map((p, i) => (
                <li key={p.slug} className="py-4 flex items-center gap-4">
                  <span className="font-display text-xl text-ink-300 w-5">{i + 1}</span>
                  <span className="relative w-12 h-12 shrink-0 rounded-xl border border-ivory-300 overflow-hidden">
                    <Image src={p.logo} alt={`${p.name} logo`} fill sizes="48px" className="object-contain p-1" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link href={`/seznamky/${p.slug}`} className="font-semibold text-ink-900 hover:text-rose-700">{p.name}</Link>
                    <p className="text-sm text-ink-400 truncate">{AWARDS[p.slug] || p.shortDescription}</p>
                  </div>
                  <AffiliateLink produkt={p} source="article" placement={`bottom-${i + 1}`} className={`${isTracked(p.slug) ? (i === 0 ? 'btn-gold' : 'btn-wine') : 'btn-line'} !py-2.5 !px-4 text-sm whitespace-nowrap`}>
                    Web
                  </AffiliateLink>
                </li>
              ))}
            </ul>
            <p className="disclosure mt-4">Obsahuje affiliate odkazy. Při registraci můžeme získat provizi, cena se pro vás nemění.</p>
          </section>
        )}
      </div>

      {relatedClanky.length > 0 && (
        <section className="container-wide pt-16">
          <h2 className="h-section mb-8">Mohlo by vás zajímat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedClanky.map(c => <ArticleCard key={c.id} clanek={c} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function pickRelated(clanek: Clanek, all: Clanek[]): Clanek[] {
  const others = all.filter(c => c.slug !== clanek.slug)
  const same = others.filter(c => c.category === clanek.category)
  const tagged = others.filter(c => c.tags?.some(t => clanek.tags?.includes(t)))
  const merged = [...same, ...tagged, ...others]
  return merged.filter((c, i) => merged.findIndex(x => x.slug === c.slug) === i).slice(0, 3)
}
