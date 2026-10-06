import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { about } from '../content/site'
import { emphasize, imgSrcSet, imgUrl } from '../utils/helpers'
import { gsap, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'

const { protect } = about

function Bg({ id }) {
  return (
    <img
      src={imgUrl(id, 1400)}
      srcSet={imgSrcSet(id, [800, 1400, 2000])}
      sizes="100vw"
      alt=""
      loading="lazy"
      className="absolute inset-0 size-full object-cover"
    />
  )
}

/** Reduced motion: the three statements as a simple stack. */
function StaticProtect() {
  return (
    <section aria-labelledby="protect-title" className="space-y-3 bg-white px-3 pb-3 sm:px-[30px]">
      <h2 id="protect-title" className="sr-only">
        {protect.label}
      </h2>
      {protect.items.map((p) => (
        <div
          key={p.image}
          className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-night px-6 text-center"
        >
          <Bg id={p.image} />
          <div className="absolute inset-0 bg-night/65" />
          <p className="relative font-serif text-[length:var(--text-display)] leading-[1.05] text-white [&_.accent-italic]:text-gold-light">
            {emphasize(p.text)}
          </p>
        </div>
      ))}
    </section>
  )
}

/** Pinned: an inset frame opens to full-bleed and the three "we protect" statements crossfade. */
function PinnedProtect() {
  const root = useRef(null)
  const frame = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const images = q('[data-bg]')
      const texts = q('[data-text]')
      const dots = q('[data-dot]')
      gsap.set(images.slice(1), { opacity: 0 })
      gsap.set(texts, { opacity: 0, y: 30 })
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=220%', pin: true, scrub: 1 },
      })
      tl.fromTo(
        frame.current,
        { clipPath: 'inset(10% 12% 10% 12%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' },
      )
        .fromTo(q('[data-chrome]'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5)
        .to(texts[0], { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .to(dots[0], { scaleX: 1, duration: 0.6, ease: 'none' }, 0.6)
      texts.slice(1).forEach((t, i) => {
        tl.to(texts[i], { opacity: 0, y: -30, duration: 0.4 }, '+=0.5')
          .to(images[i + 1], { opacity: 1, duration: 0.6, ease: 'none' }, '<')
          .to(t, { opacity: 1, y: 0, duration: 0.5 }, '<0.2')
          .to(dots[i + 1], { scaleX: 1, duration: 0.6, ease: 'none' }, '<')
      })
      tl.to({}, { duration: 0.4 })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="protect-title" className="relative h-[100svh] overflow-hidden bg-white">
      <div ref={frame} className="absolute inset-0 overflow-hidden bg-night text-white">
        {protect.items.map((p) => (
          <div key={p.image} data-bg className="absolute inset-0">
            <Bg id={p.image} />
          </div>
        ))}
        <div className="absolute inset-0 bg-night/60" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 id="protect-title" data-chrome className="label text-gold-light">
            {protect.label}
          </h2>
          <p data-chrome className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
            {protect.intro}
          </p>
          <ul className="mt-10 grid w-full max-w-4xl">
            {protect.items.map((p) => (
              <li key={p.image} data-text className="col-start-1 row-start-1">
                <p className="font-serif text-[length:var(--text-display)] leading-[1.05] text-white [&_.accent-italic]:text-gold-light">
                  {emphasize(p.text)}
                </p>
              </li>
            ))}
          </ul>
          <div data-chrome className="mt-12">
            <Button href={protect.cta.to} variant="glass">
              {protect.cta.label}
            </Button>
          </div>
        </div>
        <div data-chrome aria-hidden="true" className="absolute inset-x-0 bottom-10 flex justify-center gap-2">
          {protect.items.map((p) => (
            <span key={p.image} className="h-0.5 w-10 overflow-hidden bg-white/25">
              <span data-dot className="block h-full origin-left scale-x-0 bg-gold-light" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Protect() {
  return useReducedMotion() ? <StaticProtect /> : <PinnedProtect />
}
