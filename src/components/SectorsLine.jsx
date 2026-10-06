import { motion } from 'framer-motion'
import { home } from '../content/site'
import { fadeUpChild, staggerParent } from './ui/Reveal'

/** Sectors as one calm, centred row separated by hairlines (like Refine's partner strip). */
export default function SectorsLine() {
  const { sectors } = home
  return (
    <section id="sectors" aria-labelledby="sectors-title" className="section-y bg-white">
      <div className="container-x text-center">
        <p className="label text-gold-ink">{sectors.label}</p>
        <h2 id="sectors-title" className="mt-5 text-[length:var(--text-h2)] leading-[1.08]">
          Sectors we <em className="accent-italic">serve</em>.
        </h2>
        <motion.ul
          className="mx-auto mt-16 flex max-w-6xl flex-wrap items-center justify-center gap-y-8"
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {sectors.items.map((s, i) => (
            <motion.li key={s} variants={fadeUpChild} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className="mx-6 h-8 w-px bg-navy/15 md:mx-8" />}
              <span className="font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] font-light tracking-[-0.01em] text-navy">
                {s}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
