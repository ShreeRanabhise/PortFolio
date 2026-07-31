import Link from 'next/link';
import { personalInfo } from '@/data/portfolioData';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand & copyright */}
        <div className="space-y-1">
          <Link
            href="/"
            className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight hover:opacity-80 transition-opacity"
          >
            Shree Ranabhise
          </Link>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            © {currentYear} Shree Ranabhise. All rights reserved.
          </p>
        </div>



        {/* Social Links */}
        <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-xl hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-xl hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send Email"
            className="p-2 rounded-xl hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
