import Page from '../components/Page'
import { ContactHeader, ContactMain } from '../components/inner/ContactSections'
import VideoBanner from '../components/VideoBanner'

export default function Contact() {
  return (
    <Page
      title="Contact"
      description="Start a conversation. We offer private discussions to explore whether Shaw Stearns is the right partner for your project."
    >
      <ContactHeader />
      <ContactMain />
      <VideoBanner />
    </Page>
  )
}
