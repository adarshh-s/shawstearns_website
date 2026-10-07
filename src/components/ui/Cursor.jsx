import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="tab"], [role="button"], summary, label[for]'
const FIELD = 'input, textarea, select, [contenteditable="true"]'

/**
 * Minimal cursor accent: a dot that tracks the pointer exactly and a thin ring that trails
 * with easing. The ring grows softly over links and buttons and steps aside over form fields.
 * It replaces the native cursor, and only renders for fine pointers without reduced motion
 * (touch devices and reduced-motion users keep the normal system cursor).
 */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!enabled) return
    // The custom cursor replaces the native arrow entirely (see .has-custom-cursor in globals.css).
    document.documentElement.classList.add('has-custom-cursor')
    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let scale = 1
    let targetScale = 1
    let visible = false
    let raf = 0

    const setVisible = (v) => {
      if (v === visible) return
      visible = v
      ring.current.style.opacity = v ? '1' : '0'
      dot.current.style.opacity = v ? '1' : '0'
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      setVisible(true)
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }
    const onOver = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      if (t.closest(FIELD)) {
        targetScale = 0.4
        dot.current.dataset.state = 'field'
      } else if (t.closest(INTERACTIVE)) {
        targetScale = 1.9
        dot.current.dataset.state = 'link'
      } else {
        targetScale = 1
        dot.current.dataset.state = ''
      }
    }
    const onDown = () => (targetScale *= 0.8)
    const onUp = (e) => onOver(e)
    const onLeave = () => setVisible(false)

    let last = performance.now()
    const tick = (now) => {
      // Ring eases towards the pointer; scale eases towards its target. The easing is scaled by
      // the frame time so the ring trails by the same amount at 60 Hz, 120 Hz or a slow frame.
      const dt = Math.min(64, now - last) / 16.67
      last = now
      const follow = 1 - Math.pow(1 - 0.22, dt)
      rx += (x - rx) * follow
      ry += (y - ry) * follow
      scale += (targetScale - scale) * (1 - Math.pow(1 - 0.18, dt))
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  // No blend modes: a full-screen mix-blend layer forces the page to be re-blended every
  // frame. A navy stroke with a faint white halo reads on both light and dark sections.
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-2147483647">
      <div
        ref={ring}
        className="absolute top-0 left-0 size-8 rounded-full border border-navy/50 opacity-0 shadow-[0_0_0_1px_rgba(255,255,255,0.35)] transition-opacity duration-300 will-change-transform"
      />
      {/* The outer element only moves; the hover growth lives on the inner dot. (A `scale` on
          the moved element would also scale its translate, pushing the dot away from the ring.) */}
      <div
        ref={dot}
        className="group absolute top-0 left-0 opacity-0 transition-opacity duration-300 will-change-transform"
      >
        <span className="block size-2 rounded-full bg-gold shadow-[0_0_0_1px_rgba(255,255,255,0.5)] transition-transform duration-300 group-data-[state=link]:scale-125" />
      </div>
    </div>
  )
}
