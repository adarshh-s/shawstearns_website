import { site } from '../../content/site'

/**
 * Sends a form. With an endpoint, POSTs multipart FormData (files included) and resolves to
 * { ok: true }. Without one, opens an email draft (files can't be attached via mailto) and
 * resolves to { ok: true, viaEmail: true }.
 */
export async function submitForm({ endpoint, subject, fields, files = {} }) {
  if (endpoint) {
    const data = new FormData()
    Object.entries(fields).forEach(([k, v]) => v && data.append(k, v))
    Object.entries(files).forEach(([k, f]) => f && data.append(k, f, f.name))
    const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`Submission failed (${res.status})`)
    return { ok: true }
  }
  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { ok: true, viaEmail: true }
}
