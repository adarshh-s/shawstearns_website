import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cta, home, servicesPage, videos } from '../content/site'
import { emphasize } from '../utils/helpers'
import { getLenis, gsap, MOTION_OK, useGSAP } from '../utils/scrollAnimations'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { Mark } from './ui/Logo'
import VideoBg from './ui/VideoBg'

const { protect } = home
const LINE = 'rgba(255,255,255,0.55)'
const GOLD = '#c9b48a'

/* ── Layer artwork: fine-line "instrument panels" (no invented figures) ── */

function CapitalArt() {
  // Cost plan: elements with budget bars, three formal cost plans and gateway ticks.
  const rows = ['Substructure', 'Frame', 'Envelope', 'Services', 'Fit-out', 'Risk allowance']
  const widths = [0.55, 0.72, 0.64, 0.82, 0.48, 0.3]
  return (
    <svg viewBox="0 0 600 400" className="size-full" aria-hidden="true">
      <text x="28" y="40" fill={GOLD} fontSize="13" letterSpacing="2">
        CAPITAL · COST PLAN
      </text>
      {['CP1 Concept', 'CP2 Developed', 'CP3 Technical'].map((t, i) => (
        <g key={t}>
          <rect x={28 + i * 128} y="58" width="118" height="24" rx="12" fill="none" stroke={i === 2 ? GOLD : LINE} />
          <text x={87 + i * 128} y="74" fill={i === 2 ? GOLD : 'white'} fontSize="10.5" textAnchor="middle">
            {t}
          </text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r} transform={`translate(28 ${112 + i * 40})`}>
          <text y="14" fill="white" fontSize="12" opacity="0.85">
            {r}
          </text>
          <line x1="150" y1="10" x2="540" y2="10" stroke="rgba(255,255,255,0.15)" />
          <line
            x1="150"
            y1="10"
            x2={150 + 390 * widths[i]}
            y2="10"
            stroke={i === 5 ? GOLD : 'white'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
      <line x1="28" y1="360" x2="568" y2="360" stroke={GOLD} strokeDasharray="4 6" />
      <text x="568" y="384" fill={GOLD} fontSize="11" textAnchor="end" letterSpacing="1.5">
        BUDGET LOCKED
      </text>
    </svg>
  )
}

function ProgrammeArt() {
  // Programme: RIBA stages 0–7 with task bars and a gold critical path.
  const bars = [
    [0, 1.2],
    [0.8, 2.4],
    [1.8, 3.6],
    [2.6, 4.8],
    [3.6, 6.2],
    [5.4, 7.6],
  ]
  const x = (s) => 40 + s * 66
  return (
    <svg viewBox="0 0 600 400" className="size-full" aria-hidden="true">
      <text x="28" y="40" fill={GOLD} fontSize="13" letterSpacing="2">
        PROGRAMME · RIBA 0–7
      </text>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <line x1={x(i)} y1="64" x2={x(i)} y2="356" stroke="rgba(255,255,255,0.14)" />
          <text x={x(i)} y="80" fill="white" opacity="0.7" fontSize="11" textAnchor="middle">
            {i}
          </text>
        </g>
      ))}
      {bars.map(([a, b], i) => (
        <rect key={i} x={x(a)} y={104 + i * 40} width={x(b) - x(a)} height="14" rx="7" fill="none" stroke={LINE} />
      ))}
      <polyline
        points={bars.map(([, b], i) => `${x(b)},${111 + i * 40}`).join(' ')}
        fill="none"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {bars.map(([, b], i) => (
        <circle key={i} cx={x(b)} cy={111 + i * 40} r="3.5" fill={GOLD} />
      ))}
      <text x="568" y="384" fill={GOLD} fontSize="11" textAnchor="end" letterSpacing="1.5">
        CRITICAL PATH
      </text>
    </svg>
  )
}

