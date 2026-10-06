import { motion } from 'framer-motion'
import { home } from '../content/site'
import { emphasize, imgSrcSet, imgUrl } from '../utils/helpers'
import SplitLines from './ui/SplitLines'

const EASE = [0.22, 1, 0.36, 1]

// Layout for the four pillars: wide photo card, glass card / glass card, wide photo card.
const LAYOUT = [
  { span: 'lg:col-span-7', image: 'photo-1449157291145-7efd050a4d0e' },
  { span: 'lg:col-span-5' },
  { span: 'lg:col-span-5' },
  { span: 'lg:col-span-7', image: 'photo-1497366811353-6870744d04b2' },
]

/**
 * "Why clients choose" — Origin-inspired dark bento. Continues the hero's dark backdrop,
 * mixing soft-focus photo cards with quiet glass cards.
 */
export default function Difference() {
  const { difference } = home
  return (
    <section
      id="difference"
      aria-labelledby="difference-title"
      className="relative overflow-hidden bg-night pt-10 pb-24 text-white md:pb-32"
    >
      {/* soft navy glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-navy/60 blur-[140px]"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label text-gold-light">{difference.label}</p>
          <SplitLines
            id="difference-title"
            lines={[difference.title]}
            className="mt-4 text-[length:var(--text-h2)] leading-[1.05] !text-white [&_.accent-italic]:!text-gold-light"
          />
        </div>

        <ul className="mt-16 grid gap-3 lg:grid-cols-12">
          {difference.items.map((item, i) => {
            const l = LAYOUT[i]
            return (
              <motion.li
                key={item.title}
                className={l.span}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.1 }}
              >
                <article
                  className={`group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl p-8 sm:p-10 ${
                    l.image ? '' : 'border border-white/10 bg-white/[0.04] backdrop-blur-sm'
                  }`}
                >
                  {l.image && (
                    <>
                      <img
                        src={imgUrl(l.image, 1200, { height: 800 })}
                        srcSet={imgSrcSet(l.image, [700, 1200, 1600], 1.5)}
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 size-full scale-110 object-cover blur-[2px] transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.15]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/10" />
                    </>
                  )}
                  <span className="label absolute top-8 left-8 !text-[0.5625rem] text-gold-light sm:left-10">0{i + 1}</span>
                  <div className="relative">
                    <h3
                      className={`!text-white ${
                        l.image
                          ? 'text-[clamp(2rem,1.5rem+1.8vw,3.25rem)] leading-[1.02] italic'
                          : 'text-[length:var(--text-h3)] leading-tight'
                      }`}
                    >
                      {emphasize(item.title)}
                    </h3>
                    <p className="mt-4 max-w-md leading-relaxed text-white/75">{item.body}</p>
                  </div>
                </article>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
