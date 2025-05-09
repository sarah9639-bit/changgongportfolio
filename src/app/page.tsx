import Intro from './components/Intro'
import Services from './components/Services'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

export default function Home() {
  return (
    <main className="bg-[#020617]">
      <Navigation />
      <Intro />
      <Services />
      <Contact />
    </main>
  )
}