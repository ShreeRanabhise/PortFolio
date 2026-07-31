import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/portfolioData';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AgenticGuideWidget } from '@/components/ai-guide/AgenticGuideWidget';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Layers,
  Layout,
  ShoppingCart,
  Database,
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
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const mockupIcons = {
    dashboard: Layout,
    ecommerce: ShoppingCart,
    erp: Database,
  };

  const MockupIcon = mockupIcons[project.imagePlaceholder.mockupType] || Layout;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfbf9] dark:bg-[#0f1218] text-stone-900 dark:text-stone-100 transition-colors">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Back Navigation Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>

          {/* Header Banner */}
          <div className="space-y-6 border-b border-stone-200/80 dark:border-stone-800 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="mist">{project.category}</Badge>
              {project.featured && <Badge variant="peach">Featured Project</Badge>}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {project.shortDescription}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-all"
              >
                <span>Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>

          {/* Visual Showcase Graphic Mockup */}
          <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md bg-stone-950">
            {project.previewImage ? (
              <Image
                src={project.previewImage}
                alt={`${project.title} Visual Architecture Preview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-500 dark:text-stone-400 gap-3 h-full">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-800 dark:text-stone-200 shadow-md">
                  <MockupIcon className="w-8 h-8" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  {project.title} Visual Architecture Preview
                </span>
              </div>
            )}
          </div>

          {/* Overview & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-500" />
                Project Overview
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {project.fullOverview}
              </p>
            </div>

            <div className="md:col-span-4 p-6 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                Tech Stack Used
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Problem & Challenge */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
            <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              The Core Challenge
            </h2>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Technical Approach & Implementation */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-500" />
              Technical Approach & Architecture
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {project.approach.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome & Impact Highlights */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-4">
            <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Outcome & Measurable Impact
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
              {project.outcome}
            </p>
            <ul className="space-y-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40">
              {project.impactHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons Learned */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Key Lessons Learned
            </h2>
            <ul className="space-y-2 list-disc pl-5 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              {project.lessonsLearned.map((lesson, idx) => (
                <li key={idx}>{lesson}</li>
              ))}
            </ul>
          </div>

        </div>
      </main>

      <Footer />
      <AgenticGuideWidget />
    </div>
  );
}
