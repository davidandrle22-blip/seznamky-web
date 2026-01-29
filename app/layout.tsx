import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyEbookCTA from '@/components/StickyEbookCTA'
import { getSettings } from '@/lib/data'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: settings.seo.title,
    description: settings.seo.description,
    keywords: settings.seo.keywords,
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <StickyEbookCTA />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
