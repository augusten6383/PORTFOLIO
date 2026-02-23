import React from 'react'
import supabase from '../../lib/supabaseClient'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

type Project = {
  id: string
  title: string
  slug?: string
  description?: string
  tech?: string[]
  live_url?: string
  repo_url?: string
  images?: Array<{ file_key?: string; url?: string }>
}

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*').eq('published', true).order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching projects', error)
    return []
  }

  const projects = (data as any[]) || []

  // If a service role key is available, generate signed URLs for private storage objects.
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'portfolio'
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    for (const p of projects) {
      if (Array.isArray(p.images)) {
        const newImages: Array<{ file_key?: string; url?: string }> = []
        for (const img of p.images) {
          if (img?.url) {
            newImages.push(img)
            continue
          }
          const key = img?.file_key
          if (!key) continue
          try {
            const { data: signed, error: sErr } = await supabaseAdmin.storage.from(bucket).createSignedUrl(key, 60 * 60)
            if (sErr) {
              console.error('Signed URL error', sErr)
              newImages.push({ file_key: key })
            } else {
              newImages.push({ file_key: key, url: signed.signedUrl })
            }
          } catch (e) {
            console.error('Signed URL exception', e)
            newImages.push({ file_key: key })
          }
        }
        p.images = newImages
      }
    }
  }

  return projects
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      {projects.length === 0 && <p className="opacity-80">No projects published yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(p => (
          <article key={p.id} className="p-4 bg-white/5 rounded">
            <h3 className="text-xl font-semibold">{p.title}</h3>
            {p.images && p.images.length > 0 && (
              <div className="mt-3">
                {p.images[0].url ? (
                  <FilePreview src={p.images[0].url} title={p.title} />
                ) : p.images[0].file_key ? (
                  <FilePreview fileKey={p.images[0].file_key} title={p.title} />
                ) : null}
              </div>
            )}

            <p className="mt-3 opacity-90">{p.description}</p>
            <div className="mt-3 text-sm opacity-80">{p.tech?.join(', ')}</div>
            <div className="mt-4 flex gap-3">
              {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="px-3 py-1 bg-primary text-black rounded">Live</a>}
              {p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded">Repo</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// Client component to request public URL for a file key at render time
function FilePreview({ fileKey, src, title }: { fileKey?: string; src?: string; title?: string }) {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'portfolio'
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publicUrl = src || (baseUrl ? `${baseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${fileKey}` : fileKey)
  const lower = (publicUrl || '').toLowerCase()
  const isPdf = lower.endsWith('.pdf')

  if (isPdf) {
    // show an iframe preview and a download link
    return (
      <div className="space-y-2">
        <a href={publicUrl} target="_blank" rel="noreferrer" className="text-sm underline">Open PDF</a>
        <div className="w-full h-64 bg-black/10 rounded overflow-hidden">
          <iframe src={publicUrl} title={title} className="w-full h-full" />
        </div>
      </div>
    )
  }

  // default: image
  return <img src={publicUrl} alt={title} className="w-full h-44 object-cover rounded" />
}
