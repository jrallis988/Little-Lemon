import { useState, useCallback } from 'react'
import type { PosterId } from './data/posters'
import { CaseNav } from './components/CaseNav'
import { Hero } from './components/Hero'
import { Concept } from './components/Concept'
import { ArtDirection } from './components/ArtDirection'
import { TypographySection } from './components/TypographySection'
import { PhotographySection } from './components/PhotographySection'
import { PosterSeries } from './components/PosterSeries'
import { DetailViewer } from './components/DetailViewer'
import { Compositing } from './components/Compositing'
import { GraphicSystem } from './components/GraphicSystem'
import { AthleteCards } from './components/AthleteCards'
import { PrintApplications } from './components/PrintApplications'
import { LargeFormat } from './components/LargeFormat'
import { DigitalAdaptation } from './components/DigitalAdaptation'
import { Process } from './components/Process'
import { Gallery } from './components/Gallery'
import { FinalCollection } from './components/FinalCollection'
import { Lightbox } from './components/Lightbox'
import './styles/global.css'

export default function App() {
  const [lightboxId, setLightboxId] = useState<PosterId | null>(null)
  const openPoster = useCallback((id: PosterId) => setLightboxId(id), [])
  const closePoster = useCallback(() => setLightboxId(null), [])

  return (
    <>
      <CaseNav />
      <main>
        <Hero />
        <Concept />
        <ArtDirection />
        <TypographySection />
        <PhotographySection />
        <PosterSeries onOpen={openPoster} />
        <DetailViewer />
        <Compositing />
        <GraphicSystem />
        <PrintApplications onOpen={openPoster} />
        <LargeFormat />
        <DigitalAdaptation />
        <AthleteCards />
        <Process />
        <Gallery onOpen={openPoster} />
        <FinalCollection onOpen={openPoster} />
      </main>
      <footer className="site-footer">
        <span>VELOCITY · Sports Poster & Art Direction Series</span>
        <a href="/index.html">← Artistic Fountain</a>
      </footer>
      <Lightbox id={lightboxId} onClose={closePoster} />
    </>
  )
}
