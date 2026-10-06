import { useEffect, useRef } from 'react'

const TONES = { navy: [34, 53, 91], slate: [90, 108, 140], gold: [154, 130, 84], light: [201, 180, 138] }

/**
 * Twisting ribbon of dots drawn on a canvas — a live version of the brand's dotted-wave
 * illustrations. Animates slowly only while visible; static for reduced motion.
 */
export default function DotWave({ tone = 'navy', className = '', density = 1, speed = 1 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const [r, g, b] = TONES[tone] || TONES.navy
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let raf = 0
    let visible = false
    let t = Math.random() * 10

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cols = Math.round(110 * density)
      const rows = Math.round(18 * density)
      for (let i = 0; i <= cols; i++) {
        const u = i / cols
        const edge = Math.sin(Math.PI * u) ** 1.4 // fade at both ends
        const theta = u * Math.PI * 1.7 + t * 0.35
        const mid = H / 2 + Math.sin(u * Math.PI * 1.9 + t * 0.5) * H * 0.16
        const spread = H * (0.18 + 0.12 * Math.sin(u * Math.PI * 1.3 + t * 0.4))
        for (let j = 0; j <= rows; j++) {
          const v = j / rows - 0.5
          const depth = v * Math.sin(theta) // -0.5..0.5
          const y = mid + v * spread * 2 * Math.cos(theta)
          const x = u * W + depth * 18
          const a = edge * (0.18 + 0.7 * (depth + 0.5))
          if (a < 0.03) continue
          ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(x, y, 0.6 + 1.1 * (depth + 0.5), 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      t += 0.006 * speed
      draw()
      raf = visible ? requestAnimationFrame(loop) : 0
    }

    resize()
    draw()
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !reduce && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [tone, density, speed])

  return <canvas ref={ref} aria-hidden="true" className={`block size-full ${className}`} />
}
