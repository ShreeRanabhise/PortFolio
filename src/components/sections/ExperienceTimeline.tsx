'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { timelineData, certificatesData, personalInfo } from '@/data/portfolioData';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, GraduationCap, Calendar, Award, ShieldCheck, Globe, Heart } from 'lucide-react';

export function ExperienceTimeline() {
  const experiences = timelineData.filter((item) => item.type === 'experience');
  const education = timelineData.filter((item) => item.type === 'education');

  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-14">
      {/* 1. WORK EXPERIENCE SECTION */}
      <section id="experience" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Professional Experience"
            badgeVariant="peach"
            title="Work Experience"
            subtitle="Demonstrated operational excellence, technology workflows, data quality assurance, and team collaboration."
          />

          <div className="mt-10 space-y-6">
            {experiences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:border-orange-300/80 dark:hover:border-orange-800/60 transition-all duration-200 space-y-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-orange-100/80 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                        {item.role}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 pt-0.5 tracking-tight">
                      {item.organization}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    {item.badge && <Badge variant="peach" className="px-3 py-0.5 text-xs font-semibold">{item.badge}</Badge>}
                    <span className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {item.period}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {item.summary}
                </p>

                {item.keyAchievements && item.keyAchievements.length > 0 && (
                  <div className="pt-4 border-t border-stone-200/40 dark:border-white/[0.06] space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-orange-500" />
                      Key Responsibilities & Highlights:
                    </h4>
                    <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                      {item.keyAchievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. EDUCATION SECTION */}
      <section id="education" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Academic Qualifications"
            badgeVariant="mist"
            title="Education"
            subtitle="Academic degrees and qualifications spanning Master of Computer Applications to foundational honors."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:border-sky-300/80 dark:hover:border-sky-800/60 transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-sky-100/80 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                      <GraduationCap className="w-4.5 h-4.5" />
                    </div>
                    {item.badge && <Badge variant="mist" className="px-2.5 py-0.5 text-xs font-semibold">{item.badge}</Badge>}
                  </div>

                  {(() => {
                    const parts = item.organization.split(/\s*\(([^)]+)\)/);
                    const mainOrg = parts[0];
                    const subOrg = parts[1];
                    return (
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                          {item.role}
                        </span>
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug tracking-tight">
                          {mainOrg}
                        </h3>
                        {subOrg && (
                          <span className="block text-xs font-semibold text-stone-500 dark:text-stone-400 pt-0.5">
                            {subOrg}
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/40 dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 dark:text-stone-100 bg-sky-50/80 dark:bg-sky-950/40 px-2.5 py-1 rounded-xl border border-sky-200/50 dark:border-sky-800/50">
                    {item.gradeOrCgpa}
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {item.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATES SECTION */}
      <section id="certificates" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Certifications"
            badgeVariant="sage"
            title="Certificates & Specialized Training"
            subtitle="Verified industry certifications in Web Development and Data Analytics."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs hover:border-emerald-300/80 dark:hover:border-emerald-800/60 transition-all duration-200 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap">
                    {cert.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-stone-100/60 dark:bg-stone-800/50 text-stone-800 dark:text-stone-200 border border-stone-200/50 dark:border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LANGUAGES & PERSONAL INTERESTS */}
      <section className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-100/80 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                <Globe className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Languages Spoken
              </h3>
            </div>

            <div className="space-y-2.5 pt-1">
              {personalInfo.languages.map((lang) => (
                <div key={lang.language} className="flex items-center justify-between p-3 rounded-2xl bg-stone-100/50 dark:bg-stone-800/40 border border-stone-200/40 dark:border-white/[0.06] text-xs sm:text-sm">
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {lang.language}
                  </span>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-white/[0.08] backdrop-blur-md shadow-2xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-sky-100/80 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                <Heart className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Personal Interests & Passions
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {personalInfo.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-2xl bg-stone-100/60 dark:bg-stone-800/50 text-stone-800 dark:text-stone-200 border border-stone-200/50 dark:border-white/[0.06] hover:bg-stone-200/60 dark:hover:bg-stone-700/60 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
