import { useRef } from 'react'
import { cta } from '../content/site'
import { emphasize, imgSrcSet, imgUrl } from '../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import Reveal from './ui/Reveal'

const IMAGE = 'photo-1512453979798-5ea266f8880c'

/** Origin-inspired closing invitation: calm full-bleed city image, centred serif headline. */
export default function CtaBand() {
  const root = useRef(null)
  const img = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          img.current,
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
      <img
        ref={img}
        src={imgUrl(IMAGE, 1600)}
        srcSet={imgSrcSet(IMAGE, [900, 1600, 2200])}
        sizes="100vw"
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/55 to-night" />
      <div className="relative mx-auto flex min-h-[80svh] max-w-4xl flex-col items-center justify-center px-6 py-28 text-center">
        <Reveal as="p" className="label text-gold-light">
          {cta.label}
        </Reveal>
        <Reveal
          as="h2"
          id="cta-title"
          delay={0.05}
          className="mt-6 text-[clamp(2.25rem,1.5rem+3.2vw,4.75rem)] leading-[1.02] !text-white [&_.accent-italic]:!text-gold-light"
        >
          {emphasize(cta.title)}
        </Reveal>
        <Reveal as="p" delay={0.12} className="mt-7 max-w-lg text-white/80">
          {cta.body}
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Button href={cta.action.to} variant="white">
            {cta.action.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
