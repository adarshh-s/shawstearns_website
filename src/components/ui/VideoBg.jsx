import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Icon from './Icon'

/**
 * Muted, looping background video.
 * - Picks the 720p file on small screens or data-saver connections.
 * - Pauses when off-screen to save battery/CPU.
 * - Reduced-motion users get the poster frame; everyone gets a pause/play control (WCAG 2.2.2).
 */
export default function VideoBg({
  video,
  className = '',
  controlClassName = 'right-5 bottom-5',
  controlTone = 'dark',
  label = 'background video',
  playing: controlledPlaying, // optional: parent owns play state and renders its own control
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [ownPlaying, setPlaying] = useState(!reduce)
  const controlled = controlledPlaying !== undefined
  const playing = controlled ? controlledPlaying : ownPlaying
  const [src] = useState(() => {
    const small = window.matchMedia('(max-width: 1024px)').matches || navigator.connection?.saveData
    return small || !video.src1080 ? video.src720 : video.src1080
  })

  // Play only while visible and not paused by the user.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && playing) el.play().catch(() => {})
      else el.pause()
    })
    io.observe(el)
    return () => io.disconnect()
  }, [playing])

  return (
    <>
      <video
        ref={ref}
        className={`size-full object-cover ${className}`}
        src={src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload={reduce || !playing ? 'metadata' : 'auto'}
        // Only autoplay when actually meant to play — otherwise a 'paused' video starts on load.
        autoPlay={!reduce && playing}
        aria-hidden="true"
        tabIndex={-1}
      />
      {!controlled && (
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className={`absolute z-10 inline-flex size-9 items-center justify-center rounded-lg transition-colors ${
            controlTone === 'light'
              ? 'border border-black/[0.06] bg-white/75 text-ink backdrop-blur-xl hover:bg-white'
              : 'glass hover:bg-white hover:text-ink'
          } ${controlClassName}`}
        >
          <Icon name={playing ? 'pause' : 'play'} className="size-3.5" />
        </button>
      )}
    </>
  )
}
