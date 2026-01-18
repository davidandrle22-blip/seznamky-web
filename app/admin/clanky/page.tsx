'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, Calendar, Eye } from 'lucide-react'
import { Clanek } from '@/lib/types'

export default function AdminClankyPage() {
  const [clanky, setClanky] = useState<Clanek[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Clanek>>({})

  useEffect(() => {
    fetchClanky()
  }, [])

  const fetchClanky = async () => {
    try {
      const res = await fetch('/api/clanky')
      const data = await res.json()
      setClanky(data.sort((a: Clanek, b: Clanek) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ))
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (clanek: Clanek) => {
    setEditingId(clanek.id)
    setFormData(clanek)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'tipy',
      author: 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
      isPublished: false
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({})
  }

  const handleSave = async () => {
    try {
      if (isCreating) {
        await fetch('/api/clanky', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch('/api/clanky', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      handleCancel()
      fetchClanky()
    } catch (error) {
      console.error('Failed to save article:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tento článek?')) return

    try {
      await fetch(`/api/clanky?id=${id}`, { method: 'DELETE' })
      fetchClanky()
    } catch (error) {
      console.error('Failed to delete article:', error)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return <div className="text-gray-500">Načítání...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Správa článků</h1>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Napsat článek
        </button>
      </div>

      {/* Edit/Create Form */}
      {(editingId || isCreating) && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {isCreating ? 'Nový článek' : 'Upravit článek'}
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Titulek *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field"
                  placeholder="Titulek článku"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="input-field"
                  placeholder="url-slug (automaticky z titulku)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
                <select
                  value={formData.category || 'tipy'}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="input-field"
                >
                  <option value="tipy">Tipy</option>
                  <option value="bezpecnost">Bezpečnost</option>
                  <option value="vztahy">Vztahy</option>
                  <option value="recenze">Recenze</option>
                  <option value="obecne">Obecné</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="input-field"
                  placeholder="Admin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Datum</label>
                <input
                  type="date"
                  value={formData.createdAt || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, createdAt: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished ?? false}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="w-5 h-5 text-primary-500 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-700">
                  Publikovat (zobrazit na webu)
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Krátký popis *</label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="input-field"
                  rows={2}
                  placeholder="Krátký popis článku pro náhled..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Obsah (Markdown) *</label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="input-field font-mono text-sm"
                  rows={15}
                  placeholder="## Nadpis&#10;&#10;Odstavec textu s **tučným** a *kurzívou*.&#10;&#10;### Podnadpis&#10;&#10;- Seznam&#10;- Položka 2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button onClick={handleCancel} className="btn-secondary flex items-center">
                <X className="w-5 h-5 mr-2" />
                Zrušit
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center">
                <Save className="w-5 h-5 mr-2" />
                Uložit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Článek</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Kategorie</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Datum</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Akce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clanky.map((clanek) => (
              <tr key={clanek.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{clanek.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{clanek.excerpt}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                    {clanek.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(clanek.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    clanek.isPublished
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {clanek.isPublished ? 'Publikováno' : 'Koncept'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {clanek.isPublished && (
                    <a
                      href={`/clanky/${clanek.slug}`}
                      target="_blank"
                      className="p-2 text-gray-500 hover:text-primary-500 transition-colors inline-block"
                      title="Zobrazit"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(clanek)}
                    className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                    title="Upravit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(clanek.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Smazat"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clanky.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Zatím nemáte žádné články. Napište první!
          </div>
        )}
      </div>
    </div>
  )
}
