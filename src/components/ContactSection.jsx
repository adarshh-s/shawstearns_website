import { useEffect, useState } from 'react'
import { contact, forms, site } from '../content/site'
import { Field, FileField, fileTooBig, isEmail, MAX_FILE_MB } from './forms/Field'
import { FormShell, SubmitButton } from './forms/FormShell'
import { submitForm } from './forms/submit'
import Icon from './ui/Icon'
import Reveal from './ui/Reveal'

function EnquiryForm() {
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

/** Dubai local time, refreshed each half-minute. */
function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return new Intl.DateTimeFormat('en-GB', { timeZone: site.timezone, hour: '2-digit', minute: '2-digit' }).format(now)
}

/** Contact details, office map and the enquiry form. */
export default function ContactSection() {
  return (
    <section aria-label="Contact details and enquiry form" className="bg-white px-5 pb-24 sm:px-8">
      <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-10 lg:col-span-4">
          {contact.details.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.06} className="flex gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center bg-navy text-white">
                <Icon name={d.icon} className="size-4" />
              </span>
              <div>
                <p className="label text-gold-ink">{d.label}</p>
                {d.lines.map((l, j) =>
                  d.href && j === 0 ? (
                    <a
                      key={l}
                      href={d.href}
                      className="link-underline mt-2 block font-display text-xl font-light tracking-[-0.01em] text-navy"
                    >
                      {l}
                    </a>
                  ) : (
                    <p
                      key={l}
                      className={
                        j === 0 ? 'mt-2 font-display text-xl font-light tracking-[-0.01em] text-navy' : 'mt-1 text-sm text-muted'
                      }
                    >
                      {l}
                    </p>
                  ),
                )}
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="relative aspect-[4/3] overflow-hidden bg-mist">
            <iframe
              title="Map showing the Shaw Stearns office at Trade Centre First, Dubai"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale-[0.6]"
            />
            <span className="label glass absolute bottom-3 left-3 !border-white/40 !bg-navy/70 px-3 py-1.5 !text-[0.5625rem]">
              Dubai · <LocalTime /> local
            </span>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <EnquiryForm />
        </div>
      </div>
    </section>
  )
}