function ReputationArt() {
  // Governance: approvals, consents, stakeholders, change control — all checked.
  const items = ['Approval gateways', 'Authority consents', 'Stakeholder alignment', 'Change control', 'Final account']
  return (
    <svg viewBox="0 0 600 400" className="size-full" aria-hidden="true">
      <text x="28" y="40" fill={GOLD} fontSize="13" letterSpacing="2">
        REPUTATION · GOVERNANCE
      </text>
      {items.map((t, i) => (
        <g key={t} transform={`translate(28 ${78 + i * 56})`}>
          <rect width="544" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.22)" />
          <circle cx="24" cy="20" r="9" fill="none" stroke={GOLD} />
          <path
            d="M19.5 20.5l3 3 6-6.5"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="48" y="25" fill="white" fontSize="13">
            {t}
          </text>
          <text x="528" y="25" fill="white" opacity="0.6" fontSize="10.5" textAnchor="end" letterSpacing="1.5">
            CLEARED
          </text>
        </g>
      ))}
    </svg>
  )
}

const ART = {
  Capital: CapitalArt,
  Programme: ProgrammeArt,
  Reputation: ReputationArt,
}

/** One readable card: diagram, what we do, outcome, link. */
function Card({ item, index }) {
  const Art = ART[item.name]
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-navy text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="h-44 shrink-0 overflow-hidden border-b border-white/10 bg-night/40 px-2 lg:h-[clamp(11rem,26vh,15rem)]">
        <Art />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="label !text-[0.5625rem] text-gold-light">
          0{index + 1} · {item.name}
        </p>
        <h3 className="mt-2 text-[clamp(1.5rem,1.2rem+0.9vw,2.1rem)] leading-[1.1] !text-white [&_.accent-italic]:!text-gold-light">
          {emphasize(item.title)}
        </h3>
        <ul className="mt-4 space-y-2">
          {item.points.map((p) => (
            <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/85">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold-light" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-l-2 border-gold-light/70 pl-4 text-sm text-white/70 italic">{item.body}</p>
        <Link to={item.link.to} className="group mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-white">
          <span className="link-underline">{item.link.label}</span>
          <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

const GAP = 80 // px between layers once the stack opens
const SPREAD = 110 // how far the layers above the active one lift to make room
const SLIDE = '30%' // how far the active layer slides out, in its own plane

/**
 * Desktop, Scale-inspired: a stack of glass panels held at a fixed isometric angle. Scrolling
 * opens the stack, then works through it like a set of drawers: the layers above the active one
 * lift clear, and the active one slides out sideways in its own plane. Layers never change
 * order in depth, so no slab ever passes through another.
 * Performance: only `transform` animates on 3D elements (never opacity — that flattens
 * preserve-3d and flickers); highlights are child overlays; no React state while scrolling.
 */
function Pinned() {
  const root = useRef(null)
  const st = useRef(null)
  const n = protect.items.length

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const layers = q('[data-layer]')
      const arts = q('[data-art]')
      const guides = q('[data-guide]')
      // Guides stand upright out of the base plane. GSAP owns their whole transform so the
      // scaleY tween can't wipe out the rotation (which would lay them flat on the floor).
      gsap.set(guides, {
        rotationX: 90,
        scaleY: 0,
        opacity: 1,
        transformOrigin: '50% 0%',
      })
      const [scene] = q('[data-scene]')
      const glows = q('[data-glow]')
      const details = q('[data-detail]')
      const [finale] = q('[data-finale]')
      const [stackGlow] = q('[data-stackglow]')
      const rows = q('[data-row]')
      const fills = q('[data-fill]')

      const [cover] = q('[data-cover]')
      // Capital sits on top of the stack, Reputation at the bottom.
      const zAt = (i, gap) => (n - i) * gap
      // Where each layer rests while layer `active` is out: the ones above it lift clear.
      const restZ = (j, active) => zAt(j, GAP) + (j < active ? SPREAD : 0)
      // Sink the scene as the stack grows so its visual centre stays put.
      const SINK = -(n * GAP) / 2
      gsap.set(layers, { z: (i) => zAt(i, 4), x: 0 })
      // Tilt lives in CSS on the wrapper; GSAP only turns and sinks the inner scene.
      gsap.set(scene, { rotationZ: -46, z: 0 })
      gsap.set(glows, { opacity: 0 })
      // Closed, the stack reads as one clean glass slab: diagrams hidden, the cover showing.
      gsap.set(arts, { opacity: 0 })
      gsap.set(finale, { autoAlpha: 0, y: 16 })
      gsap.set(stackGlow, { opacity: 0 })
      gsap.set(details.slice(1), { autoAlpha: 0, y: 16 })

      const OPEN = 0.9 // time to open the stack
      const STEP = 1.2 // time per layer
      const END = OPEN + n * STEP
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=380%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })
      // Rows follow the timeline's own clock (including scrub smoothing), so they never drift.
      let last = -1
      tl.eventCallback('onUpdate', () => {
        const idx = Math.max(0, Math.min(n - 1, Math.floor((tl.time() - OPEN) / STEP)))
        if (idx === last) return
        last = idx
        rows.forEach((r, k) => r.classList.toggle('is-active', k === idx))
      })
      rows[0].classList.add('is-active')

      // Open: the layers float up one after another from the top, decelerating as they settle.
      tl.to(
        layers,
        {
          z: (i) => zAt(i, GAP),
          duration: OPEN,
          ease: 'power3.out',
          stagger: 0.06,
        },
        0,
      )
        .to(scene, { z: SINK, duration: OPEN, ease: 'power2.inOut' }, 0)
        .to(guides, { scaleY: 1, duration: OPEN, ease: 'power2.out' }, 0)
        .to(cover, { opacity: 0, duration: OPEN * 0.5, ease: 'power1.out' }, 0)
        .to(arts, { opacity: 0.6, duration: OPEN * 0.6, stagger: 0.06 }, OPEN * 0.3)
        // One slow, eased turn across the whole sequence, so it never starts or stops abruptly.
        .fromTo(scene, { rotationZ: -46 }, { rotationZ: -30, duration: END + 1.4, ease: 'sine.inOut' }, 0)

      layers.forEach((layer, i) => {
        const t = OPEN + i * STEP
        const out = i === 0 ? t + 0.05 : t + 0.3
        if (i > 0) {
          // 1. the previous drawer slides home and its glow fades…
          tl.to(layers[i - 1], { x: 0, duration: 0.4 }, t)
            .to(glows[i - 1], { opacity: 0, duration: 0.3 }, t)
            .to(arts[i - 1], { opacity: 0.6, duration: 0.3 }, t)
            // 2. …then lifts with the layers above it, opening room over the next one
            .to(layers.slice(0, i), { z: (j) => restZ(j, i), duration: 0.55 }, t + 0.15)
            .to(details[i - 1], { autoAlpha: 0, y: -16, duration: 0.25 }, t)
            .to(details[i], { autoAlpha: 1, y: 0, duration: 0.3 }, t + 0.25)
        }
        // 3. the active drawer slides out in its own plane, rising a touch, then settles.
        tl.to(layer, { x: SLIDE, z: restZ(i, i) + 24, duration: 0.6, ease: 'power3.out' }, out)
          .to(glows[i], { opacity: 1, duration: 0.35 }, out + 0.1)
          .to(arts[i], { opacity: 1, duration: 0.35 }, out + 0.1)
          .to(fills[i], { scaleX: 1, duration: STEP, ease: 'none' }, t)
      })

      // Finale: the last drawer slides home, then the stack closes from the bottom up and
      // the scene rises back into place; the copy resolves to the summary line.
      tl.to(layers[n - 1], { x: 0, z: zAt(n - 1, GAP), duration: 0.4 }, END)
        .to(glows[n - 1], { opacity: 0, duration: 0.3 }, END)
        .to(arts[n - 1], { opacity: 0.6, duration: 0.3 }, END)
        // as it closes the diagrams clear away and the slab returns to plain glass
        .to(arts, { opacity: 0, duration: 0.5 }, END + 0.4)
        .to(cover, { opacity: 1, duration: 0.5, ease: 'power1.in' }, END + 0.75)
        .to(details[n - 1], { autoAlpha: 0, y: -16, duration: 0.25 }, END)
        .to(
          layers,
          {
            z: (i) => zAt(i, 4),
            duration: 0.9,
            ease: 'power3.inOut',
            stagger: { each: 0.06, from: 'end' },
          },
          END + 0.3,
        )
        .to(scene, { z: 0, duration: 0.9, ease: 'power3.inOut' }, END + 0.3)
        .to(guides, { scaleY: 0, duration: 0.7 }, END + 0.3)
        .to(finale, { autoAlpha: 1, y: 0, duration: 0.4 }, END + 0.7)
        .to(stackGlow, { opacity: 1, duration: 0.5 }, END + 0.9)

      st.current = {
        trigger: tl.scrollTrigger,
        timeAt: (i) => (OPEN + i * STEP + 0.85) / tl.duration(),
      }
    },
    { scope: root },
  )

  const jump = (i) => {
    const s = st.current
    if (!s) return
    const t = s.trigger
    const y = t.start + (t.end - t.start) * s.timeAt(i)
    const lenis = getLenis()
    lenis ? lenis.scrollTo(y, { duration: 1.1 }) : window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    // The navy wrapper backs ScrollTrigger's pin spacer, so nothing behind the pin can show white.
    <div className="bg-night">
      <section ref={root} aria-labelledby="protect3d-title" className="relative h-[100svh] overflow-hidden bg-night text-white">
        {/* soft glow — a gradient, not a blur filter, so the GPU isn't repainting a huge blur */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-[2%] h-[90vh] w-[62vw] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(34,53,91,0.95),rgba(34,53,91,0.4)_55%,transparent)]"
        />
        <div className="container-x relative grid h-full grid-cols-12 items-center gap-10 pt-16">
          {/* Copy */}
          <div className="col-span-5">
            <p className="label text-gold-light">{protect.label}</p>
            <h2
              id="protect3d-title"
              className="mt-4 text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] leading-[1.08] !text-white [&_.accent-italic]:!text-gold-light"
            >
              {emphasize(protect.title)}
            </h2>

            <ol className="mt-9 space-y-1">
              {protect.items.map((it, i) => (
                <li key={it.name}>
                  <button
                    type="button"
                    data-row
                    onClick={() => jump(i)}
                    className="group w-full rounded-xl px-4 py-3 text-left text-white/50 transition-colors duration-300 hover:text-white [&.is-active]:bg-white/[0.07] [&.is-active]:text-white"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-display text-sm text-gold-light">0{i + 1}</span>
                      <span className="flex-1 text-lg">{it.name}</span>
                    </span>
                    <span className="mt-2 block h-px w-full overflow-hidden bg-white/10">
                      <span data-fill className="block h-full origin-left scale-x-0 bg-gold-light" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 grid">
              {protect.items.map((it) => (
                <div key={it.name} data-detail className="col-start-1 row-start-1">
                  <h3 className="text-2xl !text-white [&_.accent-italic]:!text-gold-light">{emphasize(it.title)}</h3>
                  <ul className="mt-4 space-y-2">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold-light" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link to={it.link.to} className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                    <span className="link-underline">{it.link.label}</span>
                    <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
              <div data-finale className="col-start-1 row-start-1">
                <p className="label text-gold-light">All three, together</p>
                <h3 className="mt-3 text-2xl !text-white [&_.accent-italic]:!text-gold-light">
                  {emphasize(servicesPage.method.title)}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{cta.body}</p>
                <Button href="/contact" variant="white" className="mt-6">
                  Request a confidential discussion
                </Button>
              </div>
            </div>
          </div>

          {/* Scene: isometric glass stack. Only transforms animate (60 fps). */}
          <div aria-hidden="true" className="col-span-7 flex justify-center [perspective:2200px]">
            <div className="relative aspect-[3/2] w-[min(36vw,520px)] [transform-style:preserve-3d] [transform:translate(-6%,24%)_rotateX(58deg)]">
              <div data-scene className="absolute inset-0 [transform-style:preserve-3d]">
                {/* dotted floor grid */}
                <div className="absolute -inset-[45%] rounded-[40px] [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(closest-side,#000_35%,transparent)] [transform:translateZ(-30px)]" />
                {/* gold glow once the stack is assembled */}
                <div
                  data-stackglow
                  className="absolute -inset-[22%] rounded-[32px] bg-[radial-gradient(closest-side,rgba(154,130,84,0.28),transparent)] [transform:translateZ(-20px)]"
                />
                {/* base: Dubai from above, graded navy-to-gold in the file so it reads as part of the glass */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl bg-night shadow-[0_80px_140px_-40px_rgba(0,0,0,0.95)] [backface-visibility:hidden]">
                  <VideoBg video={videos.site} playing label="Dubai aerial video" />
                  {/* edges melt into navy; a soft sheen ties it to the glass above */}
                  <div className="absolute inset-0 bg-[radial-gradient(115%_95%_at_50%_45%,transparent_30%,rgba(15,23,41,0.88))]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_40%,rgba(15,23,41,0.35))]" />
                  <div className="absolute inset-0 rounded-2xl border border-white/20" />
                </div>
                {/* corner guide lines that grow as the stack opens */}
                {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
                  <span
                    key={pos}
                    data-guide
                    className={`absolute ${pos} h-[420px] w-px origin-top bg-gradient-to-b from-white/50 to-white/0 opacity-0`}
                  />
                ))}
                {protect.items.map((it, i) => {
                  const Art = ART[it.name]
                  return (
                    <div
                      key={it.name}
                      data-layer
                      className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
                    >
                      {/* slab thickness */}
                      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-[rgba(10,18,36,0.6)] [transform:translateZ(-5px)]" />
                      {/* glass face */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_45%,rgba(34,53,91,0.35))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] [backface-visibility:hidden]">
                        <div data-art className="size-full">
                          <Art />
                        </div>
                        <div
                          data-glow
                          className="pointer-events-none absolute inset-0 rounded-2xl border border-gold-light shadow-[inset_0_0_40px_rgba(201,180,138,0.25),0_0_30px_rgba(201,180,138,0.35)]"
                        />
                        {/* closed-stack cover: plain frosted glass with the mark, on the top slab only */}
                        {i === 0 && (
                          <div
                            data-cover
                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[linear-gradient(140deg,rgba(255,255,255,0.16),rgba(34,53,91,0.55)_55%,rgba(15,23,41,0.7))]"
                          >
                            <Mark className="h-12 text-white/85" />
                            <span className="h-px w-16 bg-gold-light/70" />
                            <span className="label !text-[0.5rem] tracking-[0.4em] text-white/70">
                              Capital · Programme · Reputation
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * Phones and reduced motion: the three cards as a sticky deck. Each card pins just below the
 * header and the next slides up over it, while the one beneath eases back and dims.
 */
function Static() {
  const root = useRef(null)
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const cards = gsap.utils.toArray('[data-deck]', root.current)
        cards.slice(0, -1).forEach((card, i) => {
          const st = { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true }
          gsap.to(card.querySelector('[data-deck-body]'), { scale: 0.92, ease: 'none', scrollTrigger: st })
          gsap.to(card.querySelector('[data-deck-dim]'), { opacity: 0.55, ease: 'none', scrollTrigger: st })
        })
      })
    },
    { scope: root },
  )
  return (
    <section ref={root} aria-labelledby="protect3d-title" className="bg-night px-5 pt-24 pb-16 text-white">
      <p className="label text-center text-gold-light">{protect.label}</p>
      <h2
        id="protect3d-title"
        className="mx-auto mt-4 max-w-xl text-center text-[length:var(--text-h2)] leading-[1.08] !text-white [&_.accent-italic]:!text-gold-light"
      >
        {emphasize(protect.title)}
      </h2>
      <ol className="mx-auto mt-14 max-w-xl">
        {protect.items.map((it, i) => (
          <li key={it.name} data-deck className="sticky mb-8" style={{ top: `${88 + i * 14}px` }}>
            <div data-deck-body className="relative origin-top will-change-transform">
              <Card item={it} index={i} />
              <div data-deck-dim className="pointer-events-none absolute inset-0 rounded-3xl bg-night opacity-0" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Protect3D() {
  const reduce = useReducedMotion()
  const desktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  return desktop && !reduce ? <Pinned /> : <Static />
}
