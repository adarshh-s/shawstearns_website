import { useId } from 'react'

// Two-colour palettes mapped onto fractal noise: [dark, light] as 0–1 RGB.
const PALETTES = {
  navy: [
    [0.075, 0.12, 0.22],
    [0.2, 0.28, 0.42],
  ],
  gold: [
    [0.42, 0.33, 0.18],
    [0.86, 0.76, 0.55],
  ],
}

/** Procedural marble texture (SVG turbulence) in brand navy or gold. Fills its parent. */
export default function Marble({ tone = 'navy', seed = 4, className = '' }) {
  const id = useId().replace(/:/g, '')
  const [d, l] = PALETTES[tone]
  const table = (k) => `${d[k]} ${(d[k] + l[k]) / 2} ${l[k]} ${(d[k] + l[k]) / 2} ${d[k]}`
  return (
    <svg aria-hidden="true" className={`absolute inset-0 size-full ${className}`} preserveAspectRatio="none">
      <filter id={`m${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.0022 0.0065" numOctaves="5" seed={seed} result="n" />
        <feColorMatrix in="n" type="saturate" values="0" result="g" />
        <feComponentTransfer in="g">
          <feFuncR type="table" tableValues={table(0)} />
          <feFuncG type="table" tableValues={table(1)} />
          <feFuncB type="table" tableValues={table(2)} />
          <feFuncA type="table" tableValues="1 1" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#m${id})`} />
    </svg>
  )
}
