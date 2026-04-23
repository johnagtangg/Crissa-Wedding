'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Update this to the actual wedding date
const WEDDING_DATE = new Date('2026-05-23T09:00:00')

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    function calculate() {
      const now = new Date()
      const diff = WEDDING_DATE.getTime() - now.getTime()
      if (diff <= 0) return null
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }

    setTimeLeft(calculate())
    const timer = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return (
      <p className="text-green-700 text-lg font-serif">
        🎉 Today is the big day!
      </p>
    )
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-white/80 rounded-2xl px-5 py-4 shadow min-w-[72px]"
        >
          <span className="text-4xl font-serif font-bold text-green-700">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs text-green-500 uppercase tracking-widest mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
