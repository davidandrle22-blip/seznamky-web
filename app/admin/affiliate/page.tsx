'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, MousePointer, Calendar, Package, ExternalLink, RefreshCw } from 'lucide-react'

interface ClickStats {
  totalClicks: number
  todayClicks: number
  weekClicks: number
  monthClicks: number
  topProducts: { slug: string; name: string; count: number }[]
  topSources: { source: string; count: number }[]
  dailyClicks: { date: string; count: number }[]
}

interface AffiliateClick {
  id: string
  produktSlug: string
  produktName: string
  source: string
  placement?: string
  timestamp: string
}

interface AffiliateData {
  stats: ClickStats
  recentClicks: AffiliateClick[]
}

const sourceLabels: Record<string, string> = {
  homepage: 'Homepage',
  category: 'Kategorie',
  detail: 'Detail produktu',
  table: 'Srovnávací tabulka',
  sidebar: 'Sidebar',
}

export default function AffiliateDashboard() {
  const [data, setData] = useState<AffiliateData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit' })
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

  const { stats, recentClicks } = data
  const maxDailyClicks = Math.max(...stats.dailyClicks.map(d => d.count), 1)
  const maxProductClicks = Math.max(...stats.topProducts.map(p => p.count), 1)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliate Dashboard</h1>
          <p className="text-gray-600">Přehled kliknutí na affiliate odkazy</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Obnovit
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-romantic-100 rounded-xl flex items-center justify-center">
              <MousePointer className="w-6 h-6 text-romantic-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Celkem kliknutí</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Dnes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tento týden</p>
              <p className="text-2xl font-bold text-gray-900">{stats.weekClicks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tento měsíc</p>
              <p className="text-2xl font-bold text-gray-900">{stats.monthClicks}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Clicks Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kliknutí za posledních 30 dní</h2>
          <div className="h-48 flex items-end gap-1">
            {stats.dailyClicks.slice(-30).map((day, i) => (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-romantic-500 rounded-t transition-all hover:bg-romantic-600"
                  style={{ height: `${(day.count / maxDailyClicks) * 100}%`, minHeight: day.count > 0 ? '4px' : '0' }}
                  title={`${formatShortDate(day.date)}: ${day.count} kliknutí`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{formatShortDate(stats.dailyClicks[0]?.date || '')}</span>
            <span>{formatShortDate(stats.dailyClicks[stats.dailyClicks.length - 1]?.date || '')}</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top produkty</h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Zatím žádná data</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.slice(0, 5).map((product, i) => (
                <div key={product.slug} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      <span className="text-sm text-gray-600">{product.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-romantic-500 rounded-full"
                        style={{ width: `${(product.count / maxProductClicks) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kliknutí podle zdroje</h2>
          {stats.topSources.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Zatím žádná data</p>
          ) : (
            <div className="space-y-3">
              {stats.topSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <span className="text-gray-700">{sourceLabels[source.source] || source.source}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {source.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Clicks Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Poslední kliknutí</h2>
          {recentClicks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Zatím žádná kliknutí</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Produkt</th>
                    <th className="pb-3 font-medium">Zdroj</th>
                    <th className="pb-3 font-medium">Umístění</th>
                    <th className="pb-3 font-medium">Čas</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentClicks.slice(0, 20).map((click) => (
                    <tr key={click.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{click.produktName}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600">
                        {sourceLabels[click.source] || click.source}
                      </td>
                      <td className="py-3 text-gray-600">
                        {click.placement || '-'}
                      </td>
                      <td className="py-3 text-gray-500">
                        {formatDate(click.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
