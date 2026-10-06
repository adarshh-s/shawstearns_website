import Page from '../components/Page'
import Hero from '../components/Hero'
import HomeIntro from '../components/HomeIntro'
import Difference from '../components/Difference'
import ServiceCards from '../components/ServiceCards'
import SectorsMosaic from '../components/SectorsMosaic'
import PromiseBand from '../components/PromiseBand'
import CtaBand from '../components/CtaBand'

export default function Home() {
  return (
    <Page>
      <Hero />
      <Difference />
      <ServiceCards />
      <HomeIntro />
      <SectorsMosaic />
      <PromiseBand />
      <CtaBand />
    </Page>
  )
}
