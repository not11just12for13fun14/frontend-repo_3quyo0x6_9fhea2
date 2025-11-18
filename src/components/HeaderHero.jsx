import React from 'react'

export default function HeaderHero() {
  return (
    <header className="relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-6 pb-20">
        {/* Simple nav */}
        <nav className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 grid place-items-center text-white shadow-lg shadow-emerald-500/20">✈️</div>
            <span className="text-white font-semibold tracking-tight">Skylark Travels</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#offers" className="hover:text-white">Offers</a>
            <a href="#posts" className="hover:text-white">Posts</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30">
              Your next escape awaits
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Travel smarter. Travel brighter.
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-xl">
              Handpicked getaways, real traveler stories, and instant WhatsApp support to craft the perfect trip.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#offers" className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white hover:from-emerald-400 hover:to-blue-500 transition shadow-lg shadow-emerald-500/20">
                Browse Exclusive Offers
              </a>
              <a href="#contact" className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/20 text-white hover:bg-white/15 transition">
                Chat on WhatsApp
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2"><span>✅</span>Flexible dates</div>
              <div className="flex items-center gap-2"><span>⭐</span>Top-rated guides</div>
              <div className="flex items-center gap-2"><span>💬</span>Fast support</div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-blue-600/30 to-emerald-500/30">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
                alt="Tropical beach"
                className="h-full w-full object-cover opacity-90"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur rounded-2xl p-4 ring-1 ring-white/20 max-w-[260px]">
              <p className="text-sm text-slate-200">Featured this week</p>
              <p className="text-white font-semibold mt-1">Maldives Overwater Escape</p>
              <p className="text-emerald-300 text-sm mt-1">From $1,299</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <a href="#offers" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
            <span>Scroll to explore</span>
            <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </header>
  )
}
