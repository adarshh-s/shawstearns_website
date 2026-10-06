import { contact, images } from '../content/site'
import Page from '../components/Page'
import PageHero from '../components/PageHero'
import ContactSection from '../components/ContactSection'

export default function Contact() {
  const { hero } = contact
  return (
    <Page
      title="Contact"
      description="Start a conversation. We offer private discussions to explore whether Shaw Stearns is the right partner for your project."
    >
      <PageHero label={hero.label} title={hero.title} sub={hero.sub} image={images.boardroom} />
      <div className="h-16 bg-white" />
      <ContactSection />
    </Page>
  )
}
