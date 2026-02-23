"use client"
import React, { useEffect, useState } from 'react'
import supabase from '../../../lib/supabaseClient'
import FileUploader from '../../../components/FileUploader'

type Project = {
  id: string
  title: string
  slug?: string
  description?: string
  tech?: string[]
  live_url?: string
  repo_url?: string
  published?: boolean
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  // form state
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [techCsv, setTechCsv] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [published, setPublished] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ file_key: string; url?: string }[]>([])

  useEffect(() => { fetchProjects() }, [])

  async function fetchProjects() {
    setLoading(true)
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setProjects((data as Project[]) || [])
    setLoading(false)
  }

  async function addProject(e: React.FormEvent) {
    e.preventDefault()
    const tech = techCsv.split(',').map(t => t.trim()).filter(Boolean)
    setLoading(true)
    const { error } = await supabase.from('projects').insert([{ title, slug, description, tech, live_url: liveUrl, repo_url: repoUrl, published, images: uploadedFiles }])
    if (error) console.error(error)
    setTitle('')
    setSlug('')
    setDescription('')
    setTechCsv('')
    setLiveUrl('')
    setRepoUrl('')
    setPublished(false)
    setUploadedFiles([])
    await fetchProjects()
  }

  async function deleteProject(id: string) {
    setLoading(true)
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) console.error(error)
    await fetchProjects()
  }

  async function togglePublish(p: Project) {
    setLoading(true)
    const { error } = await supabase.from('projects').update({ published: !p.published }).eq('id', p.id)
    if (error) console.error(error)
    await fetchProjects()
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold">Manage Projects</h2>
      <p className="mt-2 opacity-80">Add or remove demo projects. For images and files, use the Storage upload feature (coming next).</p>

      <form onSubmit={addProject} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="p-2 rounded bg-white/5" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="p-2 rounded bg-white/5" placeholder="Slug (optional)" value={slug} onChange={e => setSlug(e.target.value)} />
        <textarea className="p-2 rounded bg-white/5 md:col-span-2" placeholder="Short description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="p-2 rounded bg-white/5" placeholder="Tech (comma separated)" value={techCsv} onChange={e => setTechCsv(e.target.value)} />
        <input className="p-2 rounded bg-white/5" placeholder="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
        <input className="p-2 rounded bg-white/5" placeholder="Repo URL" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} />
        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} /> <span className="ml-2">Published</span>
        </label>
        <div className="md:col-span-2">
          <div className="mb-2">Upload cover image / demo file</div>
          <FileUploader accept="image/*,application/pdf" label="Upload file" onUpload={(fileKey, publicUrl) => setUploadedFiles(prev => [...prev, { file_key: fileKey, url: publicUrl }])} />
          {uploadedFiles.length > 0 && (
            <div className="mt-2 text-sm">
              Uploaded: {uploadedFiles.map(u => u.file_key.split('/').pop()).join(', ')}
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <button className="px-4 py-2 bg-primary text-black rounded">Add Project</button>
        </div>
      </form>

      <div className="mt-6">
        {loading && <div className="text-sm opacity-80">Loading...</div>}
        {!loading && projects.length === 0 && <div className="text-sm opacity-70">No projects yet.</div>}

        <ul className="mt-4 space-y-3">
          {projects.map(p => (
            <li key={p.id} className="p-3 bg-white/5 rounded flex items-start justify-between">
              <div>
                <div className="font-medium text-lg">{p.title} {p.published ? <span className="text-sm text-green-300 ml-2">(live)</span> : null}</div>
                <div className="text-sm opacity-80">{p.slug} • {p.tech?.join(', ')}</div>
                <div className="mt-2 text-sm opacity-90">{p.description}</div>
                <div className="mt-2 text-sm opacity-80">
                  <a href={p.live_url} className="mr-4 underline" target="_blank">Live</a>
                  <a href={p.repo_url} className="underline" target="_blank">Repo</a>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(p.id)}>Copy ID</button>
                <button className="px-3 py-1 bg-amber-500 rounded" onClick={() => togglePublish(p)}>{p.published ? 'Unpublish' : 'Publish'}</button>
                <button className="px-3 py-1 bg-red-600 rounded" onClick={() => deleteProject(p.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
