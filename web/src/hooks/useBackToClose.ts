'use client'

import { useEffect, useRef } from 'react'

// Coordinated Back-button-to-close for overlays (lightbox, mobile menu, Calendly
// popup). The Android/browser Back button closes the open overlay instead of
// leaving the site.
//
// Why a shared coordinator rather than one listener per overlay:
// overlapping overlays hand off to each other — tapping a Calendly CTA inside
// the mobile menu closes the menu AND opens the popup in the same tick. If each
// overlay pushed/consumed its own history entry, the menu's history.back() would
// fire a popstate that the freshly-opened popup's listener catches and closes it
// instantly (the "BOOK A CALL does nothing on mobile" bug). Instead we keep ONE
// shared history entry (ref-counted) and defer the consuming history.back() to a
// microtask, so a simultaneous open cancels it — no stray popstate, no race.

let openCount = 0
let entryLive = false // our single marker entry is currently on the stack
let bound = false
const closers = new Set<() => void>()

function onGlobalPop() {
  // Back was pressed: our marker entry is already gone from the stack.
  entryLive = false
  openCount = 0
  const current = Array.from(closers)
  closers.clear()
  current.forEach((close) => close())
}

export function useBackToClose(isOpen: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return

    const close = () => onCloseRef.current()
    closers.add(close)
    openCount += 1

    if (!entryLive) {
      // Stop the browser from restoring scroll on our synthetic back(), which
      // would fight the overlay's own scroll-position restore.
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.history.pushState({ __backToClose: true }, '')
      entryLive = true
      if (!bound) {
        window.addEventListener('popstate', onGlobalPop)
        bound = true
      }
    }

    return () => {
      closers.delete(close)
      openCount = Math.max(0, openCount - 1)
      if (openCount === 0 && entryLive) {
        // Closed by a non-Back means (Esc, X, backdrop). Consume our marker on a
        // microtask so an immediate re-open (menu → popup handoff) cancels it
        // instead of racing a real history.back().
        queueMicrotask(() => {
          if (openCount === 0 && entryLive) {
            entryLive = false
            window.history.back()
          }
        })
      }
    }
  }, [isOpen])
}
