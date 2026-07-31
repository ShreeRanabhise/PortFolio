'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { personalInfo } from '@/data/portfolioData';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertCircle, MapPin, Copy, Check } from 'lucide-react';

export function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopy = (id: string, text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a brief message (at least 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-stone-50/50 dark:bg-stone-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          badgeVariant="mist"
          title="Let’s build something extraordinary together"
          subtitle="Open for Cloud Architecture & Full-Stack Web Development roles, full-time engineering positions, and collaborative projects."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details & Links (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  Direct Channels
                </h3>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  Quick Access
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Phone Channel */}
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 text-stone-800 dark:text-stone-200 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] text-stone-400 dark:text-stone-500 font-medium">Call / WhatsApp</span>
                      <span className="text-xs sm:text-sm font-semibold block text-stone-900 dark:text-stone-100">{personalInfo.phone}</span>
                    </div>
                  </a>
                  <button
                    onClick={(e) => handleCopy('phone', personalInfo.phone, e)}
                    title="Quick Copy Phone Number"
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium shadow-2xs"
                  >
                    {copiedId === 'phone' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Email Channel */}
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 text-stone-800 dark:text-stone-200 hover:border-sky-300 dark:hover:border-sky-700 transition-all group">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] text-stone-400 dark:text-stone-500 font-medium">Email Address</span>
                      <span className="text-xs sm:text-sm font-semibold block text-stone-900 dark:text-stone-100">{personalInfo.email}</span>
                    </div>
                  </a>
                  <button
                    onClick={(e) => handleCopy('email', personalInfo.email, e)}
                    title="Quick Copy Email Address"
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium shadow-2xs"
                  >
                    {copiedId === 'email' ? (
                      <>
                        <Check className="w-4 h-4 text-sky-500" />
                        <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LinkedIn Channel */}
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 text-stone-800 dark:text-stone-200 hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] text-stone-400 dark:text-stone-500 font-medium">LinkedIn Profile</span>
                      <span className="text-xs sm:text-sm font-semibold block text-stone-900 dark:text-stone-100">linkedin.com/in/shreeranabhise</span>
                    </div>
                  </a>
                  <button
                    onClick={(e) => handleCopy('linkedin', personalInfo.linkedin, e)}
                    title="Quick Copy LinkedIn URL"
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium shadow-2xs"
                  >
                    {copiedId === 'linkedin' ? (
                      <>
                        <Check className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GitHub Channel */}
                <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 text-stone-800 dark:text-stone-200 hover:border-purple-300 dark:hover:border-purple-700 transition-all group">
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[11px] text-stone-400 dark:text-stone-500 font-medium">GitHub Repositories</span>
                      <span className="text-xs sm:text-sm font-semibold block text-stone-900 dark:text-stone-100">github.com/ShreeRanabhise</span>
                    </div>
                  </a>
                  <button
                    onClick={(e) => handleCopy('github', personalInfo.github, e)}
                    title="Quick Copy GitHub URL"
                    className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium shadow-2xs"
                  >
                    {copiedId === 'github' ? (
                      <>
                        <Check className="w-4 h-4 text-purple-500" />
                        <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-purple-50 dark:from-sky-950/40 dark:to-purple-950/30 border border-sky-200/60 dark:border-sky-800/50 flex items-center gap-3 mt-6">
              <Send className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                Aiming to bring value to innovative Cloud Architecture & Web Engineering teams with clean code, dedication, and fast learning.
              </p>
            </div>
          </div>

          {/* Accessible Contact Form (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 mb-6">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Send a Direct Message
              </h3>
              <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                Direct Form
              </span>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 my-auto"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  Thank you for reaching out. Shree will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200 bg-emerald-200/60 dark:bg-emerald-900/60 rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border ${
                          errors.name
                            ? 'border-rose-400 focus:ring-rose-500'
                            : 'border-stone-200 dark:border-stone-700 focus:ring-sky-500'
                        } focus:outline-none focus:ring-2`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                      >
                        Your Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className={`w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-500'
                            : 'border-stone-200 dark:border-stone-700 focus:ring-sky-500'
                        } focus:outline-none focus:ring-2`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      Subject (Optional)
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaboration / Engineering opportunity"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Shree, I noticed your full-stack web applications..."
                      className={`w-full flex-1 min-h-[160px] px-4 py-3 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-stone-200 dark:border-stone-700 focus:ring-sky-500'
                      } focus:outline-none focus:ring-2 resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Sending message...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
