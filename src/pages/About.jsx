import { about, videos } from '../content/site'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import NotStatement from '../components/NotStatement'
import Principles from '../components/Principles'
import CoreValues from '../components/CoreValues'
import CtaBand from '../components/CtaBand'

export default function About() {
  const { hero } = about
  return (
    <Page
      title="About"
      description="Shaw Stearns is a pure client-side boutique. We exist solely to protect the interests of owners and developers."
    >
      <PageHero label={hero.label} title={hero.title} sub={hero.sub} video={videos.about} />
      <NotStatement />
      <Principles />
      <CoreValues />
      <CtaBand />
    </Page>
  )
}
