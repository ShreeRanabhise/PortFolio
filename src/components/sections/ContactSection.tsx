'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';
import { Mail, Phone, Github, Linkedin, Send, Copy, Check, Download, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export function ContactSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleCopy = (id: string, text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide a message (at least 10 characters)';
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
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#090b10] text-slate-900 dark:text-white relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-xs font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mx-auto">
            <Mail className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Let&apos;s build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-violet-300">
              extraordinary
            </span>{' '}
            together.
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Open for Cloud Architecture & Full-Stack Web Development roles, engineering positions, and collaborative products.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Direct Contact & Embedded Social Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-6 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.06] pb-4">
                <span>Direct Reach</span>
                <span className="text-xs font-mono text-slate-500 dark:text-stone-500">Pune, India</span>
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 flex items-center justify-between gap-3 transition-all duration-200 group">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-stone-500 tracking-wider font-bold block">Email</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white block truncate group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{personalInfo.email}</span>
                    </div>
                  </a>
                  <button
                    onClick={(e) => handleCopy('email', personalInfo.email, e)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-500 dark:text-stone-500 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/30 transition-all duration-200"
                    aria-label="Copy email address"
                  >
                    {copiedId === 'email' ? <Check className="w-4 h-4 text-violet-600 dark:text-violet-400" /> : <Copy className="w-4 h-4 text-violet-600 dark:text-violet-400" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 flex items-center justify-between gap-3 transition-all duration-200 group">
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-stone-500 tracking-wider font-bold block">Phone / WhatsApp</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white block truncate group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{personalInfo.phone}</span>
                    </div>
                  </a>
                  <button
                    onClick={(e) => handleCopy('phone', personalInfo.phone, e)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-slate-500 dark:text-stone-500 hover:text-slate-950 dark:hover:text-white hover:border-violet-500/30 transition-all duration-200"
                    aria-label="Copy phone number"
                  >
                    {copiedId === 'phone' ? <Check className="w-4 h-4 text-violet-600 dark:text-violet-400" /> : <Copy className="w-4 h-4 text-violet-600 dark:text-violet-400" />}
                  </button>
                </div>
              </div>

              {/* Social profiles: GitHub & LinkedIn Embedded Cards */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/[0.06] space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-stone-500 font-bold tracking-wider block">
                  Professional Networks
                </span>

                <div className="space-y-3">
                  {/* LinkedIn Embedded Link */}
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 flex items-center justify-between gap-3 text-slate-700 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                        <Linkedin className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-slate-900 dark:text-white block group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">LinkedIn Profile</span>
                        <span className="text-xs font-mono text-slate-500 dark:text-stone-400 block truncate">linkedin.com/in/shreeranabhise</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                  </a>

                  {/* GitHub Embedded Link */}
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] hover:border-violet-500/30 flex items-center justify-between gap-3 text-slate-700 dark:text-stone-300 hover:text-slate-950 dark:hover:text-white transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                        <Github className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-slate-900 dark:text-white block group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">GitHub Repositories</span>
                        <span className="text-xs font-mono text-slate-500 dark:text-stone-400 block truncate">github.com/ShreeRanabhise</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                  </a>
                </div>

                {/* Resume Download Action Button */}
                <div className="pt-2">
                  <a
                    href={`mailto:${personalInfo.email}?subject=Request%20for%20Resume`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold shadow-lg shadow-violet-600/25 transition-all duration-200 active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4 text-white" />
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-5 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-6 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/[0.06] pb-4">
                Send a Direct Message
              </h3>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-violet-100/80 dark:bg-violet-500/[0.06] border border-violet-300 dark:border-violet-500/20 text-center space-y-3"
                >
                  <CheckCircle2 className="w-12 h-12 text-violet-600 dark:text-violet-400 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                  <p className="text-sm text-slate-600 dark:text-stone-400">
                    Thank you for reaching out. Shree will review your message and reply promptly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-4 py-2.5 min-h-[44px] rounded-md bg-violet-600/10 dark:bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-semibold hover:bg-violet-600/20 transition-colors duration-200"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-stone-400">Your Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 min-h-[44px] rounded-md bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white text-base sm:text-sm border ${
                          errors.name ? 'border-rose-500/50' : 'border-slate-200/80 dark:border-white/[0.06]'
                        } focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/50 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-stone-600`}
                      />
                      {errors.name && <span className="text-[10px] text-rose-500 font-medium">{errors.name}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-stone-400">Your Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 min-h-[44px] rounded-md bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white text-base sm:text-sm border ${
                          errors.email ? 'border-rose-500/50' : 'border-slate-200/80 dark:border-white/[0.06]'
                        } focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/50 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-stone-600`}
                      />
                      {errors.email && <span className="text-[10px] text-rose-500 font-medium">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700 dark:text-stone-400">Subject / Topic</label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Full-Stack Engineering Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 min-h-[44px] rounded-md bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white text-base sm:text-sm border border-slate-200/80 dark:border-white/[0.06] focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/50 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-stone-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-stone-400">Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell me about your project goals or team needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-md bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white text-base sm:text-sm border ${
                        errors.message ? 'border-rose-500/50' : 'border-slate-200/80 dark:border-white/[0.06]'
                      } focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/50 transition-all duration-200 resize-none placeholder:text-slate-400 dark:placeholder:text-stone-600`}
                    />
                    {errors.message && <span className="text-[10px] text-rose-500 font-medium">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[44px] rounded-md bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
