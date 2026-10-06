import { useRef } from 'react'
import { about } from '../content/site'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Reveal from './ui/Reveal'

/** "We are not contractors / designers / suppliers" — each line is struck through as you scroll. */
export default function NotStatement() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray('[data-strike]', root.current).forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { trigger: line.parentElement, start: 'top 75%', end: 'top 45%', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="not-title" className="section-y bg-white">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="not-title" className="sr-only">
            What we are not
          </h2>
          <ul className="space-y-2">
            {about.notList.map((l) => (
              <li
                key={l}
                className="relative w-fit font-display text-[length:var(--text-h2)] leading-[1.1] font-light tracking-[-0.01em] text-navy/40"
              >
                {l}
                <span data-strike aria-hidden="true" className="absolute top-[55%] left-0 h-px w-full origin-left bg-gold" />
              </li>
            ))}
          </ul>
          <Reveal
            as="p"
            className="mt-8 max-w-2xl font-display text-[length:var(--text-h3)] leading-snug font-light tracking-[-0.01em] text-navy"
          >
            {about.exclusive.split('—')[0]}— <em className="accent-italic">{about.exclusive.split('—')[1].trim()}</em>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="self-end lg:col-span-5">
          <p className="border-l-2 border-gold pl-6 leading-relaxed text-muted">{about.leadership}</p>
        </Reveal>
      </div>
    </section>
  )
}
