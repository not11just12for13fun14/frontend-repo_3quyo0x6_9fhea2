import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Offers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/offers`)
        const data = await res.json()
        setOffers(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
  }, [])

  return (
    <section id="offers" className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Available Offers</h2>
        <p className="text-slate-300 text-sm">Automatically loads from the backend</p>
      </div>

      {loading ? (
        <p className="text-slate-300">Loading offers...</p>
      ) : offers.length === 0 ? (
        <div className="text-slate-300 bg-slate-800/40 ring-1 ring-white/10 rounded-xl p-6">
          No offers yet. Add some via the API. Example: POST /api/offers
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="rounded-xl overflow-hidden bg-slate-800/50 ring-1 ring-white/10 hover:ring-blue-500/40 transition">
              {offer.image_url ? (
                <img src={offer.image_url} alt={offer.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-gradient-to-br from-blue-600/30 to-emerald-500/30" />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">{offer.title}</h3>
                  <span className="text-emerald-300 font-semibold">${offer.price}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300 line-clamp-3">{offer.description}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                  <span>📍 {offer.destination}</span>
                  <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || ''}?text=${encodeURIComponent('Hello! I am interested in ' + offer.title)}`}
                     target="_blank" rel="noreferrer"
                     className="text-emerald-300 hover:text-emerald-200">WhatsApp</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
