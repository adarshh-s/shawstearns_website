import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { home } from '../content/site'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

// First sentence of the practice introduction — the statement; the rest sits beneath it.
const lead = home.intro.lead.split('. ')[0] + '.'

/** Scale-style statement: one large, light sentence whose words fill in as it scrolls through. */
export default function Statement() {
  const root = useRef(null)
  const text = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          gsap.utils.toArray('[data-word]', text.current),
          { opacity: 0.14 },
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
    <section ref={root} aria-labelledby="statement-title" className="section-y bg-white">
      <div className="container-x mx-auto max-w-5xl text-center">
        <Reveal as="p" className="label text-gold-ink">
          {home.intro.label}
        </Reveal>
        <h2
          id="statement-title"
          ref={text}
          aria-label={lead}
          className="mt-8 text-[clamp(1.75rem,1.2rem+2vw,3.25rem)] leading-[1.25]"
        >
          {lead.split(' ').map((w, i) => (
            <span key={i} aria-hidden="true">
              <span data-word className="inline-block">
                {w}
              </span>{' '}
            </span>
          ))}
        </h2>
        <Reveal as="p" delay={0.1} className="mx-auto mt-10 max-w-xl leading-relaxed text-muted">
          {home.intro.body}
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Link to={home.intro.cta.to} className="group inline-flex items-center gap-3 text-sm font-medium text-navy">
            <span className="link-underline">{home.intro.cta.label}</span>
            <Icon name="arrow" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
