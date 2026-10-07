import Page from '../components/Page'
import { DisciplineCards, DisciplineRows, ServicesHero } from '../components/inner/ServicesSections'
import Methodology from '../components/Methodology'
import VideoBanner from '../components/VideoBanner'

export default function Services() {
  return (
    <Page
      title="Services"
      description="Project Management, Cost Management & Quantity Surveying and Development Advisory — delivered with clarity, discipline and complete independence."
    >
      <ServicesHero />
      <DisciplineCards />
      <DisciplineRows />
      <Methodology />
      <div className="h-24 bg-white md:h-32" />
      <VideoBanner />
    </Page>
  )
}
