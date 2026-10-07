import { useEffect, useRef, useState } from 'react'

/**
 * Touch-first horizontal carousel for phones: native momentum scrolling with snap points,
 * the next card peeking in, and a "01 / 03" counter with a gold progress bar.
 * `children` is a render function `(index, isActive) => node` so cards can, for example,
 * play their footage only while they are the one in view.
 */
export default function SnapCarousel({ count, label, tone = 'light', className = '', itemClassName = 'w-[84%]', children }) {
  const track = useRef(null)
  const [active, setActive] = useState(0)

  // The card most in view is "active" — measured by IntersectionObserver, not scroll events.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { root: el, threshold: 0.6 },
    )
    el.querySelectorAll('[data-index]').forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [count])

  const go = (i) => {
    // Scroll the track only (scrollIntoView could also nudge the page vertically).
    const el = track.current
    const card = el?.querySelector(`[data-index="${i}"]`)
    if (card) el.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' })
  }

  const dark = tone === 'dark'
  return (
    <div className={className}>
      <ul
        ref={track}
        aria-label={label}
        className="relative flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }, (_, i) => (
          <li key={i} data-index={i} className={`shrink-0 snap-start ${itemClassName}`}>
            {children(i, i === active)}
          </li>
        ))}
        {/* trailing spacer so the last card can snap to the start edge */}
        <li aria-hidden="true" className="w-2 shrink-0" />
      </ul>
      <div className="mt-6 flex items-center gap-4 px-5">
        <span className={`font-display text-sm tabular-nums ${dark ? 'text-white' : 'text-navy'}`}>
          {String(active + 1).padStart(2, '0')}
          <span className={dark ? 'text-white/40' : 'text-navy/35'}> / {String(count).padStart(2, '0')}</span>
        </span>
        <span className={`relative h-px flex-1 overflow-hidden ${dark ? 'bg-white/15' : 'bg-navy/10'}`}>
          <span
            className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-500 ease-out-expo"
            style={{ width: `${((active + 1) / count) * 100}%` }}
          />
        </span>
        <span className="flex gap-1.5">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show item ${i + 1} of ${count}`}
              aria-current={i === active}
              className="flex size-6 items-center justify-center rounded-full"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-4 bg-gold' : `w-1.5 ${dark ? 'bg-white/30' : 'bg-navy/20'}`}`}
              />
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}
