import { motion } from 'framer-motion'
import { emphasize, stripMarkers } from '../../utils/helpers'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay },
})

/** Mercury-style centred light header: label, large serif headline, one line of support. */
export default function LightHero({ label, title, sub, children, className = '' }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section className={`bg-white px-5 pt-44 pb-16 sm:px-8 md:pt-52 ${className}`}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.p className="label text-gold-ink" {...fadeUp(0.2)}>
          {label}
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
        {sub && (
          <motion.p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted" {...fadeUp(0.5)}>
            {sub}
          </motion.p>
        )}
      </div>
      {children}
    </section>
  )
}
