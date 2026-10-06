import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fade + slide-up when scrolled into view (Framer Motion `whileInView`). */
export default function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent/child variants for staggered groups of cards. */
export const staggerParent = (stagger = 0.15, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

export const fadeUpChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}
