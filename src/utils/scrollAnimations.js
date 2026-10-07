import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { debounce } from './helpers'

// Register only the plugins we use so the rest are tree-shaken.
gsap.registerPlugin(ScrollTrigger, useGSAP)

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Recalculate trigger positions after resizes settle (e.g. late-loading fonts/images).
if (typeof window !== 'undefined') {
  window.addEventListener(
    'resize',
    debounce(() => ScrollTrigger.refresh(), 200),
  )
  window.addEventListener('load', () => ScrollTrigger.refresh())
  // Late fonts, images and video metadata can change the page height after the triggers were
  // measured, leaving pins to start/end in the wrong place (a blank gap after a pinned section).
  // Re-measure whenever the document height actually changes, and once the fonts are in.
  let measured = 0
  ScrollTrigger.addEventListener('refresh', () => (measured = document.body.scrollHeight))
  new ResizeObserver(
    debounce(() => {
      if (Math.abs(document.body.scrollHeight - measured) > 1) ScrollTrigger.refresh()
    }, 250),
  ).observe(document.body)
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
}

/* ───────────── Smooth scrolling (Lenis) driven by GSAP's ticker ─────────────
   Lenis interpolates wheel/touch input for the "buttery" feel; every Lenis frame
   updates ScrollTrigger so scrubbed animations stay locked to the smoothed position. */

let lenis = null

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({
    // lerp (rather than a fixed duration) gives a continuous, silky glide that responds
    // proportionally to each wheel movement.
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
  })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

export const getLenis = () => lenis

/** Pause/resume page scrolling (menus, modals). Falls back to overflow lock without Lenis. */
export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

/** Jump to the top instantly (used behind the page-transition curtain). */
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

/** Document Y of an element's natural (non-sticky) position. */
function naturalTop(el) {
  const prev = el.style.position
  el.style.position = 'static'
  const y = el.getBoundingClientRect().top + window.scrollY
  el.style.position = prev
  return y
}

/** Smoothly scroll to an in-page anchor, offset for the floating nav. */
export function scrollToHash(hash) {
  const target = hash === '#top' ? null : document.querySelector(hash)
  if (hash !== '#top' && !target) return
  const y = target ? Math.max(0, naturalTop(target) - 96) : 0
  const done = () => {
    if (target) {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
  }
  if (lenis) {
    lenis.scrollTo(y, { duration: 1.4, onComplete: done })
    return
  }
  window.scrollTo(0, y)
  done()
}

/**
 * Subtle parallax: moves `el` vertically as `trigger` passes through the viewport.
 * Call inside a gsap.matchMedia(MOTION_OK) block so it is skipped for reduced motion.
 */
export function parallax(el, trigger, distance = 40) {
  return gsap.fromTo(
    el,
    { y: -distance },
    {
      y: distance,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}

export { gsap, ScrollTrigger, useGSAP }
