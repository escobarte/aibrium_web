'use client'

import { useEffect, useRef } from 'react'

// Makes the browser/Android Back button close an open overlay instead of
// leaving the site. On open it pushes ONE history entry with a marker (no URL
// or hash change); Back fires popstate → onClose. When the overlay is closed by
// any other means (Esc, button, backdrop, Calendly's own X), the pushed entry
// is consumed via history.back() so the stack is left exactly as it was.
//
// Guarantees:
//  - never pushes more than one entry per open (deps are just [isOpen])
//  - never double-closes (popstate path vs. cleanup path are mutually exclusive)
//  - cleans up the popstate listener on unmount
export function useBackToClose(isOpen: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // Our pushed entry is still on top of the stack and hasn't been popped yet.
  const entryLive = useRef(false)
  // The current close is being driven BY popstate (Back) — don't back() again.
  const closingViaPop = useRef(false)

  useEffect(() => {
    if (!isOpen) return

    window.history.pushState({ __backToClose: true }, '')
    entryLive.current = true
    closingViaPop.current = false

    const onPop = () => {
      // Back was pressed: our entry is already gone from the stack.
      entryLive.current = false
      closingViaPop.current = true
      onCloseRef.current()
    }
    window.addEventListener('popstate', onPop)

    return () => {
      window.removeEventListener('popstate', onPop)
      // Closed by something other than Back while our entry is still live →
      // consume it so we don't leave a dangling forward entry.
      if (entryLive.current && !closingViaPop.current) {
        entryLive.current = false
        window.history.back()
      }
    }
  }, [isOpen])
}
