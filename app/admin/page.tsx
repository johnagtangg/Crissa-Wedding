import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Users, CheckCircle, XCircle, ArrowRight } from 'lucide-react'

export const revalidate = 30

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: rsvps } = await supabase
    .from('rsvps')
    .select('attending, created_at')

  const total = rsvps?.length ?? 0
  const attending = rsvps?.filter((r) => r.attending).length ?? 0
  const declining = rsvps?.filter((r) => !r.attending).length ?? 0

  const stats = [
    { label: 'Total RSVPs', value: total, icon: Users, color: 'text-green-700', bg: 'bg-green-50' },
    { label: 'Attending', value: attending, icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Declining', value: declining, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-serif text-green-800 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-6 flex items-center gap-4`}>
            <Icon className={color} size={28} />
            <div>
              <p className="text-3xl font-serif font-bold text-green-900">{value}</p>
              <p className="text-sm text-green-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/guests"
          className="bg-white rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow group"
        >
          <div>
            <h3 className="font-serif text-green-800 mb-1">Manage Guests</h3>
            <p className="text-sm text-green-400">View and manage all RSVP submissions</p>
          </div>
          <ArrowRight className="text-green-400 group-hover:text-green-600 transition-colors" size={20} />
        </Link>
        <Link
          href="/admin/gallery"
          className="bg-white rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow group"
        >
          <div>
            <h3 className="font-serif text-green-800 mb-1">Manage Gallery</h3>
            <p className="text-sm text-green-400">Upload and delete wedding photos</p>
          </div>
          <ArrowRight className="text-green-400 group-hover:text-green-600 transition-colors" size={20} />
        </Link>
      </div>
    </div>
  )
}
