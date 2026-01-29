'use client'

import { useState, useEffect } from 'react'
import {
  MousePointer,
  RefreshCw,
  CheckCircle,
  XCircle,
  MinusCircle,
  ExternalLink,
  ArrowUpDown,
  TrendingUp,
  Calendar,
  BarChart3
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
  trackingStatus: 'OK' | 'MISSING' | 'INACTIVE'
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
          const statusOrder = { 'MISSING': 0, 'OK': 1, 'INACTIVE': 2 }
          comparison = statusOrder[a.trackingStatus] - statusOrder[b.trackingStatus]
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    return products
  }

  const getStatusBadge = (status: ProductTrackingStatus['trackingStatus']) => {
    switch (status) {
      case 'OK':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3.5 h-3.5" />
            OK
          </span>
        )
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3.5 h-3.5" />
            CHYBÍ
          </span>
        )
      case 'INACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            <MinusCircle className="w-3.5 h-3.5" />
            NEAKTIVNÍ
          </span>
        )
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
  const missingCount = productTracking.filter(p => p.trackingStatus === 'MISSING' && p.isActive).length
  const okCount = productTracking.filter(p => p.trackingStatus === 'OK').length

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
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{okCount} OK</span>
        </div>
        {missingCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200">
            <XCircle className="w-5 h-5" />
            <span className="font-medium">{missingCount} chybí tracking</span>
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
                <th className="text-left px-4 sm:px-6 py-4 hidden lg:table-cell">
                  <span className="font-semibold text-gray-700">Affiliate URL</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedProducts.map((product) => (
                <tr
                  key={product.slug}
                  className={`hover:bg-gray-50 transition-colors ${
                    product.trackingStatus === 'MISSING' ? 'bg-red-50/50' : ''
                  } ${!product.isActive ? 'opacity-60' : ''}`}
                >
                  <td className="px-4 sm:px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500 lg:hidden mt-1 truncate max-w-[200px]">
                      {product.affiliateUrl ? (
                        <a
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {product.affiliateUrl}
                        </a>
                      ) : (
                        <span className="text-red-600">Není nastaven</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`font-semibold ${product.clickCount > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                      {product.clickCount}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(product.trackingStatus)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                    {product.affiliateUrl ? (
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline max-w-[300px] truncate"
                      >
                        <span className="truncate">{product.affiliateUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      </a>
                    ) : (
                      <span className="text-sm text-red-600 font-medium">Není nastaven</span>
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
      <div className="mt-6 text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
        <p className="font-medium text-gray-700 mb-2">Jak funguje tracking:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>OK</strong> – Affiliate URL je nastavena, kliknutí se počítají</li>
          <li><strong>CHYBÍ</strong> – Affiliate URL není nastavena, kliknutí se nepočítají</li>
          <li><strong>NEAKTIVNÍ</strong> – Produkt je deaktivován a nezobrazuje se na webu</li>
        </ul>
        <p className="mt-3">
          Všechny affiliate odkazy procházejí přes <code className="bg-gray-200 px-1.5 py-0.5 rounded">/api/affiliate/[slug]</code> a jsou trackované server-side.
        </p>
      </div>
    </div>
  )
}
