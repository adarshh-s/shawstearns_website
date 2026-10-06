import { motion } from 'framer-motion'

/** Vertical shaft of light — the signature decorative element on dark panels. */
export default function Beam({ className = '' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 w-[32rem] -translate-x-1/2 ${className}`}
      initial={{ opacity: 0, scaleY: 0.3 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Wide soft glow */}
      <div className="absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl" />
      {/* Fine streaks */}
      <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 gap-[3px]">
        {[0.35, 0.6, 1, 0.85, 0.5, 0.3].map((o, i) => (
          <span key={i} className="block h-full w-px bg-white" style={{ opacity: o }} />
        ))}
      </div>
      {/* Bright core with a slow shimmer */}
      <motion.div
        className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-white blur-[2px]"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Horizontal flare at the centre */}
      <div className="absolute top-1/2 left-1/2 h-24 w-[28rem] -translate-1/2 rounded-[50%] bg-gold/40 blur-3xl" />
    </motion.div>
  )
}
