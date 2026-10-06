import { about, photos, videos } from '../content/site'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import NotStatement from '../components/NotStatement'
import Principles from '../components/Principles'
import CoreValues from '../components/CoreValues'
import GlassQuote from '../components/GlassQuote'
import VideoBanner from '../components/VideoBanner'
import CtaBand from '../components/CtaBand'

export default function About() {
  const { hero } = about
  return (
    <Page
      title="About"
      description="Shaw Stearns is a pure client-side boutique. We exist solely to protect the interests of owners and developers."
    >
      <PageHero label={hero.label} title={hero.title} sub={hero.sub} video={videos.grasses} />
      <NotStatement />
      <Principles />
      <CoreValues />
      <GlassQuote
        image={photos.lobby}
        alt="A calm, light-filled office lobby"
        label="Professional standards"
        title="Integrity, independence and professional conduct are non-negotiable."
        body="All work is conducted in accordance with the standards of the Royal Institution of Chartered Surveyors (RICS) and the Chartered Institute of Building (CIOB)."
        cta={{ label: 'Our services', to: '/services' }}
        align="left"
      />
      <VideoBanner />
      <CtaBand />
    </Page>
  )
}
