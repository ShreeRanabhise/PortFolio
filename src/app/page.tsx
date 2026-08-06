import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { TrustProofSection } from '@/components/sections/TrustProofSection';
import { About } from '@/components/sections/About';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { Skills } from '@/components/sections/Skills';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { AgenticGuideWidget } from '@/components/ai-guide/AgenticGuideWidget';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-violet-600 selection:text-white">
      <Navbar />

      <main id="main-content" className="flex-grow">
        <Hero />
        <TrustProofSection />
        <About />
        <Skills />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificatesSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <AgenticGuideWidget />
    </div>
  );
}
