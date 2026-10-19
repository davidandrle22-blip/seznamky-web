import Link from 'next/link'
import { Mail } from 'lucide-react'
import { getSettings } from '@/lib/data'
import Logo from './Logo'
import { CURRENT_YEAR } from '@/lib/site'

const kategorieLinks = [
  { name: 'Nejlepší seznamky', href: '/kategorie/nejlepsi-seznamky' },
  { name: 'Seznamky pro vážný vztah', href: '/kategorie/vazne-vztahy' },
  { name: 'Seznamky pro seniory 50+', href: '/kategorie/senior-seznamky' },
  { name: 'Luxusní seznamky', href: '/kategorie/luxusni-seznamky' },
  { name: 'Seznamky pro zadané', href: '/kategorie/seznamky-pro-zadane' },
  { name: 'Flirt seznamky', href: '/kategorie/flirt-seznamky' },
  { name: 'Gay & LGBT seznamky', href: '/kategorie/gay-seznamky' },
  { name: 'Seznamky zdarma', href: '/kategorie/seznamky-zdarma' },
]

const recenze = [
  { name: 'ELITE Date recenze', href: '/seznamky/elite-date' },
  { name: 'Victoria Milan recenze', href: '/seznamky/victoria-milan' },
  { name: 'Academic Singles recenze', href: '/seznamky/academic-singles' },
  { name: 'Singles50 recenze', href: '/seznamky/singles50' },
  { name: 'be2 recenze', href: '/seznamky/be2' },
  { name: 'FlirtKontakt recenze', href: '/seznamky/flirtkontakt' },
]

const pruvodce = [
  { name: 'Jak vybrat seznamku', href: '/clanky/jak-vybrat-spravnou-seznamku' },
  { name: 'Jak napsat profil', href: '/clanky/jak-napsat-atraktivni-profil' },
  { name: 'První rande – tipy', href: '/clanky/prvni-schuzka-tipy' },
  { name: 'Bezpečné seznamování', href: '/clanky/online-seznamovani-bezpecnost' },
  { name: 'Placené vs. zdarma', href: '/clanky/placene-vs-bezplatne-seznamky' },
  { name: 'Všechny články', href: '/clanky' },
]

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-ink-950 text-white/70 mt-16">
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Nezávislý průvodce online seznamováním. Seznamky testujeme, porovnáváme a hodnotíme podle
              <Link href="/jak-hodnotime" className="text-gold-300 hover:text-gold-200"> veřejné metodiky</Link>.
            </p>
            <a href={`mailto:${settings.contactEmail}`} className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <Mail className="w-4 h-4 text-gold-400" />
              {settings.contactEmail}
            </a>
          </div>

          <FooterCol title="Kategorie" links={kategorieLinks} />
          <FooterCol title="Recenze" links={recenze} />
          <FooterCol title="Průvodce" links={pruvodce} />
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-xs leading-relaxed text-white/50">
          <strong className="text-white/70">Jak web financujeme:</strong> Některé odkazy na Seznamky.info jsou affiliate odkazy.
          Když se přes ně zaregistrujete, můžeme od provozovatele seznamky dostat provizi. Vás to nic nestojí a cena pro vás
          zůstává stejná. Pořadí doporučení ovlivňuje i spolupráce s partnery. Hodnocení (body) ale počítáme podle stejné metodiky
          u všech seznamek. Obsah je určen osobám starším 18 let.
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm">
          <p>© {CURRENT_YEAR} Seznamky.info</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/o-nas" className="hover:text-white">O nás</Link>
            <Link href="/jak-hodnotime" className="hover:text-white">Jak hodnotíme</Link>
            <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
            <Link href="/provozovatel" className="hover:text-white">Provozovatel</Link>
            <Link href="/podminky" className="hover:text-white">Podmínky</Link>
            <Link href="/ochrana-osobnich-udaju" className="hover:text-white">Ochrana osobních údajů</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-300 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm hover:text-white transition-colors">{l.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
