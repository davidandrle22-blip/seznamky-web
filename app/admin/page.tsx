import { getAllProdukty, getAllClanky } from '@/lib/data'
import { Package, FileText, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [produkty, clanky] = await Promise.all([
    getAllProdukty(),
    getAllClanky()
  ])

  const aktivniProdukty = produkty.filter(p => p.isActive).length
  const publikovaneClanky = clanky.filter(c => c.isPublished).length

  const stats = [
    {
      name: 'Celkem produktů',
      value: produkty.length,
      subtext: `${aktivniProdukty} aktivních`,
      icon: Package,
      href: '/admin/produkty',
      color: 'bg-blue-500'
    },
    {
      name: 'Celkem článků',
      value: clanky.length,
      subtext: `${publikovaneClanky} publikovaných`,
      icon: FileText,
      href: '/admin/clanky',
      color: 'bg-green-500'
    },
    {
      name: 'Návštěvy',
      value: '-',
      subtext: 'Připojte analytics',
      icon: Eye,
      href: '#',
      color: 'bg-purple-500'
    },
    {
      name: 'Konverze',
      value: '-',
      subtext: 'Připojte analytics',
      icon: TrendingUp,
      href: '#',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500">{stat.name}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.subtext}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Rychlé akce</h2>
          <div className="space-y-3">
            <Link
              href="/admin/produkty?action=new"
              className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              + Přidat nový produkt
            </Link>
            <Link
              href="/admin/clanky?action=new"
              className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              + Napsat nový článek
            </Link>
            <Link
              href="/admin/nastaveni"
              className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Upravit nastavení webu
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Poslední produkty</h2>
          <div className="space-y-3">
            {produkty.slice(0, 5).map((produkt) => (
              <Link
                key={produkt.id}
                href={`/admin/produkty?edit=${produkt.id}`}
                className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="font-medium">{produkt.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${produkt.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {produkt.isActive ? 'Aktivní' : 'Neaktivní'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-primary-100 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Tip</h2>
        <p className="text-gray-700">
          Pro úpravu obsahu webu použijte menu na levé straně. Můžete přidávat a upravovat produkty (seznamky),
          psát články do blogu a měnit nastavení webu včetně SEO a textů na hlavní stránce.
        </p>
      </div>
    </div>
  )
}
