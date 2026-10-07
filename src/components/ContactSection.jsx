import { useState } from 'react'
import { contact, forms, site } from '../content/site'
import { Field, FileField, fileTooBig, isEmail, MAX_FILE_MB } from './forms/Field'
import { FormShell, SubmitButton } from './forms/FormShell'
import { submitForm } from './forms/submit'
import Icon from './ui/Icon'
import LocalTime from './ui/LocalTime'
import Reveal from './ui/Reveal'

export function EnquiryForm() {
  const empty = { name: '', email: '', phone: '', project: '', company: '', brief: '' }
  const [v, setV] = useState(empty)
  const [rfp, setRfp] = useState(null)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState({ sent: false, busy: false, viaEmail: false, fail: '' })
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!v.name.trim()) err.name = 'Please enter your full name.'
    if (!isEmail(v.email)) err.email = 'Please enter a valid email address.'
    if (fileTooBig(rfp)) err.rfp = `Please keep attachments under ${MAX_FILE_MB} MB.`
    setErrors(err)
    if (Object.keys(err).length) return document.querySelector('[aria-invalid="true"]')?.focus()
    setState((s) => ({ ...s, busy: true, fail: '' }))
    try {
      const res = await submitForm({
        endpoint: forms.enquiryEndpoint,
        subject: `Confidential discussion request — ${v.company || v.name}`,
        fields: {
          'Full name': v.name,
          Email: v.email,
          Phone: v.phone,
          'Project type / location': v.project,
          Company: v.company,
          'Brief description': v.brief,
        },
        files: { 'Request for proposals': rfp },
      })
      setState({ sent: true, busy: false, viaEmail: Boolean(res.viaEmail), fail: '' })
    } catch {
      setState((s) => ({
        ...s,
        busy: false,
        fail: 'Something went wrong sending your request. Please try again or email us directly.',
      }))
    }
  }

  return (
    <FormShell
      sent={state.sent}
      viaEmail={state.viaEmail}
      attachment={rfp ? 'request for proposals' : null}
      onReset={() => (setV(empty), setRfp(null), setState({ sent: false, busy: false, viaEmail: false, fail: '' }))}
    >
      <form noValidate onSubmit={onSubmit} className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <Field
            label="Full name"
            name="name"
            autoComplete="name"
            required
            value={v.name}
            onChange={set('name')}
            error={errors.name}
          />
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
          <Field label="Phone number" name="phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} />
          <Field label="Company name" name="company" autoComplete="organization" value={v.company} onChange={set('company')} />
        </div>
        <Field label="Project type / location" name="project" value={v.project} onChange={set('project')} />
        <Field label="Brief description" name="brief" textarea value={v.brief} onChange={set('brief')} />
        <FileField
          label="Request for proposals (optional)"
          hint={`PDF, Word or ZIP, up to ${MAX_FILE_MB} MB`}
          accept=".pdf,.doc,.docx,.zip"
          file={rfp}
          onChange={setRfp}
          error={errors.rfp}
        />
        {state.fail && <p className="text-sm text-[#b8321f]">{state.fail}</p>}
        <SubmitButton busy={state.busy}>Request a confidential discussion</SubmitButton>
      </form>
    </FormShell>
  )
}

export { LocalTime }

/** Contact details, office map and the enquiry form. */
export default function ContactSection() {
  return (
    <section
      aria-labelledby="contact-form-title"
      className="relative overflow-hidden bg-night px-3 pt-24 pb-28 text-white sm:px-[30px] md:pt-32 md:pb-40"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-[45vh] w-[70vw] -translate-x-1/2 rounded-full bg-navy/70 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl px-2 text-center">
          <p className="label text-gold-light">Confidential by default</p>
          <h2
            id="contact-form-title"
            className="mt-4 text-[length:var(--text-h2)] leading-[1.08] !text-white [&_.accent-italic]:!text-gold-light"
          >
            Request a confidential <em className="accent-italic">discussion</em>.
          </h2>
        </div>

        <ul className="mt-16 grid gap-3 md:grid-cols-3">
          {contact.details.map((d, i) => (
            <Reveal
              as="li"
              key={d.label}
              delay={i * 0.06}
              className="flex gap-4 rounded-3xl border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-7"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-light/40 text-gold-light">
                <Icon name={d.icon} className="size-4" />
              </span>
              <div>
                <p className="label text-gold-light">{d.label}</p>
                {d.lines.map((l, j) =>
                  d.href && j === 0 ? (
                    <a key={l} href={d.href} className="link-underline mt-2 block font-display text-xl font-light text-white">
                      {l}
                    </a>
                  ) : (
                    <p
                      key={l}
                      className={j === 0 ? 'mt-2 font-display text-xl font-light text-white' : 'mt-1 text-sm text-white/65'}
                    >
                      {l}
                    </p>
                  ),
                )}
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-3 grid gap-3 lg:grid-cols-12">
          <div className="rounded-3xl bg-white p-6 text-ink sm:p-10 lg:col-span-7">
            <EnquiryForm />
          </div>
          <Reveal delay={0.1} className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/12 lg:col-span-5">
            <iframe
              title="Map showing the Shaw Stearns office at Trade Centre First, Dubai"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale-[0.7] invert-[0.88] hue-rotate-180"
            />
            <span className="label glass absolute bottom-4 left-4 rounded-full !border-white/30 !bg-night/70 px-3 py-1.5 !text-[0.5625rem]">
              Dubai · <LocalTime /> local
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
