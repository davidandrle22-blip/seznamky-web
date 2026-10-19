import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ChevronRight, Check } from 'lucide-react'
import { getKategorie, getKategorieBySlug, getProduktyByKategorie, getCategoryContentBySlug, getProdukty } from '@/lib/data'
import RankedList, { ScoreBadge } from '@/components/RankedList'
import ComparisonTable from '@/components/ComparisonTable'
import FaqSection from '@/components/FaqSection'
import AffiliateLink from '@/components/AffiliateLink'
import { ItemListSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo'
import { CATEGORY_PICKS, AWARDS, isTracked } from '@/lib/monetization'
import { CURRENT_YEAR, monthYear, SITE_URL } from '@/lib/site'

interface Props {
  params: { slug: string }
}

const withYear = (s?: string) => (s || '').split('{Y}').join(String(CURRENT_YEAR))

export async function generateStaticParams() {
  const kategorie = await getKategorie()
  return kategorie.map(k => ({ slug: k.slug }))
}

export async function generateMetadata({ params }: Props) {
  const kategorie = await getKategorieBySlug(params.slug)
  if (!kategorie) return { title: 'Nenalezeno' }
  const canonical = params.slug === 'vsechny-seznamky' ? '/seznamky' : `/kategorie/${kategorie.slug}`
  const title = withYear(kategorie.metaTitle) || kategorie.name
  const description = withYear(kategorie.metaDescription) || kategorie.description
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: `${SITE_URL}${canonical}`, type: 'website' },
  }
}

export default async function KategoriePage({ params }: Props) {
  const kategorie = await getKategorieBySlug(params.slug)
  if (!kategorie) notFound()

  const [produkty, content, allKategorie, allProdukty] = await Promise.all([
    getProduktyByKategorie(kategorie.id),
    getCategoryContentBySlug(params.slug),
    getKategorie(),
    getProdukty(),
  ])

  const pickSlugs = CATEGORY_PICKS[params.slug] ?? []
  const picks = pickSlugs
    .map(s => allProdukty.find(p => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  // Doporučené seznamky kategorie vždy nahoře žebříčku, zbytek podle priority
  const ranked = [...picks, ...produkty.filter(p => !pickSlugs.includes(p.slug))]
  const main = picks[0] || produkty[0]

  const related = (content?.relatedCategories?.length
    ? allKategorie.filter(k => content.relatedCategories.includes(k.slug))
    : allKategorie.filter(k => k.slug !== params.slug).slice(0, 3)
  ).filter(k => k.slug !== params.slug)

  const h1 = withYear(content?.heroTitle) || `${kategorie.name} ${CURRENT_YEAR}`
  const breadcrumbs = [
    { name: 'Domů', url: `${SITE_URL}/` },
    { name: 'Kategorie', url: `${SITE_URL}/seznamky` },
    { name: kategorie.name, url: `${SITE_URL}/kategorie/${kategorie.slug}` },
  ]

  return (
    <div>
      <ItemListSchema name={h1} items={ranked.map(p => ({ name: p.name, url: `${SITE_URL}/seznamky/${p.slug}` }))} />
      <BreadcrumbSchema items={breadcrumbs} />
      {content?.faq?.length ? <FAQSchema items={content.faq} /> : null}

      <section className="hero-dark">
        <div className="relative z-10 container-wide py-14 lg:py-20 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <nav className="text-sm text-white/50 mb-6" aria-label="Drobečková navigace">
              <Link href="/" className="hover:text-white">Domů</Link><span className="mx-1.5">/</span>
              <Link href="/seznamky" className="hover:text-white">Seznamky</Link><span className="mx-1.5">/</span>
              <span className="text-white/80">{kategorie.name}</span>
            </nav>
            <p className="eyebrow-light">Aktualizováno: {monthYear()} · {ranked.length} seznamek</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-white text-balance">{h1}</h1>
            <p className="mt-5 text-lg text-white/65 max-w-2xl">{content?.heroSubtitle || kategorie.description}</p>
          </div>

          {main && (
            <div className="rounded-3xl bg-white p-6 text-ink-900 shadow-2xl">
              <p className="eyebrow">Doporučení redakce</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="relative w-16 h-16 shrink-0 rounded-xl border border-ivory-300 overflow-hidden">
                  <Image src={main.logo} alt={`${main.name} logo`} fill sizes="64px" className="object-contain p-1.5" />
                </span>
                <div className="flex-1">
                  <Link href={`/seznamky/${main.slug}`} className="font-display text-2xl font-semibold hover:text-rose-700">{main.name}</Link>
                  {AWARDS[main.slug] && <p className="text-sm text-gold-700">{AWARDS[main.slug]}</p>}
                </div>
                <ScoreBadge rating={main.rating} />
              </div>
              <ul className="mt-4 space-y-1.5">
                {main.pros.slice(0, 3).map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-600"><Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />{p}</li>
                ))}
              </ul>
              <AffiliateLink produkt={main} source="category" placement={`hero-${params.slug}`} className={`${isTracked(main.slug) ? 'btn-gold' : 'btn-line'} w-full mt-5`}>
                Vyzkoušet {main.name} zdarma <ChevronRight className="w-4 h-4" />
              </AffiliateLink>
            </div>
          )}
        </div>
      </section>

      {content?.introText && (
        <section className="container-x pt-12">
          <div className="prose-review mx-auto">
            <ReactMarkdown>{content.introText}</ReactMarkdown>
          </div>
        </section>
      )}

      <section className="container-wide pt-12">
        <h2 className="h-section mb-8">Žebříček: {kategorie.name.toLowerCase()} ({monthYear()})</h2>
        {ranked.length > 0 ? (
          <RankedList produkty={ranked} source="category" />
        ) : (
          <p className="text-ink-500">V této kategorii zatím nemáme hodnocené seznamky.</p>
        )}
      </section>

      {ranked.length > 1 && (
        <section className="container-wide pt-16">
          <h2 className="h-section mb-8">Srovnávací tabulka</h2>
          <ComparisonTable produkty={ranked} source="category" keepOrder />
        </section>
      )}

      {content?.sections?.length ? (
        <section className="container-x pt-16">
          <div className="prose-review mx-auto">
            {content.sections.map((s, i) => (
              <div key={i}>
                <h2>{withYear(s.title)}</h2>
                <ReactMarkdown>{withYear(s.content)}</ReactMarkdown>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content?.faq?.length ? <FaqSection items={content.faq} title={`Časté otázky: ${kategorie.name.toLowerCase()}`} /> : null}

      {related.length > 0 && (
        <section className="container-wide pt-4">
          <h2 className="h-section mb-6">Související kategorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map(k => (
              <Link key={k.id} href={`/kategorie/${k.slug}`} className="panel-hover p-6 group">
                <h3 className="text-xl font-semibold text-ink-900 group-hover:text-rose-700">{k.name}</h3>
                <p className="mt-2 text-sm text-ink-500 line-clamp-2">{k.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-rose-700">Prohlédnout <ChevronRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="container-x disclosure pt-10">
        Stránka obsahuje affiliate odkazy. Pokud se přes ně zaregistrujete, můžeme získat provizi. Cena se pro vás nemění.
        Ceny a funkce seznamek se mohou měnit, aktuální podmínky ověřte na webu provozovatele.
      </p>
    </div>
  )
}
