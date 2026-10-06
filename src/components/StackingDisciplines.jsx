import { useRef } from 'react'
import { services, servicesPage } from '../content/site'
import { gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import DotWave from './ui/DotWave'
import Icon from './ui/Icon'
import SplitLines from './ui/SplitLines'

const TONE = { navy: 'bg-mist', slate: 'bg-[#eef0f4]', gold: 'bg-sand' }

/** The three disciplines as sticky cards that stack; each sinks back as the next slides over. */
export default function StackingDisciplines() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const cards = gsap.utils.toArray('[data-card]', root.current)
        cards.slice(0, -1).forEach((card, i) => {
          const st = { trigger: cards[i + 1], start: 'top bottom', end: 'top 15%', scrub: true }
          gsap.to(card, { scale: 0.93, ease: 'none', scrollTrigger: st })
          gsap.to(card.querySelector('[data-shade]'), { opacity: 0.6, ease: 'none', scrollTrigger: { ...st } })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="disciplines-title" className="bg-white px-3 pt-24 pb-16 sm:px-[30px] md:pt-32">
      <div className="container-x mb-14 !px-2">
        <p className="label text-gold-ink">{servicesPage.howWeWork.label}</p>
        <SplitLines
          id="disciplines-title"
          lines={[servicesPage.howWeWork.title]}
          className="mt-4 max-w-3xl text-[length:var(--text-h2)] leading-[1.05]"
        />
      </div>
      <ol className="space-y-6">
        {services.map((d, i) => (
          <li key={d.slug} id={d.slug} className="sticky" style={{ top: `${96 + i * 24}px` }}>
            <article
              data-card
              className={`relative grid origin-top overflow-hidden text-navy lg:min-h-[76vh] lg:grid-cols-2 ${TONE[d.wave]}`}
            >
              <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
                <div>
                  <span className="font-serif text-xl text-gold italic">{d.num}</span>
                  <h2 className="mt-4 text-[length:var(--text-h2)] leading-[1.05]">{d.title}</h2>
                  <p className="mt-6 max-w-lg leading-relaxed text-muted">{d.body}</p>
                </div>
                <div>
                  <ul className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
                    {d.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 border-t border-navy/10 pt-3">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant="navy" className="mt-10">
                    Discuss your project
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[240px] border-t border-navy/10 lg:border-t-0 lg:border-l">
                <DotWave tone={d.wave} density={1.2} />
              </div>
              <div data-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white opacity-0" />
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
