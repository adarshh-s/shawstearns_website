import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { announcement, nav, site } from '../content/site'
import { prefetch } from '../pages/loaders'
import { lockScroll } from '../utils/scrollAnimations'
import Icon from './ui/Icon'
import { Logo, Mark } from './ui/Logo'

const EASE = [0.22, 1, 0.36, 1]
const BAR_H = 40 // announcement bar height (px)
const keyOf = (to) => to.split('/')[1].split('#')[0] || 'home'

/**
 * Is the page behind the header dark? Samples the elements under the header's centre line
 * and takes the first opaque background, so the header can switch to white text over
 * dark sections (as on scale.com) without each section having to opt in.
 */
function useDarkBehind(headerRef, deps) {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const header = headerRef.current
      if (!header) return
      const y = header.getBoundingClientRect().bottom - 8
      // Every element stacked at that point, topmost first; the first opaque background wins.
      const stack = document.elementsFromPoint(window.innerWidth / 2, y).filter((n) => !header.contains(n))
      for (const node of stack) {
        // Only section-sized backgrounds count — ignore buttons, cards and tiles.
        if (node.getBoundingClientRect().width < window.innerWidth * 0.5) continue
        const m = getComputedStyle(node).backgroundColor.match(/rgba?\(([^)]+)\)/)
        if (!m) continue
        const [r, g, b, a = 1] = m[1].split(',').map(Number)
        if (a > 0.5) {
          setDark(0.2126 * r + 0.7152 * g + 0.0722 * b < 110)
          return
        }
      }
      setDark(false)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('page:ready', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('page:ready', onScroll)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
  return dark
}

/** Thin navy announcement strip above the header; dismissal lasts for the session. */
function AnnouncementBar({ onClose }) {
  return (
    <div className="absolute inset-x-0 top-0 z-[51] flex h-10 items-center justify-center bg-navy-deep px-12 text-[13px] text-white">
      <Link to={announcement.to} className="group flex items-center gap-3 truncate" onMouseEnter={() => prefetch('contact')}>
        <Mark className="h-3.5 shrink-0 text-white" />
        <span className="truncate">{announcement.label}</span>
        <span className="hidden items-center gap-1 text-gold-light sm:inline-flex">
          {announcement.action}
          <Icon name="arrow" className="size-3 -rotate-45 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss announcement"
        className="absolute right-3 inline-flex size-8 items-center justify-center text-white/70 hover:text-white"
      >
        <Icon name="close" className="size-3.5" />
      </button>
    </div>
  )
}

