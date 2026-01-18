import Link from 'next/link'
import { Heart, Facebook, Instagram, Twitter } from 'lucide-react'
import { getSettings } from '@/lib/data'

export default async function Footer() {
  const settings = await getSettings()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo a popis */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary-400" fill="#fbd53b" />
              <span className="text-xl font-bold">{settings.siteName}</span>
            </Link>
            <p className="text-gray-400 mb-4">{settings.footerText}</p>
            <div className="flex space-x-4">
              {settings.socialLinks.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400">
                  <Twitter className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>

          {/* Navigace */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigace</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary-400">Domů</Link></li>
              <li><Link href="/seznamky" className="text-gray-400 hover:text-primary-400">Seznamky</Link></li>
              <li><Link href="/clanky" className="text-gray-400 hover:text-primary-400">Články</Link></li>
              <li><Link href="/kontakt" className="text-gray-400 hover:text-primary-400">Kontakt</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{settings.contactEmail}</li>
              <li>{settings.contactPhone}</li>
              <li>{settings.contactAddress}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
