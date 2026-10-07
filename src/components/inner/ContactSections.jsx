import { motion } from 'framer-motion'
import { contact, photos, site } from '../../content/site'
import { emphasize, stripMarkers } from '../../utils/helpers'
import { EnquiryForm, LocalTime } from '../ContactSection'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'

const EASE = [0.22, 1, 0.36, 1]
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay },
})

/** Mercury contact-style header: centred title, then the three ways to reach us as cards. */
export function ContactHeader() {
  const { hero } = contact
  const lines = hero.title
  return (
    <section className="bg-white px-5 pt-44 pb-10 sm:px-8 md:pt-52">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p className="label text-gold-ink" {...fadeUp(0.2)}>
          {hero.label}
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
        <motion.p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted" {...fadeUp(0.5)}>
          {hero.sub}
        </motion.p>
      </div>
      <motion.ul className="mx-auto mt-14 grid max-w-5xl gap-3 md:grid-cols-3" {...fadeUp(0.65)}>
        {contact.details.map((d) => (
          <li key={d.label} className="flex flex-col rounded-3xl border border-line bg-mist p-7">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-navy text-white">
              <Icon name={d.icon} className="size-4" />
            </span>
            <p className="label mt-6 text-gold-ink">{d.label}</p>
            {d.lines.map((l, j) =>
              d.href && j === 0 ? (
                <a key={l} href={d.href} className="link-underline mt-2 w-fit font-display text-xl font-light text-navy">
                  {l}
                </a>
              ) : (
                <p key={l} className={j === 0 ? 'mt-2 font-display text-xl font-light text-navy' : 'mt-1 text-sm text-muted'}>
                  {l}
                </p>
              ),
            )}
          </li>
        ))}
      </motion.ul>
    </section>
  )
}

/** Form card beside a tall column of the office photo and the map. */
export function ContactMain() {
  return (
    <section aria-labelledby="enquiry-title" className="bg-white px-3 pt-6 pb-24 sm:px-[30px] md:pb-32">
      <div className="mx-auto grid max-w-[1400px] gap-3 lg:grid-cols-12">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgba(34,53,91,0.45)] sm:p-10 lg:col-span-7">
          <p className="label text-gold-ink">Confidential by default</p>
          <h2 id="enquiry-title" className="mt-3 mb-8 text-[clamp(1.75rem,1.35rem+1.2vw,2.5rem)] leading-tight">
            Request a confidential <em className="accent-italic">discussion</em>.
          </h2>
          <EnquiryForm />
        </div>
        <div className="grid gap-3 lg:col-span-5">
          <Reveal className="relative min-h-[300px] overflow-hidden rounded-3xl bg-night">
            <img
              src={photos.contact}
              alt="The Dubai World Trade Centre tower"
              loading="lazy"
              className="absolute inset-0 size-full object-cover object-[50%_68%]"
            />
            {/* a light navy wash pulls the sky into the brand palette */}
            <div className="absolute inset-0 bg-navy/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="label text-gold-light">Our office</p>
              <p className="mt-2 font-display text-2xl font-light">{site.office[0]}</p>
              <p className="text-sm text-white/75">{site.office[1]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[300px] overflow-hidden rounded-3xl border border-line bg-mist">
            <iframe
              title="Map showing the Shaw Stearns office at Trade Centre First, Dubai"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale-[0.6]"
            />
            <span className="label glass absolute bottom-4 left-4 rounded-full !border-white/40 !bg-navy/75 px-3 py-1.5 !text-[0.5625rem]">
              Dubai · <LocalTime /> local
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
