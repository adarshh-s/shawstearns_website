import { useRef } from 'react'
import { about, home, videos } from '../content/site'
import { imgSrcSet, imgUrl } from '../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import { Mark } from './ui/Logo'
import Reveal from './ui/Reveal'
import VideoBg from './ui/VideoBg'

/**
 * Refine's frosted statement card over a full-bleed image, with a Scale-style reveal:
 * the image starts inset and opens to full width as it scrolls into view.
 */
export default function GlassQuote({
  image,
  video = 'dune',
  alt = 'Dubai skyline at dusk',
  label,
  title = home.intro.quote,
  body = about.exclusive,
  cta = { label: 'About the practice', to: '/about' },
  align = 'right',
}) {
  // Last word of the title is set in gold italic.
  const words = title.split(' ')
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
        className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-night px-5 py-28 md:px-[9%] ${align === 'right' ? 'md:justify-end' : 'md:justify-start'}`}
      >
        {image ? (
          <img
            ref={img}
            src={image.startsWith('/') ? image : imgUrl(image, 1600)}
            srcSet={image.startsWith('/') ? undefined : imgSrcSet(image, [900, 1600, 2400])}
            sizes="100vw"
            alt={alt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover will-change-transform"
          />
        ) : (
          <div ref={img} className="absolute inset-0 will-change-transform">
            <VideoBg video={videos[video]} label="background video" controlClassName="left-5 bottom-5" />
          </div>
        )}
        <div
          className={`absolute inset-0 ${align === 'right' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-night/60 via-night/20 to-transparent`}
        />

        <Reveal className="relative w-full max-w-md border border-white/25 bg-navy/35 px-9 py-14 text-center text-white backdrop-blur-xl sm:px-12">
          <Mark className="mx-auto h-12 text-white" />
          {label && <p className="label mt-8 text-gold-light">{label}</p>}
          <h2 id="quote-title" className="mt-8 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-[1.15] !text-white">
            {words.slice(0, -1).join(' ')} <em className="accent-italic !text-gold-light">{words.at(-1)}</em>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/85">{body}</p>
          <Button href={cta.to} variant="white" className="mt-9">
            {cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
