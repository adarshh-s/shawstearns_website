import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToHash } from '../utils/scrollAnimations'
import Icon from './ui/Icon'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Hide once the footer (which has its own back-to-top control) comes into view
        const footer = document.querySelector('footer')
        const footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight : false
        setShow(window.scrollY > window.innerHeight * 1.2 && !footerVisible)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => scrollToHash('#top')}
          aria-label="Back to top"
          className="fixed right-5 bottom-5 z-40 inline-flex size-12 items-center justify-center rounded-full bg-gold-ink text-white shadow-lg shadow-navy/20 transition-colors hover:bg-navy sm:right-8 sm:bottom-8"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="arrowUp" className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
