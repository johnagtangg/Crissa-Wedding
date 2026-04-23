'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Camera, Check, X, Loader2 } from 'lucide-react'

export default function GuestCamera() {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setError('')
    setSuccess(false)
    // Reset input so the same file can be re-selected after retake
    e.target.value = ''
  }

  function handleRetake() {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFile(null)
    setError('')
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setError('')

    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const supabase = createClient()

    const { error: storageError } = await supabase.storage
      .from('guest-photos')
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (storageError) {
      setError(storageError.message)
      setUploading(false)
      return
    }

    const { error: dbError } = await supabase
      .from('guest_photos')
      .insert({ storage_path: path })

    if (dbError) {
      setError(dbError.message)
      await supabase.storage.from('guest-photos').remove([path])
      setUploading(false)
      return
    }

    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFile(null)
    setUploading(false)
    setSuccess(true)

    startTransition(() => {
      router.refresh()
    })

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <>
      {/* Upload trigger */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium px-6 py-3 rounded-full shadow-md transition-colors text-base"
        >
          <Camera size={20} />
          Take a Photo
        </button>

        {success && (
          <p className="text-green-600 text-sm font-medium animate-pulse">
            Photo uploaded! ✓
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Preview overlay */}
      {preview && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {error && (
            <p className="mt-3 text-red-400 text-sm text-center max-w-xs">
              {error}
            </p>
          )}

          <div className="flex gap-6 mt-6">
            {/* Retake */}
            <button
              onClick={handleRetake}
              disabled={uploading}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium px-5 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              <X size={18} />
              Retake
            </button>

            {/* Upload */}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Check size={18} />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
