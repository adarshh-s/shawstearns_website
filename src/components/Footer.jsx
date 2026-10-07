import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { nav, services, site } from '../content/site'
import { prefetch } from '../pages/loaders'
import { scrollToHash } from '../utils/scrollAnimations'
import Icon from './ui/Icon'
import { Logo } from './ui/Logo'

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

const heading = 'label !text-[0.5625rem] text-muted'
const link = 'link-underline py-1 text-sm text-navy hover:text-gold-ink'

/** Refine-style white footer: quiet, spacious, everything in its place. */
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white pt-24 pb-10">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" aria-label={`${site.name} — home`}>
            <Logo className="h-[18px] text-navy" />
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-10 gap-y-2">
              {[{ to: '/', key: 'home', label: 'Home' }, ...nav].map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onMouseEnter={() => prefetch(n.key)}
                    className="label link-underline py-2 text-navy hover:text-gold-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-14 md:grid-cols-12">
          <p className="max-w-sm text-sm leading-relaxed text-muted md:col-span-5">{site.footerBlurb}</p>
          <div className="md:col-span-3 md:col-start-7">
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
          <div className="md:col-span-3">
            <h2 className={heading}>Office</h2>
            <address className="mt-4 text-sm leading-relaxed text-navy not-italic">
              {site.office.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={`mailto:${site.email}`} className="link-underline mt-3 inline-block hover:text-gold-ink">
                {site.email}
              </a>
            </address>
            <p className="label mt-4 !text-[0.5625rem] text-muted">
              Dubai · <DubaiTime />
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-serif text-sm italic">{site.promise.join(' · ')}</p>
          <button
            type="button"
            onClick={() => scrollToHash('#top')}
            aria-label="Back to top"
            className="group inline-flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy hover:bg-navy hover:text-white"
          >
            <Icon name="arrowUp" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
