import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { emphasize, imgSrcSet, imgUrl, stripMarkers } from '../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Icon from './ui/Icon'
import VideoBg from './ui/VideoBg'

const EASE = [0.22, 1, 0.36, 1]
const blurIn = (delay) => ({
  initial: { opacity: 0, filter: 'blur(10px)', y: 8 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
})
const MASK = 'saturate-[0.8] soft-fade'

/**
 * Inner-page header in the same calm language as the home hero: light background,
 * soft-edged media on the right, title and intro bottom-left. Without media it is a plain text header.
 */
export default function PageHero({ label, title, sub, video, image }) {
  const root = useRef(null)
  const media = useRef(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(!reduce)
  const hasMedia = Boolean(video || image)
  const lines = Array.isArray(title) ? title : [title]

  useGSAP(
    () => {
      if (!hasMedia) return
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(media.current, {
          y: 60,
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  const copy = (
    <div className="relative max-w-2xl">
      <motion.p className="text-sm font-medium text-muted" {...blurIn(0.3)}>
        {label}
      </motion.p>
      <motion.h1
        aria-label={lines.map(stripMarkers).join(' ')}
        className="mt-2 text-[clamp(2.25rem,1.5rem+3vw,4.25rem)] leading-[1.02] font-normal tracking-[-0.04em]"
        {...blurIn(0.45)}
      >
        {lines.map((l, i) => (
          <span key={i} className="block" aria-hidden="true">
            {emphasize(l)}
          </span>
        ))}
      </motion.h1>
      <motion.p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted" {...blurIn(0.65)}>
        {sub}
      </motion.p>
    </div>
  )

  if (!hasMedia) {
    return <section className="bg-white px-5 pt-36 pb-14 sm:px-8 md:pt-44">{copy}</section>
  }

  return (
    <section ref={root} className="bg-mist px-5 pt-36 pb-8 sm:px-8 md:pt-36">
      <div className="grid items-end gap-8 md:min-h-[calc(88svh-8rem)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div className="order-2 flex flex-col gap-6 md:order-1">
          {copy}
          {video && (
            <motion.button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex h-7 w-fit items-center gap-2 rounded-md border border-black/10 bg-white/70 px-2.5 text-xs text-muted backdrop-blur hover:bg-white hover:text-ink"
              {...blurIn(0.9)}
            >
              <Icon name={playing ? 'pause' : 'play'} className="size-3" />
              {playing ? 'Pause video' : 'Play video'}
            </motion.button>
          )}
        </div>

        <div ref={media} className="order-1 will-change-transform md:order-2 md:self-center">
          <motion.div
            className="aspect-square w-full sm:aspect-[4/3]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            {video ? (
              <VideoBg video={video} playing={playing} label="header video" className={MASK} />
            ) : (
              <img
                src={imgUrl(image, 1400)}
                srcSet={imgSrcSet(image, [800, 1400, 2000])}
                sizes="(min-width: 768px) 58vw, 100vw"
                alt=""
                className={`size-full object-cover ${MASK}`}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
