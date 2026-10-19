import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Check, X, ChevronRight, ShieldCheck, Smartphone, Gift, Users, CalendarRange, AlertTriangle } from 'lucide-react'
import { getProduktBySlug, getProdukty, getAllProdukty } from '@/lib/data'
import AffiliateLink from '@/components/AffiliateLink'
import MobileCtaBar from '@/components/MobileCtaBar'
import FaqSection from '@/components/FaqSection'
import { ScoreBadge, ratingLabel } from '@/components/RankedList'
import { ReviewSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo'
import { getExtendedContent } from '@/lib/review-content'
import { AWARDS, isTracked, sortByPriority, PRIORITY_ORDER } from '@/lib/monetization'
import { CURRENT_YEAR, EDITORIAL_NAME, formatDateCz, LAST_REVIEW_DATE, SITE_URL } from '@/lib/site'
import type { Produkt } from '@/lib/types'

interface Props {
  params: { slug: string }
}

const slugify = (s: unknown) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')

const mdComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slugify(children)}>{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 id={slugify(children)}>{children}</h3>,
  table: ({ children }: { children?: React.ReactNode }) => <div className="table-wrapper overflow-x-auto"><table>{children}</table></div>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith('/') ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
}

export async function generateStaticParams() {
  const produkty = await getAllProdukty()
  return produkty.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) return { title: 'Nenalezeno' }

  const title = `${produkt.name} recenze ${CURRENT_YEAR}: zkušenosti, ceny a hodnocení`
  const description = `${produkt.name} recenze: hodnocení ${produkt.rating}/10, pro koho se hodí, kolik stojí, výhody a nevýhody. ${produkt.description}`.slice(0, 300)

  return {
    title,
    description,
    alternates: { canonical: `/seznamky/${produkt.slug}` },
    robots: produkt.isActive ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${produkt.name} recenze ${CURRENT_YEAR}`,
      description,
      type: 'article',
      url: `${SITE_URL}/seznamky/${produkt.slug}`,
      images: [{ url: produkt.logo }],
    },
  }
}

function pickAlternatives(produkt: Produkt, all: Produkt[]): Produkt[] {
  const others = all.filter(p => p.slug !== produkt.slug)
  const sameCat = others.filter(p => p.categories.some(c => produkt.categories.includes(c)))
  const tracked = sortByPriority(sameCat.filter(p => isTracked(p.slug)))
  const fallback = sortByPriority(others.filter(p => PRIORITY_ORDER.includes(p.slug)))
  const merged = [...tracked, ...fallback, ...sameCat]
  return merged.filter((p, i) => merged.findIndex(x => x.slug === p.slug) === i).slice(0, 3)
}

export default async function ProduktDetailPage({ params }: Props) {
  const produkt = await getProduktBySlug(params.slug)
  if (!produkt) notFound()

  const allProdukty = await getProdukty()
  const alternatives = pickAlternatives(produkt, allProdukty)
  const tracked = isTracked(produkt.slug) && produkt.isActive
  const extended = getExtendedContent(produkt.slug, produkt.rating)
  const body = extended || produkt.fullDescription
  const updated = produkt.lastUpdated || LAST_REVIEW_DATE
  const award = AWARDS[produkt.slug]

  const breadcrumbItems = [
    { name: 'Domů', url: `${SITE_URL}/` },
    { name: 'Seznamky', url: `${SITE_URL}/seznamky` },
    { name: `${produkt.name} recenze`, url: `${SITE_URL}/seznamky/${produkt.slug}` },
  ]

  const facts = [
    { icon: CalendarRange, label: 'Věk uživatelů', value: produkt.ageRange },
    { icon: Users, label: 'Registrovaných', value: produkt.users },
    { icon: Gift, label: 'Registrace zdarma', value: produkt.freeVersion ? 'Ano' : 'Ne' },
    { icon: Smartphone, label: 'Mobilní aplikace', value: produkt.hasApp ? 'iOS / Android' : 'Jen web' },
    ...(produkt.genderRatio ? [{ icon: ShieldCheck, label: 'Muži / ženy', value: `${produkt.genderRatio} %` }] : []),
  ]

  return (
    <div className="pb-24 lg:pb-0">
      {produkt.isActive && <ReviewSchema produkt={produkt} author={EDITORIAL_NAME} datePublished="2026-01-15" dateModified={updated} />}
      <BreadcrumbSchema items={breadcrumbItems} />
      {produkt.faq && produkt.faq.length > 0 && <FAQSchema items={produkt.faq} />}

      {/* HERO */}
      <section className="hero-dark">
        <div className="relative z-10 container-wide pt-8 pb-14 lg:pb-20">
          <nav className="text-sm text-white/50 mb-8" aria-label="Drobečková navigace">
            <Link href="/" className="hover:text-white">Domů</Link><span className="mx-1.5">/</span>
            <Link href="/seznamky" className="hover:text-white">Seznamky</Link><span className="mx-1.5">/</span>
            <span className="text-white/80">{produkt.name}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
              <span className="relative w-24 h-24 shrink-0 rounded-2xl bg-white overflow-hidden ring-1 ring-white/20 shadow-xl">
                <Image src={produkt.logo} alt={`${produkt.name} logo`} fill sizes="96px" className="object-contain p-2" priority />
              </span>
              <div>
                {award && <span className="chip bg-gold-300/15 text-gold-200 ring-1 ring-gold-300/30">{award}</span>}
                <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-white leading-tight">
                  {produkt.name} recenze {CURRENT_YEAR}
                </h1>
                <p className="mt-3 text-lg text-white/65 max-w-2xl">{produkt.description}</p>
                <p className="mt-4 text-sm text-white/45">
                  {EDITORIAL_NAME} · Aktualizováno {formatDateCz(updated)} · <Link href="/jak-hodnotime" className="underline decoration-white/20 hover:text-white">jak hodnotíme</Link>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-3xl bg-white/[0.06] border border-white/10 p-5">
              <ScoreBadge rating={produkt.rating} size="lg" />
              {produkt.isActive && (
                <div>
                  <AffiliateLink produkt={produkt} source="detail" placement="hero-cta" className={`${tracked ? 'btn-gold' : 'btn-ghost-light'} whitespace-nowrap`}>
                    {tracked ? 'Registrace zdarma' : `Přejít na ${produkt.name}`} <ChevronRight className="w-4 h-4" />
                  </AffiliateLink>
                  <p className="mt-2 text-xs text-white/40 text-center">Oficiální web seznamky</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {!produkt.isActive && (
        <div className="container-wide mt-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{produkt.name} momentálně v České republice nedoporučujeme</p>
              <p className="text-sm mt-1">
                {produkt.inactiveReason ? `${produkt.inactiveReason.charAt(0).toUpperCase()}${produkt.inactiveReason.slice(1)}.` : 'Služba není pro české uživatele dostupná.'} Podívejte se na
                ověřené alternativy níže nebo na <Link href="/seznamky" className="underline">kompletní srovnání</Link>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container-wide mt-10 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10">
        {/* MAIN */}
        <article className="min-w-0">
          {/* Verdict + facts */}
          <div className="panel p-6 md:p-8">
            <p className="eyebrow">Shrnutí redakce</p>
            <p className="mt-3 font-display text-2xl text-ink-900 leading-snug">
              {produkt.verdict || `Hodnocení ${produkt.rating.toFixed(1)}/10 (${ratingLabel(produkt.rating).toLowerCase()}). Hodí se pro: ${(produkt.targetAudience || produkt.shortDescription || produkt.description).replace(/^./, c => c.toLowerCase())}.`}
            </p>
            <dl className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
              {facts.map(f => (
                <div key={f.label} className="rounded-xl bg-ivory p-3">
                  <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink-400"><f.icon className="w-3.5 h-3.5" />{f.label}</dt>
                  <dd className="mt-1 font-semibold text-ink-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Pros / cons */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="panel p-6">
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-emerald-700">Výhody</h2>
              <ul className="mt-4 space-y-2.5">
                {produkt.pros.map((pro, i) => (
                  <li key={i} className="flex gap-2.5 text-ink-700"><Check className="w-5 h-5 shrink-0 text-emerald-600" />{pro}</li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-rose-700">Nevýhody</h2>
              <ul className="mt-4 space-y-2.5">
                {produkt.cons.map((con, i) => (
                  <li key={i} className="flex gap-2.5 text-ink-700"><X className="w-5 h-5 shrink-0 text-rose-500" />{con}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Inline CTA */}
          {produkt.isActive && (
            <div className="mt-6 rounded-2xl bg-gold-50 border border-gold-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-ink-900">Chcete {produkt.name} vyzkoušet?</p>
                <p className="text-sm text-ink-500">Registrace je zdarma a nezávazná{produkt.freeFeatures?.length ? `, zdarma získáte: ${produkt.freeFeatures.join(', ').toLowerCase()}` : ''}.</p>
              </div>
              <AffiliateLink produkt={produkt} source="detail" placement="mid-content" className={`${tracked ? 'btn-wine' : 'btn-line'} whitespace-nowrap`}>
                Navštívit {produkt.name} <ChevronRight className="w-4 h-4" />
              </AffiliateLink>
            </div>
          )}

          {/* Body */}
          <div className="prose-review mt-12 max-w-none">
            <h2 id="recenze">{produkt.name} – podrobná recenze</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{body}</ReactMarkdown>
          </div>

          {produkt.features?.length > 0 && (
            <div className="mt-10 panel p-6">
              <h2 className="text-2xl font-semibold text-ink-900">Hlavní funkce</h2>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                {produkt.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-ivory px-3 py-2.5 text-sm text-ink-700">
                    <Check className="w-4 h-4 text-gold-600 shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {produkt.faq && produkt.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-semibold text-ink-900 mb-6">{produkt.name}: časté otázky</h2>
              <FaqSection items={produkt.faq} bare />
            </div>
          )}

          <p className="disclosure mt-10">
            Ceny a funkce ověřujeme pravidelně, mohou se ale změnit. Aktuální podmínky najdete na webu {produkt.name}.
            Recenze obsahuje affiliate odkazy. Pokud se přes ně zaregistrujete, můžeme získat provizi. Na hodnocení to nemá vliv.
          </p>
        </article>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            {produkt.isActive && (
              <div className="panel p-6 text-center">
                <span className="relative block w-20 h-20 mx-auto rounded-2xl border border-ivory-300 overflow-hidden">
                  <Image src={produkt.logo} alt={`${produkt.name} logo`} fill sizes="80px" className="object-contain p-1.5" />
                </span>
                <p className="mt-3 font-display text-2xl font-semibold">{produkt.name}</p>
                <p className="text-sm text-ink-400">{ratingLabel(produkt.rating)} · {produkt.rating.toFixed(1)}/10</p>
                <AffiliateLink produkt={produkt} source="sidebar" placement="sticky" className={`${tracked ? 'btn-gold' : 'btn-line'} w-full mt-5`}>
                  {tracked ? 'Registrace zdarma' : 'Navštívit web'}
                </AffiliateLink>
                <ul className="mt-5 space-y-2 text-left text-sm text-ink-600">
                  {produkt.pros.slice(0, 3).map((p, i) => (
                    <li key={i} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {alternatives.length > 0 && (
              <div className="panel p-5">
                <p className="eyebrow mb-3">Alternativy</p>
                <ul className="space-y-3">
                  {alternatives.map(a => (
                    <li key={a.slug} className="flex items-center gap-3">
                      <span className="relative w-10 h-10 shrink-0 rounded-lg border border-ivory-300 overflow-hidden">
                        <Image src={a.logo} alt={`${a.name} logo`} fill sizes="40px" className="object-contain p-1" />
                      </span>
                      <Link href={`/seznamky/${a.slug}`} className="flex-1 text-sm font-semibold text-ink-800 hover:text-rose-700">{a.name}</Link>
                      <span className="text-xs font-semibold bg-ink-900 text-white rounded-md px-2 py-0.5">{a.rating.toFixed(1)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ALTERNATIVES full width */}
      {alternatives.length > 0 && (
        <section className="container-wide pt-16">
          <h2 className="h-section mb-6">{produkt.isActive ? `Alternativy k ${produkt.name}` : 'Doporučené alternativy'}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {alternatives.map(a => (
              <div key={a.slug} className="panel p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="relative w-12 h-12 shrink-0 rounded-xl border border-ivory-300 overflow-hidden">
                    <Image src={a.logo} alt={`${a.name} logo`} fill sizes="48px" className="object-contain p-1" />
                  </span>
                  <div className="flex-1">
                    <Link href={`/seznamky/${a.slug}`} className="font-display text-xl font-semibold hover:text-rose-700">{a.name}</Link>
                    {AWARDS[a.slug] && <p className="text-xs text-gold-700">{AWARDS[a.slug]}</p>}
                  </div>
                  <span className="text-sm font-semibold bg-ink-900 text-white rounded-lg px-2.5 py-1">{a.rating.toFixed(1)}</span>
                </div>
                <p className="mt-3 text-sm text-ink-500 flex-1">{a.description}</p>
                <AffiliateLink produkt={a} source="detail" placement="alternative" className={`${isTracked(a.slug) ? 'btn-wine' : 'btn-line'} w-full mt-5 !py-2.5 text-sm`}>
                  Vyzkoušet {a.name}
                </AffiliateLink>
              </div>
            ))}
          </div>
        </section>
      )}

      {produkt.isActive && <MobileCtaBar produkt={produkt} label={tracked ? 'Registrace zdarma' : 'Navštívit web'} />}
    </div>
  )
}
