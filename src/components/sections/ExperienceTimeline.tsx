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
    <div className="space-y-28 py-16">
      {/* 1. WORK EXPERIENCE SECTION */}
      <section id="experience" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Professional Experience"
            badgeVariant="peach"
            title="Work Experience"
            subtitle="Demonstrated operational excellence, technology workflows, data quality assurance, and team collaboration."
          />

          <div className="mt-12 space-y-8">
            {experiences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:border-orange-300 dark:hover:border-orange-800/60 transition-all space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-sm">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                        {item.role}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 pt-1">
                      {item.organization}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {item.badge && <Badge variant="peach" className="px-3.5 py-1 text-xs sm:text-sm font-semibold">{item.badge}</Badge>}
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium">
                      <Calendar className="w-4 h-4 text-stone-400" />
                      {item.period}
                    </span>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                  {item.summary}
                </p>

                {item.keyAchievements && item.keyAchievements.length > 0 && (
                  <div className="pt-5 border-t border-stone-100 dark:border-stone-800/80 space-y-3">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-orange-500" />
                      Key Responsibilities & Highlights:
                    </h4>
                    <ul className="space-y-2 pl-6 list-disc text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:border-sky-300 dark:hover:border-sky-800/60 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-sm shadow-2xs">
                      <GraduationCap className="w-5.5 h-5.5" />
                    </div>
                    {item.badge && <Badge variant="mist" className="px-3 py-1 text-xs sm:text-sm font-semibold">{item.badge}</Badge>}
                  </div>

                  {(() => {
                    const parts = item.organization.split(/\s*\(([^)]+)\)/);
                    const mainOrg = parts[0];
                    const subOrg = parts[1];
                    return (
                      <div className="space-y-0.5">
                        <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                          {item.role}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug pt-0.5">
                          {mainOrg}
                        </h3>
                        {subOrg && (
                          <span className="block text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400 pt-0.5">
                            {subOrg}
                          </span>
                        )}
                      </div>
                    );
                  })()}

                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 bg-sky-50 dark:bg-sky-950/50 px-3 py-1 rounded-xl border border-sky-200/60 dark:border-sky-800/60">
                    {item.gradeOrCgpa}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 font-medium">
                    <Calendar className="w-4 h-4 text-stone-400" />
                    {item.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CERTIFICATES & QUALIFICATIONS SECTION */}
      <section id="certificates" className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Certifications"
            badgeVariant="sage"
            title="Certificates & Specialized Training"
            subtitle="Verified industry certifications in Web Development and Data Analytics."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800/60 transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm shadow-2xs">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-medium whitespace-nowrap">
                    {cert.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-700/60"
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

      {/* 4. LANGUAGES & PERSONAL INTERESTS SECTION */}
      <section className="scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm shadow-2xs">
                <Globe className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                Languages Spoken
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {personalInfo.languages.map((lang) => (
                <div key={lang.language} className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-sm sm:text-base">
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {lang.language}
                  </span>
                  <span className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-semibold">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-sm shadow-2xs">
                <Heart className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                Personal Interests & Passions
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {personalInfo.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-200/60 dark:hover:bg-stone-700/60 transition-colors"
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
