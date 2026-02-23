"use client"
import React, { useEffect, useState } from 'react'
import supabase from '../../../lib/supabaseClient'
import FileUploader from '../../../components/FileUploader'

type Cert = {
  id: string
  title: string
  issuer?: string
  credential_url?: string
  issued_date?: string
  file_key?: string
}

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Cert[]>([])
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [issuer, setIssuer] = useState('')
  const [issuedDate, setIssuedDate] = useState('')
  const [fileKey, setFileKey] = useState('')

  useEffect(() => { fetchCerts() }, [])

  async function fetchCerts() {
    setLoading(true)
    const { data, error } = await supabase.from('certifications').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setCerts((data as Cert[]) || [])
    setLoading(false)
  }

  async function addCert(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('certifications').insert([{ title, issuer, issued_date: issuedDate || null, file_key: fileKey || null }])
    if (error) console.error(error)
    setTitle('')
    setIssuer('')
    setIssuedDate('')
    setFileKey('')
    await fetchCerts()
  }

  async function deleteCert(id: string) {
    setLoading(true)
    const { error } = await supabase.from('certifications').delete().eq('id', id)
    if (error) console.error(error)
    await fetchCerts()
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold">Manage Certifications</h2>
      <p className="mt-2 opacity-80">Upload certificate PDFs and add metadata.</p>

      <form onSubmit={addCert} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="p-2 rounded bg-white/5" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="p-2 rounded bg-white/5" placeholder="Issuer" value={issuer} onChange={e => setIssuer(e.target.value)} />
        <input className="p-2 rounded bg-white/5" type="date" value={issuedDate} onChange={e => setIssuedDate(e.target.value)} />

        <div className="md:col-span-2">
          <FileUploader accept="application/pdf" label="Upload certificate (PDF)" onUpload={(fileKey) => setFileKey(fileKey)} />
          {fileKey && <div className="mt-2 text-sm">Uploaded: {fileKey.split('/').pop()}</div>}
        </div>

        <div className="md:col-span-2">
          <button className="px-4 py-2 bg-primary text-black rounded">Add Certification</button>
        </div>
      </form>

      <div className="mt-6">
        {loading && <div className="text-sm opacity-80">Loading...</div>}
        {!loading && certs.length === 0 && <div className="text-sm opacity-70">No certifications yet.</div>}

        <ul className="mt-4 space-y-2">
          {certs.map(c => (
            <li key={c.id} className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm opacity-80">{c.issuer} • {c.issued_date}</div>
                {c.file_key && <div className="text-sm mt-1">File: {c.file_key.split('/').pop()}</div>}
              </div>
              <div>
                <button className="px-3 py-1 bg-red-600 rounded" onClick={() => deleteCert(c.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
