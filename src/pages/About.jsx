import { about } from '../content/site'
import Page from '../components/Page'
import LightHero from '../components/inner/LightHero'
import { AboutMedia, Credentials, PracticeSplit, PrinciplesExplorer, ValuesMosaic } from '../components/inner/AboutSections'
import ConnectPanel from '../components/inner/ConnectPanel'

export default function About() {
  const { hero } = about
  return (
    <Page
      title="About"
      description="Shaw Stearns is a pure client-side boutique. We exist solely to protect the interests of owners and developers."
    >
      <LightHero label={hero.label} title={hero.title} sub={about.protect.intro} className="!pb-12" />
      <AboutMedia />
      <PracticeSplit />
      <PrinciplesExplorer />
      <ValuesMosaic />
      <Credentials />
      <div className="h-24 bg-white md:h-32" />
      <ConnectPanel />
    </Page>
  )
}
