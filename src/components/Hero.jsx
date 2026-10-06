import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { home, videos } from '../content/site'
import { emphasize, imgSrcSet, imgUrl, stripMarkers } from '../utils/helpers'
import { gsap, scrollToHash, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import VideoBg from './ui/VideoBg'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay },
})
const { hero, protect } = home

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

/** Media for each protected item: the hero video, or a photo. */
function Media({ item, playing }) {
  if (item.media === 'video') return <VideoBg video={videos.home} playing={playing} label="hero video" />
  return (
    <img
      src={imgUrl(item.media, 1400, { height: 1050 })}
      srcSet={imgSrcSet(item.media, [800, 1400, 2000], 4 / 3)}
      sizes="60vw"
      alt=""
      loading="lazy"
      className="size-full object-cover"
    />
  )
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

/** One protected item in the left-hand list. */
function ProtectItem({ item, index }) {
  return (
    <li data-item className="relative pl-8">
      <span aria-hidden="true" className="absolute top-1 bottom-1 left-0 w-px bg-navy/15">
        <span data-bar className="block h-full w-full origin-top scale-y-0 bg-gold" />
      </span>
      <p className="label !text-[0.5625rem] text-gold-ink">
        0{index + 1} · {item.name}
      </p>
      <h3 className="mt-2 text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-[1.1]">{emphasize(item.title)}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{item.body}</p>
      <Link to={item.link.to} className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-navy">
        <span className="link-underline">{item.link.label}</span>
        <Icon name="arrow" className="size-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </li>
  )
}

/**
 * Desktop: one pinned, scrubbed sequence. The full-size video card glides into the right-hand
 * column while "What we protect" appears on the left; scrolling then steps through capital,
 * programme and reputation, swapping the card's footage to match each one.
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
      const items = q('[data-item]')
      const bars = q('[data-bar]')
      const layers = q('[data-layer]')
      const caption = q('[data-caption]')

      // Card geometry: full-bleed start → the right-column slot.
      const start = () => ({ left: 12, top: 120, width: root.current.offsetWidth - 24, height: root.current.offsetHeight - 132 })
      const end = () => {
        const r = slot.current.getBoundingClientRect()
        const o = root.current.getBoundingClientRect()
        return { left: r.left - o.left, top: r.top - o.top, width: r.width, height: r.height }
      }

      gsap.set(layers.slice(1), { opacity: 0 })
      gsap.set([head.current, ...items], { opacity: 0, y: 30 })
      gsap.set(caption, { opacity: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=280%', pin: true, scrub: 1, invalidateOnRefresh: true },
      })

      tl.to(copy.current, { opacity: 0, y: -30, duration: 0.3, ease: 'power1.in' }, 0)
        .to(cue.current, { opacity: 0, duration: 0.2 }, 0)
        .fromTo(
          card.current,
          { left: () => start().left, top: () => start().top, width: () => start().width, height: () => start().height },
          { left: () => end().left, top: () => end().top, width: () => end().width, height: () => end().height, duration: 1 },
          0,
        )
        .to(shade.current, { opacity: 0.15, duration: 0.6 }, 0.2)
        .to(head.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.55)
        .to(items, { opacity: 0.3, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, 0.65)
        .to(items[0], { opacity: 1, duration: 0.3 }, 1.05)
        .to(caption[0], { opacity: 1, duration: 0.3 }, 1.05)
        .to(bars[0], { scaleY: 1, duration: 0.8, ease: 'none' }, 1.05)

      let t = 1.95
      for (let i = 1; i < items.length; i++) {
        tl.to(items[i - 1], { opacity: 0.3, duration: 0.3 }, t)
          .to(caption[i - 1], { opacity: 0, duration: 0.3 }, t)
          .to(items[i], { opacity: 1, duration: 0.3 }, t)
          .to(caption[i], { opacity: 1, duration: 0.3 }, t + 0.1)
          .to(layers[i], { opacity: 1, duration: 0.5, ease: 'none' }, t)
          .to(bars[i], { scaleY: 1, duration: 0.8, ease: 'none' }, t)
        t += 0.9
      }
      tl.to({}, { duration: 0.3 })
    },
    { scope: root },
  )

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-white"
    >
      {/* Layout skeleton: list on the left, empty slot the card settles into on the right */}
      <div className="container-x grid h-full grid-cols-12 items-center gap-12 pt-[7.5rem] pb-12">
        <div className="col-span-5">
          <div ref={head}>
            <p className="label text-gold-ink">{protect.label}</p>
            <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] leading-[1.08]">{emphasize(protect.title)}</h2>
          </div>
          <ol className="mt-10 space-y-8">
            {protect.items.map((it, i) => (
              <ProtectItem key={it.name} item={it} index={i} />
            ))}
          </ol>
        </div>
        <div ref={slot} aria-hidden="true" className="col-span-7 aspect-[4/3] w-full" />
      </div>

      {/* The card that travels */}
      <div
        ref={card}
        className="absolute top-[120px] left-3 h-[calc(100%-132px)] w-[calc(100%-24px)] overflow-hidden rounded-[28px] bg-night will-change-[left,top,width,height]"
      >
        {protect.items.map((it, i) => (
          <div key={it.name} data-layer className="absolute inset-0">
            <Media item={it} playing={i === 0 && playing} />
          </div>
        ))}
        <div
          ref={shade}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/60 via-night/45 to-night/75"
        />
        {protect.items.map((it) => (
          <span
            key={it.name}
            data-caption
            className="label glass absolute top-5 right-5 rounded-full px-3 py-1.5 !text-[0.5625rem]"
          >
            {it.name}
          </span>
        ))}
        <HeroCopy copyRef={copy} />
        <VideoToggle playing={playing} onToggle={() => setPlaying((p) => !p)} />
      </div>

      <button
        ref={cue}
        type="button"
        onClick={() => scrollToHash('#difference')}
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

/** Phones and reduced motion: full video card, then the three protected items as a stack. */
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
      <section aria-labelledby="protect-title" className="bg-white px-5 py-16">
        <p className="label text-gold-ink">{protect.label}</p>
        <h2 id="protect-title" className="mt-4 text-[length:var(--text-h2)] leading-[1.08]">
          {emphasize(protect.title)}
        </h2>
        <ol className="mt-10 space-y-10">
          {protect.items.map((it, i) => (
            <Reveal as="li" key={it.name} className="space-y-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-night">
                {it.media === 'video' ? (
                  <img src={videos.home.poster} alt="" className="size-full object-cover" />
                ) : (
                  <img src={imgUrl(it.media, 900, { height: 675 })} alt="" loading="lazy" className="size-full object-cover" />
                )}
              </div>
              <ol>
                <ProtectItem item={it} index={i} />
              </ol>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  )
}

/**
 * Home hero. Pinned "video → what we protect" sequence on desktop; a static equivalent on
 * smaller screens or when the visitor prefers reduced motion.
 */
export default function Hero() {
  const desktop = useMedia('(min-width: 1024px)')
  const reduce = useReducedMotion()
  return desktop && !reduce ? <PinnedHero /> : <StaticHero />
}
