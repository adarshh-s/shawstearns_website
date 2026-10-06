import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { home, services } from '../content/site'
import { prefetch } from '../pages/loaders'
import { ArrowBox } from './ui/Button'
import DotWave from './ui/DotWave'
import { fadeUpChild, staggerParent } from './ui/Reveal'
import SplitLines from './ui/SplitLines'

/** Three disciplines as open columns — artwork, number, title, one line, a square arrow. */
export default function ServiceCards() {
  return (
    <section aria-labelledby="services-title" className="section-y border-t border-line bg-white">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label text-gold-ink">{home.services.label}</p>
          <SplitLines
            id="services-title"
            lines={[home.services.title]}
            className="mt-5 text-[length:var(--text-h2)] leading-[1.08]"
          />
        </div>

        <motion.ul
          className="mt-20 grid gap-16 md:grid-cols-3 md:gap-10 lg:gap-16"
          variants={staggerParent(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {services.map((s) => (
            <motion.li key={s.slug} variants={fadeUpChild}>
              <Link to={`/services#${s.slug}`} onMouseEnter={() => prefetch('services')} className="group block">
                <div className="h-36">
                  <DotWave tone={s.wave} />
                </div>
                <div className="mt-8 border-t border-navy/10 pt-8">
                  <span className="font-serif text-gold italic">{s.num}</span>
                  <h3 className="mt-3 text-[1.625rem] leading-tight">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{s.summary}</p>
                  <div className="mt-8 flex items-center gap-3">
                    <ArrowBox tone="navy" className="!rounded-none" />
                    <span className="label !text-[0.5625rem] text-navy">Learn more</span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
