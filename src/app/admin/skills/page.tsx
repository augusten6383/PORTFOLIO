"use client"
import React, { useEffect, useState } from 'react'
import supabase from '../../../lib/supabaseClient'

type Skill = {
  id: string
  title: string
  category?: string
  level?: string
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    setLoading(true)
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setSkills((data as Skill[]) || [])
    setLoading(false)
  }

  async function addSkill(e: React.FormEvent) {
    e.preventDefault()
    if (!title) return
    setLoading(true)
    const { error } = await supabase.from('skills').insert([{ title, category, level }])
    if (error) console.error(error)
    setTitle('')
    setCategory('')
    setLevel('')
    await fetchSkills()
  }

  async function removeSkill(id: string) {
    setLoading(true)
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (error) console.error(error)
    await fetchSkills()
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold">Manage Skills</h2>
      <p className="mt-2 opacity-80">Add, edit or remove skills. Changes are saved directly to Supabase.</p>

      <form onSubmit={addSkill} className="mt-6 flex gap-2">
        <input className="p-2 rounded bg-white/5 flex-1" placeholder="Skill title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="p-2 rounded bg-white/5 w-44" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input className="p-2 rounded bg-white/5 w-28" placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} />
        <button className="px-3 py-2 bg-primary text-black rounded">Add</button>
      </form>

      <div className="mt-6">
        {loading && <div className="text-sm opacity-80">Loading...</div>}
        {!loading && skills.length === 0 && <div className="text-sm opacity-70">No skills yet.</div>}

        <ul className="mt-4 space-y-2">
          {skills.map(s => (
            <li key={s.id} className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm opacity-80">{s.category} • {s.level}</div>
              </div>
              <div>
                <button className="px-3 py-1 mr-2 border rounded" onClick={() => navigator.clipboard.writeText(s.id)}>Copy ID</button>
                <button className="px-3 py-1 bg-red-600 rounded" onClick={() => removeSkill(s.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
