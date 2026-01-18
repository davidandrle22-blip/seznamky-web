import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-400">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
          Stránka nenalezena
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" />
            Zpět na hlavní stránku
          </Link>
          <Link href="/seznamky" className="btn-secondary inline-flex items-center justify-center">
            <Search className="w-5 h-5 mr-2" />
            Prohlédnout seznamky
          </Link>
        </div>
      </div>
    </div>
  )
}
