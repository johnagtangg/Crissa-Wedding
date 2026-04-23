'use client'

import { useState, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Upload, Trash2, Loader2 } from 'lucide-react'

interface Photo {
  id: string
  storage_path: string
  caption: string | null
  uploaded_at: string
  url: string
}

export default function GalleryManager({ photos }: { photos: Photo[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [caption, setCaption] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    const ext = file.name.split('.').pop()
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const supabase = createClient()

    const { error: storageError } = await supabase.storage
      .from('gallery')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (storageError) {
      setUploadError(storageError.message)
      setUploading(false)
      return
    }

    const { error: dbError } = await supabase.from('gallery_photos').insert({
      storage_path: path,
      caption: caption.trim() || null,
    })

    if (dbError) {
      setUploadError(dbError.message)
      // Clean up uploaded file
      await supabase.storage.from('gallery').remove([path])
      setUploading(false)
      return
    }

    setUploading(false)
    setCaption('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    startTransition(() => router.refresh())
  }

  async function handleDelete(photo: Photo) {
    if (!confirm('Delete this photo?')) return
    setDeleting(photo.id)
    const supabase = createClient()
    await supabase.storage.from('gallery').remove([photo.storage_path])
    await supabase.from('gallery_photos').delete().eq('id', photo.id)
    setDeleting(null)
    startTransition(() => router.refresh())
  }

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="font-serif text-green-800 mb-4">Upload Photo</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Photo</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              required
              className="block w-full text-sm text-green-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Caption <span className="text-green-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {uploadError && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">{uploadError}</p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Upload size={15} />
                Upload
              </>
            )}
          </button>
        </form>
      </div>

      {/* Photo grid */}
      {photos.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-green-400">
          No photos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group rounded-2xl overflow-hidden bg-green-50 aspect-square">
              <Image
                src={photo.url}
                alt={photo.caption ?? 'Gallery photo'}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {photo.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/40 px-2 py-1 text-white text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.caption}
                </div>
              )}
              <button
                onClick={() => handleDelete(photo)}
                disabled={deleting === photo.id || isPending}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                aria-label="Delete photo"
              >
                {deleting === photo.id ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Trash2 size={12} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
