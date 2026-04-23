import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import GuestCamera from './GuestCamera'

interface GuestPhoto {
  id: string
  storage_path: string
  uploaded_at: string
}

export const metadata = {
  title: 'Capture the Day',
}

export default async function WeddingDayPage() {
  const supabase = await createClient()

  const { data: photos } = await supabase
    .from('guest_photos')
    .select('id, storage_path, uploaded_at')
    .order('uploaded_at', { ascending: false })

  const photosWithUrls = (photos ?? []).map((photo: GuestPhoto) => {
    const { data } = supabase.storage
      .from('guest-photos')
      .getPublicUrl(photo.storage_path)
    return { ...photo, url: data.publicUrl }
  })

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-green-50 py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-green-800 mb-3">
          Capture the Day
        </h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8 text-sm md:text-base">
          Snap a photo and share your moment with us — your photos will appear
          here in real time for everyone to enjoy.
        </p>
        <GuestCamera />
      </section>

      {/* Guest photo grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {photosWithUrls.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-16">
            No photos yet — be the first to capture a moment!
          </p>
        ) : (
          <>
            <h2 className="text-xl font-serif text-green-700 mb-6 text-center">
              Guest Moments
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {photosWithUrls.map((photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid mb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={photo.url}
                    alt="Guest photo"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
