// Route-level code splitting: each page is its own chunk.
// Exported separately so navigation links can prefetch a page on hover/focus.
export const loaders = {
  home: () => import('./Home'),
  about: () => import('./About'),
  services: () => import('./Services'),
  careers: () => import('./Careers'),
  contact: () => import('./Contact'),
}

export const prefetch = (key) => loaders[key]?.()
