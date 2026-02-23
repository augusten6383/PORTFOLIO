"use client"
import React, { useState } from 'react'
import supabase from '../lib/supabaseClient'

type Props = {
  bucket?: string
  accept?: string
  label?: string
  onUpload?: (fileKey: string, publicUrl: string) => void
}

const DEFAULT_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'portfolio'

export default function FileUploader({ bucket = DEFAULT_BUCKET, accept = '*', label = 'Choose file', onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const filePath = `uploads/${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const { data, error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, { upsert: false })
      if (uploadError) {
        // Provide clearer guidance for common storage errors (bucket missing, RLS)
        console.error('Upload error', uploadError)
        if (String(uploadError.message).toLowerCase().includes('bucket not found')) {
          alert(`Upload failed: bucket '${bucket}' not found. Create the bucket in Supabase Storage or set NEXT_PUBLIC_SUPABASE_BUCKET to an existing bucket.`)
        } else if (String(uploadError.message).toLowerCase().includes('row-level security') || String(uploadError.message).toLowerCase().includes('policy')) {
          alert(`Upload failed due to storage row-level security. Ensure the bucket allows authenticated uploads or create an appropriate policy in Supabase.`)
        } else {
          alert('Upload failed: ' + (uploadError.message || uploadError))
        }
        throw uploadError
      }

      // get public URL
      const { data: publicData } = await supabase.storage.from(bucket).getPublicUrl(filePath)
      const publicUrl = (publicData as any)?.publicUrl || ''

      // Friendly note: if the bucket is private you will need signed URLs to access files in production.

      if (onUpload) onUpload(filePath, publicUrl)
    } catch (err: any) {
      console.error('Upload error', err)
      alert('Upload failed: ' + String(err.message || err))
    } finally {
      setUploading(false)
      setProgress(null)
      // clear input value to allow re-upload of same file if needed
      if (e.target) e.target.value = ''
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="px-3 py-2 bg-white/5 rounded cursor-pointer">
        {label}
        <input accept={accept} type="file" onChange={handleFile} className="hidden" />
      </label>
      {uploading && <div className="text-sm opacity-80">Uploading...</div>}
    </div>
  )
}
