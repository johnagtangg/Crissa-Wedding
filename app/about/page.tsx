import Image from 'next/image'
import { Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Page header */}
      <div className="text-center mb-14">
        <p className="text-green-500 uppercase tracking-[0.3em] text-xs font-medium mb-3">
          Our Story
        </p>
        <h1 className="text-4xl font-serif text-green-800">Bibing &amp; Partner</h1>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="h-px w-16 bg-green-200" />
          <Heart className="text-green-400" size={16} fill="currentColor" />
          <span className="h-px w-16 bg-green-200" />
        </div>
      </div>

      {/* Story sections */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 rounded-2xl aspect-square overflow-hidden flex-shrink-0">
            <Image
              src="/images/Wedding Day.jpg"
              alt="How We Met"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-serif text-green-700 mb-3">How We Met</h2>
            <p className="text-green-800 leading-relaxed">
              It was a regular Tuesday when fate decided to intervene. Bibing and Partner met at a mutual friend's gathering, and from the very first conversation, something felt different — a warmth that was impossible to ignore.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
          <div className="w-full md:w-1/3 rounded-2xl aspect-square overflow-hidden flex-shrink-0">
            <Image
              src="/images/Wedding Day-2.jpg"
              alt="Growing Together"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-serif text-green-700 mb-3">Growing Together</h2>
            <p className="text-green-800 leading-relaxed">
              Over coffee, long walks, and countless laughs, we built a friendship that quickly blossomed into something deeper. Every shared adventure became a cherished memory, and every challenge made us stronger together.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 rounded-2xl aspect-square overflow-hidden flex-shrink-0">
            <Image
              src="/images/Wedding Day-3.jpg"
              alt="The Proposal"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-serif text-green-700 mb-3">The Proposal</h2>
            <p className="text-green-800 leading-relaxed">
              On a beautiful evening under the stars, Partner got down on one knee and asked the question that would change everything. Through happy tears and a resounding "Yes!", a new chapter began — one we're thrilled to share with all of you.
            </p>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-16 bg-green-50 rounded-2xl p-10 text-center">
        <p className="text-2xl font-serif text-green-700 italic leading-relaxed">
          "A great marriage is not when the 'perfect couple' comes together. It is when an imperfect couple learns to enjoy their differences."
        </p>
        <p className="text-sm text-green-400 mt-4">— Dave Meurer</p>
      </div>
    </div>
  )
}
