'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Catalogue } from '@/lib/catalogues'

type LightboxProps = {
  catalogue: Catalogue | null
  index: number
  onClose: () => void
  onIndexChange: (next: number) => void
}

export function Lightbox({
  catalogue,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  // Mirror the current index in a ref so the keyboard handler can read the
  // latest value without re-registering the listener on every navigation.
  const indexRef = useRef(index)
  indexRef.current = index

  const open = catalogue !== null
  const reduceMotion = useReducedMotion()
  const count = catalogue?.images.length ?? 0

  // Scroll the track to a slide by index (clamped — no infinite loop, first and
  // last simply stop). Instant under reduced motion, otherwise smooth.
  const scrollToIndex = useCallback(
    (i: number, behavior: ScrollBehavior) => {
      const track = trackRef.current
      if (!track || count === 0) return
      const clamped = Math.max(0, Math.min(i, count - 1))
      track.scrollTo({ left: clamped * track.clientWidth, behavior })
    },
    [count],
  )

  const step = useCallback(
    (delta: number) => {
      scrollToIndex(indexRef.current + delta, reduceMotion ? 'auto' : 'smooth')
    },
    [scrollToIndex, reduceMotion],
  )

  // Fire Plausible on open (once per catalogue open).
  useEffect(() => {
    if (!open || !catalogue) return
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('Lightbox Open', { props: { catalogue: catalogue.name } })
    }
  }, [open, catalogue])

  // Jump to the initial slide (no animation) whenever a gallery opens.
  useEffect(() => {
    if (!open) return
    const track = trackRef.current
    if (!track) return
    const start = indexRef.current
    requestAnimationFrame(() => {
      track.scrollTo({ left: start * track.clientWidth, behavior: 'auto' })
    })
  }, [open, catalogue])

  // Sync the active index from scroll position via IntersectionObserver on the
  // slides — the centered slide (>=60% visible) becomes active. No scroll math.
  useEffect(() => {
    if (!open) return
    const track = trackRef.current
    if (!track) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(i)) onIndexChange(i)
          }
        }
      },
      { root: track, threshold: 0.6 },
    )

    slideRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [open, catalogue, onIndexChange])

  // Keyboard: Esc closes, Left/Right navigate. Focus the close button on open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      }
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, step])

  // Lock body scroll while open and restore the exact scroll position on close.
  useEffect(() => {
    if (!open) return
    const body = document.body
    const scrollY = window.scrollY
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      window.scrollTo(0, scrollY)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && catalogue && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${catalogue.name} gallery`}
          // Fully opaque ink backdrop, true fullscreen (100dvh with 100vh
          // fallback via h-screen), above the header (z-50).
          className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-ink"
          style={{ height: '100dvh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            aria-label="Close gallery"
            onClick={onClose}
            className="absolute z-20 text-cream transition-colors hover:text-gold"
            style={{
              top: 'calc(env(safe-area-inset-top) + 1rem)',
              right: 'calc(env(safe-area-inset-right) + 1rem)',
            }}
          >
            <X strokeWidth={1.5} className="h-7 w-7" />
          </button>

          {/* Prev — desktop only (touch users swipe) */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => step(-1)}
            className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 text-cream transition-colors hover:text-gold lg:block"
          >
            <ChevronLeft strokeWidth={1.5} className="h-9 w-9" />
          </button>

          {/* Scroll-snap track */}
          <div
            ref={trackRef}
            className="no-scrollbar flex h-full w-full snap-x snap-mandatory touch-pan-x overflow-x-auto overscroll-contain"
          >
            {catalogue.images.map((img, i) => {
              // Eager-load only the active slide and its immediate neighbours.
              const near = Math.abs(i - index) <= 1
              return (
                <div
                  key={img.src}
                  data-index={i}
                  ref={(el) => {
                    slideRefs.current[i] = el
                  }}
                  className="flex h-full w-full flex-none snap-center items-center justify-center p-4"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    draggable={false}
                    loading={near ? 'eager' : 'lazy'}
                    // Real client photography — served as-is (no resize/
                    // recompress/convert). width/height prevent layout shift.
                    unoptimized
                    className="h-auto max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              )
            })}
          </div>

          {/* Next — desktop only */}
          <button
            type="button"
            aria-label="Next image"
            onClick={() => step(1)}
            className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 text-cream transition-colors hover:text-gold lg:block"
          >
            <ChevronRight strokeWidth={1.5} className="h-9 w-9" />
          </button>

          {/* Counter — small letter-spaced uppercase gold on the dark backdrop */}
          <p
            className="absolute inset-x-0 z-20 text-center font-label text-[12px] font-medium uppercase tracking-[0.22em] text-gold"
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
