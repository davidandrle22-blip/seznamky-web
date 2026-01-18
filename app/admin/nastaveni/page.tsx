'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Search } from 'lucide-react'
import { Nastaveni } from '@/lib/types'

export default function AdminNastaveniPage() {
  const [nastaveni, setNastaveni] = useState<Nastaveni | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchNastaveni()
  }, [])

  const fetchNastaveni = async () => {
    try {
      const res = await fetch('/api/nastaveni')
      const data = await res.json()
      setNastaveni(data)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!nastaveni) return

    setIsSaving(true)
    setMessage('')

    try {
      await fetch('/api/nastaveni', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nastaveni)
      })
      setMessage('Nastavení bylo uloženo!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      setMessage('Chyba při ukládání!')
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = (field: string, value: string) => {
    if (!nastaveni) return
    setNastaveni({ ...nastaveni, [field]: value })
  }

  const updateSocialLink = (platform: string, value: string) => {
    if (!nastaveni) return
    setNastaveni({
      ...nastaveni,
      socialLinks: { ...nastaveni.socialLinks, [platform]: value }
    })
  }

  const updateSeo = (field: string, value: string) => {
    if (!nastaveni) return
    setNastaveni({
      ...nastaveni,
      seo: { ...nastaveni.seo, [field]: value }
    })
  }

  if (isLoading || !nastaveni) {
    return <div className="text-gray-500">Načítání...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nastavení webu</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Ukládání...' : 'Uložit změny'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg ${
          message.includes('Chyba')
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Základní nastavení */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-primary-500" />
            Základní nastavení
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Název webu</label>
              <input
                type="text"
                value={nastaveni.siteName}
                onChange={(e) => updateField('siteName', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Popis webu</label>
              <input
                type="text"
                value={nastaveni.siteDescription}
                onChange={(e) => updateField('siteDescription', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero titulek (hlavní stránka)</label>
              <input
                type="text"
                value={nastaveni.heroTitle}
                onChange={(e) => updateField('heroTitle', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero podtitulek</label>
              <textarea
                value={nastaveni.heroSubtitle}
                onChange={(e) => updateField('heroSubtitle', e.target.value)}
                className="input-field"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Text v patičce</label>
              <input
                type="text"
                value={nastaveni.footerText}
                onChange={(e) => updateField('footerText', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Kontaktní údaje */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Mail className="w-6 h-6 mr-2 text-primary-500" />
            Kontaktní údaje
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                value={nastaveni.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Telefon
              </label>
              <input
                type="text"
                value={nastaveni.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Adresa
              </label>
              <input
                type="text"
                value={nastaveni.contactAddress}
                onChange={(e) => updateField('contactAddress', e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Sociální sítě */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Facebook className="w-6 h-6 mr-2 text-primary-500" />
            Sociální sítě
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Facebook className="w-4 h-4 inline mr-1" />
                Facebook
              </label>
              <input
                type="url"
                value={nastaveni.socialLinks.facebook || ''}
                onChange={(e) => updateSocialLink('facebook', e.target.value)}
                className="input-field"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Instagram className="w-4 h-4 inline mr-1" />
                Instagram
              </label>
              <input
                type="url"
                value={nastaveni.socialLinks.instagram || ''}
                onChange={(e) => updateSocialLink('instagram', e.target.value)}
                className="input-field"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Twitter className="w-4 h-4 inline mr-1" />
                Twitter / X
              </label>
              <input
                type="url"
                value={nastaveni.socialLinks.twitter || ''}
                onChange={(e) => updateSocialLink('twitter', e.target.value)}
                className="input-field"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Search className="w-6 h-6 mr-2 text-primary-500" />
            SEO nastavení
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta titulek</label>
              <input
                type="text"
                value={nastaveni.seo.title}
                onChange={(e) => updateSeo('title', e.target.value)}
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">Doporučeno: 50-60 znaků</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta popis</label>
              <textarea
                value={nastaveni.seo.description}
                onChange={(e) => updateSeo('description', e.target.value)}
                className="input-field"
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">Doporučeno: 150-160 znaků</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Klíčová slova</label>
              <input
                type="text"
                value={nastaveni.seo.keywords}
                onChange={(e) => updateSeo('keywords', e.target.value)}
                className="input-field"
                placeholder="seznamky, online seznamování, recenze"
              />
              <p className="text-sm text-gray-500 mt-1">Oddělte čárkou</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating save button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary-400 hover:bg-primary-500 text-gray-900 font-semibold py-4 px-6 rounded-full shadow-lg flex items-center disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Ukládání...' : 'Uložit'}
        </button>
      </div>
    </div>
  )
}
