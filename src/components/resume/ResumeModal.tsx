'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Download, Printer, Mail, Phone, MapPin, ExternalLink, Calendar, Award } from 'lucide-react';
import { personalInfo, timelineData, certificatesData, projects } from '@/data/portfolioData';

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:text-stone-950 dark:bg-white dark:hover:bg-stone-100 border border-stone-800 dark:border-white rounded-full transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5 text-white dark:text-stone-950" />
        <span>Resume</span>
      </button>

      {/* Modal Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header Action Bar */}
              <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      Official Curriculum Vitae
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      {personalInfo.name} • {personalInfo.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl border border-stone-200 dark:border-stone-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Print / Save PDF</span>
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Resume Modal"
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Resume Body Container */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans print:p-0 print:text-black">
                {/* Resume Header Section */}
                <div className="text-center space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 uppercase">
                    {personalInfo.name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600 dark:text-stone-300">
                    <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-sky-600">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{personalInfo.phone}</span>
                    </a>
                    <span>•</span>
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-sky-600">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{personalInfo.email}</span>
                    </a>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{personalInfo.location}</span>
                    </span>
                    <span>•</span>
                    <span>DoB : {personalInfo.dob}</span>
                  </div>
                </div>

                {/* 1. Education Section */}
                <div className="space-y-4">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    EDUCATION
                  </h2>
                  <div className="space-y-4">
                    {timelineData.filter(i => i.type === 'education').map(edu => (
                      <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs sm:text-sm">
                        <div>
                          <h3 className="font-bold text-stone-900 dark:text-stone-100">
                            {edu.role}
                          </h3>
                          <p className="text-stone-700 dark:text-stone-300 font-medium">
                            {edu.organization}
                          </p>
                          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                            {edu.gradeOrCgpa}
                          </p>
                        </div>
                        <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Skills Section */}
                <div className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    SKILLS
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                    Responsive Web Design | Frontend Development | Backend Integration | API Integration
                  </p>
                </div>

                {/* 3. Experience Section */}
                <div className="space-y-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    EXPERIENCE
                  </h2>
                  {timelineData.filter(i => i.type === 'experience').map(exp => (
                    <div key={exp.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs sm:text-sm">
                      <div>
                        <h3 className="font-bold text-stone-900 dark:text-stone-100">
                          {exp.role} <span className="font-medium text-stone-700 dark:text-stone-300">— {exp.organization}</span>
                        </h3>
                      </div>
                      <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 4. Certificates Section */}
                <div className="space-y-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    CERTIFICATES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certificatesData.map(cert => (
                      <div key={cert.title} className="text-xs sm:text-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-stone-900 dark:text-stone-100">
                            {cert.title} : <span className="font-semibold text-stone-700 dark:text-stone-300">{cert.issuer}</span>
                          </h3>
                          <span className="text-xs text-stone-500">{cert.period}</span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {cert.skills.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Languages Section */}
                <div className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    LANGUAGES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {personalInfo.languages.map(l => (
                      <div key={l.language}>
                        <span className="font-bold text-stone-900 dark:text-stone-100">{l.language}</span>
                        <span className="block text-xs text-stone-500 dark:text-stone-400">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Personal Projects Section */}
                <div className="space-y-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    PERSONAL PROJECTS
                  </h2>
                  <div className="space-y-2">
                    {projects.map(p => (
                      <div key={p.slug} className="text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 dark:text-stone-100 uppercase">{p.title}</span> : 
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
                            {p.liveUrl}
                          </a>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                          {p.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Interests Section */}
                <div className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 dark:text-sky-400 border-b border-stone-200 dark:border-stone-800 pb-1">
                    INTERESTS
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                    {personalInfo.interests.join(' | ')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
