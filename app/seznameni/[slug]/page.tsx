import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { ChevronRight, Check, MapPin } from 'lucide-react'
import { getProdukty } from '@/lib/data'
import RankedList, { ScoreBadge } from '@/components/RankedList'
import ComparisonTable from '@/components/ComparisonTable'
import FaqSection from '@/components/FaqSection'
import AffiliateLink from '@/components/AffiliateLink'
import MobileCtaBar from '@/components/MobileCtaBar'
import SeznamkaFinder from '@/components/SeznamkaFinder'
import { ItemListSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo'
import { AWARDS, isTracked } from '@/lib/monetization'
import { CURRENT_YEAR, monthYear, SITE_URL } from '@/lib/site'
import { LANDINGS, getLanding, siblingCities, krajLandingFor, landingsByType, Landing } from '@/lib/seznameni'

interface Props {
  params: { slug: string }
}

const withYear = (s: string) => s.split('{Y}').join(String(CURRENT_YEAR))

const TYPE_LABEL: Record<Landing['type'], string> = {
  mesto: 'Seznámení podle měst',
  kraj: 'Seznámení podle krajů',
  kdo: 'Kdo koho hledá',
  vek: 'Seznámení podle věku',
}

export function generateStaticParams() {
  return LANDINGS.map(l => ({ slug: l.slug }))
}

export function generateMetadata({ params }: Props) {
  const l = getLanding(params.slug)
  if (!l) return { title: 'Nenalezeno' }
  const title = withYear(l.metaTitle)
  const canonical = `/seznameni/${l.slug}`
  return {
    title,
    description: l.metaDescription,
    alternates: { canonical },
    openGraph: { title, description: l.metaDescription, url: `${SITE_URL}${canonical}`, type: 'website' },
  }
}

export default async function SeznameniPage({ params }: Props) {
  const l = getLanding(params.slug)
  if (!l) notFound()

  const all = await getProdukty()
  // Pořadí podle redakčního výběru stránky; měřené seznamky napřed, uvnitř skupin se pořadí výběru zachová
  const picked = l.picks
    .map(s => all.find(p => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const ranked = [...picked.filter(p => isTracked(p.slug)), ...picked.filter(p => !isTracked(p.slug))]
  const main = ranked[0]

  const siblings = siblingCities(l)
  const kraj = krajLandingFor(l)
  const sameType = landingsByType(l.type).filter(x => x.slug !== l.slug)

  const breadcrumbs = [
    { name: 'Domů', url: `${SITE_URL}/` },
    { name: 'Seznámení', url: `${SITE_URL}/seznameni` },
    { name: l.name, url: `${SITE_URL}/seznameni/${l.slug}` },
  ]

  return (
    <div className="pb-20 lg:pb-0">
      <ItemListSchema name={l.h1} items={ranked.map(p => ({ name: p.name, url: `${SITE_URL}/seznamky/${p.slug}` }))} />
      <BreadcrumbSchema items={breadcrumbs} />
      {l.faq?.length ? <FAQSchema items={l.faq} /> : null}

      <section className="hero-dark">
        <div className="relative z-10 container-wide py-14 lg:py-20 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <nav className="text-sm text-white/50 mb-6" aria-label="Drobečková navigace">
              <Link href="/" className="hover:text-white">Domů</Link><span className="mx-1.5">/</span>
              <Link href="/seznameni" className="hover:text-white">Seznámení</Link><span className="mx-1.5">/</span>
              {kraj && (<><Link href={`/seznameni/${kraj.slug}`} className="hover:text-white">{kraj.name}</Link><span className="mx-1.5">/</span></>)}
              <span className="text-white/80">{l.name}</span>
            </nav>
            <p className="eyebrow-light">{TYPE_LABEL[l.type]} · aktualizováno {monthYear()}</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-white text-balance">{l.h1}</h1>
            <p className="mt-5 text-lg text-white/65 max-w-2xl">{l.lead}</p>
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
              <AffiliateLink produkt={main} source="category" placement={`seznameni-hero-${l.slug}`} className={`${isTracked(main.slug) ? 'btn-gold' : 'btn-line'} w-full mt-5`}>
                Vyzkoušet {main.name} zdarma <ChevronRight className="w-4 h-4" />
              </AffiliateLink>
            </div>
          )}
        </div>
      </section>

      <section className="container-wide pt-12">
        <p className="eyebrow">Žebříček · {monthYear()}</p>
        <h2 className="h-section mt-2 mb-10">{l.type === 'mesto' || l.type === 'kraj' ? `Nejlepší seznamky: ${l.name}` : l.name}</h2>
        <RankedList produkty={ranked} source="category" />
      </section>

      <section className="container-x pt-16">
        <div className="prose-review mx-auto">
          <ReactMarkdown>{l.body}</ReactMarkdown>
        </div>
      </section>

      {ranked.length > 1 && (
        <section className="container-wide pt-16">
          <h2 className="h-section mb-8">Srovnávací tabulka</h2>
          <ComparisonTable produkty={ranked} source="category" keepOrder />
        </section>
      )}

      <section className="container-wide pt-16">
        <SeznamkaFinder />
      </section>

      {l.faq?.length ? <FaqSection items={l.faq} title="Časté otázky" /> : null}

      {(siblings.length > 0 || kraj) && (
        <section className="container-wide pt-6">
          <h2 className="h-section mb-6">Seznámení v okolí</h2>
          <div className="flex flex-wrap gap-2">
            {kraj && (
              <Link href={`/seznameni/${kraj.slug}`} className="chip-link"><MapPin className="w-4 h-4" />{kraj.name}</Link>
            )}
            {siblings.map(s => (
              <Link key={s.slug} href={`/seznameni/${s.slug}`} className="chip-link"><MapPin className="w-4 h-4" />Seznamka {s.name}</Link>
            ))}
          </div>
        </section>
      )}

      <section className="container-wide pt-10">
        <h2 className="h-section mb-6">{TYPE_LABEL[l.type]}</h2>
        <div className="flex flex-wrap gap-2">
          {sameType.map(s => (
            <Link key={s.slug} href={`/seznameni/${s.slug}`} className="chip-link">{s.type === 'mesto' ? `Seznamka ${s.name}` : s.name}</Link>
          ))}
        </div>
        <p className="mt-6"><Link href="/seznameni" className="inline-flex items-center gap-1 text-sm font-medium text-rose-700">Všechna města, kraje a kategorie <ChevronRight className="w-4 h-4" /></Link></p>
      </section>

      <p className="container-x disclosure pt-10">
        Ceny a funkce seznamek se mohou měnit, aktuální podmínky ověřte na webu provozovatele.
      </p>

      {main && isTracked(main.slug) && (
        <MobileCtaBar produkt={main} source="category" kicker="Doporučení redakce" label="Vyzkoušet" />
      )}
    </div>
  )
}
