import { createClient } from '@/lib/supabase/server'
import GuestsTable from './GuestsTable'

export const revalidate = 0

interface Rsvp {
  id: string
  name: string
  email: string
  attending: boolean
  meal_preference: string | null
  message: string | null
  created_at: string
}

export default async function GuestsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false })

  const rsvps: Rsvp[] = data ?? []

  return (
    <div>
      <h1 className="text-2xl font-serif text-green-800 mb-2">Guest RSVPs</h1>
      <p className="text-sm text-green-400 mb-8">
        {rsvps.length} submission{rsvps.length !== 1 ? 's' : ''} total
      </p>
      <GuestsTable rsvps={rsvps} />
    </div>
  )
}
