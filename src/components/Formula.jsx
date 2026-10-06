import { motion } from 'framer-motion'
import { home } from '../content/site'
import { emphasize } from '../utils/helpers'
import Beam from './ui/Beam'
import { fadeUpChild, staggerParent } from './ui/Reveal'
import SplitLines from './ui/SplitLines'

const EASE = [0.22, 1, 0.36, 1]

// The promise, each word paired with what it means in practice.
const ROWS = [
  { word: 'Independent', note: 'No competing interests' },
  { word: 'Client-Side', note: 'Owners & developers only' },
  { word: 'Uncompromising', note: 'RICS & CIOB standards' },
]

/** Refine-style square panel: deep navy gradient split by a beam of light. */
function PromisePanel() {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-[#2f4a7c] text-white">
      <Beam className="left-1/2" />
      <motion.ul
        className="relative flex h-full flex-col justify-center gap-[10%]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.4 } } }}
      >
        {ROWS.map((r) => (
          <li key={r.word} className="grid grid-cols-[1fr_auto_1fr] items-center">
            <motion.span
              className="pr-[7%] text-right font-serif text-[clamp(1.25rem,0.9rem+1.4vw,2.25rem)] leading-none font-light"
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: EASE } } }}
            >
              {r.word}
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="size-1.5 rotate-45 bg-gold-light"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { duration: 0.8, ease: EASE } } }}
            />
            <motion.span
              className="label pl-[7%] !text-[clamp(0.5rem,0.42rem+0.3vw,0.625rem)] text-gold-light"
              variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: EASE } } }}
            >
              {r.note}
            </motion.span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

/** "Why clients choose" — the beam panel beside the four pillars as a quiet list. */
export default function Formula() {
  const { difference } = home
  return (
    <section id="difference" aria-labelledby="difference-title" className="bg-white px-3 pb-24 sm:px-[30px] md:pb-36 lg:pb-44">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <PromisePanel />
        <div className="max-w-xl px-2 lg:px-0">
          <p className="label text-gold-ink">{difference.label}</p>
          <SplitLines
            id="difference-title"
            lines={[difference.title]}
            className="mt-5 text-[length:var(--text-h2)] leading-[1.08]"
          />
          <motion.dl
            className="mt-12 divide-y divide-navy/10 border-y border-navy/10"
            variants={staggerParent(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          >
            {difference.items.map((item) => (
              <motion.div key={item.title} variants={fadeUpChild} className="py-6">
                <dt className="font-serif text-xl text-navy">{emphasize(item.title)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{item.body}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
