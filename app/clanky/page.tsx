import { getClanky } from '@/lib/data'
import ArticleCard from '@/components/ArticleCard'

export const metadata = {
  title: 'Články o seznamování | Srovnání seznamek',
  description: 'Tipy, rady a návody pro úspěšné online seznamování.',
}

export default async function ClankyPage() {
  const clanky = await getClanky()

  // Group by category
  const categories = [...new Set(clanky.map(c => c.category))]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Články o seznamování
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tipy, rady a návody pro úspěšné online seznamování
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full capitalize"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clanky.map((clanek) => (
            <ArticleCard key={clanek.id} clanek={clanek} />
          ))}
        </div>

        {clanky.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Zatím nemáme žádné publikované články.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
