'use client'

import { motion } from 'framer-motion'
import { Zap, Download, Shield, Cpu, Layers, Sparkles } from 'lucide-react'

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Fast AI',
    description: 'Powered by remove.bg\'s state-of-the-art AI model. Get results in under 5 seconds for most images.',
    gradient: 'from-yellow-400 to-orange-400',
    bgGradient: 'from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
    border: 'border-yellow-200/60 dark:border-yellow-900/40',
  },
  {
    icon: Layers,
    title: 'HD Transparent PNG',
    description: 'Receive high-resolution PNG with a fully transparent background — pixel-perfect every time.',
    gradient: 'from-brand-400 to-cyan-400',
    bgGradient: 'from-brand-50 to-cyan-50 dark:from-brand-950/20 dark:to-cyan-950/20',
    border: 'border-brand-200/60 dark:border-brand-900/40',
  },
  {
    icon: Download,
    title: 'One-Click Download',
    description: 'Instantly download your transparent image. No account needed. No watermarks. Completely free to try.',
    gradient: 'from-accent-400 to-pink-400',
    bgGradient: 'from-accent-50 to-pink-50 dark:from-accent-950/20 dark:to-pink-950/20',
    border: 'border-accent-200/60 dark:border-accent-900/40',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your images are processed securely on our servers and never stored. Your privacy is our priority.',
    gradient: 'from-green-400 to-emerald-400',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
    border: 'border-green-200/60 dark:border-green-900/40',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Precision',
    description: 'Advanced machine learning detects complex edges — hair, fur, transparent objects — with stunning accuracy.',
    gradient: 'from-violet-400 to-purple-400',
    bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20',
    border: 'border-violet-200/60 dark:border-violet-900/40',
  },
  {
    icon: Sparkles,
    title: 'Multiple Formats',
    description: 'Upload PNG, JPG, JPEG, or WEBP images up to 12MB. Works on product photos, portraits, and more.',
    gradient: 'from-rose-400 to-red-400',
    bgGradient: 'from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20',
    border: 'border-rose-200/60 dark:border-rose-900/40',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function FeatureCards() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            Why choose ClearCut AI
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Everything you need,{' '}
            <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">
              nothing you don&apos;t
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Professional-grade background removal that just works. No complex software, no steep learning curve.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`group relative p-6 rounded-3xl border bg-gradient-to-br ${feature.bgGradient} ${feature.border} overflow-hidden transition-shadow duration-300 hover:shadow-xl`}
              >
                {/* Subtle glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
