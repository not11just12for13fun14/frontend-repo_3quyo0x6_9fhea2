import HeaderHero from './components/HeaderHero'
import Offers from './components/Offers'
import Posts from './components/Posts'
import ReviewsContact from './components/ReviewsContact'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <HeaderHero />
      <Offers />
      <Posts />
      <ReviewsContact />
      <footer className="border-t border-white/10 mt-10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Travel Agency. All rights reserved.</p>
          <p className="opacity-75">Built live with Flames Blue</p>
        </div>
      </footer>
    </div>
  )
}

export default App
