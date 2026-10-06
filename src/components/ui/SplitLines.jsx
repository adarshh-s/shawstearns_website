import { motion } from 'framer-motion'
import { emphasize, stripMarkers } from '../../utils/helpers'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Line-by-line masked text reveal. `lines` is an array of strings; each line slides
 * up from behind a mask. Screen readers get the whole heading as one label.
 * `animate` triggers immediately (hero); otherwise it triggers on scroll.
 */
export default function SplitLines({ as = 'h2', lines, className, delay = 0, stagger = 0.12, animate = false, ...rest }) {
  const Tag = motion[as]
  const trigger = animate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <Tag
      className={className}
      aria-label={lines.map(stripMarkers).join(' ')}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
      {...rest}
    >
      {lines.map((line, i) => (
        <span key={i} className="line-mask" aria-hidden="true">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 1, ease: EASE } },
            }}
          >
            {emphasize(line)}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
