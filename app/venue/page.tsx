'use client'

import dynamic from 'next/dynamic'
import { MapPin, Clock, Phone } from 'lucide-react'

// Dynamically import Leaflet map to avoid SSR issues
const VenueMap = dynamic(() => import('@/components/VenueMap'), { ssr: false })

export default function VenuePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <p className="text-green-500 uppercase tracking-[0.3em] text-xs font-medium mb-3">
          Find Us
        </p>
        <h1 className="text-4xl font-serif text-green-800">The Venue</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Venue details */}
        <div className="space-y-6">
          <div className="bg-green-50 rounded-2xl p-6">
            <h2 className="font-serif text-xl text-green-800 mb-4">Grand Ballroom</h2>
            <div className="space-y-3 text-sm text-green-700">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-green-600 mt-0.5">
                    Jl. Contoh No. 123<br />
                    Jakarta Selatan, DKI Jakarta<br />
                    Indonesia 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Event Time</p>
                  <p className="text-green-600 mt-0.5">May 23, 2026 · 09:00 AM – 02:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Contact (Venue)</p>
                  <p className="text-green-600 mt-0.5">+62 21 1234 5678</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-serif text-lg text-green-800 mb-3">Parking & Transport</h3>
            <ul className="text-sm text-green-600 space-y-2">
              <li>🚗 Free parking available on-site for all guests</li>
              <li>🚕 Grab / Gojek drop-off available at main entrance</li>
              <li>🚇 Nearest MRT: Blok M Station (10 min walk)</li>
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow h-80 md:h-auto min-h-[320px] bg-green-50">
          <VenueMap />
        </div>
      </div>

      <div className="bg-green-800 text-white rounded-2xl p-8 text-center">
        <p className="font-serif text-xl mb-2">We look forward to seeing you!</p>
        <p className="text-green-200 text-sm">
          If you need assistance finding the venue, please reach out to us.
        </p>
      </div>
    </div>
  )
}
