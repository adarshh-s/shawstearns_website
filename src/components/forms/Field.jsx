import { useId } from 'react'

/** Underlined input/textarea with a floating label and inline error. */
export function Field({ label, error, textarea, required, className = '', ...props }) {
  const id = useId()
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className={`relative ${className}`}>
      <Tag
        id={id}
        placeholder=" "
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`peer block w-full border-0 border-b bg-transparent px-0 pt-7 pb-3 text-base text-navy outline-none focus-visible:outline-none ${
          error ? 'border-[#b8321f]' : 'border-navy/20'
        } ${textarea ? 'min-h-32 resize-y' : ''}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-7 left-0 origin-left text-base text-muted transition-all duration-300 peer-focus:top-1 peer-focus:scale-75 peer-focus:text-gold-ink peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:scale-75"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 peer-focus:scale-x-100"
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-[#b8321f]">
          {error}
        </p>
      )}
    </div>
  )
}

/** File picker styled as a dashed drop-zone row; shows the chosen file with a remove button. */
export function FileField({ label, hint, file, onChange, error, required, accept }) {
  const id = useId()
  return (
    <div>
      <p className="label text-muted">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </p>
      {file ? (
        <div className="mt-3 flex items-center justify-between gap-4 border border-navy/20 px-4 py-3 text-sm">
          <span className="truncate text-navy">{file.name}</span>
          <button type="button" onClick={() => onChange(null)} className="label shrink-0 text-gold-ink hover:text-navy">
            Remove
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="mt-3 flex cursor-pointer items-center justify-between gap-4 border border-dashed border-navy/25 px-4 py-4 text-sm text-muted transition-colors hover:border-navy has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-ink"
        >
          <span>{hint}</span>
          <span className="label shrink-0 text-gold-ink">Choose file</span>
          <input
            id={id}
            type="file"
            accept={accept}
            required={required}
            aria-invalid={Boolean(error)}
            className="sr-only"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
      {error && <p className="mt-2 text-sm text-[#b8321f]">{error}</p>}
    </div>
  )
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
export const MAX_FILE_MB = 10
export const fileTooBig = (f) => f && f.size > MAX_FILE_MB * 1024 * 1024
