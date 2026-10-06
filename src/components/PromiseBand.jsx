import { useRef } from 'react'
import { site } from '../content/site'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'

/** The practice's three-word promise as a slow, quiet marquee. */
export default function PromiseBand({ tone = 'light' }) {
  const track = useRef(null)
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => gsap.to(track.current, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 }))
  })
  const words = [...site.promise, ...site.promise, ...site.promise]
  const row = (hidden) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-serif text-[clamp(1.75rem,1.3rem+1.8vw,3rem)] italic">{w}</span>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
        </li>
      ))}
    </ul>
  )
  return (
    <section
      aria-label={site.promise.join(', ')}
      className={`overflow-hidden border-y py-7 ${tone === 'dark' ? 'border-white/10 bg-night text-white/85' : 'border-line bg-white text-navy'}`}
    >
      <div ref={track} className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
