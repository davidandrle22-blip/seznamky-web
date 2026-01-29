'use client'

import { useState, useEffect } from 'react'
import {
  MousePointer,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MinusCircle,
  ExternalLink,
  ArrowUpDown,
  TrendingUp,
  Calendar,
  BarChart3,
  Save,
  Edit3,
  X,
  Loader2,
  Info
} from 'lucide-react'

interface ClickStats {
  totalClicks: number
  todayClicks: number
  weekClicks: number
  monthClicks: number
}

interface ProductTrackingStatus {
  slug: string
  name: string
  affiliateUrl: string | null
  clickCount: number
  trackingStatus: 'ACTIVE' | 'MISSING_PARAMS' | 'MISSING_URL' | 'INACTIVE'
  trackingDetails: string
  isActive: boolean
}

interface AffiliateData {
  stats: ClickStats
  productTracking: ProductTrackingStatus[]
}

type SortField = 'clicks' | 'name' | 'status'
type SortOrder = 'asc' | 'desc'

export default function AffiliateDashboard() {
  const [data, setData] = useState<AffiliateData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('clicks')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showInactive, setShowInactive] = useState(false)

  // Editing state
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [editingUrl, setEditingUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/affiliate')
      if (!response.ok) throw new Error('Nepodařilo se načíst data')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neznámá chyba')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder(field === 'clicks' ? 'desc' : 'asc')
    }
  }

  const startEditing = (product: ProductTrackingStatus) => {
    setEditingSlug(product.slug)
    setEditingUrl(product.affiliateUrl || '')
    setSaveError(null)
  }

  const cancelEditing = () => {
    setEditingSlug(null)
    setEditingUrl('')
    setSaveError(null)
  }

  const saveUrl = async () => {
    if (!editingSlug) return

    setSaving(true)
    setSaveError(null)

    try {
      const response = await fetch('/api/admin/affiliate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: editingSlug,
          affiliateUrl: editingUrl,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Nepodařilo se uložit')
      }

      // Refresh data
      await fetchData()
      cancelEditing()
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Chyba při ukládání')
    } finally {
      setSaving(false)
    }
  }

  const getSortedProducts = () => {
    if (!data) return []

    let products = [...data.productTracking]

    // Filter inactive if needed
    if (!showInactive) {
      products = products.filter(p => p.isActive)
    }

    // Sort
    products.sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'clicks':
          comparison = a.clickCount - b.clickCount
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'status':
          const statusOrder = { 'MISSING_URL': 0, 'MISSING_PARAMS': 1, 'ACTIVE': 2, 'INACTIVE': 3 }
          comparison = statusOrder[a.trackingStatus] - statusOrder[b.trackingStatus]
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return products
  }

  const getStatusBadge = (status: ProductTrackingStatus['trackingStatus'], details: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              <CheckCircle className="w-3.5 h-3.5" />
              Aktivní
            </span>
            <span className="text-xs text-gray-500 max-w-[200px] truncate" title={details}>
              {details}
            </span>
          </div>
        )
      case 'MISSING_PARAMS':
        return (
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              Chybí parametry
            </span>
            <span className="text-xs text-amber-600 max-w-[200px] truncate" title={details}>
              {details}
            </span>
          </div>
        )
      case 'MISSING_URL':
        return (
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              <XCircle className="w-3.5 h-3.5" />
              Chybí URL
            </span>
            <span className="text-xs text-red-600">
              {details}
            </span>
          </div>
        )
      case 'INACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <MinusCircle className="w-3.5 h-3.5" />
            Neaktivní
          </span>
        )
    }
  }

  const getRowClass = (status: ProductTrackingStatus['trackingStatus']) => {
    switch (status) {
      case 'MISSING_URL':
        return 'bg-red-50/70'
      case 'MISSING_PARAMS':
        return 'bg-amber-50/70'
      case 'INACTIVE':
        return 'opacity-60'
      default:
        return ''
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Načítání statistik...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-semibold">Chyba při načítání dat</p>
        <p>{error}</p>
        <button
          onClick={fetchData}
          className="mt-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          Zkusit znovu
        </button>
      </div>
    )
  }

  if (!data) return null

  const { stats, productTracking } = data
  const sortedProducts = getSortedProducts()

  const activeCount = productTracking.filter(p => p.trackingStatus === 'ACTIVE').length
  const missingParamsCount = productTracking.filter(p => p.trackingStatus === 'MISSING_PARAMS' && p.isActive).length
  const missingUrlCount = productTracking.filter(p => p.trackingStatus === 'MISSING_URL' && p.isActive).length

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliate Přehled</h1>
          <p className="text-gray-600">Přehled kliknutí a stavu tracking odkazů</p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Obnovit
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-romantic-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <MousePointer className="w-5 h-5 sm:w-6 sm:h-6 text-romantic-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Celkem</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Dnes</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.todayClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Týden</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.weekClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Měsíc</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.monthClicks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Status Summary */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{activeCount} aktivních</span>
        </div>
        {missingParamsCount > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">{missingParamsCount} bez parametrů</span>
          </div>
        )}
        {missingUrlCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200">
            <XCircle className="w-5 h-5" />
            <span className="font-medium">{missingUrlCount} bez URL</span>
          </div>
        )}
        <label className="flex items-center gap-2 ml-auto cursor-pointer">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-romantic-600 focus:ring-romantic-500"
          />
          <span className="text-sm text-gray-600">Zobrazit neaktivní</span>
        </label>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 sm:px-6 py-4">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Seznamka
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </button>
                </th>
                <th className="text-left px-4 sm:px-6 py-4">
                  <button
                    onClick={() => handleSort('clicks')}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Kliknutí
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </button>
                </th>
                <th className="text-left px-4 sm:px-6 py-4">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Tracking
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </button>
                </th>
                <th className="text-left px-4 sm:px-6 py-4">
                  <span className="font-semibold text-gray-700">Affiliate URL</span>
                </th>
                <th className="text-left px-4 sm:px-6 py-4 w-20">
                  <span className="font-semibold text-gray-700">Akce</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedProducts.map((product) => (
                <tr
                  key={product.slug}
                  className={`hover:bg-gray-50/50 transition-colors ${getRowClass(product.trackingStatus)}`}
                >
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.slug}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`font-semibold ${product.clickCount > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {product.clickCount}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(product.trackingStatus, product.trackingDetails)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {editingSlug === product.slug ? (
                      <div className="flex flex-col gap-2">
                        <input
                          type="url"
                          value={editingUrl}
                          onChange={(e) => setEditingUrl(e.target.value)}
                          placeholder="https://example.com/?aff_id=123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-romantic-500 focus:border-romantic-500"
                          autoFocus
                        />
                        {saveError && (
                          <p className="text-xs text-red-600">{saveError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="max-w-[300px]">
                        {product.affiliateUrl ? (
                          <a
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
                            title={product.affiliateUrl}
                          >
                            <span className="truncate max-w-[250px]">{product.affiliateUrl}</span>
                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Není nastavena</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {editingSlug === product.slug ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={saveUrl}
                          disabled={saving}
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50"
                          title="Uložit"
                        >
                          {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={cancelEditing}
                          disabled={saving}
                          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                          title="Zrušit"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(product)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        title="Upravit URL"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Žádné produkty k zobrazení
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-2">Jak funguje detekce trackingu:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li><span className="text-green-600 font-medium">Aktivní</span> – URL obsahuje affiliate parametry (aff_id, offer_id, utm_*, ref, subid, clickid, atd.)</li>
              <li><span className="text-amber-600 font-medium">Chybí parametry</span> – URL je nastavena, ale neobsahuje tracking parametry</li>
              <li><span className="text-red-600 font-medium">Chybí URL</span> – Affiliate URL není vůbec nastavena</li>
              <li><span className="text-gray-600 font-medium">Neaktivní</span> – Produkt je deaktivován a nezobrazuje se na webu</li>
            </ul>
            <p className="mt-3 text-blue-600">
              Kliknutím na <Edit3 className="w-4 h-4 inline" /> můžete upravit affiliate URL přímo v tabulce.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
