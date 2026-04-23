'use client'

import { useActionState, useState } from 'react'
import { submitRsvp, RsvpState } from './actions'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

const initialState: RsvpState = { status: 'idle', message: '' }

export default function RsvpPage() {
  const [state, formAction, isPending] = useActionState(submitRsvp, initialState)
  const [attending, setAttending] = useState<string>('yes')

  if (state.status === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={52} />
        <h2 className="text-3xl font-serif text-green-800 mb-3">Thank You!</h2>
        <p className="text-green-600">{state.message}</p>
        <p className="text-sm text-green-400 mt-4">
          We can&apos;t wait to celebrate with you on May 23, 2026!
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-green-500 uppercase tracking-[0.3em] text-xs font-medium mb-3">
          Kindly Reply By May 16, 2026
        </p>
        <h1 className="text-4xl font-serif text-green-800">RSVP</h1>
        <p className="text-green-500 mt-3 text-sm">
          Please let us know if you can make it to our special day.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-green-900 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-green-900 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Attending */}
        <div>
          <p className="block text-sm font-medium text-green-700 mb-2">
            Will you attend? <span className="text-red-400">*</span>
          </p>
          <div className="flex gap-3">
            {['yes', 'no'].map((val) => (
              <label
                key={val}
                className={`flex-1 flex items-center justify-center gap-2 border-2 rounded-xl py-3 cursor-pointer text-sm font-medium transition-colors ${
                  attending === val
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-green-200 text-green-600 hover:border-green-400'
                }`}
              >
                <input
                  type="radio"
                  name="attending"
                  value={val}
                  className="sr-only"
                  checked={attending === val}
                  onChange={() => setAttending(val)}
                />
                {val === 'yes' ? '🎉 Joyfully Accept' : '😔 Regretfully Decline'}
              </label>
            ))}
          </div>
        </div>

        {/* Meal preference — only shown when attending */}
        {attending === 'yes' && (
          <div>
            <label htmlFor="meal_preference" className="block text-sm font-medium text-green-700 mb-1">
              Meal Preference
            </label>
            <select
              id="meal_preference"
              name="meal_preference"
              className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
              <option value="">No preference</option>
              <option value="standard">Standard</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="halal">Halal</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-green-700 mb-1">
            Message for the Couple <span className="text-green-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Write a heartfelt message..."
            className="w-full border border-green-200 rounded-xl px-4 py-3 text-sm text-green-900 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          />
        </div>

        {/* Error */}
        {state.status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl px-4 py-3 text-sm">
            <XCircle size={16} className="flex-shrink-0" />
            {state.message}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-full text-sm font-medium tracking-wide transition-colors shadow flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting…
            </>
          ) : (
            'Send My RSVP'
          )}
        </button>
      </form>
    </div>
  )
}
