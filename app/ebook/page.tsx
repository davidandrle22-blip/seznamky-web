import { Metadata } from 'next'
import LeadMagnet from '@/components/LeadMagnet'
import { BookOpen, Check, Heart, Shield, Star } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'E-book zdarma: Tajemství šťastných vztahů | Seznamky.info',
  description: 'Stáhněte si zdarma e-book plný praktických rad pro úspěšné online seznamování. Tipy pro atraktivní profil, strategie první zprávy a mnohem více.',
}

export default function EbookPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-red-900 text-white py-16 lg:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <BookOpen className="w-4 h-4 text-rose-300" />
            <span className="text-sm font-medium text-rose-200">E-book zdarma ke stažení</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Tajemství šťastných vztahů
          </h1>

          <p className="text-xl text-rose-200 max-w-2xl mx-auto mb-8">
            Praktický průvodce online seznamováním. Naučte se, jak najít partnera
            a budovat zdravý vztah v digitální době.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
              <span>50+ stran</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-400" />
              <span>PDF ke stažení</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-rose-300" />
              <span>Ověřené rady</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - What's inside */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Co v e-booku najdete?
              </h2>

              <div className="space-y-4">
                {[
                  {
                    title: 'Jak vybrat správnou seznamku',
                    desc: 'Porovnání různých typů seznamek a které se hodí pro vás'
                  },
                  {
                    title: 'Tipy pro atraktivní profil',
                    desc: 'Jak napsat bio a vybrat fotky, které zaujmou'
                  },
                  {
                    title: 'Strategie první zprávy',
                    desc: 'Co napsat, abyste dostali odpověď'
                  },
                  {
                    title: 'Rozpoznání falešných profilů',
                    desc: 'Jak se vyhnout podvodníkům a catfisherům'
                  },
                  {
                    title: 'Bezpečná první schůzka',
                    desc: 'Praktické rady pro bezpečné setkání'
                  },
                  {
                    title: 'Psychologie online seznamování',
                    desc: 'Pochopte, jak funguje online dating'
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <blockquote className="mt-8 p-6 bg-rose-50 rounded-2xl border-l-4 border-rose-500">
                <p className="text-gray-700 italic mb-3">
                  &ldquo;Díky radám z e-booku jsem konečně pochopila, co dělám špatně.
                  Po měsíci jsem potkala svého současného partnera!&rdquo;
                </p>
                <cite className="text-sm text-gray-500 not-italic">
                  — Petra, 32 let, Praha
                </cite>
              </blockquote>
            </div>

            {/* Right - Download Form */}
            <div className="lg:sticky lg:top-24">
              <LeadMagnet />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Připraveni najít lásku?
          </h2>
          <p className="text-gray-600 mb-6">
            Prozkoumejte naše recenze a najděte tu pravou seznamku pro vás.
          </p>
          <Link
            href="/seznamky"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            Prohlédnout seznamky
          </Link>
        </div>
      </section>
    </div>
  )
}
