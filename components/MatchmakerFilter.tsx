'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

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
    <div className="bg-primary-400 rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Najdi svou ideální seznamku
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Jsem
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-field"
            >
              <option value="">Vyberte...</option>
              <option value="muz">Muž</option>
              <option value="zena">Žena</option>
              <option value="other">Jiné</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Věk
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field"
            >
              <option value="">Vyberte...</option>
              <option value="18-25">18-25 let</option>
              <option value="26-35">26-35 let</option>
              <option value="36-45">36-45 let</option>
              <option value="46-55">46-55 let</option>
              <option value="55+">55+ let</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Hledám
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-field"
            >
              <option value="">Vyberte...</option>
              <option value="vazne-vztahy">Vážný vztah</option>
              <option value="flirt">Flirt a zábavu</option>
              <option value="gay-lesbian">LGBTQ+ seznámení</option>
              <option value="senior">Partnera 50+</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center">
          <Search className="w-5 h-5 mr-2" />
          Najít seznamky
        </button>
      </form>
    </div>
  )
}
