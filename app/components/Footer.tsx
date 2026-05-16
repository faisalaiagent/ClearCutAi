'use client'

import { motion } from 'framer-motion'
import { Sparkles, Github, Twitter, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                ClearCut<span className="text-brand-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              AI-powered background removal for everyone. Fast, accurate, and completely free to try.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'remove.bg API', href: 'https://www.remove.bg/api' },
                { label: 'Next.js Docs', href: 'https://nextjs.org/docs' },
                { label: 'Tailwind CSS', href: 'https://tailwindcss.com' },
                { label: 'Framer Motion', href: 'https://www.framer.com/motion' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'remove.bg API', 'Shadcn/UI'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> using Next.js & remove.bg
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} ClearCut AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
