import { servicesPage, videos } from '../content/site'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import StackingDisciplines from '../components/StackingDisciplines'
import Methodology from '../components/Methodology'
import CtaBand from '../components/CtaBand'

export default function Services() {
  const { hero } = servicesPage
  return (
    <Page
      title="Services"
      description="Project Management, Cost Management & Quantity Surveying and Development Advisory — delivered with clarity, discipline and complete independence."
    >
      <PageHero label={hero.label} title={hero.title} sub={hero.sub} video={videos.businessbay} />
      <StackingDisciplines />
      <Methodology />
      <CtaBand />
    </Page>
  )
}