/** Full-width dropdown: grouped links on the left, a feature card on the right. */
function MegaPanel({ item, onNavigate }) {
  const { groups, feature } = item.menu
  return (
    <motion.div
      key={item.to}
      id="mega-panel"
      className="container-x grid gap-10 py-12 lg:grid-cols-12"
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:pl-[7.5rem]">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-sm text-muted">{g.title}</p>
            <ul className="mt-4 space-y-3">
              {g.links.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                  }}
                >
                  <Link
                    to={l.to}
                    onClick={onNavigate}
                    onMouseEnter={() => prefetch(keyOf(l.to))}
                    className="group inline-flex items-center gap-2 text-lg text-navy transition-colors hover:text-gold-ink"
                  >
                    {l.label}
                    <Icon
                      name="arrow"
                      className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
        className="hidden lg:col-span-6 lg:block"
      >
        <Link
          to={feature.to}
          onClick={onNavigate}
          className="group relative block aspect-[2.2/1] overflow-hidden rounded-xl bg-navy"
        >
          <img
            src={feature.image}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />
          <span className="absolute bottom-5 left-6 font-display text-2xl font-light tracking-[-0.01em] text-white">
            {feature.caption}
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

/** Mobile: full-screen sheet with large items; items with menus slide to a sub-list. */
function MobileSheet({ onClose }) {
  const [sub, setSub] = useState(null)
  const item = nav.find((n) => n.to === sub)
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-mist"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
        <Link to="/" onClick={onClose} aria-label={`${site.name} — home`}>
          <Logo className="h-4 text-navy" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-10 items-center justify-center rounded-lg bg-black/[0.06]"
        >
          <Icon name="close" className="size-4" />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {!item ? (
            <motion.ul
              key="root"
              className="px-5 pt-6"
              initial={{ x: '-30%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-30%', opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {[{ to: '/', key: 'home', label: 'Home' }, ...nav].map((n) => (
                <li key={n.to}>
                  {n.menu ? (
                    <button
                      type="button"
                      onClick={() => setSub(n.to)}
                      className="flex w-full items-center justify-between py-3 text-left font-display text-[2.25rem] leading-tight font-light tracking-[-0.01em] text-navy"
                    >
                      {n.label}
                      <Icon name="chevronRight" className="size-5 text-muted" />
                    </button>
                  ) : (
                    <Link
                      to={n.to}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 font-display text-[2.25rem] leading-tight font-light tracking-[-0.01em] text-navy"
                    >
                      {n.label}
                      <Icon name="chevronRight" className="size-5 text-muted" />
                    </Link>
                  )}
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="sub"
              className="px-5 pt-4"
              initial={{ x: '30%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '30%', opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <button type="button" onClick={() => setSub(null)} className="flex items-center gap-2 py-2 text-sm text-muted">
                <Icon name="chevronLeft" className="size-4" /> Back
              </button>
              <Link
                to={item.to}
                onClick={onClose}
                className="mt-2 block font-display text-[2.25rem] leading-tight font-light tracking-[-0.01em] text-navy"
              >
                {item.label}
              </Link>
              {item.menu.groups.map((g) => (
                <div key={g.title} className="mt-8">
                  <p className="text-sm text-muted">{g.title}</p>
                  <ul className="mt-3 space-y-1">
                    {g.links.map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} onClick={onClose} className="flex items-center justify-between py-2 text-xl text-navy">
                          {l.label}
                          <Icon name="arrow" className="size-4 text-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="m-4 grid grid-cols-2 gap-2 rounded-xl bg-white p-2">
        <Link
          to="/careers"
          onClick={onClose}
          className="flex h-12 items-center justify-center rounded-lg border border-navy/15 text-sm text-navy"
        >
          Careers
        </Link>
        <Link
          to="/contact"
          onClick={onClose}
          className="flex h-12 items-center justify-center rounded-lg bg-navy text-sm text-white"
        >
          Request a discussion
        </Link>
      </div>
    </motion.div>
  )
}

/**
 * Scale-inspired navigation: a dismissible announcement strip, then a full-width header with
 * the wordmark and links on the left and two actions on the right. About and Services open
 * full-width frosted panels. The header switches to white over dark sections.
 */
export default function Navigation() {
  const { pathname, hash } = useLocation()
  const headerRef = useRef(null)
  const closeTimer = useRef(0)
  const [open, setOpen] = useState(null) // nav item `to` whose panel is open
  const [mobile, setMobile] = useState(false)
  const [bar, setBar] = useState(() => {
    try {
      return sessionStorage.getItem('ss-announce') !== 'off'
    } catch {
      return true
    }
  })
  const [offset, setOffset] = useState(BAR_H)
  const [scrolled, setScrolled] = useState(false)
  const dark = useDarkBehind(headerRef, [pathname, bar])
  const lightText = dark && !open

  // Header rides below the announcement bar, then sticks to the top once it scrolls away.
  useEffect(() => {
    const onScroll = () => {
      setOffset(bar ? Math.max(0, BAR_H - window.scrollY) : 0)
      setScrolled(window.scrollY > (bar ? BAR_H + 10 : 10))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [bar])

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname, hash])

  // Escape closes; scrolling is paused while the mobile sheet is open.
  useEffect(() => {
    if (!open && !mobile) return
    if (mobile) lockScroll(true)
    const onKey = (e) => e.key === 'Escape' && (setOpen(null), setMobile(false))
    document.addEventListener('keydown', onKey)
    return () => {
      if (mobile) lockScroll(false)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, mobile])

  const dismissBar = () => {
    setBar(false)
    try {
      sessionStorage.setItem('ss-announce', 'off')
    } catch {
      /* storage unavailable — dismissal lasts until reload */
    }
  }

  // Hover intent for desktop: open immediately, close after a short grace period.
  const hoverOpen = useCallback((to) => {
    clearTimeout(closeTimer.current)
    setOpen(to)
  }, [])
  const hoverClose = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 180)
  }, [])

  const openItem = nav.find((n) => n.to === open)
  const tone = lightText ? 'text-white' : 'text-navy'
  const surface = open
    ? 'bg-white/90 backdrop-blur-xl'
    : scrolled
      ? dark
        ? 'bg-night/55 backdrop-blur-xl'
        : 'bg-white/75 backdrop-blur-xl'
      : 'bg-transparent'

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[90] rounded-lg bg-navy px-4 py-3 text-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      {bar && <AnnouncementBar onClose={dismissBar} />}

      {/* Page blur behind an open panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-night/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          />
        )}
      </AnimatePresence>

      <header
        ref={headerRef}
        style={{ transform: `translateY(${offset}px)` }}
        onMouseLeave={hoverClose}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-500 ${surface} ${tone}`}
      >
        <div className="flex h-[72px] items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-10">
            <Link to="/" aria-label={`${site.name} — home`} onMouseEnter={() => prefetch('home')}>
              <Logo className="h-[17px]" />
            </Link>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7 text-sm">
                {nav.map((item) => {
                  const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
                  const dim = open && open !== item.to
                  const cls = `flex items-center gap-1 py-6 transition-opacity duration-300 ${dim ? 'opacity-45' : 'opacity-100'} ${
                    active ? 'underline decoration-gold underline-offset-[6px]' : ''
                  }`
                  return (
                    <li key={item.to} onMouseEnter={() => (item.menu ? hoverOpen(item.to) : hoverClose())}>
                      {item.menu ? (
                        <button
                          type="button"
                          aria-expanded={open === item.to}
                          aria-controls="mega-panel"
                          onClick={() => setOpen(open === item.to ? null : item.to)}
                          onFocus={() => prefetch(item.key)}
                          className={cls}
                        >
                          {item.label}
                          <Icon
                            name="chevronRight"
                            className={`size-3 transition-transform duration-300 ${open === item.to ? '-rotate-90' : 'rotate-90'}`}
                          />
                        </button>
                      ) : (
                        <NavLink to={item.to} onMouseEnter={() => prefetch(item.key)} className={cls}>
                          {item.label}
                        </NavLink>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/careers"
              onMouseEnter={() => prefetch('careers')}
              className={`hidden h-10 items-center rounded-lg border px-4 text-sm transition-colors md:inline-flex ${
                lightText
                  ? 'border-white/30 text-white/80 hover:bg-white/10'
                  : 'border-navy/20 text-muted hover:border-navy hover:text-navy'
              }`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              onMouseEnter={() => prefetch('contact')}
              className={`hidden h-10 items-center rounded-lg px-4 text-sm transition-colors sm:inline-flex ${
                lightText ? 'bg-white text-navy hover:bg-gold-light' : 'bg-navy text-white hover:bg-gold-ink'
              }`}
            >
              Request a discussion
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className={`inline-flex size-10 flex-col items-center justify-center gap-[5px] rounded-lg lg:hidden ${lightText ? 'bg-white/10' : 'bg-black/[0.06]'}`}
            >
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {openItem && (
            <motion.div
              key="mega"
              className="hidden overflow-hidden border-t border-black/[0.05] lg:block"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              onMouseEnter={() => clearTimeout(closeTimer.current)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <MegaPanel key={openItem.to} item={openItem} onNavigate={() => setOpen(null)} />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>{mobile && <MobileSheet key="sheet" onClose={() => setMobile(false)} />}</AnimatePresence>
    </>
  )
}
