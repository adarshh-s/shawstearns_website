import Page from '../components/Page'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <Page title="Page not found">
      <section className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-6 pt-24 text-center">
        <p className="label text-gold-ink">404</p>
        <h1 className="mt-4 text-[length:var(--text-display)] leading-none">
          This page is <em className="accent-italic">still on the drawing board</em>.
        </h1>
        <Button href="/" className="mt-10">
          Back to home
        </Button>
      </section>
    </Page>
  )
}
