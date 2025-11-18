import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts`)
        const data = await res.json()
        setPosts(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Latest Posts</h2>
      </div>

      {loading ? (
        <p className="text-slate-300">Loading posts...</p>
      ) : posts.length === 0 ? (
        <div className="text-slate-300 bg-slate-800/40 ring-1 ring-white/10 rounded-xl p-6">
          No posts yet. Add some via the API. Example: POST /api/posts
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="rounded-xl overflow-hidden bg-slate-800/50 ring-1 ring-white/10 hover:ring-blue-500/40 transition">
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-gradient-to-br from-blue-600/30 to-fuchsia-500/30" />
              )}
              <div className="p-4">
                <h3 className="text-white font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-300 line-clamp-4">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
