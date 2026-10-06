import { useState } from 'react'
import { motion } from 'framer-motion'
import { careers, forms } from '../content/site'
import { emphasize } from '../utils/helpers'
import { Field, FileField, fileTooBig, isEmail, MAX_FILE_MB } from './forms/Field'
import { FormShell, SubmitButton } from './forms/FormShell'
import { submitForm } from './forms/submit'
import Icon from './ui/Icon'
import Reveal, { fadeUpChild, staggerParent } from './ui/Reveal'

function ApplicationForm() {
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

/** Careers: practice intro, what we offer, and the application form. */
export default function CareersBody() {
  return (
    <>
      <section aria-labelledby="join-title" className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p id="join-title" className="label text-gold-ink">
              {careers.join.label}
            </p>
            <Reveal as="p" className="mt-5 font-serif text-[clamp(1.375rem,1.15rem+0.8vw,1.875rem)] leading-[1.4] text-navy">
              {careers.join.body}
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label text-gold-ink">{careers.offer.label}</p>
            <motion.ul
              className="mt-5 border-t border-navy/15"
              variants={staggerParent(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            >
              {careers.offer.items.map((o) => (
                <motion.li key={o} variants={fadeUpChild} className="flex gap-4 border-b border-navy/15 py-5 text-navy">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold" />
                  {o}
                </motion.li>
              ))}
            </motion.ul>
            <Reveal as="p" className="mt-8 leading-relaxed text-muted">
              {careers.closing}
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="apply-title" className="bg-mist py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-gold-ink">{careers.apply.label}</p>
            <h2 id="apply-title" className="mt-4 text-[length:var(--text-h2)] leading-[1.05]">
              {emphasize(careers.apply.title)}
            </h2>
            <p className="mt-5 leading-relaxed text-muted">{careers.apply.body}</p>
          </div>
          <div className="bg-white p-6 sm:p-10 lg:col-span-7 lg:col-start-6">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  )
}
