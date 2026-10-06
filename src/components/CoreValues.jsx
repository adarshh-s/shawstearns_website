import { motion } from 'framer-motion'
import { about } from '../content/site'
import { fadeUpChild, staggerParent } from './ui/Reveal'
import SplitLines from './ui/SplitLines'

/** Five core values. */
export default function CoreValues() {
  const { values } = about
  return (
    <section id="values" aria-labelledby="values-title" className="section-y bg-white">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="label text-gold-ink">{values.label}</p>
          <SplitLines id="values-title" lines={[values.title]} className="mt-4 text-[length:var(--text-h2)] leading-[1.05]" />
        </div>
        <motion.ol
          className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5"
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {values.items.map((v, i) => (
            <motion.li key={v.title} variants={fadeUpChild} className="group relative flex min-h-64 flex-col bg-white p-7">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="font-serif text-gold italic">0{i + 1}</span>
              <h3 className="mt-auto text-2xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
