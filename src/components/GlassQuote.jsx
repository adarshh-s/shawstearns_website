import { useRef } from 'react'
import { about, home } from '../content/site'
import { imgSrcSet, imgUrl } from '../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import { Mark } from './ui/Logo'
import Reveal from './ui/Reveal'

const IMAGE = 'photo-1512453979798-5ea266f8880c'

/**
 * Refine's frosted statement card over a full-bleed image, with a Scale-style reveal:
 * the image starts inset and opens to full width as it scrolls into view.
 */
export default function GlassQuote() {
  const root = useRef(null)
  const frame = useRef(null)
  const img = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          frame.current,
          { clipPath: 'inset(9% 7% 9% 7% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true },
          },
        )
        gsap.fromTo(
          img.current,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="quote-title" className="relative bg-white">
      <div
        ref={frame}
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-night px-5 py-28 md:justify-end md:px-[9%]"
      >
        <img
          ref={img}
          src={imgUrl(IMAGE, 1600)}
          srcSet={imgSrcSet(IMAGE, [900, 1600, 2400])}
          sizes="100vw"
          alt="Dubai skyline at dusk"
          loading="lazy"
          className="absolute inset-0 size-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-night/60 via-night/20 to-transparent" />

        <Reveal className="relative w-full max-w-md border border-white/25 bg-navy/35 px-9 py-14 text-center text-white backdrop-blur-xl sm:px-12">
          <Mark className="mx-auto h-12 text-white" />
          <h2 id="quote-title" className="mt-8 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-[1.15] !text-white">
            {home.intro.quote.split(' ').slice(0, 2).join(' ')}{' '}
            <em className="accent-italic !text-gold-light">{home.intro.quote.split(' ')[2]}</em>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/85">{about.exclusive}</p>
          <Button href="/about" variant="white" className="mt-9">
            About the practice
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
