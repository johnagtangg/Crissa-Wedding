import Image from 'next/image'

const photos = [
  '/images/Wedding Day.jpg',
  '/images/Wedding Day-2.jpg',
  '/images/Wedding Day-3.jpg',
  '/images/Wedding Day-4.jpg',
  '/images/Wedding Day-5.jpg',
  '/images/Wedding Day-6.jpg',
  '/images/Wedding Day-7.jpg',
  '/images/Wedding Day-8.jpg',
  '/images/Wedding Day-9.jpg',
  '/images/Wedding Day-10.jpg',
  '/images/Wedding Day-11.jpg',
  '/images/Wedding Day-12.jpg',
  '/images/Wedding Day-13.jpg',
  '/images/Wedding Day-14.jpg',
  '/images/Wedding Day-15.jpg',
  '/images/Wedding Day-16.jpg',
  '/images/Wedding Day-17.jpg',
  '/images/Wedding Day-18.jpg',
  '/images/Wedding Day-19.jpg',
  '/images/Wedding Day-20.jpg',
  '/images/Wedding Day-21.jpg',
  '/images/Wedding Day-22.jpg',
  '/images/Wedding Day-23.jpg',
  '/images/Wedding Day-24.jpg',
  '/images/Wedding Day-25.jpg',
  '/images/Wedding Day-26.jpg',
  '/images/Wedding Day-27.jpg',
  '/images/Wedding Day-28.jpg',
  '/images/Wedding Day-29.jpg',
  '/images/Wedding Day-30.jpg',
  '/images/Wedding Day-31.jpg',
  '/images/Wedding Day-32.jpg',
  '/images/Wedding Day-33.jpg',
  '/images/Wedding Day-34.jpg',
  '/images/Wedding Day-35.jpg',
  '/images/Wedding Day-36.jpg',
  '/images/Wedding Day-37.jpg',
  '/images/Wedding Day-38.jpg',
  '/images/Wedding Day-39.jpg',
  '/images/Wedding Day-40.jpg',
  '/images/Wedding Day-41.jpg',
  '/images/Wedding Day-42.jpg',
  '/images/Wedding Day-43.jpg',
  '/images/Wedding Day-44.jpg',
  '/images/Wedding Day-45.jpg',
  '/images/Wedding Day-46.jpg',
  '/images/Wedding Day-47.jpg',
  '/images/Wedding Day-48.jpg',
  '/images/Wedding Day-49.jpg',
  '/images/Wedding Day-50.jpg',
  '/images/Wedding Day-51.jpg',
  '/images/Wedding Day-52.jpg',
  '/images/Wedding Day-53.jpg',
  '/images/Wedding Day-54.jpg',
  '/images/Wedding Day-55.jpg',
  '/images/Wedding Day-56.jpg',
  '/images/Wedding Day-57.jpg',
  '/images/Wedding Day-58.jpg',
  '/images/Wedding Day-59.jpg',
  '/images/Wedding Day-60.jpg',
  '/images/Wedding Day-61.jpg',
  '/images/Wedding Day-62.jpg',
  '/images/Wedding Day-63.jpg',
  '/images/Wedding Day-64.jpg',
  '/images/Wedding Day-65.jpg',
  '/images/Wedding Day-66.jpg',
  '/images/Wedding Day-67.jpg',
  '/images/Wedding Day-68.jpg',
  '/images/Wedding Day-69.jpg',
  '/images/Wedding Day-70.jpg',
  '/images/Wedding Day-71.jpg',
  '/images/Wedding Day-72.jpg',
  '/images/Wedding Day-73.jpg',
  '/images/Wedding Day-74.jpg',
  '/images/Wedding Day-75.jpg',
  '/images/Wedding Day-76.jpg',
  '/images/Wedding Day-77.jpg',
  '/images/Wedding Day-78.jpg',
  '/images/Wedding Day-79.jpg',
  '/images/Wedding Day-80.jpg',
]

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <p className="text-green-500 uppercase tracking-[0.3em] text-xs font-medium mb-3">
          Memories
        </p>
        <h1 className="text-4xl font-serif text-green-800">Our Gallery</h1>
        <p className="text-green-500 mt-3 text-sm">A glimpse into our journey together</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((src, i) => (
          <div
            key={src}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm group cursor-pointer"
          >
            <Image
              src={src}
              alt={`Wedding photo ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
