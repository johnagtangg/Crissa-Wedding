'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

interface SlideshowImage {
  src: string
  alt: string
}

interface HeroSlideshowProps {
  images: SlideshowImage[]
  interval?: number
}

export default function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const timer = setInterval(advance, interval)
    return () => clearInterval(timer)
  }, [advance, interval])

  return (
    <>
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
    </>
  )
}
