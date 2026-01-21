import Link from 'next/link'
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { getSettings } from '@/lib/data'

const kategorieLinks = [
  { name: 'Nejlepší seznamky', href: '/kategorie/nejlepsi-seznamky' },
  { name: 'Vážné vztahy', href: '/kategorie/vazne-vztahy' },
  { name: 'Flirt seznamky', href: '/kategorie/flirt-seznamky' },
  { name: 'Sex seznamky 18+', href: '/kategorie/sex-seznamky' },
  { name: 'Senior 50+', href: '/kategorie/senior-seznamky' },
  { name: 'Pro zadané', href: '/kategorie/seznamky-pro-zadane' },
  { name: 'Gay & LGBT', href: '/kategorie/gay-seznamky' },
  { name: 'Seznamky zdarma', href: '/kategorie/seznamky-zdarma' },
]

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Newsletter section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Přihlaste se k odběru novinek</h3>
              <p className="text-gray-400">Získejte tipy pro úspěšné seznámení přímo do e-mailu</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Váš e-mail"
                className="flex-grow md:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-romantic-500 focus:border-transparent outline-none text-white placeholder-gray-500"
              />
              <button className="bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-700 hover:to-romantic-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                Odebírat
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo a popis */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-romantic-500 via-crimson-500 to-ruby-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Heart className="h-6 w-6 text-white" fill="white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <span className="text-xl font-extrabold">
                <span className="bg-gradient-to-r from-romantic-400 to-ruby-400 bg-clip-text text-transparent">Seznamky</span>
                <span className="text-gray-300">.info</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">{settings.footerText}</p>
            <div className="flex space-x-3">
              {settings.socialLinks.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-romantic-600 rounded-xl flex items-center justify-center transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-romantic-600 rounded-xl flex items-center justify-center transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-romantic-600 rounded-xl flex items-center justify-center transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigace */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigace</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-romantic-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-romantic-500 rounded-full"></span>Domů</Link></li>
              <li><Link href="/seznamky" className="text-gray-400 hover:text-romantic-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-romantic-500 rounded-full"></span>Srovnání seznamek</Link></li>
              <li><Link href="/kategorie/nejlepsi-seznamky" className="text-gray-400 hover:text-romantic-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-romantic-500 rounded-full"></span>Kategorie</Link></li>
              <li><Link href="/clanky" className="text-gray-400 hover:text-romantic-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-romantic-500 rounded-full"></span>Rady a tipy</Link></li>
              <li><Link href="/kontakt" className="text-gray-400 hover:text-romantic-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-romantic-500 rounded-full"></span>Kontakt</Link></li>
            </ul>
          </div>

          {/* Kategorie */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Kategorie</h3>
            <ul className="space-y-3">
              {kategorieLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-romantic-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Kontaktujte nás</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-romantic-400" />
                </div>
                <span>{settings.contactEmail}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-romantic-400" />
                </div>
                <span>{settings.contactPhone}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-romantic-400" />
                </div>
                <span>{settings.contactAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Seznamky.info - Všechna práva vyhrazena.</p>
            <div className="flex gap-6">
              <Link href="/podminky" className="hover:text-romantic-400 transition-colors">Podmínky užití</Link>
              <Link href="/soukromi" className="hover:text-romantic-400 transition-colors">Ochrana soukromí</Link>
              <Link href="/cookies" className="hover:text-romantic-400 transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
