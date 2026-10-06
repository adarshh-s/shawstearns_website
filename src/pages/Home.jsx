import { photos } from '../content/site'
import Page from '../components/Page'
import Hero from '../components/Hero'
import Statement from '../components/Statement'
import Pillars from '../components/Pillars'
import GlassQuote from '../components/GlassQuote'
import SectorsLine from '../components/SectorsLine'
import CtaBand from '../components/CtaBand'

export default function Home() {
  return (
    <Page>
      <Hero />
      <Statement />
      <Pillars />
      <GlassQuote image={photos.contact} alt="Looking out over the city through cherry blossoms" />
      <SectorsLine />
      <CtaBand />
    </Page>
  )
}
