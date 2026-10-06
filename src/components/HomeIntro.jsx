import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { home } from '../content/site'
import Beam from './ui/Beam'
import Icon from './ui/Icon'
import Marble from './ui/Marble'
import Reveal from './ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]

// The promise, each word paired with what it means in practice (from the About copy).
const ROWS = [
  { word: 'Independent', note: 'No competing interests' },
  { word: 'Client-Side', note: 'Owners & developers only' },
  { word: 'Uncompromising', note: 'RICS & CIOB standards' },
]

/** Refine-inspired square panel: navy marble split by a beam of light, the promise either side. */
function PromisePanel() {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-navy text-white">
      <Marble tone="navy" seed={21} className="opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy/60" />
      <Beam className="left-1/2" />
      <motion.ul
        className="relative flex h-full flex-col justify-center gap-[9%]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } } }}
      >
        {ROWS.map((r) => (
          <li key={r.word} className="grid grid-cols-[1fr_auto_1fr] items-center">
            <motion.span
              className="pr-[7%] text-right font-serif text-[clamp(1.25rem,0.9rem+1.4vw,2.25rem)] leading-none"
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } } }}
            >
              {r.word}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="size-2 rotate-45 bg-gold-light"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 0.8, ease: EASE } } }}
            />
            <motion.span
              className="label pl-[7%] !text-[clamp(0.5rem,0.42rem+0.3vw,0.6875rem)] text-gold-light"
              variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } } }}
            >
              {r.note}
            </motion.span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

/** Practice introduction: promise panel beside the lead paragraph. */
export default function HomeIntro() {
  const { intro } = home
  return (
    <section id="intro" aria-labelledby="intro-title" className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Oversized faint initials behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[3%] font-serif text-[clamp(10rem,6rem+14vw,22rem)] leading-[0.85] text-navy/[0.04] select-none"
      >
        SS
      </div>
      <div className="relative grid items-center gap-12 px-3 sm:px-[30px] lg:grid-cols-2 lg:gap-20">
        <Reveal y={40}>
          <PromisePanel />
        </Reveal>
        <div className="max-w-xl px-2 lg:px-0">
          <Reveal as="p" className="label text-gold-ink">
            {intro.label}
          </Reveal>
          <Reveal as="h2" id="intro-title" delay={0.05} className="mt-5 text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-[1.35]">
            {intro.lead}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 leading-relaxed text-muted">
            {intro.body}
          </Reveal>
          <Reveal delay={0.15} className="mt-9">
            <Link
              to={intro.cta.to}
              className="group inline-flex items-center gap-3 border-b border-navy pb-1 text-sm font-medium text-navy"
            >
              {intro.cta.label}
              <Icon name="arrow" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
