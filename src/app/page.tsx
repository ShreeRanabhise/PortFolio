import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { AgenticGuideWidget } from '@/components/ai-guide/AgenticGuideWidget';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-sky-200 dark:selection:bg-sky-900 selection:text-sky-900 dark:selection:text-sky-100">
      <Navbar />

      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <ProjectsSection />
        <ExperienceTimeline />
        <ContactSection />
      </main>

      <Footer />
      <AgenticGuideWidget />
    </div>
  );
}
