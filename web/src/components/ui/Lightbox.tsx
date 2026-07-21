'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
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
  const open = catalogue !== null

  const goPrev = useCallback(() => {
    if (!catalogue) return
    onIndexChange((index - 1 + catalogue.images.length) % catalogue.images.length)
  }, [catalogue, index, onIndexChange])

  const goNext = useCallback(() => {
    if (!catalogue) return
    onIndexChange((index + 1) % catalogue.images.length)
  }, [catalogue, index, onIndexChange])

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

          {/* Image */}
          <div
            className="relative max-h-[85vh] w-auto max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={catalogue.images[index]}
              src={catalogue.images[index]}
              alt={`${catalogue.name} — visual ${index + 1}`}
              width={1000}
              height={1250}
              // TODO: remove unoptimized once real /public images replace placeholders.
              unoptimized
              className="max-h-[85vh] w-auto object-contain"
            />
            <p className="mt-3 text-center font-body text-[13px] text-[#B9B2A6]">
              {catalogue.name} · {index + 1} / {catalogue.images.length}
            </p>
          </div>

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
