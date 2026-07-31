'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types/portfolio';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Github, ArrowRight, Layout, ShoppingCart, Database } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const mockupIcons = {
    dashboard: Layout,
    ecommerce: ShoppingCart,
    erp: Database,
  };

  const MockupIcon = mockupIcons[project.imagePlaceholder.mockupType] || Layout;

  const accentBadgeVariants: Record<string, 'mist' | 'sage' | 'lavender'> = {
    mist: 'mist',
    sage: 'sage',
    lavender: 'lavender',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col justify-between rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:shadow-md hover:border-sky-300/80 dark:hover:border-sky-800/60 overflow-hidden transition-all duration-300"
    >
      {/* Top Banner / Visual Architecture Preview Image */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`Open live site for ${project.title}`}
        className="relative h-48 w-full bg-stone-950 p-4 flex flex-col justify-between overflow-hidden cursor-pointer block group/preview"
      >
        {project.previewImage ? (
          <>
            <Image
              src={project.previewImage}
              alt={`${project.title} Visual Architecture Preview`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-top group-hover/preview:scale-105 transition-transform duration-500 opacity-90 group-hover/preview:opacity-100"
            />
            {/* Top Badge Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <Badge variant={accentBadgeVariants[project.imagePlaceholder.accentColor] || 'mist'}>
                {project.imagePlaceholder.badgeText}
              </Badge>

              <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-amber-100/90 text-amber-900 dark:bg-amber-950/90 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800/60 backdrop-blur-xs">
                    Featured
                  </span>
                )}
                <span className="p-1.5 rounded-full bg-stone-900/80 text-white border border-stone-700/80 backdrop-blur-md opacity-80 group-hover/preview:opacity-100 group-hover/preview:scale-110 transition-all">
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            {/* Bottom Gradient Fade & Hover Redirect Hint */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent flex items-end justify-between p-3.5 z-10">
              <span className="text-[11px] font-semibold text-white/90 group-hover/preview:text-sky-300 flex items-center gap-1 transition-colors">
                Live Preview <ExternalLink className="w-3 h-3" />
              </span>
              <span className="text-[10px] font-mono text-stone-300/80 opacity-0 group-hover/preview:opacity-100 transition-opacity">
                Click to Open ↗
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-200/30 dark:bg-sky-900/20 blur-xl group-hover/preview:scale-125 transition-transform" />
            <div className="flex items-center justify-between z-10">
              <Badge variant={accentBadgeVariants[project.imagePlaceholder.accentColor] || 'mist'}>
                {project.imagePlaceholder.badgeText}
              </Badge>
              {project.featured && (
                <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800/60">
                  Featured
                </span>
              )}
            </div>
            <div className="self-center flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 z-10 my-auto group-hover/preview:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/60 flex items-center justify-center text-stone-700 dark:text-stone-300 shadow-xs mb-2">
                <MockupIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium tracking-wider uppercase text-stone-400 dark:text-stone-500">
                {project.category}
              </span>
            </div>
          </>
        )}
      </a>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3 font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-xl bg-stone-100/60 dark:bg-stone-800/50 text-[11px] font-semibold text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom CTA Links */}
        <div className="pt-4 border-t border-stone-200/40 dark:border-white/[0.06] flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-200 group/link"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-1">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 flex items-center justify-center transition-colors active:scale-95"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 flex items-center justify-center transition-colors active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
