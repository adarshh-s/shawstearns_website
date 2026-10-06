import { useEffect } from 'react'
import { site } from '../content/site'
import { useLocation } from 'react-router-dom'
import { scrollToHash, ScrollTrigger } from '../utils/scrollAnimations'

/**
 * Wraps each route: sets the document title/description, recalculates scroll
 * triggers once the page has laid out, and tells the header to re-check its theme.
 */
export default function Page({ title, description, children }) {
  const { hash } = useLocation()

  // Deep links like /services#discipline-02: scroll there once the page has laid out.
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => scrollToHash(hash), 450)
    return () => clearTimeout(id)
  }, [hash])

  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — Independent Client-Side Advisors`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      window.dispatchEvent(new Event('page:ready'))
    })
    return () => cancelAnimationFrame(id)
  }, [title, description])

  return children
}
