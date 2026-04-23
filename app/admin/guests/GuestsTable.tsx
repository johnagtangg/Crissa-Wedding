'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2, CheckCircle, XCircle } from 'lucide-react'

interface Rsvp {
  id: string
  name: string
  email: string
  attending: boolean
  meal_preference: string | null
  message: string | null
  created_at: string
}

export default function GuestsTable({ rsvps }: { rsvps: Rsvp[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Delete this RSVP entry?')) return
    setDeleting(id)
    const supabase = createClient()
    await supabase.from('rsvps').delete().eq('id', id)
    setDeleting(null)
    startTransition(() => router.refresh())
  }

  if (rsvps.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center text-green-400">
        No RSVPs received yet.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Attending</th>
              <th className="text-left px-5 py-3">Meal</th>
              <th className="text-left px-5 py-3">Message</th>
              <th className="text-left px-5 py-3">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {rsvps.map((rsvp) => (
              <tr key={rsvp.id} className="hover:bg-green-50/40 transition-colors">
                <td className="px-5 py-3 font-medium text-green-900">{rsvp.name}</td>
                <td className="px-5 py-3 text-green-600">{rsvp.email}</td>
                <td className="px-5 py-3">
                  {rsvp.attending ? (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle size={14} /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400">
                      <XCircle size={14} /> No
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-green-500">{rsvp.meal_preference ?? '—'}</td>
                <td className="px-5 py-3 text-green-500 max-w-[180px] truncate">
                  {rsvp.message ?? '—'}
                </td>
                <td className="px-5 py-3 text-green-400 text-xs whitespace-nowrap">
                  {new Date(rsvp.created_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => handleDelete(rsvp.id)}
                    disabled={deleting === rsvp.id || isPending}
                    className="text-red-400 hover:text-red-600 disabled:opacity-40 transition-colors"
                    aria-label="Delete RSVP"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
