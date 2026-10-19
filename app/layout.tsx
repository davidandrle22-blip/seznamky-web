import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME, CURRENT_YEAR } from '@/lib/site'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], variable: '--font-display', display: 'swap', axes: ['opsz'] })

const defaultTitle = `Nejlepší seznamky ${CURRENT_YEAR} – srovnání a recenze seznamek | ${SITE_NAME}`
const defaultDescription = `Nezávislé srovnání nejlepších seznamek v ČR pro rok ${CURRENT_YEAR}. Recenze, ceny a zkušenosti s ELITE Date, Victoria Milan, Academic Singles, Singles50 a dalšími. Vyberte si seznamku pro vážný vztah, flirt i 50+.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  category: 'online seznamování',
}

export const viewport: Viewport = {
  themeColor: '#17111c',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      email: 'seznamky-info@seznam.cz',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'cs-CZ',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans bg-ivory text-ink-900 min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
