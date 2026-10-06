import { lazy, Suspense, useEffect } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { loaders } from './pages/loaders'
import { initSmoothScroll, resetScroll } from './utils/scrollAnimations'

const Home = lazy(loaders.home)
const About = lazy(loaders.about)
const Services = lazy(loaders.services)
const Careers = lazy(loaders.careers)
const Contact = lazy(loaders.contact)
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  useEffect(() => initSmoothScroll(), [])

  return (
    // reducedMotion="user" makes every Framer Motion animation respect prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <Navigation />
      <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
        {/* Subtle page change: outgoing page fades, incoming page fades up a few pixels. */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
        >
          <main id="main">
            <Suspense fallback={<div className="h-screen bg-mist" />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
      <ScrollToTop />
    </MotionConfig>
  )
}
