import Page from '../components/Page'
import Hero from '../components/Hero'
import Statement from '../components/Statement'
import Formula from '../components/Formula'
import ServiceCards from '../components/ServiceCards'
import GlassQuote from '../components/GlassQuote'
import SectorsLine from '../components/SectorsLine'
import CtaBand from '../components/CtaBand'

export default function Home() {
  return (
    <Page>
      <Hero />
      <Statement />
      <Formula />
      <ServiceCards />
      <GlassQuote />
      <SectorsLine />
      <CtaBand />
    </Page>
  )
}
