"use client"
import React, { useEffect, useState } from 'react'
import supabase from '../../lib/supabaseClient'

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Admin Dashboard</h3>
      <p className="mt-2 opacity-80">Signed in. Use the left menu to manage content (CRUD UI coming next).</p>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-accent rounded"
          onClick={async () => {
            await supabase.auth.signOut()
            onSignOut()
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // read existing session if present
    supabase.auth.getSession().then(({ data, error }) => {
      if (data?.session?.user) setUser(data.session.user)
    })
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setMessage('Signing in...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setMessage(String(error.message || error))
      return
    }
    setMessage('Signed in')
    setUser(data.user)
  }

  if (user) {
    return (
      <div>
        <Dashboard onSignOut={() => { setUser(null); setMessage('Signed out') }} />

        <div className="mt-6">
          <h4 className="font-semibold">Manage</h4>
          <div className="mt-2 flex gap-3">
            <a href="/admin/skills" className="px-3 py-2 bg-white/5 rounded">Skills</a>
            <a href="/admin/projects" className="px-3 py-2 bg-white/5 rounded">Projects</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
      <p className="mt-2 opacity-80">Log in with email + password. Admin UI will allow CRUD for skills, projects, experience, and certifications.</p>

      <form onSubmit={handleLogin} className="mt-6 max-w-md space-y-4">
        <input className="w-full p-3 rounded bg-white/5" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-3 rounded bg-white/5" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-accent rounded">Sign in</button>
      </form>

      {message && <p className="mt-4 text-sm text-yellow-300">{message}</p>}
    </div>
  )
}
