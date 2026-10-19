import { Metadata } from 'next'
import Link from 'next/link'
import { getClanky } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'
import { ARTICLE_CATEGORIES, categoryLabel } from '@/lib/article-categories'
import { BreadcrumbSchema } from '@/components/seo'
import { SITE_URL } from '@/lib/site'

interface Props {
  searchParams: { kategorie?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const cat = searchParams.kategorie
  const title = cat ? `${categoryLabel(cat)} – magazín o seznamování` : 'Magazín o seznamování – rady, tipy a průvodce online seznamkami'
  return {
    title,
    description: 'Praktické rady redakce Seznamky.info: jak vybrat seznamku, napsat profil, psát první zprávy, zvládnout první rande a seznamovat se bezpečně. Tipy pro vážný vztah i seznamování po padesátce.',
    alternates: { canonical: cat ? `/clanky?kategorie=${cat}` : '/clanky' },
    robots: cat ? { index: false, follow: true } : undefined,
  }
}

export default async function ClankyPage({ searchParams }: Props) {
  const clanky = await getClanky()
  const cat = searchParams.kategorie
  const list = cat ? clanky.filter(c => c.category === cat) : clanky
  const [featured, ...rest] = list
  const usedCats = Object.keys(ARTICLE_CATEGORIES).filter(k => clanky.some(c => c.category === k))

  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Domů', url: `${SITE_URL}/` }, { name: 'Magazín', url: `${SITE_URL}/clanky` }]} />
      <section className="container-wide pt-12 pb-8">
        <p className="eyebrow">Magazín Seznamky.info</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-ink-900 max-w-3xl text-balance">
          Rady a průvodce pro úspěšné online seznamování
        </h1>
        <p className="lead mt-4 max-w-2xl">
          Píše redakce Seznamky.info. Najdete tu praktické návody, psychologii seznamování, bezpečnost a upřímná srovnání.
          Všechno, co vám pomůže od registrace k prvnímu rande.
        </p>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          <Link href="/clanky" className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${!cat ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 ring-1 ring-ivory-300 hover:ring-ink-300'}`}>
            Vše ({clanky.length})
          </Link>
          {usedCats.map(k => (
            <Link key={k} href={`/clanky?kategorie=${k}`} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${cat === k ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 ring-1 ring-ivory-300 hover:ring-ink-300'}`}>
              {ARTICLE_CATEGORIES[k]} ({clanky.filter(c => c.category === k).length})
            </Link>
          ))}
        </div>
      </section>

      <section className="container-wide">
        {featured && <ArticleCard clanek={featured} featured />}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(c => <ArticleCard key={c.id} clanek={c} />)}
        </div>
      </section>
    </div>
  )
}
