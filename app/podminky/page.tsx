import { Metadata } from 'next'
import { FileText, AlertCircle, Scale, ExternalLink, Ban, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Podmínky používání | Seznamky.info',
  description: 'Podmínky používání webu Seznamky.info. Informace o charakteru webu jako nezávislého srovnávače online seznamek.',
}

export default function PodminkyPage() {
  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Podmínky používání
          </h1>
          <p className="text-gray-600 text-lg">
            Pravidla pro používání webu Seznamky.info
          </p>
        </div>

        {/* Úvodní informace */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-gray-900 mb-2">Důležité upozornění</h2>
              <p className="text-gray-700">
                Web Seznamky.info je <strong>nezávislý srovnávací portál</strong>. Nejsme seznamka
                ani seznamovací služba. Neprovozujeme žádnou platformu pro seznamování uživatelů.
              </p>
            </div>
          </div>
        </div>

        {/* O webu */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Charakter webu</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Seznamky.info je informační portál, který poskytuje:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Nezávislé recenze a hodnocení online seznamek</li>
              <li>Srovnání funkcí, cen a vlastností různých seznamovacích služeb</li>
              <li>Rady a tipy pro bezpečné online seznamování</li>
              <li>Informační články o vztazích a seznamování</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Veškerý obsah má pouze informativní charakter a slouží k orientaci
              uživatelů při výběru vhodné seznamovací platformy.
            </p>
          </div>
        </div>

        {/* Affiliate odkazy */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Affiliate odkazy</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Web Seznamky.info obsahuje affiliate (partnerské) odkazy na třetí strany.
              To znamená, že:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Některé odkazy vedou na externí seznamovací služby</li>
              <li>Za registraci přes tyto odkazy můžeme obdržet provizi</li>
              <li>Pro vás jako uživatele to neznamená žádné dodatečné náklady</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Affiliate spolupráce nemá vliv na objektivitu našich recenzí.
              Hodnocení vytváříme nezávisle na základě vlastního testování.
            </p>
          </div>
        </div>

        {/* Co neděláme */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Ban className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Co neposkytujeme</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Seznamky.info <strong>není</strong> a <strong>neposkytuje</strong>:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Seznamovací službu ani platformu pro setkávání uživatelů</li>
              <li>Možnost vytváření profilů nebo komunikace s jinými uživateli</li>
              <li>Zprostředkování kontaktů mezi zájemci o seznámení</li>
              <li>Garanci kvality či bezpečnosti recenzovaných služeb</li>
              <li>Právní nebo psychologické poradenství</li>
            </ul>
          </div>
        </div>

        {/* Odpovědnost */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Omezení odpovědnosti</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Používáním webu Seznamky.info berete na vědomí, že:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                Informace na webu mají pouze orientační charakter a mohou se měnit
              </li>
              <li>
                Za registraci a používání externích seznamek neseme žádnou odpovědnost
              </li>
              <li>
                Neručíme za aktuálnost cen, funkcí nebo podmínek recenzovaných služeb
              </li>
              <li>
                Doporučujeme vždy ověřit aktuální podmínky přímo u poskytovatele služby
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Veškeré rozhodnutí o registraci na jakékoliv seznamce činíte na vlastní
              odpovědnost. Před registrací si vždy přečtěte podmínky dané služby.
            </p>
          </div>
        </div>

        {/* Autorská práva */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Autorská práva</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Veškerý obsah webu Seznamky.info (texty, grafika, loga, obrázky) je
              chráněn autorským právem. Bez písemného souhlasu provozovatele není dovoleno:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Kopírovat nebo reprodukovat obsah webu</li>
              <li>Používat obsah pro komerční účely</li>
              <li>Upravovat nebo vytvářet odvozená díla</li>
            </ul>
          </div>
        </div>

        {/* Změny podmínek */}
        <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600 mb-6">
          <p>
            Tyto podmínky používání jsou platné od 1. 1. 2025.
            Vyhrazujeme si právo podmínky kdykoliv změnit. O významných změnách
            budeme informovat na webu.
          </p>
        </div>

        {/* Kontakt */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
          <p className="text-gray-700">
            Máte dotazy k podmínkám? Kontaktujte nás na{' '}
            <a href="mailto:seznamky-info@seznam.cz" className="text-rose-600 hover:underline font-medium">
              seznamky-info@seznam.cz
            </a>
          </p>
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
