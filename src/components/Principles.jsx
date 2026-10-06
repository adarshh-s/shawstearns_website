import { motion } from 'framer-motion'
import { about } from '../content/site'
import { fadeUpChild, staggerParent } from './ui/Reveal'

/** Why client-side, standards, mission and ethos as an editorial two-by-two grid. */
export default function Principles() {
  return (
    <section id="principles" aria-label="Our principles" className="bg-mist py-20 md:py-28">
      <motion.ul
        className="container-x grid gap-x-16 md:grid-cols-2"
        variants={staggerParent(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {about.principles.map((p) => (
          <motion.li
            key={p.title}
            variants={fadeUpChild}
            className="grid gap-4 border-t border-navy/15 py-10 sm:grid-cols-[12rem_1fr] sm:gap-8"
          >
            <h3 className="text-2xl leading-tight">{p.title}</h3>
            <p className="leading-relaxed text-muted">{p.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
