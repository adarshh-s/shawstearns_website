import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { home, services, videos } from '../content/site'
import { prefetch } from '../pages/loaders'
import { emphasize, stripMarkers } from '../utils/helpers'
import { gsap, scrollToHash, useGSAP } from '../utils/scrollAnimations'
import Button, { ArrowBox } from './ui/Button'
import Icon from './ui/Icon'
import VideoBg from './ui/VideoBg'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay },
})
const { hero } = home

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** Centred hero copy shown over the full-size video card. */
function HeroCopy({ copyRef }) {
  return (
    <div ref={copyRef} className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
      <motion.p className="label text-gold-light" {...fadeUp(0.4)}>
        {hero.label}
      </motion.p>
      <motion.h1
        id="hero-title"
        aria-label={stripMarkers(hero.title)}
        className="mt-5 max-w-4xl text-[clamp(2.75rem,1.6rem+4.6vw,6rem)] leading-[1] !text-white [&_.accent-italic]:!text-gold-light"
        {...fadeUp(0.55)}
      >
        <span aria-hidden="true">{emphasize(hero.title)}</span>
      </motion.h1>
      <motion.p className="mt-6 max-w-lg text-base leading-relaxed text-white/85" {...fadeUp(0.75)}>
        {hero.sub}
      </motion.p>
      <motion.div className="mt-9 flex flex-wrap items-center justify-center gap-3" {...fadeUp(0.9)}>
        <Button href={hero.primary.to} variant="white">
          {hero.primary.label}
        </Button>
        <Button href={hero.secondary.to} variant="glass">
          {hero.secondary.label}
        </Button>
      </motion.div>
    </div>
  )
}

function VideoToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="glass absolute bottom-5 left-5 z-10 inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs hover:bg-white hover:text-navy"
    >
      <Icon name={playing ? 'pause' : 'play'} className="size-3" />
      {playing ? 'Pause video' : 'Play video'}
    </button>
  )
}

/** Caption under each service card. */
function ServiceCaption({ s }) {
  return (
    <Link to={`/services#${s.slug}`} onMouseEnter={() => prefetch('services')} className="group block">
      <span className="font-serif text-gold italic">{s.num}</span>
      <h3 className="mt-2 text-[1.5rem] leading-tight">{s.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{s.summary}</p>
      <span className="mt-5 flex items-center gap-3">
        <ArrowBox tone="navy" className="!rounded-none" />
        <span className="label !text-[0.5625rem] text-navy">Learn more</span>
      </span>
    </Link>
  )
}

const servicesHead = (
  <>
    <p className="label text-gold-ink">{home.services.label}</p>
    <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,3rem)] leading-[1.08]">{emphasize(home.services.title)}</h2>
  </>
)

/**
 * Desktop: one pinned, scrubbed sequence (Scale-inspired). The full-size hero video card shrinks
 * into the first of three service columns; the other two slide in beside it with their own
 * footage, then the heading and each card's caption settle in beneath.
 */
