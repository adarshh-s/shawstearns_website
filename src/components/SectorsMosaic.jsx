import { motion } from 'framer-motion'
import { home } from '../content/site'
import { imgSrcSet, imgUrl } from '../utils/helpers'

const EASE = [0.22, 1, 0.36, 1]

// Refine-style mosaic: sectors alternate between photo tiles and brand-colour tiles.
const TILES = [
  { tone: 'image', image: 'photo-1486406146926-c627a92ad1ab', wide: true }, // Corporate Real Estate
  { tone: 'bg-gold-ink' }, // Retail
  { tone: 'image', image: 'photo-1600607687939-ce8a6c25118c' }, // Hospitality
  { tone: 'bg-navy' }, // Mixed-Use
  { tone: 'bg-slate' }, // Healthcare
  { tone: 'image', image: 'photo-1512453979798-5ea266f8880c', wide: true }, // Defence
]

const wipe = (i) => ({
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE, delay: (i % 4) * 0.1 } },
})

/** Sectors served as a mosaic of photo and colour tiles. */
export default function SectorsMosaic() {
  const { sectors } = home
  return (
    <section id="sectors" aria-labelledby="sectors-title" className="bg-white px-3 pb-16 sm:px-[30px] md:pb-24">
      <div className="container-x mb-10 flex items-end justify-between !px-2">
        <div>
          <p className="label text-gold-ink">{sectors.label}</p>
          <h2 id="sectors-title" className="mt-3 text-[length:var(--text-h2)] leading-[1.05]">
            Sectors we <em className="accent-italic">serve</em>.
          </h2>
        </div>
      </div>
      <motion.ul
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      >
        {sectors.items.map((name, i) => {
          const t = TILES[i]
          const isImg = t.tone === 'image'
          return (
            <motion.li
              key={name}
              variants={wipe(i)}
              className={`group relative overflow-hidden ${t.wide ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
            >
              {isImg ? (
                <>
                  <img
                    src={imgUrl(t.image, t.wide ? 1200 : 700, { height: 700 })}
                    srcSet={imgSrcSet(t.image, t.wide ? [700, 1200, 1700] : [400, 700, 1000], t.wide ? 2 : 1)}
                    sizes={t.wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
                </>
              ) : (
                <div className={`absolute inset-0 ${t.tone}`}>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </div>
              )}
              <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-7">
                <span className="font-serif text-sm text-white/70 italic">0{i + 1}</span>
                <span className="font-serif text-[clamp(1.25rem,1rem+1vw,2rem)] leading-tight">{name}</span>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}
