import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { services, servicesPage, site, videos } from '../../content/site'
import { emphasize, stripMarkers } from '../../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../../utils/scrollAnimations'
import Button from '../ui/Button'
import DotWave from '../ui/DotWave'
import Icon from '../ui/Icon'
import Reveal, { fadeUpChild, staggerParent } from '../ui/Reveal'
import SplitLines from '../ui/SplitLines'
import VideoBg from '../ui/VideoBg'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay },
})

/** Split header: headline and actions left, a tall rounded video right. */
export function ServicesHero() {
  const { hero } = servicesPage
  const reduce = useReducedMotion()
  const lines = hero.title
  return (
    <section className="bg-white px-5 pt-36 pb-16 sm:px-8 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p className="label text-gold-ink" {...fadeUp(0.2)}>
            {hero.label}
          </motion.p>
          <motion.h1
            aria-label={lines.map(stripMarkers).join(' ')}
            className="mt-5 text-[clamp(2.5rem,1.6rem+3.4vw,4.75rem)] leading-[1.04]"
            {...fadeUp(0.35)}
          >
            {lines.map((l, i) => (
              <span key={i} className="block" aria-hidden="true">
                {emphasize(l)}
              </span>
            ))}
          </motion.h1>
          <motion.p className="mt-6 max-w-lg leading-relaxed text-muted" {...fadeUp(0.5)}>
            {hero.sub}
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" {...fadeUp(0.65)}>
            <Button href="/contact" variant="navy">
              Request a confidential discussion
            </Button>
            <Button href="/services#methodology" variant="outline" className="text-navy">
              Our 8-step methodology
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-night lg:col-span-6 lg:aspect-[5/6]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
        >
          <div className="absolute inset-0">
            <VideoBg video={videos.businessbay} playing={!reduce} label="Services video" controlClassName="right-5 top-5" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          <div className="glass absolute right-5 bottom-5 left-5 rounded-2xl !border-white/25 !bg-night/45 p-5 text-white">
            <p className="text-sm leading-relaxed">{site.footerBlurb}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/** Mercury pricing-style comparison: three discipline cards side by side, the middle one featured. */
export function DisciplineCards() {
  return (
    <section aria-labelledby="disc-title" className="section-y bg-mist">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label text-gold-ink">{servicesPage.howWeWork.label}</p>
          <SplitLines
            id="disc-title"
            lines={[servicesPage.howWeWork.title]}
            className="mt-5 text-[length:var(--text-h2)] leading-[1.06]"
          />
        </div>
        <motion.ul
          className="mt-16 grid items-stretch gap-4 lg:grid-cols-3"
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {services.map((s, i) => {
            const featured = i === 1
            return (
              <motion.li
                key={s.slug}
                variants={fadeUpChild}
                className={`flex flex-col rounded-3xl border p-8 ${featured ? 'border-navy bg-navy text-white shadow-[0_40px_80px_-40px_rgba(34,53,91,0.7)] lg:-my-4 lg:py-12' : 'border-line bg-white'}`}
              >
                <div className="h-20">
                  <DotWave tone={featured ? 'light' : s.wave} />
                </div>
                <span className={`mt-6 font-serif italic ${featured ? 'text-gold-light' : 'text-gold'}`}>{s.num}</span>
                <h3 className={`mt-2 text-[1.75rem] leading-tight ${featured ? '!text-white' : ''}`}>{s.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${featured ? 'text-white/75' : 'text-muted'}`}>{s.summary}</p>
                <ul
                  className={`mt-7 flex-1 space-y-3 border-t pt-7 text-sm ${featured ? 'border-white/15 text-white/85' : 'border-line text-ink'}`}
                >
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Icon name="check" className={`mt-0.5 size-4 shrink-0 ${featured ? 'text-gold-light' : 'text-gold'}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button href={`/services#${s.slug}`} variant={featured ? 'white' : 'navy'} className="mt-8 self-start">
                  Read more
                </Button>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

/** Refine-style alternating editorial rows: footage and the full description for each discipline. */
export function DisciplineRows() {
  const root = useRef(null)
  const reduce = useReducedMotion()
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray('[data-drift]', root.current).forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} aria-label="Disciplines in detail" className="bg-white">
      {services.map((s, i) => (
        <article key={s.slug} id={s.slug} className="section-y border-t border-line first:border-t-0">
          <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-night lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}
            >
              <div data-drift className="absolute inset-x-0 -top-[8%] h-[116%]">
                <VideoBg
                  video={videos[s.video]}
                  playing={!reduce}
                  label={`${s.title} video`}
                  controlClassName="right-4 bottom-4"
                />
              </div>
            </div>
            <div className="lg:col-span-6">
              <span className="font-serif text-xl text-gold italic">{s.num}</span>
              <Reveal as="h2" className="mt-3 text-[length:var(--text-h2)] leading-[1.06]">
                {s.title}
              </Reveal>
              <Reveal as="p" delay={0.08} className="mt-6 leading-relaxed text-muted">
                {s.body}
              </Reveal>
              <Reveal delay={0.15} className="mt-8">
                <Button href="/contact" variant="navy">
                  Discuss your project
                </Button>
              </Reveal>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
