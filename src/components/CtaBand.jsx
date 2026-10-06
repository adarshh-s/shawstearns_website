import { cta } from '../content/site'
import { emphasize } from '../utils/helpers'
import Beam from './ui/Beam'
import Button from './ui/Button'
import { Logo } from './ui/Logo'
import Reveal from './ui/Reveal'

/** Refine-style closing panel: deep navy, a single beam of light, the invitation on the left. */
export default function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-white px-3 sm:px-[30px]">
      <div className="relative overflow-hidden bg-night text-white">
        <Beam className="left-[86%] md:left-[64%]" />
        <div className="relative flex flex-col justify-between gap-14 px-7 py-24 sm:px-14 md:flex-row md:items-center md:py-32">
          <div className="max-w-xl">
            <Reveal as="p" className="label text-gold-light">
              {cta.label}
            </Reveal>
            <Reveal
              as="h2"
              id="cta-title"
              delay={0.05}
              className="mt-6 text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.08] !text-white [&_.accent-italic]:!text-gold-light"
            >
              {emphasize(cta.title)}
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <Button href={cta.action.to} variant="white">
                {cta.action.label}
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden border-x border-white/50 px-6 py-3 md:block">
            <Logo className="h-4 text-white" />
          </Reveal>
        </div>
        <div aria-hidden="true" className="relative h-1 bg-gradient-to-r from-gold-ink via-gold-light to-gold-ink" />
      </div>
    </section>
  )
}
