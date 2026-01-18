import Link from 'next/link'
import { Heart, Smile, Rainbow, Users, Flame, LucideIcon, ArrowRight } from 'lucide-react'
import { Kategorie } from '@/lib/types'

interface CategoryCardProps {
  kategorie: Kategorie
}

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  smile: Smile,
  rainbow: Rainbow,
  users: Users,
  flame: Flame,
}

export default function CategoryCard({ kategorie }: CategoryCardProps) {
  const Icon = iconMap[kategorie.icon] || Heart

  return (
    <Link
      href={`/seznamky?kategorie=${kategorie.slug}`}
      className="group relative bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover border border-gray-100 hover:border-romantic-200 transition-all duration-300 overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-500/0 to-romantic-600/0 group-hover:from-romantic-500/5 group-hover:to-romantic-600/10 transition-all duration-300" />

      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-romantic-100 to-romantic-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-romantic-500 group-hover:to-romantic-600 transition-all duration-300 shadow-sm group-hover:shadow-romantic">
          <Icon className="w-8 h-8 text-romantic-500 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-romantic-700 transition-colors">{kategorie.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{kategorie.description}</p>
        <span className="inline-flex items-center text-sm font-medium text-romantic-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Prozkoumat <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </Link>
  )
}
