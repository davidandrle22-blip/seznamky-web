import { Metadata } from 'next'
import { Cookie, Settings, BarChart3, Target, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Zásady používání cookies | Seznamky.info',
  description: 'Informace o používání cookies na webu Seznamky.info. Typy cookies, jejich účel a možnosti nastavení.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl mb-4">
            <Cookie className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Zásady používání cookies
          </h1>
          <p className="text-gray-600 text-lg">
            Informace o tom, jak používáme cookies na našem webu
          </p>
        </div>

        {/* Co jsou cookies */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Co jsou cookies?</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies jsou malé textové soubory, které se ukládají do vašeho zařízení
              (počítače, tabletu nebo mobilního telefonu) při návštěvě webových stránek.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cookies nám pomáhají zajistit správné fungování webu, zapamatovat si vaše
              preference a lépe porozumět tomu, jak náš web používáte.
            </p>
          </div>
        </div>

        {/* Nezbytné cookies */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nezbytné cookies</h2>
              <span className="text-sm text-green-600 font-medium">Vždy aktivní</span>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Tyto cookies jsou nezbytné pro základní fungování webu. Bez nich by web
              nefungoval správně. Zahrnují:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Cookies pro správu relace (session)</li>
              <li>Cookies pro zapamatování souhlasu s cookies</li>
              <li>Bezpečnostní cookies</li>
            </ul>
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-medium">Název</th>
                  <th className="pb-2 font-medium">Účel</th>
                  <th className="pb-2 font-medium">Platnost</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="py-1 font-mono text-xs">cookie_consent</td>
                  <td className="py-1">Stav souhlasu s cookies</td>
                  <td className="py-1">1 rok</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytické cookies */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Analytické cookies</h2>
              <span className="text-sm text-blue-600 font-medium">Google Analytics</span>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Používáme Google Analytics pro analýzu návštěvnosti a chování uživatelů
              na webu. Tyto cookies nám pomáhají pochopit:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Kolik lidí navštěvuje náš web</li>
              <li>Které stránky jsou nejoblíbenější</li>
              <li>Jak dlouho uživatelé na webu zůstávají</li>
              <li>Z jakých zdrojů uživatelé přicházejí</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Data jsou anonymizována a neumožňují vaši osobní identifikaci.
            </p>
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="pb-2 font-medium">Název</th>
                  <th className="pb-2 font-medium">Účel</th>
                  <th className="pb-2 font-medium">Platnost</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="py-1 font-mono text-xs">_ga</td>
                  <td className="py-1">Rozlišení uživatelů</td>
                  <td className="py-1">2 roky</td>
                </tr>
                <tr>
                  <td className="py-1 font-mono text-xs">_ga_*</td>
                  <td className="py-1">Udržení stavu relace</td>
                  <td className="py-1">2 roky</td>
                </tr>
                <tr>
                  <td className="py-1 font-mono text-xs">_gid</td>
                  <td className="py-1">Rozlišení uživatelů</td>
                  <td className="py-1">24 hodin</td>
                </tr>
                <tr>
                  <td className="py-1 font-mono text-xs">_gat</td>
                  <td className="py-1">Omezení počtu požadavků</td>
                  <td className="py-1">1 minuta</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Marketingové cookies */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Marketingové cookies</h2>
              <span className="text-sm text-purple-600 font-medium">Volitelné</span>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Tyto cookies mohou být použity pro:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Sledování affiliate konverzí (partnerský program)</li>
              <li>Měření efektivity reklamních kampaní</li>
              <li>Remarketing (zobrazování relevantních reklam)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Používání těchto cookies závisí na vašem souhlasu.
            </p>
          </div>
        </div>

        {/* Jak spravovat cookies */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Jak spravovat cookies</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies můžete spravovat nebo zablokovat v nastavení vašeho prohlížeče:
            </p>

            <div className="grid gap-3 mb-4">
              {[
                { browser: 'Google Chrome', url: 'chrome://settings/cookies' },
                { browser: 'Mozilla Firefox', url: 'about:preferences#privacy' },
                { browser: 'Safari', url: 'Předvolby → Soukromí' },
                { browser: 'Microsoft Edge', url: 'edge://settings/privacy' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                  <span className="font-medium text-gray-900">{item.browser}</span>
                  <code className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded">{item.url}</code>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                <strong>Upozornění:</strong> Zablokování některých cookies může ovlivnit
                funkčnost webu nebo některých jeho částí.
              </p>
            </div>
          </div>
        </div>

        {/* Třetí strany */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies třetích stran</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Na našem webu mohou být cookies od následujících poskytovatelů:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Google Analytics</strong> –{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">
                  Zásady ochrany soukromí Google
                </a>
              </li>
              <li>
                <strong>Google Ads</strong> –{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">
                  Jak Google používá cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Aktualizace */}
        <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600 mb-6">
          <p>
            Tyto zásady používání cookies jsou platné od 1. 1. 2025
            a mohou být průběžně aktualizovány.
          </p>
        </div>

        {/* Související odkazy */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <p className="text-gray-700 text-center">
            Další informace naleznete v{' '}
            <Link href="/ochrana-osobnich-udaju" className="text-rose-600 hover:underline font-medium">
              Zásadách ochrany osobních údajů
            </Link>
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
