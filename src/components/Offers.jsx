import React, { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Offers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filterFeatured, setFilterFeatured] = useState(false)
  const [sortKey, setSortKey] = useState('popular') // popular | priceAsc | priceDesc

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

  const filtered = useMemo(() => {
    let list = [...offers]
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(o =>
        o.title?.toLowerCase().includes(q) ||
        o.destination?.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q)
      )
    }
    if (filterFeatured) list = list.filter(o => o.is_featured)
    if (sortKey === 'priceAsc') list.sort((a,b) => (a.price ?? 0) - (b.price ?? 0))
    if (sortKey === 'priceDesc') list.sort((a,b) => (b.price ?? 0) - (a.price ?? 0))
    return list
  }, [offers, query, filterFeatured, sortKey])

  return (
    <section id="offers" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Featured Getaways</h2>
          <p className="text-slate-300 text-sm">Handpicked trips with great value</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination or title"
              className="w-64 max-w-[70vw] rounded-xl bg-slate-900/60 ring-1 ring-white/10 px-4 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="rounded-xl bg-slate-900/60 ring-1 ring-white/10 px-3 py-2 text-slate-200"
          >
            <option value="popular">Popular</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input type="checkbox" checked={filterFeatured} onChange={(e)=> setFilterFeatured(e.target.checked)} />
            Only featured
          </label>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_,i) => (
            <div key={i} className="h-64 rounded-xl bg-slate-800/40 ring-1 ring-white/10 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-slate-300 bg-slate-800/40 ring-1 ring-white/10 rounded-xl p-6">
          No matching offers. Try adjusting your filters or add offers via the API.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((offer) => (
            <div key={offer.id} className="group rounded-2xl overflow-hidden bg-slate-800/50 ring-1 ring-white/10 hover:ring-emerald-500/40 transition">
              {offer.image_url ? (
                <div className="relative">
                  <img src={offer.image_url} alt={offer.title} className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                  {offer.is_featured && (
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-amber-500 text-slate-900">Featured</span>
                  )}
                </div>
              ) : (
                <div className="h-44 w-full bg-gradient-to-br from-blue-600/30 to-emerald-500/30" />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold pr-2 line-clamp-1">{offer.title}</h3>
                  {offer.price != null && <span className="text-emerald-300 font-semibold whitespace-nowrap">${offer.price}</span>}
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
