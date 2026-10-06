import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../content/site'
import Icon from '../ui/Icon'

const EASE = [0.22, 1, 0.36, 1]

/** Swaps a form for its confirmation state, and renders the submit button + error. */
export function FormShell({ sent, viaEmail, attachment, onReset, children }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          role="status"
          className="flex min-h-[420px] flex-col items-start justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-navy text-white">
            <Icon name="check" className="size-5" />
          </span>
          <h3 className="mt-6 text-[length:var(--text-h3)]">Thank you.</h3>
          <p className="mt-3 max-w-md leading-relaxed text-muted">
            {viaEmail ? (
              <>
                Your email app should have opened with your details ready to send
                {attachment ? <> — please attach your {attachment} before sending</> : null}. If it didn’t, write to us at{' '}
                <a className="link-underline text-navy" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </>
            ) : (
              'We have received your message and will be in touch personally. Every enquiry is treated with full discretion.'
            )}
          </p>
          <button type="button" onClick={onReset} className="label link-underline mt-8 text-gold-ink">
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.div key="form" exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SubmitButton({ busy, children }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-gold-ink py-3 pr-4 pl-7 text-sm font-medium text-white transition-[background-color,transform] duration-500 hover:scale-[1.02] hover:bg-navy disabled:opacity-60"
    >
      {busy ? 'Sending…' : children}
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
        <Icon name="arrow" className="size-4" />
      </span>
    </button>
  )
}
