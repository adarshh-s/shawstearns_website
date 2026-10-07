import { useRef } from 'react'
import { motion } from 'framer-motion'
import { careers, photos } from '../../content/site'
import { emphasize, stripMarkers } from '../../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../../utils/scrollAnimations'
import { ApplicationForm } from '../CareersBody'
import Beam from '../ui/Beam'
import Button from '../ui/Button'
import { Mark } from '../ui/Logo'
import Reveal, { fadeUpChild, staggerParent } from '../ui/Reveal'
import SplitLines from '../ui/SplitLines'

const EASE = [0.22, 1, 0.36, 1]

/** Refine-style header: full-bleed photograph with a frosted statement card on the right. */
export function CareersHero() {
  const { hero } = careers
  const root = useRef(null)
  const img = useRef(null)
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.to(img.current, {
          yPercent: 10,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
      })
    },
    { scope: root },
  )
  const lines = hero.title
  return (
    <section ref={root} className="bg-white p-3 pt-[7.5rem] sm:px-4">
      <div className="relative flex min-h-[calc(92svh-7.5rem)] items-center justify-center overflow-hidden rounded-[28px] bg-night px-5 py-16 md:justify-end md:px-[7%]">
        <img
          ref={img}
          src={photos.careers}
          alt="The Shaw Stearns team at work"
          fetchPriority="high"
          className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-night/60 via-night/15 to-transparent" />
        <motion.div
          className="relative w-full max-w-md rounded-3xl border border-white/25 bg-navy/40 px-9 py-12 text-center text-white backdrop-blur-xl sm:px-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        >
          <Mark className="mx-auto h-11 text-white" />
          <p className="label mt-7 text-gold-light">{hero.label}</p>
          <h1
            aria-label={lines.map(stripMarkers).join(' ')}
            className="mt-3 text-[clamp(2.5rem,1.8rem+2.4vw,3.75rem)] leading-[1.02] !text-white [&_.accent-italic]:!text-gold-light"
          >
            {lines.map((l, i) => (
              <span key={i} className="block" aria-hidden="true">
                {emphasize(l)}
              </span>
            ))}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/85">{hero.sub}</p>
          <Button href="/careers#apply" variant="white" className="mt-8">
            Apply now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/** Editorial two columns: the practice in large serif beside a numbered list of what we offer. */
export function CareersEditorial() {
  return (
    <section aria-labelledby="join-title" className="section-y bg-white">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-32">
            <p className="label text-gold-ink">{careers.join.label}</p>
            <Reveal
              as="h2"
              id="join-title"
              className="mt-5 font-display text-[clamp(1.625rem,1.25rem+1.2vw,2.5rem)] leading-[1.3] font-light text-navy"
            >
              {careers.join.body}
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="label text-gold-ink">{careers.offer.label}</p>
          <motion.ol
            className="mt-6 border-t border-navy/12"
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          >
            {careers.offer.items.map((o, i) => (
              <motion.li key={o} variants={fadeUpChild} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-navy/12 py-6">
                <span className="font-serif text-lg text-gold italic">0{i + 1}</span>
                <span className="font-display text-xl leading-snug font-light text-navy">{o}</span>
              </motion.li>
            ))}
          </motion.ol>
          <Reveal as="p" className="mt-8 leading-relaxed text-muted">
            {careers.closing}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Navy beam panel with the invitation beside the application form. */
export function CareersApply() {
  return (
    <section id="apply" aria-labelledby="apply-title" className="bg-white px-3 pb-3 sm:px-[30px] sm:pb-[30px]">
      <div className="grid overflow-hidden rounded-3xl bg-mist lg:grid-cols-12">
        <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-night p-8 text-white sm:p-12 lg:col-span-5">
          <Beam className="left-[96%] lg:left-[82%]" />
          <div className="relative">
            <p className="label text-gold-light">{careers.apply.label}</p>
            <SplitLines
              id="apply-title"
              lines={[careers.apply.title]}
              className="mt-5 text-[length:var(--text-h2)] leading-[1.06] !text-white [&_.accent-italic]:!text-gold-light"
            />
            <p className="mt-5 max-w-sm leading-relaxed text-white/75">{careers.apply.body}</p>
          </div>
        </div>
        <div className="p-6 sm:p-12 lg:col-span-7">
          <div className="rounded-3xl bg-white p-6 sm:p-10">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  )
}