function PinnedHero() {
  const root = useRef(null)
  const card = useRef(null)
  const slot = useRef(null)
  const copy = useRef(null)
  const shade = useRef(null)
  const head = useRef(null)
  const cue = useRef(null)
  const [playing, setPlaying] = useState(true)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const others = q('[data-other]')
      const captions = q('[data-caption]')

      const start = () => ({ left: 12, top: 120, width: root.current.offsetWidth - 24, height: root.current.offsetHeight - 132 })
      const end = () => {
        const r = slot.current.getBoundingClientRect()
        const o = root.current.getBoundingClientRect()
        return { left: r.left - o.left, top: r.top - o.top, width: r.width, height: r.height }
      }

      gsap.set(others, { opacity: 0, xPercent: 40 })
      gsap.set([head.current, ...captions], { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=180%', pin: true, scrub: 1, invalidateOnRefresh: true },
      })
      tl.to(copy.current, { opacity: 0, y: -30, duration: 0.3, ease: 'power1.in' }, 0)
        .to(cue.current, { opacity: 0, duration: 0.2 }, 0)
        .fromTo(
          card.current,
          {
            left: () => start().left,
            top: () => start().top,
            width: () => start().width,
            height: () => start().height,
            borderRadius: 28,
          },
          {
            left: () => end().left,
            top: () => end().top,
            width: () => end().width,
            height: () => end().height,
            borderRadius: 16,
            duration: 1,
          },
          0,
        )
        .to(shade.current, { opacity: 0.2, duration: 0.6 }, 0.25)
        .to(others, { opacity: 1, xPercent: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, 0.55)
        .to(head.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7)
        .to(captions, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, 0.85)
        .to({}, { duration: 0.35 })
    },
    { scope: root },
  )

  const [first, ...rest] = services

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[720px] overflow-hidden bg-white"
    >
      {/* Final layout: heading, then three columns (card slot + caption) */}
      <div className="container-x flex h-full flex-col justify-center pt-[7.5rem] pb-10">
        <div ref={head} className="mx-auto max-w-2xl text-center">
          {servicesHead}
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-8 xl:gap-12">
          <li>
            <div ref={slot} aria-hidden="true" className="aspect-[5/4] w-full" />
            <div data-caption className="mt-6">
              <ServiceCaption s={first} />
            </div>
          </li>
          {rest.map((s) => (
            <li key={s.slug}>
              <div data-other className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-night">
                <div className="absolute inset-0">
                  <VideoBg video={videos[s.video]} playing={playing} label={`${s.title} video`} />
                </div>
              </div>
              <div data-caption className="mt-6">
                <ServiceCaption s={s} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* The hero card that travels into the first column */}
      <div
        ref={card}
        className="absolute top-[120px] left-3 h-[calc(100%-132px)] w-[calc(100%-24px)] overflow-hidden rounded-[28px] bg-night will-change-[left,top,width,height]"
      >
        <div className="absolute inset-0">
          <VideoBg video={videos.home} playing={playing} label="hero video" />
        </div>
        <div
          ref={shade}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/60 via-night/45 to-night/75"
        />
        <HeroCopy copyRef={copy} />
        <VideoToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
      </div>

      <button
        ref={cue}
        type="button"
        onClick={() => scrollToHash('#statement')}
        className="label absolute right-8 bottom-8 z-10 flex items-center gap-3 text-white"
      >
        Scroll to explore
        <span className="glass inline-flex size-8 items-center justify-center rounded-md">
          <Icon name="arrowDown" className="size-3.5" />
        </span>
      </button>
    </section>
  )
}

/** Phones and reduced motion: full video card, then the three service cards stacked. */
function StaticHero() {
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(!reduce)
  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="bg-white p-3 pt-[7.5rem]">
        <div className="relative h-[calc(100svh-8.5rem)] min-h-[560px] overflow-hidden rounded-[28px] bg-night">
          <div className="absolute inset-0">
            <VideoBg video={videos.home} playing={playing} label="hero video" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/60 via-night/45 to-night/75" />
          <HeroCopy />
          <VideoToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
        </div>
      </section>
      <section aria-label="Our services" className="bg-white px-5 py-20">
        <div className="text-center">{servicesHead}</div>
        <ul className="mt-12 space-y-14 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
          {services.map((s) => (
            <li key={s.slug}>
              <div className="aspect-[5/4] overflow-hidden rounded-2xl bg-night">
                <img src={videos[s.video].poster} alt="" loading="lazy" className="size-full object-cover" />
              </div>
              <div className="mt-6">
                <ServiceCaption s={s} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

/** Home hero: pinned "video → three services" on desktop; static equivalent elsewhere. */
export default function Hero() {
  const desktop = useMedia('(min-width: 1024px)')
  const reduce = useReducedMotion()
  return desktop && !reduce ? <PinnedHero /> : <StaticHero />
}
