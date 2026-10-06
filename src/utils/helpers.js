import { createElement, Fragment } from 'react'

const UNSPLASH = 'https://images.unsplash.com/'

/** Build an Unsplash URL. `auto=format` serves AVIF/WebP to browsers that accept them, JPEG otherwise. */
export function imgUrl(id, width, { height, quality = 70 } = {}) {
  const h = height ? `&h=${height}` : ''
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}${h}&q=${quality}`
}

/** Responsive srcset for an Unsplash image, optionally cropped to an aspect ratio (w/h). */
export function imgSrcSet(id, widths = [480, 800, 1200, 1600], ratio) {
  return widths.map((w) => `${imgUrl(id, w, { height: ratio ? Math.round(w / ratio) : undefined })} ${w}w`).join(', ')
}

/** Render copy containing *word* markers with the italic accent style. */
export function emphasize(text) {
  return text
    .split(/(\*[^*]+\*)/g)
    .map((part, i) =>
      part.startsWith('*') && part.endsWith('*')
        ? createElement('em', { key: i, className: 'accent-italic' }, part.slice(1, -1))
        : createElement(Fragment, { key: i }, part),
    )
}

/** Plain-text version of copy with *word* markers removed (for aria-labels). */
export const stripMarkers = (text) => text.replace(/\*/g, '')

export function debounce(fn, wait = 100) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}
