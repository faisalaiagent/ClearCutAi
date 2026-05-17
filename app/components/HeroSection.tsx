'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const BADGES = [
  { icon: Zap, text: 'Instant Processing' },
  { icon: Shield, text: '100% Secure' },
  { icon: Sparkles, text: 'AI-Powered' },
]

export function HeroSection() {
  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/20" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-400/20 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-400/15 rounded-full filter blur-3xl animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200/60 dark:border-brand-800/60 bg-brand-50/80 dark:bg-brand-950/50 backdrop-blur-sm text-brand-600 dark:text-brand-400 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by remove.bg AI Technology
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="text-slate-900 dark:text-white">Remove Backgrounds</span>
            <br />
            <span className="bg-gradient-to-r from-brand-500 via-purple-500 to-accent-500 bg-clip-text text-transparent animate-gradient-x bg-300%">
              Instantly with AI
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Upload any image and remove the background in seconds using AI-powered processing.
            Get crystal-clear results every time — perfect for products, portraits & more.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <motion.button
              onClick={scrollToUpload}
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(14, 150, 224, 0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold text-base shadow-xl shadow-brand-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Upload Image</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-semibold text-base hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
            >
              See how it works
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
          >
            {BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 text-xs font-medium"
              >
                <Icon className="w-3 h-3 text-brand-500" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* Hero Image Preview */}
          <motion.div
            variants={fadeUp}
            className="relative mt-8 w-full max-w-4xl"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60 shadow-2xl shadow-black/10 dark:shadow-black/30 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              {/* Mockup bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 dark:border-slate-700/60 bg-slate-50/80 dark:bg-slate-800/80">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 h-5 rounded-md bg-slate-200/80 dark:bg-slate-700/80 flex items-center px-3">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">clearcut-ai.vercel.app</span>
                </div>
              </div>

              {/* Comparison preview */}
              <div className="grid grid-cols-2 gap-0 h-48 sm:h-64">
                {/* Original */}
                <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-r border-slate-200/60 dark:border-slate-700/60">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-2xl bg-gradient-to-br from-orange-200 to-pink-200 dark:from-orange-900/40 dark:to-pink-900/40 flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-orange-400 to-pink-400 opacity-80" />
                    </div>
                    <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 font-medium">Original</p>
                  </div>
                </div>
                {/* Processed */}
                <div className="relative flex items-center justify-center bg-[radial-gradient(circle,#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#334155_1px,transparent_1px)] bg-[size:12px_12px]">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-2xl flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-orange-400 to-pink-400" style={{ filter: 'drop-shadow(0 8px 24px rgba(251,146,60,0.4))' }} />
                    </div>
                    <p className="mt-2 text-xs text-brand-500 dark:text-brand-400 font-medium">Background Removed ✨</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 sm:-right-8 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Processing...</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 sm:-left-8 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🎉</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Done in 2s!</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
