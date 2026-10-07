import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { about, photos, videos } from '../../content/site'
import { emphasize } from '../../utils/helpers'
import { gsap, MOTION_OK, useGSAP } from '../../utils/scrollAnimations'
import Icon from '../ui/Icon'
import { Mark } from '../ui/Logo'
import Reveal, { fadeUpChild, staggerParent } from '../ui/Reveal'
import SplitLines from '../ui/SplitLines'
import VideoBg from '../ui/VideoBg'

const EASE = [0.22, 1, 0.36, 1]

/** Wide rounded media card under the light hero; it opens out slightly as it scrolls in. */
export function AboutMedia() {
  const root = useRef(null)
  const reduce = useReducedMotion()
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          root.current,
          { clipPath: 'inset(0% 6% 0% 6% round 28px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 28px)',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 25%', scrub: 0.6 },
          },
        )
      })
    },
    { scope: root },
  )
  return (
    <div className="bg-white px-3 sm:px-[30px]">
      <motion.div
        ref={root}
        className="relative mx-auto aspect-[4/5] max-w-[1400px] overflow-hidden rounded-[28px] bg-night sm:aspect-[21/9]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
      >
        <div className="absolute inset-0">
          <VideoBg video={videos.skyline} playing={!reduce} label="About video" controlClassName="right-5 bottom-5" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />
        <span className="label glass absolute bottom-5 left-5 rounded-full px-3 py-1.5 !text-[0.5625rem]">
          Dubai · United Arab Emirates
        </span>
      </motion.div>
    </div>
  )
}

/** Mercury-style editorial split: photograph beside the practice statement and the "not" lines. */
export function PracticeSplit() {
  const root = useRef(null)
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray('[data-strike]', root.current).forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { trigger: line.parentElement, start: 'top 80%', end: 'top 55%', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} aria-labelledby="practice-title" className="section-y bg-white">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-mist">
            <img src={photos.lobby} alt="A calm, light-filled office lobby" loading="lazy" className="size-full object-cover" />
            <div className="glass absolute right-4 bottom-4 left-4 flex items-center gap-4 rounded-2xl !border-white/30 !bg-night/45 p-4">
              <Mark className="h-9 text-white" />
              <p className="text-sm leading-snug text-white">{about.exclusive}</p>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <p className="label text-gold-ink">The practice</p>
          <SplitLines
            id="practice-title"
            lines={[about.hero.sub]}
            className="mt-5 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.2]"
          />
          <ul className="mt-10 space-y-1">
            {about.notList.map((l) => (
              <li
                key={l}
                className="relative w-fit font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.25rem)] leading-[1.25] font-light text-navy/40"
              >
                {l}
                <span data-strike aria-hidden="true" className="absolute top-[55%] left-0 h-px w-full origin-left bg-gold" />
              </li>
            ))}
          </ul>
          <Reveal as="p" className="mt-10 max-w-xl border-l-2 border-gold pl-6 leading-relaxed text-muted">
            {about.leadership}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * Mercury-style explorer: the four principles as a list on the left; the active one expands
 * and the footage on the right changes to match. Hover or click to switch.
 */
export function PrinciplesExplorer() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const items = about.principles
  return (
    <section
      aria-labelledby="principles-title"
      className="relative overflow-hidden bg-night px-3 py-24 text-white sm:px-[30px] md:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[20%] h-[50vh] w-[50vw] -translate-y-1/2 rounded-full bg-navy/70 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12">
        <div className="px-2 lg:col-span-5">
          <p className="label text-gold-light">Our principles</p>
          <SplitLines
            id="principles-title"
            lines={['Independence is our *mandate*.']}
            className="mt-5 text-[length:var(--text-h2)] leading-[1.06] !text-white [&_.accent-italic]:!text-gold-light"
          />
          <ul className="mt-12 border-t border-white/12">
            {items.map((p, i) => {
              const on = i === active
              return (
                <li key={p.title} className="border-b border-white/12">
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className={`size-1.5 rounded-full transition-colors ${on ? 'bg-gold-light' : 'bg-white/30'}`} />
                    <span
                      className={`flex-1 font-display text-2xl font-light transition-colors ${on ? 'text-white' : 'text-white/55'}`}
                    >
                      {p.title}
                    </span>
                    <Icon
                      name="chevronRight"
                      className={`size-4 transition-transform ${on ? 'rotate-90 text-gold-light' : 'text-white/40'}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden pr-6 pb-6 pl-6 text-sm leading-relaxed text-white/70"
                      >
                        {p.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/12 bg-navy">
            {items.map((p, i) => (
              <div
                key={p.title}
                className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              >
                <VideoBg
                  video={videos[p.video]}
                  playing={!reduce && i === active}
                  label={`${p.title} video`}
                  controlClassName="hidden"
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 font-display text-3xl font-light text-white italic">{items[active].title}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const TILE = ['bg-navy', 'image', 'bg-gold-ink', 'bg-slate', 'bg-[#1a2a4a]']

/** Refine-style mosaic: the five core values as colour tiles, with one photo tile. */
export function ValuesMosaic() {
  const { values } = about
  return (
    <section aria-labelledby="values-title" className="section-y bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="label text-gold-ink">{values.label}</p>
            <SplitLines id="values-title" lines={[values.title]} className="mt-5 text-[length:var(--text-h2)] leading-[1.06]" />
          </div>
        </div>
        <motion.ul
          className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {values.items.map((v, i) => {
            const tone = TILE[i]
            return (
              <motion.li
                key={v.title}
                variants={fadeUpChild}
                className={`group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl p-8 text-white ${tone === 'image' ? 'bg-night' : tone} ${i === 0 ? 'lg:row-span-2 lg:min-h-full' : ''}`}
              >
                {tone === 'image' && (
                  <>
                    <img
                      src={photos.careers}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />
                  </>
                )}
                <span className="relative font-serif text-white/70 italic">0{i + 1}</span>
                <div className="relative">
                  <h3 className={`!text-white ${i === 0 ? 'text-[clamp(2.25rem,1.6rem+2vw,3.5rem)]' : 'text-3xl'} leading-tight`}>
                    {v.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">{v.body}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}

const CREDS = [
  ['RICS', 'Royal Institution of Chartered Surveyors'],
  ['CIOB', 'Chartered Institute of Building'],
  ['Chartered', 'Surveyors'],
  ['Chartered', 'Construction Managers'],
]

/** Mercury "Backed by the best"-style credentials row. */
export function Credentials() {
  return (
    <section aria-labelledby="creds-title" className="border-y border-line bg-mist py-20">
      <div className="container-x text-center">
        <h2 id="creds-title" className="text-[clamp(1.5rem,1.2rem+1vw,2.25rem)]">
          Conducted to <em className="accent-italic">British</em> professional standards.
        </h2>
        <Reveal className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {CREDS.map(([a, b]) => (
            <div key={b} className="px-4 md:border-l md:border-navy/10 md:first:border-l-0">
              <p className="font-display text-3xl font-light text-navy">{a}</p>
              <p className="mt-2 text-xs text-muted">{b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
