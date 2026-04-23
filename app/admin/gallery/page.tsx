import { createClient } from '@/lib/supabase/server'
import GalleryManager from './GalleryManager'

export const revalidate = 0

interface GalleryPhoto {
  id: string
  storage_path: string
  caption: string | null
  uploaded_at: string
}

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('uploaded_at', { ascending: false })

  const photos: GalleryPhoto[] = data ?? []

  // Build public URLs server-side
  const photosWithUrls = photos.map((p) => ({
    ...p,
    url: supabase.storage.from('gallery').getPublicUrl(p.storage_path).data.publicUrl,
  }))

  return (
    <div>
      <h1 className="text-2xl font-serif text-green-800 mb-2">Gallery</h1>
      <p className="text-sm text-green-400 mb-8">Upload wedding photos to the public gallery.</p>
      <GalleryManager photos={photosWithUrls} />
    </div>
  )
}
