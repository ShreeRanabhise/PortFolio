'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { projects } from '@/data/portfolioData';
import { ProjectCard } from '@/components/projects/ProjectCard';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Layout, ShoppingCart, Database } from 'lucide-react';
import { Counter } from '@/components/ui/Counter';

const Project3DCanvas = dynamic(() => import('@/components/webgl/Project3DCanvas'), {
  ssr: false,
});

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);

  const categories = ['All', 'Full-Stack & AI', 'E-Commerce', 'Enterprise ERP'];

  const filtered = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const restProjects = featuredProject ? filtered.filter((p) => p.slug !== featuredProject.slug) : filtered;

  const cardReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'ecommerce': return <ShoppingCart className="w-4 h-4 text-indigo-600 dark:text-violet-400" />;
      case 'erp': return <Database className="w-4 h-4 text-indigo-600 dark:text-violet-400" />;
      default: return <Layout className="w-4 h-4 text-indigo-600 dark:text-violet-400" />;
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-violet-500/10 border border-indigo-200 dark:border-violet-500/20 text-indigo-700 dark:text-violet-300 text-xs font-bold font-mono">
            <span>Engineering Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects & Case Studies
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-stone-300 leading-relaxed font-medium">
            Explore production systems designed for speed, type safety, security, and scalability.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 p-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] max-w-2xl mx-auto overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2.5 min-h-[44px] shrink-0 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-700 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectCategoryTab"
                    className="absolute inset-0 rounded-full bg-indigo-600 dark:bg-violet-600 shadow-md shadow-indigo-600/30 dark:shadow-violet-600/30 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Hero Card */}
        {featuredProject && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardReveal}
            onMouseEnter={() => setIsFeaturedHovered(true)}
            onMouseLeave={() => setIsFeaturedHovered(false)}
            className="group relative rounded-3xl bg-slate-50/80 dark:bg-white/[0.02] border border-indigo-100 dark:border-white/[0.06] hover:border-indigo-400/40 dark:hover:border-violet-500/30 transition-all duration-500 shadow-sm dark:shadow-none overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-8 lg:p-10 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-100 dark:bg-violet-500/10 border border-indigo-200 dark:border-violet-500/20 text-indigo-700 dark:text-violet-300 flex items-center gap-1.5">
                    {getBadgeIcon(featuredProject.imagePlaceholder.mockupType)}
                    <span>{featuredProject.imagePlaceholder.badgeText}</span>
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-stone-400 uppercase font-semibold">
                    {featuredProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-stone-400 leading-relaxed font-normal">
                  {featuredProject.shortDescription}
                </p>

                {/* Key Metrics / Stats Strip */}
                {featuredProject.stats && (
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-200 dark:border-white/[0.06]">
                    {featuredProject.stats.map((m, idx) => (
                      <div key={idx}>
                        <Counter value={m.value} className="text-base sm:text-xl font-extrabold text-indigo-600 dark:text-violet-400 block" />
                        <div className="text-[10px] sm:text-xs text-slate-600 dark:text-stone-400 font-medium truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech chips */}
                <div className="flex flex-wrap items-center gap-2">
                  {featuredProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white dark:bg-white/[0.03] text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] rounded-md bg-white dark:bg-transparent border border-slate-300 dark:border-white/10 hover:border-indigo-500/40 text-slate-800 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white font-semibold text-xs transition-all"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column Graphic with WebGL 3D Preview */}
              <div className="lg:col-span-5 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/[0.08] shadow-xl flex items-center justify-center">
                <Project3DCanvas
                  mockupType={featuredProject.imagePlaceholder.mockupType}
                  isHovered={isFeaturedHovered}
                  className="absolute inset-0 z-0"
                />
                <div className="relative z-10 text-center p-6 space-y-3 pointer-events-none backdrop-blur-[2px]">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 dark:bg-violet-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 dark:text-violet-400 mx-auto shadow-inner">
                    {getBadgeIcon(featuredProject.imagePlaceholder.mockupType)}
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">Interactive 3D Preview</div>
                  <div className="text-xs text-stone-300 max-w-xs mx-auto font-medium">
                    {featuredProject.challenge}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {restProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
