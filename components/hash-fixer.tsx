'use client'

import { useEffect } from 'react'

export function HashFixer() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        // If there are multiple hashes (e.g., #contact#pricing), keep only the first
        const match = hash.match(/^#[^#]+/)
        if (match && match[0] !== hash) {
          window.history.replaceState(null, '', window.location.pathname + match[0])
        }
      }
    }
  }, [])

  return null
}
