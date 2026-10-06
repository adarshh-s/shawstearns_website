import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cta, videos } from '../content/site'
import { emphasize } from '../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'
import VideoBg from './ui/VideoBg'

/** Origin-inspired closing invitation: lush full-bleed footage, one centred serif line, one action. */
export default function CtaBand() {
  const root = useRef(null)
  const media = useRef(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(!reduce)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          media.current,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="cta-title" className="relative overflow-hidden bg-night text-white">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <VideoBg video={videos.meadow} playing={playing} label="closing video" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/35 to-night/60" />
      <div className="relative mx-auto flex min-h-[90svh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
        <Reveal as="p" className="label text-gold-light">
          {cta.label}
        </Reveal>
        <Reveal
          as="h2"
          id="cta-title"
          delay={0.05}
          className="mt-6 text-[clamp(2.5rem,1.6rem+3.6vw,5rem)] leading-[1.02] !text-white [&_.accent-italic]:!text-gold-light"
        >
          {emphasize(cta.title)}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-7 max-w-lg text-white/85">
          {cta.body}
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Button href={cta.action.to} variant="white">
            {cta.action.label}
          </Button>
        </Reveal>
      </div>
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="glass absolute right-5 bottom-5 inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs hover:bg-white hover:text-navy"
      >
        <Icon name={playing ? 'pause' : 'play'} className="size-3" />
        {playing ? 'Pause video' : 'Play video'}
      </button>
    </section>
  )
}
