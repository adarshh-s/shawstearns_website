import { careers, photos } from '../content/site'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import CareersBody from '../components/CareersBody'

export default function Careers() {
  const { hero } = careers
  return (
    <Page
      title="Careers"
      description="Grow with purpose. Join a pure client-side practice working on complex projects across the UAE."
    >
      <PageHero label={hero.label} title={hero.title} sub={hero.sub} image={photos.careers} />
      <CareersBody />
    </Page>
  )
}
