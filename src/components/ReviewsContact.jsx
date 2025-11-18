import React, { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function ReviewsContact() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ''

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

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0
    const avg = reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
    return Math.round(avg * 10) / 10
  }, [reviews])

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello! I would like to plan a trip.')}`

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Customer Reviews</h2>
            {reviews.length > 0 && (
              <div className="text-sm text-slate-300">
                <span className="text-amber-300">★ {averageRating}</span> average from {reviews.length} reviews
              </div>
            )}
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({length:4}).map((_,i)=>(
                <div key={i} className="h-24 rounded-xl bg-slate-800/40 ring-1 ring-white/10 animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-slate-300 bg-slate-800/40 ring-1 ring-white/10 rounded-xl p-6">
              No reviews yet. Add some via the API. Example: POST /api/reviews
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-800/50 ring-1 ring-white/10">
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
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 ring-1 ring-white/10 sticky top-8">
            <h3 className="text-white font-semibold text-xl">Plan your trip with us</h3>
            <p className="text-slate-300 mt-2">Quick replies for quotes, custom itineraries and bookings.</p>
            <a href={waLink} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition">
              <span>WhatsApp Chat</span>
            </a>
            {waNumber === '' && (
              <p className="text-xs text-amber-300 mt-3">Set your WhatsApp number to enable direct chat.</p>
            )}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-white font-semibold">24/7</p>
                <p>Support</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-white font-semibold">Free</p>
                <p>Consult</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-white font-semibold">Best</p>
                <p>Deals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
