'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/portfolioData';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-10 sm:py-14 bg-stone-100/30 dark:bg-stone-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Portfolio Work"
          badgeVariant="sage"
          title="Featured Projects"
          subtitle="Explore full-stack web applications, AI tools, e-commerce systems, and enterprise ERP solutions."
        />

        {/* Projects Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
