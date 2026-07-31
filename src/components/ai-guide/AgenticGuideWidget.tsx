'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ArrowUpRight, CheckCircle, RefreshCw } from 'lucide-react';
import { aiAssistantIntents, projects, skillCategories, personalInfo } from '@/data/portfolioData';
import { AIResponseOption } from '@/types/portfolio';
import Link from 'next/link';

export function AgenticGuideWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: 'user' | 'assistant'; text: string; action?: { text: string; url: string } }>
  >([
    {
      sender: 'assistant',
      text: `Hi! I'm Shree's Portfolio Assistant. Select a suggestion below or ask a question to explore Shree's skills, projects, and cloud architecture background.`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectIntent = (intent: AIResponseOption) => {
    // Add user question
    setMessages((prev) => [...prev, { sender: 'user', text: intent.question }]);

    // Match response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: intent.answer,
          action: intent.actionText && intent.actionUrl ? { text: intent.actionText, url: intent.actionUrl } : undefined,
        },
      ]);
    }, 200);
  };

  const handleCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const query = inputQuery.trim();
    setInputQuery('');

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);

    // Simple deterministic intent matching
    const qLower = query.toLowerCase();
    let responseText = '';
    let actionObj: { text: string; url: string } | undefined;

    if (qLower.includes('project') || qLower.includes('work') || qLower.includes('pixelink') || qLower.includes('sangli') || qLower.includes('suvarna')) {
      responseText = `Shree has built 3 major projects: Pixelink (AI Web Platform), Sangliceramica (E-Commerce catalog with Supabase), and Suvarna-ERP (Financial Loan Management System).`;
      actionObj = { text: 'View All Projects', url: '#projects' };
    } else if (qLower.includes('skill') || qLower.includes('tech') || qLower.includes('stack') || qLower.includes('react') || qLower.includes('next')) {
      responseText = `Shree's core tech stack includes Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Supabase, Python, Docker, and Prompt Engineering.`;
      actionObj = { text: 'View Skills Matrix', url: '#skills' };
    } else if (qLower.includes('contact') || qLower.includes('hire') || qLower.includes('email') || qLower.includes('intern') || qLower.includes('job')) {
      responseText = `Shree is actively looking for Cloud Architecture and Full-Stack Web Development roles. Reach out at shreeranbhise99@gmail.com!`;
      actionObj = { text: 'Contact Shree', url: '#contact' };
    } else if (qLower.includes('experience') || qLower.includes('education') || qLower.includes('degree') || qLower.includes('cgpa')) {
      responseText = `Shree holds an MCA (CGPA: 6.55) and B.Sc. in Computer Science (CGPA: 9.34 Distinction), alongside 1.1 years of operational experience as a Process Associate.`;
      actionObj = { text: 'View Career Timeline', url: '#experience' };
    } else {
      responseText = `Shree Ranabhise is an AI Web Developer based in Pune, MH. He builds clean, full-stack Next.js web applications and is eager to contribute to cloud architecture teams.`;
      actionObj = { text: 'Explore About Section', url: '#about' };
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: responseText,
          action: actionObj,
        },
      ]);
    }, 250);
  };

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'assistant',
        text: `Hi! I'm Shree's Portfolio Assistant. Select a suggestion below or ask a question to explore Shree's skills, projects, and cloud architecture background.`,
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button aligned with Resume Button right edge */}
      <div className="fixed bottom-4 sm:bottom-5 right-4 sm:right-6 lg:right-[max(2rem,calc((100vw-72rem)/2+2rem))] z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ask My Portfolio AI Assistant"
          className="p-3 sm:p-3.5 rounded-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-xl border border-stone-700/50 dark:border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
        >
          <div className="relative">
            <Bot className="w-5.5 h-5.5 text-sky-400 dark:text-sky-600" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
            </span>
          </div>
        </motion.button>
      </div>

      {/* Assistant Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-18 sm:bottom-20 right-4 sm:right-6 lg:right-[max(2rem,calc((100vw-72rem)/2+2rem))] z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[75vh] sm:max-h-[520px] flex flex-col rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
          >
            {/* Panel Header */}
            <div className="p-4 bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Portfolio Guide Assistant
                  </h4>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Local Portfolio Data Engine
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="p-4 flex-grow overflow-y-auto space-y-3 min-h-[220px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-br-none'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none border border-stone-200/60 dark:border-stone-700/60'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.action && (
                    <Link
                      href={msg.action.url}
                      onClick={() => setIsOpen(false)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <span>{msg.action.text}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Suggestion Chips */}
            <div className="p-3 bg-stone-50/50 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 space-y-2">
              <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider px-1">
                Suggested Questions:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {aiAssistantIntents.map((intent) => (
                  <button
                    key={intent.id}
                    onClick={() => handleSelectIntent(intent)}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-xl bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors text-left"
                  >
                    {intent.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleCustomQuery}
              className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about projects, skills..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-grow px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="submit"
                aria-label="Send query"
                className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
