'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, Star, GripVertical } from 'lucide-react'
import { Produkt } from '@/lib/types'

export default function AdminProduktyPage() {
  const [produkty, setProdukty] = useState<Produkt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Produkt>>({})

  useEffect(() => {
    fetchProdukty()
  }, [])

  const fetchProdukty = async () => {
    try {
      const res = await fetch('/api/produkty')
      const data = await res.json()
      setProdukty(data.sort((a: Produkt, b: Produkt) => a.order - b.order))
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (produkt: Produkt) => {
    setEditingId(produkt.id)
    setFormData(produkt)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      fullDescription: '',
      affiliateUrl: '',
      rating: 0,
      users: '',
      ageRange: '18+',
      categories: [],
      pros: [],
      cons: [],
      features: [],
      isActive: true
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
        await fetch('/api/produkty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      } else {
        await fetch('/api/produkty', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      handleCancel()
      fetchProdukty()
    } catch (error) {
      console.error('Failed to save product:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tento produkt?')) return

    try {
      await fetch(`/api/produkty?id=${id}`, { method: 'DELETE' })
      fetchProdukty()
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  const handleArrayInput = (field: 'pros' | 'cons' | 'features' | 'categories', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split('\n').filter(v => v.trim())
    }))
  }

  if (isLoading) {
    return <div className="text-gray-500">Načítání...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Správa produktů</h1>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Přidat produkt
        </button>
      </div>

      {/* Edit/Create Form */}
      {(editingId || isCreating) && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {isCreating ? 'Nový produkt' : 'Upravit produkt'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Název *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Název seznamky"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="input-field"
                placeholder="url-slug (automaticky z názvu)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate URL *</label>
              <input
                type="url"
                value={formData.affiliateUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, affiliateUrl: e.target.value }))}
                className="input-field"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hodnocení (0-5)</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating || 0}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Počet uživatelů</label>
              <input
                type="text"
                value={formData.users || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, users: e.target.value }))}
                className="input-field"
                placeholder="10M+"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Věkové rozmezí</label>
              <input
                type="text"
                value={formData.ageRange || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
                className="input-field"
                placeholder="18-35"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pořadí</label>
              <input
                type="number"
                value={formData.order || 1}
                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                className="input-field"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive ?? true}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-5 h-5 text-primary-500 rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                Aktivní (zobrazit na webu)
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Krátký popis *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                rows={2}
                placeholder="Krátký popis seznamky..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Plný popis (Markdown)</label>
              <textarea
                value={formData.fullDescription || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                className="input-field font-mono text-sm"
                rows={8}
                placeholder="## Nadpis&#10;&#10;Text s **tučným** písmem..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategorie (každá na nový řádek)
              </label>
              <textarea
                value={formData.categories?.join('\n') || ''}
                onChange={(e) => handleArrayInput('categories', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="vazne-vztahy&#10;flirt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funkce (každá na nový řádek)
              </label>
              <textarea
                value={formData.features?.join('\n') || ''}
                onChange={(e) => handleArrayInput('features', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Swipe matching&#10;Video chat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Výhody (každá na nový řádek)
              </label>
              <textarea
                value={formData.pros?.join('\n') || ''}
                onChange={(e) => handleArrayInput('pros', e.target.value)}
                className="input-field"
                rows={4}
                placeholder="Velká komunita&#10;Snadné ovládání"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nevýhody (každá na nový řádek)
              </label>
              <textarea
                value={formData.cons?.join('\n') || ''}
                onChange={(e) => handleArrayInput('cons', e.target.value)}
                className="input-field"
                rows={4}
                placeholder="Placené funkce&#10;Reklamy"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
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
      )}

      {/* Products list */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Název</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Hodnocení</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Akce</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {produkty.map((produkt) => (
              <tr key={produkt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">
                  <GripVertical className="w-5 h-5 text-gray-400" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold mr-3">
                      {produkt.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{produkt.name}</div>
                      <div className="text-sm text-gray-500">{produkt.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-primary-400 fill-primary-400 mr-1" />
                    <span className="text-gray-900">{produkt.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    produkt.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {produkt.isActive ? 'Aktivní' : 'Neaktivní'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(produkt)}
                    className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
                    title="Upravit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(produkt.id)}
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

        {produkty.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Zatím nemáte žádné produkty. Přidejte první!
          </div>
        )}
      </div>
    </div>
  )
}
