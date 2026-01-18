import { getProdukty, getKategorie } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { Filter } from 'lucide-react'
import Link from 'next/link'

interface Props {
  searchParams: { kategorie?: string; type?: string }
}

export const metadata = {
  title: 'Všechny seznamky | Srovnání seznamek',
  description: 'Kompletní přehled a srovnání všech seznamovacích aplikací a webů.',
}

export default async function SeznamkyPage({ searchParams }: Props) {
  const [produkty, kategorie] = await Promise.all([
    getProdukty(),
    getKategorie()
  ])

  const selectedKategorie = searchParams.kategorie
  const filteredProdukty = selectedKategorie
    ? produkty.filter(p => p.categories.includes(selectedKategorie))
    : produkty

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Srovnání seznamek
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Najděte tu pravou seznamku podle vašich preferencí
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="font-medium text-gray-700">Filtrovat podle kategorie:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/seznamky"
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                !selectedKategorie
                  ? 'bg-primary-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Všechny
            </Link>
            {kategorie.map((kat) => (
              <Link
                key={kat.id}
                href={`/seznamky?kategorie=${kat.slug}`}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedKategorie === kat.slug
                    ? 'bg-primary-400 text-gray-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {kat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-gray-600">
          Nalezeno {filteredProdukty.length} seznamek
        </div>

        {/* Product list */}
        <div className="space-y-6">
          {filteredProdukty.map((produkt, index) => (
            <ProductCard key={produkt.id} produkt={produkt} rank={index + 1} />
          ))}
        </div>

        {filteredProdukty.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              V této kategorii zatím nemáme žádné seznamky.
            </p>
            <Link href="/seznamky" className="text-primary-500 hover:text-primary-600 mt-4 inline-block">
              Zobrazit všechny seznamky
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
