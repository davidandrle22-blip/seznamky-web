'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Heart, User, Calendar, Target } from 'lucide-react'

export default function MatchmakerFilter() {
  const router = useRouter()
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (gender) params.set('gender', gender)
    if (age) params.set('age', age)
    if (type) params.set('type', type)
    router.push(`/seznamky?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gray-100">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-romantic-500" fill="#e11d48" />
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Najdi svou ideální seznamku
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 text-romantic-500" />
              Jsem
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-field"
            >
              <option value="">Vyberte pohlaví...</option>
              <option value="muz">Muž</option>
              <option value="zena">Žena</option>
              <option value="other">Jiné</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-romantic-500" />
              Věková kategorie
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field"
            >
              <option value="">Vyberte věk...</option>
              <option value="18-25">18-25 let</option>
              <option value="26-35">26-35 let</option>
              <option value="36-45">36-45 let</option>
              <option value="46-55">46-55 let</option>
              <option value="55+">55+ let</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Target className="w-4 h-4 text-romantic-500" />
              Co hledám
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-field"
            >
              <option value="">Vyberte typ...</option>
              <option value="vazne-vztahy">Vážný vztah</option>
              <option value="flirt">Flirt a zábavu</option>
              <option value="gay-lesbian">LGBTQ+ seznámení</option>
              <option value="senior">Partnera 50+</option>
              <option value="erotika">Diskrétní seznámení</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-700 hover:to-romantic-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-romantic hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Najít ideální seznamku
        </button>
      </form>
    </div>
  )
}
