import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { UploadSection } from './components/UploadSection'
import { FeatureCards } from './components/FeatureCards'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Navbar />
      <HeroSection />
      <UploadSection />
      <FeatureCards />
      <Footer />
    </main>
  )
}
