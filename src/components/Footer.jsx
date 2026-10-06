import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { home, nav, services, site } from '../content/site'
import { prefetch } from '../pages/loaders'
import { emphasize } from '../utils/helpers'
import { scrollToHash } from '../utils/scrollAnimations'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { Logo } from './ui/Logo'
import Marble from './ui/Marble'

function DubaiTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <time>{new Intl.DateTimeFormat('en-GB', { timeZone: site.timezone, hour: '2-digit', minute: '2-digit' }).format(now)}</time>
  )
}

const heading = 'label !text-[0.5625rem] text-gold-light'
const link = 'link-underline py-1 text-sm text-white/80 hover:text-white'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <Marble tone="navy" seed={3} className="opacity-35" />
      <div className="container-x relative pt-24 pb-10 md:pt-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="font-serif text-[length:var(--text-hero)] leading-[0.98] text-white [&_.accent-italic]:text-gold-light">
            {emphasize(home.hero.title)}
          </p>
          <div className="md:pb-3">
            <Button href="/contact" variant="white">
              Request a confidential discussion
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/15 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-[18px] text-white" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">{site.footerBlurb}</p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={heading}>Navigation</h2>
            <ul className="mt-4 space-y-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} onMouseEnter={() => prefetch(n.key)} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className={heading}>Services</h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className={link}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h2 className={heading}>Office</h2>
            <address className="mt-4 text-sm leading-relaxed text-white/80 not-italic">
              {site.office.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`mailto:${site.email}`} className="link-underline mt-3 inline-block text-white">
                {site.email}
              </a>
            </address>
            <p className="label mt-4 !text-[0.5625rem] text-white/60">
              Dubai · <DubaiTime />
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-serif text-sm text-white/70 italic">{site.promise.join(' · ')}</p>
          <button
            type="button"
            onClick={() => scrollToHash('#top')}
            aria-label="Back to top"
            className="group inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-navy"
          >
            <Icon name="arrowUp" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="relative h-1 bg-gradient-to-r from-gold-ink via-gold-light to-gold-ink" />
    </footer>
  )
}
