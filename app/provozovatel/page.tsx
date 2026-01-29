import { Metadata } from 'next'
import { Building2, Mail, Globe, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Informace o provozovateli | Seznamky.info',
  description: 'Informace o provozovateli webu Seznamky.info - VP Digital s.r.o. Transparentní informace o affiliate spolupráci.',
}

export default function ProvozovatelPage() {
  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Informace o provozovateli
          </h1>
          <p className="text-gray-600 text-lg">
            Transparentní informace o webu Seznamky.info
          </p>
        </div>

        {/* Company Info Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Informace o společnosti</h2>
          </div>

          <dl className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="font-semibold text-gray-700 sm:w-40 flex-shrink-0">Obchodní firma:</dt>
              <dd className="text-gray-900">VP Digital s.r.o.</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="font-semibold text-gray-700 sm:w-40 flex-shrink-0">Právní forma:</dt>
              <dd className="text-gray-900">Společnost s ručením omezeným</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="font-semibold text-gray-700 sm:w-40 flex-shrink-0">Sídlo:</dt>
              <dd className="text-gray-900">Česká republika</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <dt className="font-semibold text-gray-700 sm:w-40 flex-shrink-0">E-mail:</dt>
              <dd>
                <a
                  href="mailto:seznamky-info@seznam.cz"
                  className="text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  seznamky-info@seznam.cz
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* About Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">O webu Seznamky.info</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Seznamky.info je nezávislý informační portál zaměřený na recenze a srovnání
              online seznamovacích služeb dostupných v České republice. Naším cílem je
              poskytnout čtenářům objektivní a aktuální informace, které jim pomohou
              vybrat vhodnou seznamku podle jejich preferencí.
            </p>
          </div>
        </div>

        {/* Transparency Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Transparentnost</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Web Seznamky.info funguje na principu affiliate marketingu. Některé odkazy
              na stránkách jsou partnerské odkazy, což znamená, že můžeme obdržet provizi,
              pokud se prostřednictvím našeho odkazu zaregistrujete na dané seznamce.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Tato spolupráce nemá vliv na naše hodnocení ani na pořadí seznamek v žebříčcích.
              Recenze vytváříme nezávisle na základě vlastního testování a zpětné vazby uživatelů.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
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
