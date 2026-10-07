import { motion, useReducedMotion } from 'framer-motion'
import { home, videos } from '../content/site'
import SplitLines from './ui/SplitLines'
import VideoBg from './ui/VideoBg'

const EASE = [0.22, 1, 0.36, 1]
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

/**
 * "Why clients choose" — Origin-inspired: large rounded cards filled with calm footage and a
 * big serif-italic line, on the same dark field as the statement above.
 */
export default function Pillars({
  id = 'difference',
  label = home.difference.label,
  title = home.difference.title,
  items = home.difference.items,
}) {
  const reduce = useReducedMotion()
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-night px-3 pt-24 pb-28 md:pt-32 text-white sm:px-[30px] md:pb-40"
    >
      <div className="mx-auto max-w-2xl px-2 pt-4 text-center">
        <p className="label text-gold-light">{label}</p>
        <SplitLines
          id={`${id}-title`}
          lines={[title]}
          className="mt-5 text-[length:var(--text-h2)] leading-[1.08] !text-white [&_.accent-italic]:!text-gold-light"
        />
      </div>

      <ul className="mx-auto mt-16 grid max-w-[1400px] gap-4 lg:grid-cols-12">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            className={SPANS[i]}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: EASE, delay: (i % 2) * 0.12 }}
          >
            <article className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-navy p-8 sm:p-12 lg:min-h-[520px]">
              <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]">
                <VideoBg
                  video={videos[item.video]}
                  playing={!reduce}
                  label={`${item.title} video`}
                  controlClassName="right-5 top-5"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-night/5" />
              <div className="relative max-w-md">
                <h3 className="font-display text-[clamp(2rem,1.5rem+1.8vw,3.25rem)] leading-[1.02] font-light !text-white italic">
                  {item.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/80">{item.body}</p>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
