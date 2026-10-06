import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { discretion, videos } from '../content/site'
import { emphasize } from '../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { Mark } from './ui/Logo'
import Reveal from './ui/Reveal'
import VideoBg from './ui/VideoBg'

/**
 * Refine-style wide banner ("Step inside our sales gallery"): footage washed in brand navy
 * from the left, a short line and one action. The footage drifts gently as it scrolls past.
 */
export default function VideoBanner() {
  const root = useRef(null)
  const media = useRef(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(!reduce)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          media.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="banner-title" className="bg-white px-3 pb-24 sm:px-[30px] md:pb-36">
      <div className="relative overflow-hidden rounded-3xl bg-navy">
        <div ref={media} className="absolute inset-x-0 -top-[10%] h-[120%]">
          <VideoBg video={videos.clouds} playing={playing} label="banner video" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/50 to-transparent" />
        <div className="relative flex min-h-[420px] flex-col justify-center px-7 py-20 text-white sm:px-14 md:min-h-[480px]">
          <Reveal>
            <Mark className="h-9 text-white" />
          </Reveal>
          <Reveal as="p" delay={0.05} className="label mt-8 text-gold-light">
            {discretion.label}
          </Reveal>
          <Reveal
            as="h2"
            id="banner-title"
            delay={0.1}
            className="mt-4 max-w-md text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1] !text-white [&_.accent-italic]:!text-gold-light"
          >
            {emphasize(discretion.title)}
          </Reveal>
          <Reveal delay={0.2} className="mt-9">
            <Button href={discretion.action.to} variant="white">
              {discretion.action.label}
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
      </div>
    </section>
  )
}
