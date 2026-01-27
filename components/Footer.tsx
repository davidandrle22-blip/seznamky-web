import Link from 'next/link'
import { Heart, Mail } from 'lucide-react'
import { getSettings } from '@/lib/data'

const kategorieLinks = [
  { name: 'Vážné vztahy', href: '/kategorie/vazne-vztahy' },
  { name: 'Flirt seznamky', href: '/kategorie/flirt-seznamky' },
  { name: 'Senior 50+', href: '/kategorie/senior-seznamky' },
  { name: 'Pro zadané', href: '/kategorie/seznamky-pro-zadane' },
  { name: 'Gay & LGBT', href: '/kategorie/gay-seznamky' },
  { name: 'Seznamky zdarma', href: '/kategorie/seznamky-zdarma' },
]

const topSeznamky = [
  { name: 'ELITE Date', href: '/seznamky/elite-date' },
  { name: 'Victoria Milan', href: '/seznamky/victoria-milan' },
  { name: 'Academic Singles', href: '/seznamky/academic-singles' },
  { name: 'Singles50', href: '/seznamky/singles50' },
  { name: 'DateYou', href: '/seznamky/dateyou' },
]

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-gradient-to-b from-rose-50 to-white border-t border-rose-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo a popis */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Seznamky<span className="text-rose-600">.info</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">{settings.footerText}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-rose-500" />
              <span>{settings.contactEmail}</span>
            </div>
          </div>

          {/* Navigace */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Navigace</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">Domů</Link></li>
              <li><Link href="/seznamky" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">Srovnání seznamek</Link></li>
              <li><Link href="/clanky" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">Blog</Link></li>
              <li><Link href="/kontakt" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Kategorie */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Kategorie</h3>
            <ul className="space-y-2">
              {kategorieLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-rose-600 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Seznamky */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Top seznamky</h3>
            <ul className="space-y-2">
              {topSeznamky.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-rose-600 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-rose-100 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Seznamky.info - Najděte svou lásku online</p>
            <div className="flex gap-6">
              <Link href="/podminky" className="hover:text-rose-600 transition-colors">Podmínky</Link>
              <Link href="/soukromi" className="hover:text-rose-600 transition-colors">Soukromí</Link>
              <Link href="/cookies" className="hover:text-rose-600 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
