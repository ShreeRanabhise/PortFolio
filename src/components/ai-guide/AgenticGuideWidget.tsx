'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ArrowUpRight, RefreshCw } from 'lucide-react';
import { aiAssistantIntents } from '@/data/portfolioData';
import { AIResponseOption } from '@/types/portfolio';
import Link from 'next/link';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  actionText?: string;
  actionUrl?: string;
}

export function AgenticGuideWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Hello! I'm Shree's Portfolio Assistant. Select a quick prompt below or ask about technical architecture, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    // Show subtle initial indicator after 3s
    const timer = setTimeout(() => {
      if (!isOpen) setUnread(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnread(false);
  };

  const handleSelectIntent = (intent: AIResponseOption) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: intent.question },
      {
        sender: 'bot',
        text: intent.answer,
        actionText: intent.actionText,
        actionUrl: intent.actionUrl,
      },
    ]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    // Look for intent keyword matching
    const matched = aiAssistantIntents.find(
      (intent) =>
        userText.toLowerCase().includes(intent.question.toLowerCase()) ||
        (intent.relatedCategory &&
          userText.toLowerCase().includes(intent.relatedCategory.toLowerCase()))
    );

    if (matched) {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: userText },
        {
          sender: 'bot',
          text: matched.answer,
          actionText: matched.actionText,
          actionUrl: matched.actionUrl,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: userText },
        {
          sender: 'bot',
          text: `Thank you for your question! Shree specializes in Next.js, React, TypeScript, PostgreSQL, Supabase, Prisma, and Cloud Architecture. Feel free to reach out directly via email at ${aiAssistantIntents[3]?.actionUrl || 'shreeranbhise99@gmail.com'}.`,
          actionText: 'Contact Shree Directly',
          actionUrl: '#contact',
        },
      ]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Conversation reset. Select a prompt or ask a question about Shree's engineering work!",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI Assistant"
          className="relative p-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-600/30 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <Bot className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />

          {/* Unread badge */}
          {unread && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-300 border-2 border-[#090b10]" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Assistant Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[75vh] sm:max-h-[520px] flex flex-col rounded-3xl bg-white dark:bg-[#090b10] border border-slate-200 dark:border-white/[0.08] shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-white"
          >
            {/* Header */}
            <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Portfolio Guide
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-stone-400 font-medium">
                    Local Data Navigation Engine
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                  className="p-1.5 rounded-lg text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed font-medium ${
                      msg.sender === 'user'
                        ? 'bg-violet-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-white/[0.03] text-slate-800 dark:text-stone-200 rounded-bl-none border border-slate-200 dark:border-white/[0.06]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action CTA button */}
                  {msg.actionText && msg.actionUrl && (
                    <div className="mt-1.5">
                      <Link
                        href={msg.actionUrl}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-500/30 text-[11px] font-bold transition-colors"
                      >
                        <span>{msg.actionText}</span>
                        <ArrowUpRight className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Intent Chips */}
            <div className="px-4 py-2 bg-slate-50/80 dark:bg-white/[0.01] border-t border-slate-200 dark:border-white/[0.06] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {aiAssistantIntents.map((intent) => (
                <button
                  key={intent.id}
                  onClick={() => handleSelectIntent(intent)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/[0.06] text-[10px] font-mono text-slate-700 dark:text-stone-300 font-medium transition-colors"
                >
                  {intent.question}
                </button>
              ))}
            </div>

            {/* Custom Question Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white dark:bg-[#090b10] border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Shree's experience..."
                className="flex-grow px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] text-slate-900 dark:text-white text-xs border border-slate-200 dark:border-white/[0.06] focus:outline-none focus:border-violet-500 dark:focus:border-violet-500/40 placeholder:text-slate-400 dark:placeholder:text-stone-500 font-medium"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white transition-colors flex items-center justify-center shrink-0"
                aria-label="Send Question"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
