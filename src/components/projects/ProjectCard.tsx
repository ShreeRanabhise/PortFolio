'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, ShoppingBag, Server, CheckCircle2, Layout } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { Counter } from '@/components/ui/Counter';

const Project3DCanvas = dynamic(() => import('@/components/webgl/Project3DCanvas'), {
  ssr: false,
});

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
}

export function ProjectCard({ project, isFeatured = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeIcon = (mockupType: string) => {
    switch (mockupType) {
      case 'dashboard': return <Layout className="w-4 h-4 text-violet-400" />;
      case 'ecommerce': return <ShoppingBag className="w-4 h-4 text-violet-400" />;
      case 'erp': return <Server className="w-4 h-4 text-violet-400" />;
      default: return <Layout className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300 ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
    >
      <div>
        {/* Visual preview area with 3D WebGL background */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#0d1017] via-[#0f1218] to-[#0d1017] p-6 flex flex-col justify-between border-b border-white/[0.06]">
          {/* WebGL 3D Canvas */}
          <Project3DCanvas
            mockupType={project.imagePlaceholder.mockupType}
            isHovered={isHovered}
            className="absolute inset-0 z-0 opacity-80"
          />

          {/* Subtle grid bg */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-violet-600 text-[10px] font-bold text-white uppercase tracking-wider">
              Featured
            </div>
          )}

          {/* Badge & category header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-semibold text-stone-300 backdrop-blur-sm">
              {getBadgeIcon(project.imagePlaceholder.mockupType)}
              <span>{project.imagePlaceholder.badgeText}</span>
            </span>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          {/* Center mockup */}
          <div className="relative z-10 my-auto py-6 text-center space-y-2 group-hover:scale-[1.03] transition-transform duration-300">
            <div className="inline-block p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white backdrop-blur-sm">
              <h4 className="text-xl font-extrabold text-white tracking-tight">{project.title}</h4>
              <p className="text-xs text-violet-300/80 font-mono mt-1">{project.shortDescription.slice(0, 70)}...</p>
            </div>
          </div>

          {/* Bottom preview metrics */}
          {project.stats && (
            <div className="relative z-10 flex items-center gap-4 text-xs font-mono text-stone-500 pt-2">
              {project.stats.map((s, i) => (
                <span key={i} className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
                  <strong className="text-stone-300">{s.label}:</strong> <Counter value={s.value} />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors duration-200 flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowRight className="w-5 h-5 text-stone-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200" />
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Outcome */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-stone-400">
            <strong className="text-violet-400 font-semibold">Outcome: </strong>
            {project.outcome}
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-stone-400 group-hover:text-stone-300 group-hover:border-violet-500/20 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-white/[0.06] mt-auto">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors duration-200"
        >
          <span>View Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-white/[0.03] border border-white/[0.06] text-stone-500 hover:text-white hover:border-violet-500/30 transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label={`View ${project.title} GitHub Repository`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md bg-white/[0.03] border border-white/[0.06] text-stone-500 hover:text-white hover:border-violet-500/30 transition-all duration-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label={`Visit ${project.title} Live Website`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
