import Link from 'next/link'
import { MapPin, Users, CalendarRange, Heart } from 'lucide-react'
import SeznamkaFinder from '@/components/SeznamkaFinder'
import { BreadcrumbSchema } from '@/components/seo'
import { CURRENT_YEAR, SITE_URL } from '@/lib/site'
import { landingsByType } from '@/lib/seznameni'

export const metadata = {
  title: `Seznámení podle měst, krajů a věku ${CURRENT_YEAR} – najděte seznamku pro sebe`,
  description: 'Seznamky podle města, kraje, věku a toho, koho hledáte. Praha, Brno, Ostrava a všechna okresní města, všech 13 krajů, seznamky 30+, 40+, 50+ i 60+.',
  alternates: { canonical: '/seznameni' },
}

const GROUPS = [
  { type: 'kdo' as const, title: 'Kdo koho hledá', icon: Heart },
  { type: 'vek' as const, title: 'Seznámení podle věku', icon: CalendarRange },
  { type: 'mesto' as const, title: 'Seznámení podle měst', icon: MapPin },
  { type: 'kraj' as const, title: 'Seznámení podle krajů', icon: Users },
]

export default function SeznameniIndex() {
  return (
    <div>
      <BreadcrumbSchema items={[{ name: 'Domů', url: `${SITE_URL}/` }, { name: 'Seznámení', url: `${SITE_URL}/seznameni` }]} />
      <section className="hero-dark">
        <div className="relative z-10 container-wide py-14 lg:py-20">
          <nav className="text-sm text-white/50 mb-6" aria-label="Drobečková navigace">
            <Link href="/" className="hover:text-white">Domů</Link><span className="mx-1.5">/</span>
            <span className="text-white/80">Seznámení</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-semibold text-white text-balance">Seznámení podle města, kraje a věku</h1>
          <p className="mt-5 text-lg text-white/65 max-w-2xl">
            Vyberte své město, kraj, věk nebo to, koho hledáte. Ke každé stránce jsme vybrali seznamky, které tam fungují nejlépe, a přidali tipy na první rande.
          </p>
        </div>
      </section>

      <section className="container-wide pt-12">
        <SeznamkaFinder />
      </section>

      {GROUPS.map(g => {
        const items = landingsByType(g.type)
        const Icon = g.icon
        if (g.type === 'mesto') {
          const kraje = landingsByType('kraj')
          const groups = [
            { name: 'Hlavní město Praha', cities: items.filter(l => l.slug === 'praha') },
            ...kraje.map(k => ({ name: k.name, cities: items.filter(l => l.slug !== 'praha' && `seznamka-${l.kraj}` === k.slug) })),
          ].filter(x => x.cities.length)
          return (
            <section key={g.type} className="container-wide pt-14">
              <h2 className="h-section mb-6 flex items-center gap-3"><Icon className="w-6 h-6 text-rose-700" />{g.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                {groups.map(grp => (
                  <div key={grp.name}>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500 mb-3">{grp.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {grp.cities.map(l => (
                        <Link key={l.slug} href={`/seznameni/${l.slug}`} className="chip-link">{l.name}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        }
        return (
          <section key={g.type} className="container-wide pt-14">
            <h2 className="h-section mb-6 flex items-center gap-3"><Icon className="w-6 h-6 text-rose-700" />{g.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map(l => (
                <Link key={l.slug} href={`/seznameni/${l.slug}`} className="panel-hover px-4 py-3 text-ink-800 font-medium hover:text-rose-700">
                  {l.type === 'mesto' ? `Seznamka ${l.name}` : l.name}
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
