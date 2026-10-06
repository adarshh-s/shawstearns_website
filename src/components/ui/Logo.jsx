import logoSvg from '../../assets/logo.svg?raw'
import markSvg from '../../assets/mark.svg?raw'

// Shaw Stearns wordmark and square mark, inlined so they inherit `currentColor`.
const base = 'inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-auto'

export function Logo({ className = 'h-5' }) {
  return (
    <span role="img" aria-label="Shaw Stearns" className={`${base} ${className}`} dangerouslySetInnerHTML={{ __html: logoSvg }} />
  )
}

export function Mark({ className = 'h-10' }) {
  return <span aria-hidden="true" className={`${base} ${className}`} dangerouslySetInnerHTML={{ __html: markSvg }} />
}
