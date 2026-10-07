import { useState } from 'react'
import { motion } from 'framer-motion'
import { careers, forms } from '../content/site'
import { emphasize } from '../utils/helpers'
import { Field, FileField, fileTooBig, isEmail, MAX_FILE_MB } from './forms/Field'
import { FormShell, SubmitButton } from './forms/FormShell'
import { submitForm } from './forms/submit'
import Reveal, { fadeUpChild, staggerParent } from './ui/Reveal'

export function ApplicationForm() {
  const empty = { name: '', email: '', phone: '', note: '' }
  const [v, setV] = useState(empty)
  const [cv, setCv] = useState(null)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState({ sent: false, busy: false, viaEmail: false, fail: '' })
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!v.name.trim()) err.name = 'Please enter your full name.'
    if (!isEmail(v.email)) err.email = 'Please enter a valid email address.'
    if (!v.phone.trim()) err.phone = 'Please enter a phone number.'
    if (!cv) err.cv = 'Please attach your CV.'
    else if (fileTooBig(cv)) err.cv = `Please keep your CV under ${MAX_FILE_MB} MB.`
    setErrors(err)
    if (Object.keys(err).length) return document.querySelector('[aria-invalid="true"]')?.focus()
    setState((s) => ({ ...s, busy: true, fail: '' }))
    try {
      const res = await submitForm({
        endpoint: forms.careersEndpoint,
        subject: `Careers application — ${v.name}`,
        fields: { 'Full name': v.name, Email: v.email, Phone: v.phone, Note: v.note },
        files: { CV: cv },
      })
      setState({ sent: true, busy: false, viaEmail: Boolean(res.viaEmail), fail: '' })
    } catch {
      setState((s) => ({
        ...s,
        busy: false,
        fail: 'Something went wrong sending your application. Please try again or email us directly.',
      }))
    }
  }

  return (
    <FormShell
      sent={state.sent}
      viaEmail={state.viaEmail}
      attachment="CV"
      onReset={() => (setV(empty), setCv(null), setState({ sent: false, busy: false, viaEmail: false, fail: '' }))}
    >
      <form noValidate onSubmit={onSubmit} className="space-y-8">
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          required
          value={v.name}
          onChange={set('name')}
          error={errors.name}
        />
        <div className="grid gap-8 sm:grid-cols-2">
          <Field
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={v.email}
            onChange={set('email')}
            error={errors.email}
          />
          <Field
            label="Phone number"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={v.phone}
            onChange={set('phone')}
            error={errors.phone}
          />
        </div>
        <FileField
          label="Upload your CV"
          hint={`PDF or Word, up to ${MAX_FILE_MB} MB`}
          accept=".pdf,.doc,.docx"
          required
          file={cv}
          onChange={setCv}
          error={errors.cv}
        />
        <Field label="What are you looking for? (optional)" name="note" textarea value={v.note} onChange={set('note')} />
        {state.fail && <p className="text-sm text-[#b8321f]">{state.fail}</p>}
        <SubmitButton busy={state.busy}>Send application</SubmitButton>
      </form>
    </FormShell>
  )
}

/** Careers: what we offer as dark glass cards, then the application form in a white card. */
export default function CareersBody() {
  return (
    <section
      aria-labelledby="offer-title"
      className="relative overflow-hidden bg-night px-3 pt-8 pb-28 text-white sm:px-[30px] md:pb-40"
    >
      <div
        aria-hidden="true"
        className="absolute top-[30%] left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-navy/70 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl px-2 text-center">
          <p className="label text-gold-light">{careers.offer.label}</p>
          <h2
            id="offer-title"
            className="mt-4 text-[length:var(--text-h2)] leading-[1.08] !text-white [&_.accent-italic]:!text-gold-light"
          >
            {emphasize('What we *offer*.')}
          </h2>
        </div>

        <motion.ul
          className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {careers.offer.items.map((o, i) => (
            <motion.li
              key={o}
              variants={fadeUpChild}
              className="group flex min-h-48 flex-col justify-between rounded-3xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-7 transition-colors duration-500 hover:border-gold-light/50"
            >
              <span className="font-serif text-gold-light italic">0{i + 1}</span>
              <p className="mt-8 font-display text-[1.375rem] leading-snug font-light text-white">{o}</p>
            </motion.li>
          ))}
        </motion.ul>
        <Reveal as="p" className="mx-auto mt-12 max-w-2xl text-center leading-relaxed text-white/70">
          {careers.closing}
        </Reveal>

        <div id="apply" className="mt-28 grid gap-12 lg:grid-cols-12">
          <div className="px-2 lg:col-span-4">
            <p className="label text-gold-light">{careers.apply.label}</p>
            <h2
              id="apply-title"
              className="mt-4 text-[length:var(--text-h2)] leading-[1.05] !text-white [&_.accent-italic]:!text-gold-light"
            >
              {emphasize(careers.apply.title)}
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">{careers.apply.body}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 text-ink sm:p-10 lg:col-span-7 lg:col-start-6">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  )
}
