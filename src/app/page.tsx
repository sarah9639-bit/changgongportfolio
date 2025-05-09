import Intro from './components/Intro'
import Services from './components/Services'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import Background3D from './components/Background3D'

export default function Home() {
  return (
    <main className="bg-[#020617]">
      <Background3D />
      <div className="relative">
        <Navigation />
        <Intro />
      </div>
      <Services />
      <div className="relative">
        <Contact />
      </div>
    </main>
  )
}