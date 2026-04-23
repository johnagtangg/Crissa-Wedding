import Link from 'next/link'
import Image from 'next/image'
import Countdown from '@/components/Countdown'
import HeroSlideshow from '@/components/ImageCarousel'
import { Heart, CalendarDays, MapPin, Clock } from 'lucide-react'

const couplePhotos = [
  { src: '/images/Wedding Day.jpg',    alt: 'Bibing & Keno' },
  { src: '/images/Wedding Day-21.jpg', alt: 'Bibing & Keno' },
  { src: '/images/Wedding Day-32.jpg', alt: 'Bibing & Keno' },
  { src: '/images/Wedding Day-34.jpg', alt: 'Bibing & Keno' },
  { src: '/images/Wedding Day-41.jpg', alt: 'Bibing & Keno' },
  { src: '/images/Wedding Day-46.jpg', alt: 'Bibing & Keno' },
  { src: '/images/Wedding Day-62.jpg', alt: 'Bibing & Keno' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0 z-0">
          <HeroSlideshow images={couplePhotos} interval={5000} />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

        {/* Text content */}
        <div className="relative z-20 text-center px-4 max-w-2xl mx-auto">
          <p className="text-white/70 uppercase tracking-[0.3em] text-xs font-medium mb-4">
            We&apos;re getting married
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-2">
            Bibing
          </h1>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-px w-12 bg-white/40" />
            <Heart className="text-white/70" size={18} fill="currentColor" />
            <span className="h-px w-12 bg-white/40" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            Keno
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 text-sm mb-10">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              May 23, 2026
            </span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              Santo Niño Diocesan Shrine, Libertad Butuan City
            </span>
          </div>

          <Countdown />

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/rsvp"
              className="bg-white hover:bg-white/90 text-green-900 px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-colors shadow"
            >
              RSVP Now
            </Link>
            <Link
              href="/about"
              className="border border-white/70 text-white hover:bg-white/10 px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Quick info cards */}
      <section className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-green-50 rounded-2xl p-8">
          <CalendarDays className="mx-auto text-green-500 mb-3" size={28} />
          <h3 className="font-serif text-lg text-green-800 mb-1">The Date</h3>
          <p className="text-sm text-green-600">May 23, 2026</p>
          <p className="text-xs text-green-400 mt-1">09:00 AM</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-8">
          <MapPin className="mx-auto text-green-500 mb-3" size={28} />
          <h3 className="font-serif text-lg text-green-800 mb-1">The Venue</h3>
          <p className="text-sm text-green-600">Santo Niño Diocesan Shrine, Libertad Butuan City</p>
          <p className="text-xs text-green-400 mt-1">09:00 AM</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-8">
          <Heart className="mx-auto text-green-500 mb-3" size={28} fill="currentColor" />
          <h3 className="font-serif text-lg text-green-800 mb-1">RSVP By</h3>
          <p className="text-sm text-green-600">May 16, 2026</p>
          <p className="text-xs text-green-400 mt-1">Please confirm attendance</p>
        </div>
      </section>

      {/* Our Story — Quote Card */}
      <section className="w-full bg-green-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">

          {/* Icon */}
          <Heart className="text-green-300 mb-6" size={28} fill="currentColor" />

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-serif text-green-800 italic leading-relaxed mb-6">
            &ldquo;From the moment we met, we knew &mdash; some stories are simply meant to be told together.&rdquo;
          </blockquote>

          {/* Attribution */}
          <p className="text-green-500 uppercase tracking-[0.25em] text-xs font-medium mb-8">
            — Bibing &amp; Keno
          </p>

          {/* Circular photo */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-green-300 ring-offset-4 ring-offset-green-50 mb-6 flex-shrink-0">
            <Image
              src="/images/Wedding Day-62.jpg"
              alt="Bibing & Keno"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>

          {/* Link */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-green-700 font-medium text-sm border-b border-green-400 pb-0.5 hover:text-green-500 hover:border-green-300 transition-colors"
          >
            Meet Bibing &amp; Keno
            <span aria-hidden="true">→</span>
          </Link>

        </div>
      </section>

      {/* Venue Teaser */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">

          {/* Photo */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
              src="/images/Sto-Nino-Shrine-Butuan.jpg"
                alt="Santo Niño Diocesan Shrine"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-green-500 uppercase tracking-[0.3em] text-xs font-medium mb-3">
              The Venue
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-green-800 mb-6 leading-snug">
              Santo Niño Diocesan Shrine
            </h2>

            <div className="space-y-3 text-sm text-green-700 mb-6">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>Libertad, Butuan City, Agusan del Norte</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Clock size={16} className="text-green-500 flex-shrink-0" />
                <span>May 23, 2026 &middot; 09:00 AM</span>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/Santo+Niño+Diocesan+Shrine+Libertad+Butuan+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors shadow mb-6"
            >
              <MapPin size={14} />
              Get Directions
            </a>

            <div className="border-t border-green-100 pt-5 mt-2">
              <Link
                href="/venue"
                className="inline-flex items-center gap-2 text-green-700 font-medium text-sm border-b border-green-400 pb-0.5 hover:text-green-500 hover:border-green-300 transition-colors"
              >
                See Full Venue Info
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
