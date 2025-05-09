import Intro from './components/Intro'
import Navigation from './components/Navigation'
import Background3D from './components/Background3D'
import ClientServices from './components/ClientServices'
import ClientWork from './components/ClientWork'
import ClientContact from './components/ClientContact'

export default function Home() {
  return (
    <main className="bg-[#020617]">
      <Background3D />
      <div className="relative">
        <Navigation />
        <Intro />
      </div>
      <ClientServices />
      <ClientWork />
      <div className="relative">
        <ClientContact />
      </div>
    </main>
  )
}