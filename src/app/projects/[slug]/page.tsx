import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/portfolioData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AgenticGuideWidget } from '@/components/ai-guide/AgenticGuideWidget';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Layers,
  Layout,
  ShoppingCart,
  Database,
  Calendar,
  UserCheck,
  Zap,
} from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Shree Ranabhise',
    };
  }

  const pageUrl = `https://shreeranabhise.vercel.app/projects/${project.slug}`;

  return {
    title: `${project.title} | Case Study & System Architecture`,
    description: `${project.shortDescription} Developed by Shree Ranabhise using ${project.techStack.join(', ')}.`,
    keywords: [
      project.title,
      project.category,
      ...project.techStack,
      'Shree Ranabhise',
      'Full-Stack Project',
      'System Architecture',
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: pageUrl,
      title: `${project.title} Case Study | Shree Ranabhise`,
      description: project.shortDescription,
      siteName: 'Shree Ranabhise Portfolio',
      images: project.previewImage ? [{ url: project.previewImage, alt: `${project.title} Preview` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} Case Study | Shree Ranabhise`,
      description: project.shortDescription,
      images: project.previewImage ? [project.previewImage] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const currentIndex = projects.findIndex((p) => p.slug === resolvedParams.slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const mockupIcons = {
    dashboard: Layout,
    ecommerce: ShoppingCart,
    erp: Database,
  };

  const MockupIcon = mockupIcons[project.imagePlaceholder.mockupType] || Layout;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-[#090b10] text-slate-900 dark:text-white selection:bg-violet-600 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Back Navigation Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/50 text-xs font-semibold transition-all shadow-sm dark:shadow-none"
          >
            <ArrowLeft className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>Back to Projects Explorer</span>
          </Link>

          {/* Case Study Header Banner */}
          <div className="space-y-6 border-b border-slate-200 dark:border-white/[0.06] pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-bold font-mono">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3.5 py-1.5 rounded-full bg-violet-600 text-white text-xs font-bold">
                  Featured Case Study
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 dark:text-stone-300 leading-relaxed max-w-3xl font-medium">
              {project.shortDescription}
            </p>

            {/* Role & Period Metadata Strip */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-stone-400 font-mono pt-2 border-t border-slate-200 dark:border-white/[0.06]">
              {project.role && (
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span><strong>Role:</strong> {project.role}</span>
                </div>
              )}
              {project.period && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span><strong>Period:</strong> {project.period}</span>
                </div>
              )}
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-lg shadow-violet-600/25 transition-all hover:scale-105"
                >
                  <span>Launch Live Application</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-stone-200 bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] rounded-xl transition-all shadow-sm dark:shadow-none"
                >
                  <Github className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>Inspect Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Stats Highlight Banner */}
          {project.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.stats.map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-center space-y-1 shadow-sm dark:shadow-none">
                  <div className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 font-mono">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-700 dark:text-stone-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Visual Showcase Graphic Mockup */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-xl bg-slate-900">
            {project.previewImage ? (
              <Image
                src={project.previewImage}
                alt={`${project.title} Visual Architecture Preview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-400 gap-4 h-full p-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-violet-400 shadow-xl">
                  <MockupIcon className="w-10 h-10 text-violet-400" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                  {project.title} Visual Architecture Preview
                </span>
              </div>
            )}
          </div>

          {/* Overview & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                System Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-stone-300 leading-relaxed font-normal">
                {project.fullOverview}
              </p>
            </div>

            <div className="md:col-span-4 p-6 rounded-3xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] space-y-4 shadow-sm dark:shadow-none">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                Tech Stack Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-white dark:bg-white/[0.03] text-slate-800 dark:text-stone-300 border border-slate-200 dark:border-white/[0.06] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Problem & Challenge */}
          <div className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-3 shadow-sm dark:shadow-none">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              The Architectural Challenge
            </h2>
            <p className="text-sm sm:text-base text-slate-700 dark:text-stone-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Technical Approach & Implementation */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Lightbulb className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              Technical Strategy & Execution
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {project.approach.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex items-start gap-4 shadow-sm dark:shadow-none"
                >
                  <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-stone-300 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome & Impact Highlights */}
          <div className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-5 shadow-sm dark:shadow-none">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              Delivered Outcome & Measured Impact
            </h2>
            <p className="text-sm sm:text-base text-slate-900 dark:text-stone-200 leading-relaxed font-semibold">
              {project.outcome}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
              {project.impactHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-stone-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons Learned */}
          <div className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] space-y-4 shadow-sm dark:shadow-none">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Engineering Insights & Lessons Learned
            </h2>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-stone-300 leading-relaxed font-medium">
              {project.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-violet-600 dark:text-violet-400 font-mono font-bold">›</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Project Footer CTA */}
          <div className="pt-12 border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs font-mono text-slate-500 dark:text-stone-400 uppercase tracking-widest font-semibold">Up Next</span>
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">{nextProject.title}</h4>
              <p className="text-xs text-slate-600 dark:text-stone-400">{nextProject.shortDescription.slice(0, 80)}...</p>
            </div>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-violet-500/50 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/[0.06] transition-all group shadow-sm dark:shadow-none"
            >
              <span>View Next Case Study</span>
              <ArrowRight className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <AgenticGuideWidget />
    </div>
  );
}
