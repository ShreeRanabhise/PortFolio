import Link from 'next/link';
import { personalInfo } from '@/data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-[#090b10] border-t border-white/[0.06] text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand & Copyright */}
        <div className="space-y-1">
          <Link
            href="/"
            className="text-base font-extrabold text-white tracking-tight hover:text-violet-400 transition-colors"
          >
            {personalInfo.name}
          </Link>
          <p className="text-xs font-mono text-stone-400">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-stone-400">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="#education" className="hover:text-white transition-colors">Education</Link>
          <Link href="#certificates" className="hover:text-white transition-colors">Certificates</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-violet-500/40 text-stone-400 hover:text-white transition-all"
          >
            <Github className="w-4 h-4 text-violet-400" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-violet-500/40 text-stone-400 hover:text-white transition-all"
          >
            <Linkedin className="w-4 h-4 text-violet-400" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send Email"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-violet-500/40 text-stone-400 hover:text-white transition-all"
          >
            <Mail className="w-4 h-4 text-violet-400" />
          </a>
          <a
            href="#main-content"
            aria-label="Back to Top"
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-violet-600 text-stone-400 hover:text-white transition-all"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-violet-400 group-hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
}
