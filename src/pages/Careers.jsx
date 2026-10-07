import Page from '../components/Page'
import { CareersApply, CareersEditorial, CareersHero } from '../components/inner/CareersSections'

export default function Careers() {
  return (
    <Page
      title="Careers"
      description="Grow with purpose. Join a pure client-side practice working on complex projects across the UAE."
    >
      <CareersHero />
      <CareersEditorial />
      <CareersApply />
    </Page>
  )
}
