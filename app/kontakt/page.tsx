import { Metadata } from 'next'
import { Mail, MapPin, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kontakt | Seznamky.info',
  description: 'Kontaktujte nás na seznamky-info@seznam.cz. Sídlo: Kaprova 42/14, Praha 1.',
}

export default function KontaktPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kontakt
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Máte dotaz, návrh na spolupráci nebo zpětnou vazbu? Napište nám!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email Card */}
          <a
            href="mailto:seznamky-info@seznam.cz"
            className="card p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-rose-200 transition-colors">
                <Mail className="w-7 h-7 text-rose-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 text-lg mb-1">E-mail</h2>
                <p className="text-rose-600 font-medium group-hover:text-rose-700 transition-colors break-all">
                  seznamky-info@seznam.cz
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Odpovídáme zpravidla do 48 hodin
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors flex-shrink-0" />
            </div>
          </a>

          {/* Address Card */}
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-rose-600" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900 text-lg mb-1">Adresa</h2>
                <p className="text-gray-700">
                  Kaprova 42/14<br />
                  Praha 1
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Česká republika
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 text-center border border-rose-100">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Chcete nám napsat?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Pro dotazy, návrhy na spolupráci nebo zpětnou vazbu nás kontaktujte e-mailem.
          </p>
          <a
            href="mailto:seznamky-info@seznam.cz"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Napsat e-mail
          </a>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-rose-600 hover:text-rose-700 font-medium hover:underline"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  )
}
