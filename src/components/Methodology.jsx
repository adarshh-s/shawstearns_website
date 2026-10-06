import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { servicesPage } from '../content/site'
import DotWave from './ui/DotWave'
import Icon from './ui/Icon'
import SplitLines from './ui/SplitLines'
import Reveal from './ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]

/** The 8-step RIBA-aligned methodology as an accessible tab panel. */
export default function Methodology() {
  const { method } = servicesPage
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const step = method.steps[active]
  const n = method.steps.length

  const select = (i) => {
    const next = (i + n) % n
    setActive(next)
    tabs.current[next]?.focus()
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') (e.preventDefault(), select(active + 1))
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') (e.preventDefault(), select(active - 1))
    if (e.key === 'Home') (e.preventDefault(), select(0))
    if (e.key === 'End') (e.preventDefault(), select(n - 1))
  }

  return (
    <section id="methodology" aria-labelledby="method-title" className="section-y bg-mist">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label text-gold-ink">{method.label}</p>
          <SplitLines id="method-title" lines={[method.title]} className="mt-4 text-[length:var(--text-h2)] leading-[1.05]" />
          <Reveal as="p" delay={0.1} className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            {method.intro}
          </Reveal>
        </div>

        {/* Tabs with a progress rail */}
        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute top-[1.35rem] right-[6%] left-[6%] hidden h-px bg-navy/15 md:block">
            <motion.div
              className="h-full origin-left bg-gold"
              animate={{ scaleX: active / (n - 1) }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </div>
          <div
            role="tablist"
            aria-label="Methodology stages"
            onKeyDown={onKey}
            className="relative grid grid-cols-4 gap-y-6 md:grid-cols-8"
          >
            {method.steps.map((s, i) => {
              const on = i === active
              return (
                <button
                  key={s.name}
                  ref={(el) => (tabs.current[i] = el)}
                  role="tab"
                  id={`method-tab-${i}`}
                  aria-selected={on}
                  aria-controls="method-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    className={`relative z-10 inline-flex size-11 items-center justify-center rounded-full border font-serif text-lg transition-colors duration-300 ${
                      on
                        ? 'border-navy bg-navy text-white'
                        : i < active
                          ? 'border-gold bg-white text-gold-ink'
                          : 'border-navy/20 bg-mist text-navy group-hover:border-navy'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`label !text-[0.5625rem] transition-colors ${on ? 'text-navy' : 'text-muted group-hover:text-navy'}`}
                  >
                    {s.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stakeholders run through every stage */}
        <div aria-hidden="true" className="relative mt-10 h-24">
          <DotWave tone="slate" density={0.9} speed={0.6} />
          <span className="label absolute top-1/2 left-1/2 -translate-1/2 bg-gold-ink px-3 py-1.5 !text-[0.5625rem] text-white">
            Stakeholders
          </span>
        </div>

        <div id="method-panel" role="tabpanel" aria-labelledby={`method-tab-${active}`} className="mt-8 bg-navy text-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div>
                <span className="font-serif text-gold-light italic">{String(active + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-[length:var(--text-h3)] !text-white">{step.name}</h3>
                <p className="label mt-3 !text-[0.5625rem] text-gold-light">{step.riba}</p>
                <div className="mt-10 flex gap-2">
                  {[
                    { d: -1, icon: 'chevronLeft', label: 'Previous stage' },
                    { d: 1, icon: 'chevronRight', label: 'Next stage' },
                  ].map((b) => (
                    <button
                      key={b.icon}
                      type="button"
                      onClick={() => setActive((active + b.d + n) % n)}
                      aria-label={b.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-navy"
                    >
                      <Icon name={b.icon} className="size-4" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <ul className="space-y-4">
                  {step.points.map((p) => (
                    <li key={p} className="flex gap-4 border-b border-white/15 pb-4 leading-relaxed text-white/90">
                      <Icon name="check" className="mt-1 size-4 shrink-0 text-gold-light" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-l-2 border-gold-light pl-5 font-serif text-lg leading-snug text-white italic">
                  <span className="not-italic label mr-2 !text-[0.5625rem] text-gold-light">Outcome</span>
                  {step.outcome}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
