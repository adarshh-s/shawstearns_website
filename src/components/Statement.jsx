import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { home } from '../content/site'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

// First sentence of the practice introduction — the statement; the rest sits beneath it.
const lead = home.intro.lead.split('. ')[0] + '.'

// Credentials drawn from the About copy (RICS / CIOB standards, Chartered leadership).
const MARKS = [
  ['RICS', 'Standards'],
  ['CIOB', 'Standards'],
  ['Chartered', 'Leadership'],
]

function Laurel({ flip }) {
  return (
    <svg viewBox="0 0 20 48" className={`h-11 w-auto text-gold-light/70 ${flip ? '-scale-x-100' : ''}`} aria-hidden="true">
      <path d="M16 46C6 38 3 26 6 4" fill="none" stroke="currentColor" strokeWidth="1" />
      {[8, 15, 22, 29, 36].map((y, i) => (
        <ellipse
          key={y}
          cx={i < 2 ? 7.5 : 9 + i * 0.6}
          cy={y}
          rx="2.4"
          ry="4.6"
          transform={`rotate(-35 ${i < 2 ? 7.5 : 9 + i * 0.6} ${y})`}
          fill="currentColor"
          opacity="0.8"
        />
      ))}
    </svg>
  )
}

/**
 * Origin-inspired statement: calm dark field with a soft glow rising from below; one large
 * sentence whose words fill in as it scrolls (Scale-style), then quiet credential marks.
 */
export default function Statement() {
  const root = useRef(null)
  const text = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          gsap.utils.toArray('[data-word]', text.current),
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: { trigger: text.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section
      id="statement"
      ref={root}
      aria-labelledby="statement-title"
      className="relative overflow-hidden bg-night py-32 text-white md:py-44"
    >
      {/* soft horizon glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(70%_80%_at_50%_100%,rgba(201,180,138,0.35),rgba(90,108,140,0.25)_45%,transparent_75%)]"
      />
      <div className="container-x relative mx-auto max-w-5xl text-center">
        <Reveal as="p" className="label text-gold-light">
          {home.intro.label}
        </Reveal>
        <h2
          id="statement-title"
          ref={text}
          aria-label={lead}
          className="mt-8 text-[clamp(1.875rem,1.3rem+2.1vw,3.25rem)] leading-[1.22] !text-white"
        >
          {lead.split(' ').map((w, i) => (
            <span key={i} aria-hidden="true">
              <span data-word className="inline-block">
                {w}
              </span>{' '}
            </span>
          ))}
        </h2>
        <Reveal as="p" delay={0.1} className="mx-auto mt-10 max-w-xl leading-relaxed text-white/70">
          {home.intro.body}
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Link
            to={home.intro.cta.to}
            className="group inline-flex items-center gap-3 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-navy"
          >
            {home.intro.cta.label}
            <Icon name="arrow" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.2} className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {MARKS.map(([a, b]) => (
            <div key={a} className="flex items-center gap-2">
              <Laurel />
              <div className="leading-tight">
                <p className="font-display text-lg text-white">{a}</p>
                <p className="label !text-[0.5rem] text-white/60">{b}</p>
              </div>
              <Laurel flip />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
