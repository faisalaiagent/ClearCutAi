'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, RotateCcw, Copy, Check, LayoutGrid, Sliders } from 'lucide-react'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { downloadBlob } from '../lib/utils'
import type { ProcessedResult } from '../types'
import toast from 'react-hot-toast'

interface ResultPreviewProps {
  result: ProcessedResult
  onReset: () => void
}

type ViewMode = 'comparison' | 'side-by-side'

export function ResultPreview({ result, onReset }: ResultPreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('comparison')
  const [copied, setCopied] = useState(false)

  const handleDownload = () => {
    downloadBlob(result.processedBlob, result.fileName)
    toast.success('Image downloaded successfully!')
  }

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href).catch(() => {})
    setCopied(true)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Success banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200/60 dark:border-green-800/60"
      >
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Background removed successfully!</p>
          <p className="text-green-600 dark:text-green-500 text-xs mt-0.5">Your transparent PNG is ready to download</p>
        </div>
      </motion.div>

      {/* View mode toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-200">Result Preview</h3>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          <button
            onClick={() => setViewMode('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'comparison'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Slider
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Side by Side
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden shadow-xl mb-5">
        <div className="p-4 sm:p-6">
          {viewMode === 'comparison' ? (
            <BeforeAfterSlider
              originalUrl={result.originalUrl}
              processedUrl={result.processedUrl}
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 text-center">Original</p>
                <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={result.originalUrl} alt="Original" className="w-full h-48 object-contain" />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-500 mb-2 text-center">Background Removed ✨</p>
                <div className="rounded-xl overflow-hidden bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#334155_1px,transparent_1px)] bg-[size:12px_12px]">
                  <img src={result.processedUrl} alt="Processed" className="w-full h-48 object-contain" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-shadow text-sm"
          >
            <Download className="w-4 h-4" />
            Download HD PNG
          </motion.button>

          <motion.button
            onClick={handleCopyUrl}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy link'}
          </motion.button>

          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New image
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
