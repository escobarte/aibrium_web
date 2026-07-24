'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Catalogue } from '@/lib/catalogues'

// Swipe thresholds: act on a decisive drag (distance) or a quick flick
// (velocity); anything smaller snaps back so an accidental nudge never flips.
const SWIPE_DISTANCE = 80 // px
const SWIPE_VELOCITY = 500 // px/s

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
  const open = catalogue !== null
  const reduceMotion = useReducedMotion()

  const goPrev = useCallback(() => {
    if (!catalogue) return
    onIndexChange((index - 1 + catalogue.images.length) % catalogue.images.length)
  }, [catalogue, index, onIndexChange])

  const goNext = useCallback(() => {
    if (!catalogue) return
    onIndexChange((index + 1) % catalogue.images.length)
  }, [catalogue, index, onIndexChange])

  // Touch/pointer swipe. dragDirectionLock keeps a gesture on one axis, so the
  // horizontal (navigate) and vertical (close) intents never fight; we still
  // compare offsets to resolve the dominant axis before acting.
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info
      const horizontal = Math.abs(offset.x) > Math.abs(offset.y)

      if (horizontal) {
        if (offset.x <= -SWIPE_DISTANCE || velocity.x <= -SWIPE_VELOCITY) {
          goNext() // swipe left → next
        } else if (offset.x >= SWIPE_DISTANCE || velocity.x >= SWIPE_VELOCITY) {
          goPrev() // swipe right → previous
        }
        // else: below threshold → dragSnapToOrigin returns it
      } else if (offset.y >= SWIPE_DISTANCE || velocity.y >= SWIPE_VELOCITY) {
        onClose() // swipe down → close (swipe up just snaps back)
      }
    },
    [goNext, goPrev, onClose],
  )

  // Fire Plausible on open (once per catalogue open).
  useEffect(() => {
    if (!open || !catalogue) return
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('Lightbox Open', { props: { catalogue: catalogue.name } })
    }
  }, [open, catalogue])

  // Keyboard nav + focus management.
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)

    // Focus trap: keep focus inside the modal; lock body scroll.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, goPrev, goNext])

  return (
    <AnimatePresence>
      {open && catalogue && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${catalogue.name} gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            aria-label="Close gallery"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 text-cream transition-colors hover:text-gold"
          >
            <X strokeWidth={1.5} className="h-7 w-7" />
          </button>

          {/* Prev */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-2 z-10 text-cream transition-colors hover:text-gold sm:left-6"
          >
            <ChevronLeft strokeWidth={1.5} className="h-9 w-9" />
          </button>

          {/* Image — draggable for touch swipe (left/right navigate, down closes) */}
          <motion.div
            className="relative max-h-[85vh] w-auto max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
            drag
            dragDirectionLock
            dragSnapToOrigin
            dragElastic={0.18}
            // reduced motion: no snap-back animation, gesture still works
            dragMomentum={!reduceMotion}
            transition={reduceMotion ? { duration: 0 } : undefined}
            onDragEnd={handleDragEnd}
            // touch-action none stops the browser from scrolling the page
            // behind the lightbox while a swipe is in progress
            style={{ touchAction: 'none' }}
          >
            <Image
              key={catalogue.images[index].src}
              src={catalogue.images[index].src}
              alt={catalogue.images[index].alt}
              width={catalogue.images[index].width}
              height={catalogue.images[index].height}
              draggable={false}
              // Real client photography — served as-is (no resize/recompress/
              // convert). width/height above prevent layout shift.
              unoptimized
              className="max-h-[85vh] w-auto object-contain"
            />
            <p className="mt-3 text-center font-body text-[13px] text-[#B9B2A6]">
              {catalogue.name} · {index + 1} / {catalogue.images.length}
            </p>
          </motion.div>

          {/* Next */}
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-2 z-10 text-cream transition-colors hover:text-gold sm:right-6"
          >
            <ChevronRight strokeWidth={1.5} className="h-9 w-9" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
