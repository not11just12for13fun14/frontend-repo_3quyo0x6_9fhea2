import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function ReviewsContact() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/reviews`)
        const data = await res.json()
        setReviews(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ''
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello! I would like to plan a trip.')}`

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Customer Reviews</h2>
          {loading ? (
            <p className="text-slate-300">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="text-slate-300 bg-slate-800/40 ring-1 ring-white/10 rounded-xl p-6">
              No reviews yet. Add some via the API. Example: POST /api/reviews
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-slate-800/50 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{r.name}</p>
                    <p className="text-amber-300">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                  </div>
                  {r.trip && <p className="text-sm text-slate-400 mt-1">Trip: {r.trip}</p>}
                  {r.comment && <p className="text-slate-300 mt-2">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="p-6 rounded-2xl bg-slate-800/60 ring-1 ring-white/10 sticky top-8">
            <h3 className="text-white font-semibold text-xl">Contact us on WhatsApp</h3>
            <p className="text-slate-300 mt-2">Quick replies for quotes, custom itineraries and bookings.</p>
            <a href={waLink} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition">
              <span>WhatsApp Chat</span>
            </a>
            {waNumber === '' && (
              <p className="text-xs text-amber-300 mt-3">Set VITE_WHATSAPP_NUMBER in environment to enable direct chat.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
