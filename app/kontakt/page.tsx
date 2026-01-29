'use client'

import { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Odeslání se nezdařilo')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setError('Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kontaktujte nás
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Máte otázku, návrh nebo zpětnou vazbu? Rádi vám odpovíme!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">E-mail</h3>
                    <a
                      href="mailto:seznamky-info@seznam.cz"
                      className="text-rose-600 hover:text-rose-700 hover:underline"
                    >
                      seznamky-info@seznam.cz
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-rose-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Adresa</h3>
                    <p className="text-gray-600">Kaprova 42/14, Praha 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Děkujeme za zprávu!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Ozveme se vám co nejdříve.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-rose-500 hover:text-rose-600 font-medium"
                  >
                    Odeslat další zprávu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Jméno *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Vaše jméno"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="vas@email.cz"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Předmět *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Vyberte předmět...</option>
                      <option value="dotaz">Obecný dotaz</option>
                      <option value="spoluprace">Spolupráce</option>
                      <option value="recenze">Žádost o recenzi</option>
                      <option value="technicka-podpora">Technická podpora</option>
                      <option value="jine">Jiné</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Zpráva *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Napište nám svou zprávu..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>Odesílám...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Odeslat zprávu
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
