import { useState } from 'react'
import { motion } from 'framer-motion'
import { home } from '../content/site'
import { emphasize } from '../utils/helpers'
import Icon from './ui/Icon'
import { fadeUpChild, staggerParent } from './ui/Reveal'

/**
 * Sectors as a Refine-style editorial index: large serif rows on the left; hovering (or focusing)
 * a row brings it forward and crossfades the photograph in the rounded panel beside it.
 * Phones get a small thumbnail on each row instead of the panel.
 */
export default function SectorsLine() {
  const { sectors } = home
  const [active, setActive] = useState(0)
  return (
    <section id="sectors" aria-labelledby="sectors-title" className="bg-white py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="label text-gold-ink">{sectors.label}</p>
          <h2 id="sectors-title" className="mt-5 text-[length:var(--text-h2)] leading-[1.08]">
            {emphasize(sectors.title)}
          </h2>
          <motion.ul
            className="mt-12 border-t border-navy/10"
            variants={staggerParent(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          >
            {sectors.items.map((s, i) => {
              const on = i === active
              return (
                <motion.li key={s.name} variants={fadeUpChild} className="border-b border-navy/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group relative flex w-full items-center gap-5 py-5 text-left md:py-6"
                  >
                    <span className="w-8 shrink-0 font-serif text-sm text-gold italic">0{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-tight font-light transition-colors duration-500 ${on ? 'text-navy' : 'text-navy lg:text-navy/35 lg:group-hover:text-navy/70'}`}
                      >
                        {s.name}
                      </span>
                      <span
                        className={`mt-1 block text-sm transition-colors duration-500 ${on ? 'text-muted' : 'text-muted lg:text-muted/60'}`}
                      >
                        {s.note}
                      </span>
                    </span>
                    {/* desktop: arrow slides in on the active row; phones: a thumbnail */}
                    <Icon
                      name="arrow"
                      className={`hidden size-5 shrink-0 text-gold transition-all duration-500 lg:block ${on ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`}
                    />
                    <img
                      src={s.image}
                      alt=""
                      loading="lazy"
                      className="size-16 shrink-0 rounded-xl object-cover lg:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-px left-0 hidden h-px w-full origin-left lg:block bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] ${on ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>

        {/* Photograph panel, crossfading with the active sector */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-3xl bg-night">
            {sectors.items.map((s, i) => (
              <img
                key={s.name}
                src={s.image}
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4 text-white">
              <div>
                <p className="label text-gold-light">0{active + 1} · Sector</p>
                <p className="mt-2 font-display text-3xl font-light">{sectors.items[active].name}</p>
              </div>
              <span className="glass inline-flex h-8 shrink-0 items-center rounded-full px-3 text-xs">
                {active + 1} / {sectors.items.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
