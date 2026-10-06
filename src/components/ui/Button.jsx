import { Link } from 'react-router-dom'
import { scrollToHash } from '../../utils/scrollAnimations'
import Icon from './Icon'

const variants = {
  gold: 'bg-gold-ink text-white hover:bg-navy',
  navy: 'bg-navy text-white hover:bg-gold-ink',
  white: 'bg-white text-navy hover:bg-gold-light hover:text-navy',
  glass: 'glass hover:bg-white hover:text-navy',
  outline: 'border border-current hover:bg-navy hover:text-white hover:border-navy',
}

/** Handle in-page anchors with the animated scroll; let other links behave normally. */
export function handleAnchorClick(e, href) {
  if (href?.startsWith('#')) {
    e.preventDefault()
    scrollToHash(href)
  }
}

/** Renders a router <Link> for internal paths ("/about"), otherwise a plain <a>. */
export function SmartLink({ href, children, onClick, ...rest }) {
  if (href?.startsWith('/')) {
    return (
      <Link to={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e)
        handleAnchorClick(e, href)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Pill CTA; the arrow slides out and a fresh one slides in on hover. */
export default function Button({ href, variant = 'gold', children, className = '', ...rest }) {
  return (
    <SmartLink
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2.5 rounded-full whitespace-nowrap py-2 pr-4 pl-5 text-sm font-medium transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] hover:scale-[1.03] active:scale-[0.98] ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="relative block size-3.5 overflow-hidden">
        <Icon
          name="arrow"
          className="absolute inset-0 size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-5"
        />
        <Icon
          name="arrow"
          className="absolute inset-0 size-3.5 -translate-x-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
        />
      </span>
    </SmartLink>
  )
}

/** Square arrow box used on tiles and cards. */
export function ArrowBox({ tone = 'gold', className = '' }) {
  const tones = {
    gold: 'bg-gold-ink text-white group-hover:bg-navy',
    navy: 'bg-navy text-white group-hover:bg-gold-ink',
    white: 'bg-white text-navy group-hover:bg-gold-light',
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 ${tones[tone]} ${className}`}
    >
      <span className="relative block size-4">
        <Icon
          name="arrow"
          className="absolute inset-0 size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-6"
        />
        <Icon
          name="arrow"
          className="absolute inset-0 size-4 -translate-x-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
        />
      </span>
    </span>
  )
}
