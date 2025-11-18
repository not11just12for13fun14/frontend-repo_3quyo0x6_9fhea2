import React from 'react'

export default function HeaderHero() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.25),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30">Travel Agency</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white">
              Explore the world with exclusive offers
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Discover curated trips, read real customer stories, and message us on WhatsApp to plan your next getaway.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#offers" className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition">Browse Offers</a>
              <a href="#contact" className="px-5 py-3 rounded-xl bg-slate-800/60 text-slate-200 ring-1 ring-white/10 hover:bg-slate-700/50 transition">Contact Us</a>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-blue-600/20 to-emerald-500/20 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl">✈️🌴</p>
                <p className="mt-3 text-slate-300">Your next destination awaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
