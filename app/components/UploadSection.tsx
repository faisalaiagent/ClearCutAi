'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { UploadBox } from './UploadBox'
import { ResultPreview } from './ResultPreview'
import { useBackgroundRemover } from '../hooks/useBackgroundRemover'

export function UploadSection() {
  const {
    status,
    uploadedImage,
    result,
    progress,
    handleFileSelect,
    processImage,
    reset,
  } = useBackgroundRemover()

  return (
    <section id="upload" className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/20 to-transparent dark:via-brand-950/10" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200/60 dark:border-brand-800/60 text-brand-600 dark:text-brand-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Try it now — completely free
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Upload & Remove
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Select or drag & drop any image. Our AI will remove the background in seconds.
          </p>
        </motion.div>

        {/* Upload/Result area */}
        <div className="flex flex-col items-center gap-8">
          <AnimatePresence mode="wait">
            {result ? (
              <ResultPreview key="result" result={result} onReset={reset} />
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <UploadBox
                  uploadedImage={uploadedImage}
                  status={status}
                  progress={progress}
                  onFileSelect={handleFileSelect}
                  onProcess={processImage}
                  onReset={reset}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steps guide */}
          {!uploadedImage && !result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              {[
                { step: '1', text: 'Upload your image' },
                { step: '2', text: 'Click "Remove Background"' },
                { step: '3', text: 'Download your PNG' },
              ].map(({ step, text }, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center">
                    {step}
                  </div>
                  <span>{text}</span>
                  {i < 2 && <span className="hidden sm:block text-slate-300 dark:text-slate-600">→</span>}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
