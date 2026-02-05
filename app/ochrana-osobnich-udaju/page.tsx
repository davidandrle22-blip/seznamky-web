import { Metadata } from 'next'
import { Shield, Mail, Database, Clock, UserCheck, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů | Seznamky.info',
  description: 'Informace o zpracování osobních údajů na webu Seznamky.info. Zásady ochrany soukromí v souladu s GDPR.',
}

export default function OchranaOsobnichUdajuPage() {
  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ochrana osobních údajů
          </h1>
          <p className="text-gray-600 text-lg">
            Zásady zpracování osobních údajů v souladu s GDPR
          </p>
        </div>

        {/* Správce údajů */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Správce osobních údajů</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Správcem osobních údajů je společnost <strong>VP Digital s.r.o.</strong>,
              se sídlem v České republice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pro jakékoliv dotazy týkající se zpracování osobních údajů nás můžete kontaktovat na e-mailu:{' '}
              <a
                href="mailto:seznamky-info@seznam.cz"
                className="text-rose-600 hover:text-rose-700 hover:underline inline-flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                seznamky-info@seznam.cz
              </a>
            </p>
          </div>
        </div>

        {/* Jaké údaje sbíráme */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Jaké údaje zpracováváme</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Na webu Seznamky.info zpracováváme následující osobní údaje:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">E-mailová adresa</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Vaši e-mailovou adresu sbíráme pouze v případě, že se přihlásíte k odběru našeho
              e-booku nebo newsletteru. E-mail používáme výhradně k:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Zaslání e-booku, o který jste požádali</li>
              <li>Zasílání informačních e-mailů (pokud jste k tomu dali souhlas)</li>
              <li>Odpovědím na vaše dotazy</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Analytické údaje</h3>
            <p className="text-gray-700 leading-relaxed">
              Pro zlepšení našich služeb sbíráme anonymizované analytické údaje o návštěvnosti
              webu (např. počet návštěv, zobrazené stránky). Tyto údaje neumožňují vaši identifikaci.
            </p>
          </div>
        </div>

        {/* Účel zpracování */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Účel a právní základ zpracování</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Vaše osobní údaje zpracováváme na základě následujících právních titulů:
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Souhlas (čl. 6 odst. 1 písm. a) GDPR)</h4>
              <p className="text-gray-700 text-sm">
                Pro zasílání marketingových sdělení a newsletterů. Souhlas můžete kdykoli odvolat.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)</h4>
              <p className="text-gray-700 text-sm">
                Pro zaslání e-booku, o který jste požádali výměnou za e-mailovou adresu.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)</h4>
              <p className="text-gray-700 text-sm">
                Pro analýzu návštěvnosti a zlepšování webu.
              </p>
            </div>
          </div>
        </div>

        {/* Doba uchování */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Doba uchování údajů</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Vaše osobní údaje uchováváme pouze po nezbytně nutnou dobu:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>E-mailové adresy:</strong> Po dobu trvání vašeho souhlasu, nejdéle 3 roky od posledního kontaktu</li>
              <li><strong>Analytické údaje:</strong> Maximálně 26 měsíců</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Po uplynutí této doby jsou údaje automaticky smazány nebo anonymizovány.
            </p>
          </div>
        </div>

        {/* Vaše práva */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Vaše práva</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              V souvislosti se zpracováním osobních údajů máte následující práva:
            </p>

            <div className="grid gap-3">
              {[
                { title: 'Právo na přístup', desc: 'Můžete požádat o informace o tom, jaké údaje o vás zpracováváme.' },
                { title: 'Právo na opravu', desc: 'Můžete požádat o opravu nepřesných údajů.' },
                { title: 'Právo na výmaz', desc: 'Můžete požádat o smazání vašich osobních údajů.' },
                { title: 'Právo na omezení zpracování', desc: 'Můžete požádat o omezení zpracování vašich údajů.' },
                { title: 'Právo na přenositelnost', desc: 'Můžete požádat o předání vašich údajů jinému správci.' },
                { title: 'Právo vznést námitku', desc: 'Můžete vznést námitku proti zpracování založenému na oprávněném zájmu.' },
                { title: 'Právo odvolat souhlas', desc: 'Udělený souhlas můžete kdykoli odvolat bez uvedení důvodu.' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Pro uplatnění svých práv nás kontaktujte na e-mailu{' '}
              <a href="mailto:seznamky-info@seznam.cz" className="text-rose-600 hover:underline">
                seznamky-info@seznam.cz
              </a>.
              Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů (
              <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">
                www.uoou.cz
              </a>).
            </p>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            Informace o používání cookies naleznete na samostatné stránce{' '}
            <Link href="/cookies" className="text-rose-600 hover:underline">
              Zásady používání cookies
            </Link>.
          </p>
        </div>

        {/* Aktualizace */}
        <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600">
          <p>
            Tyto zásady ochrany osobních údajů jsou platné od 1. 1. 2025
            a mohou být průběžně aktualizovány.
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
