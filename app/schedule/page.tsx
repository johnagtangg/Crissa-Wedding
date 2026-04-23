import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'

interface ScheduleEvent {
  id: string
  title: string
  description: string | null
  time: string
  location: string | null
  sort_order: number
}

export const revalidate = 60

export default async function SchedulePage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('schedule_events')
    .select('*')
    .order('sort_order', { ascending: true })

  const scheduleEvents: ScheduleEvent[] = events ?? []

  // Fallback static data if Supabase not yet configured
  const displayEvents =
    scheduleEvents.length > 0
      ? scheduleEvents
      : [
          { id: '1', title: 'Guest Arrival', description: 'Guests are welcomed and seated.', time: '08:30 AM', location: 'Grand Ballroom Lobby', sort_order: 1 },
          { id: '2', title: 'Akad Nikah (Wedding Ceremony)', description: 'The sacred wedding ceremony takes place.', time: '09:00 AM', location: 'Grand Ballroom', sort_order: 2 },
          { id: '3', title: 'Photography Session', description: 'Family and couple photo session.', time: '10:30 AM', location: 'Garden Area', sort_order: 3 },
          { id: '4', title: 'Wedding Reception', description: 'Lunch reception — please enjoy the food and celebrate with us!', time: '11:00 AM', location: 'Grand Ballroom', sort_order: 4 },
          { id: '5', title: 'Live Music & Entertainment', description: 'Enjoy live music performances while you dine.', time: '12:00 PM', location: 'Grand Ballroom Stage', sort_order: 5 },
          { id: '6', title: 'Farewell', description: 'Thank you for celebrating with us!', time: '02:00 PM', location: 'Grand Ballroom Lobby', sort_order: 6 },
        ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <p className="text-green-500 uppercase tracking-[0.3em] text-xs font-medium mb-3">
          May 23, 2026
        </p>
        <h1 className="text-4xl font-serif text-green-800">Wedding Schedule</h1>
        <p className="text-green-500 mt-3 text-sm">Grand Ballroom · Jakarta, Indonesia</p>
      </div>

      {/* Banner photo */}
      <div className="rounded-2xl overflow-hidden mb-14 shadow-sm">
        <Image
          src="/images/Wedding Day-7.jpg"
          alt="Wedding banner"
          width={1200}
          height={500}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Timeline */}
      <ol className="relative border-l-2 border-green-200 space-y-10 pl-8">
        {displayEvents.map((event, index) => (
          <li key={event.id} className="relative">
            {/* Dot */}
            <span
              className={`absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                index === 0
                  ? 'bg-green-600 border-green-600'
                  : 'bg-white border-green-300'
              }`}
            >
              {index === 0 && (
                <span className="h-2 w-2 rounded-full bg-white" />
              )}
            </span>

            <div className="bg-green-50 rounded-2xl p-6">
              <div className="flex flex-wrap gap-3 text-xs text-green-500 mb-2">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {event.time}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {event.location}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-lg text-green-800 mb-1">{event.title}</h2>
              {event.description && (
                <p className="text-sm text-green-600 leading-relaxed">{event.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
