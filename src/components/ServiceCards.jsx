import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { home, services } from '../content/site'
import { prefetch } from '../pages/loaders'
import DotWave from './ui/DotWave'
import Icon from './ui/Icon'
import { fadeUpChild, staggerParent } from './ui/Reveal'
import SplitLines from './ui/SplitLines'

/** Three disciplines as cards headed by live dotted-wave artwork in navy, slate and gold. */
export default function ServiceCards() {
  return (
    <section aria-labelledby="services-title" className="section-y bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="label text-gold-ink">{home.services.label}</p>
            <SplitLines
              id="services-title"
              lines={[home.services.title]}
              className="mt-4 text-[length:var(--text-h2)] leading-[1.05]"
            />
          </div>
          <Link
            to="/services"
            onMouseEnter={() => prefetch('services')}
            className="group inline-flex items-center gap-2 text-sm font-medium text-navy"
          >
            <span className="link-underline">All services</span>
            <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.ul
          className="mt-14 grid gap-4 md:grid-cols-3"
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {services.map((s) => (
            <motion.li key={s.slug} variants={fadeUpChild}>
              <Link
                to={`/services#${s.slug}`}
                onMouseEnter={() => prefetch('services')}
                className="group flex h-full flex-col border border-line bg-white transition-[border-color,box-shadow] duration-500 hover:border-navy/30 hover:shadow-[0_30px_60px_-30px_rgba(34,53,91,0.35)]"
              >
                <div className="h-44 border-b border-line bg-white sm:h-52">
                  <DotWave tone={s.wave} />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-serif text-gold italic">{s.num}</span>
                  <h3 className="mt-2 text-2xl leading-tight">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                  <span className="label mt-8 inline-flex items-center gap-2 text-gold-ink">
                    Learn more
                    <Icon name="arrow" className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
