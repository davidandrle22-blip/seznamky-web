import { Crown, Heart, Smile, Flame, Users, EyeOff, Rainbow, Gift } from 'lucide-react'
import { Kategorie } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  heart: Heart,
  smile: Smile,
  flame: Flame,
  users: Users,
  'eye-off': EyeOff,
  rainbow: Rainbow,
  gift: Gift,
}

interface CategoryHeroProps {
  kategorie: Kategorie
  productCount: number
}

export default function CategoryHero({ kategorie, productCount }: CategoryHeroProps) {
  const IconComponent = iconMap[kategorie.icon] || Heart

  return (
    <section className="bg-gradient-to-br from-romantic-50 via-white to-romantic-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-romantic-100 rounded-2xl mb-6">
            <IconComponent className="w-8 h-8 text-romantic-600" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {kategorie.metaTitle || kategorie.name}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {kategorie.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="font-semibold text-romantic-600">{productCount}</span>
              <span className="text-gray-600 ml-1">seznamek v kategorii</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="text-gray-600">Aktualizováno</span>
              <span className="font-semibold text-gray-900 ml-1">Leden 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
