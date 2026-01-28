'use client'

import { useState, useEffect } from 'react'
import {
  Mail,
  Download,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Users,
  UserCheck,
  UserX,
  Calendar,
  TrendingUp,
  BookOpen,
  AlertCircle,
  Check,
  X as XIcon
} from 'lucide-react'

interface Lead {
  id: string
  email: string
  source: string
  sourcePage?: string
  status: 'active' | 'unsubscribed'
  createdAt: string
  emailSentAt?: string
  downloadedAt?: string
}

interface LeadStats {
  total: number
  active: number
  unsubscribed: number
  today: number
  thisWeek: number
  thisMonth: number
  bySource: { source: string; count: number }[]
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'unsubscribed'>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/leads?action=stats'),
      ])

      if (leadsRes.ok) {
        const data = await leadsRes.json()
        setLeads(data.leads || [])
      }

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id))
        setDeleteConfirm(null)
        // Refresh stats
        const statsRes = await fetch('/api/admin/leads?action=stats')
        if (statsRes.ok) {
          setStats(await statsRes.json())
        }
      }
    } catch (error) {
      console.error('Failed to delete lead:', error)
    }
  }

  const handleExport = () => {
    window.open('/api/admin/leads?action=export', '_blank')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      ebook: 'E-book',
      newsletter: 'Newsletter',
      popup: 'Popup',
      sidebar: 'Sidebar',
      blog: 'Blog',
      review: 'Recenze',
    }
    return labels[source] || source
  }

  // Filtrování
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter
    return matchesSearch && matchesStatus && matchesSource
  })

  // Unikátní zdroje pro filtr
  const uniqueSources = Array.from(new Set(leads.map(l => l.source)))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Magnet</h1>
          <p className="text-gray-500">Správa e-mailových kontaktů</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Obnovit
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500">Celkem</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-xs text-gray-500">Aktivní</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.unsubscribed}</p>
                <p className="text-xs text-gray-500">Odhlášení</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                <p className="text-xs text-gray-500">Dnes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
                <p className="text-xs text-gray-500">Tento týden</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
                <p className="text-xs text-gray-500">Tento měsíc</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sources breakdown */}
      {stats && stats.bySource.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Podle zdroje</h3>
          <div className="flex flex-wrap gap-2">
            {stats.bySource.map(({ source, count }) => (
              <span
                key={source}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {getSourceLabel(source)}: <strong>{count}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Hledat podle e-mailu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
            >
              <option value="all">Všechny stavy</option>
              <option value="active">Aktivní</option>
              <option value="unsubscribed">Odhlášení</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none"
            >
              <option value="all">Všechny zdroje</option>
              {uniqueSources.map(source => (
                <option key={source} value={source}>{getSourceLabel(source)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">E-mail</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Zdroj</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stav</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vytvořeno</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Staženo</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    {leads.length === 0 ? 'Zatím žádné kontakty' : 'Žádné výsledky pro zadané filtry'}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                        {getSourceLabel(lead.source)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {lead.status === 'active' ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <Check className="w-4 h-4" />
                          Aktivní
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 text-sm">
                          <XIcon className="w-4 h-4" />
                          Odhlášen
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {lead.emailSentAt ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <XIcon className="w-4 h-4 text-gray-300" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {lead.downloadedAt ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <XIcon className="w-4 h-4 text-gray-300" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {deleteConfirm === lead.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            Potvrdit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                          >
                            Zrušit
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(lead.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Smazat (GDPR)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
          Zobrazeno {filteredLeads.length} z {leads.length} kontaktů
        </div>
      </div>
    </div>
  )
}
