'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type RsvpState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitRsvp(
  prevState: RsvpState,
  formData: FormData
): Promise<RsvpState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const attending = formData.get('attending') === 'yes'
  const meal_preference = formData.get('meal_preference')?.toString().trim() ?? null
  const message = formData.get('message')?.toString().trim() ?? null

  if (!name || !email) {
    return { status: 'error', message: 'Name and email are required.' }
  }

  // Basic email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('rsvps').insert({
    name,
    email,
    attending,
    meal_preference: attending ? meal_preference : null,
    message,
  })

  if (error) {
    console.error('RSVP insert error:', error.message)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  revalidatePath('/admin/guests')
  return { status: 'success', message: 'Thank you! Your RSVP has been received.' }
}
