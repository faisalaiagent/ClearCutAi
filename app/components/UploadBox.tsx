'use client'

import { useCallback } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ImageIcon, X, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { formatFileSize, ACCEPTED_TYPES, MAX_FILE_SIZE } from '../lib/utils'
import type { UploadedImage, ProcessingStatus } from '../types'
import toast from 'react-hot-toast'
import { validateFile } from '../lib/utils'

interface UploadBoxProps {
  uploadedImage: UploadedImage | null
  status: ProcessingStatus
  progress: number
  onFileSelect: (file: File) => void
  onProcess: () => void
  onReset: () => void
}

export function UploadBox({ uploadedImage, status, progress, onFileSelect, onProcess, onReset }: UploadBoxProps) {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      const code = rejectedFiles[0]?.errors[0]?.code
      if (code === 'file-too-large') {
        toast.error(`File too large. Max size is ${formatFileSize(MAX_FILE_SIZE)}`)
      } else if (code === 'file-invalid-type') {
        toast.error('Invalid file type. Please upload PNG, JPG, JPEG, or WEBP')
      } else {
        toast.error('File rejected. Please try another image.')
      }
      return
    }
    if (acceptedFiles.length > 0) {
      const validation = validateFile(acceptedFiles[0])
      if (!validation.valid) {
        toast.error(validation.error || 'Invalid file')
        return
      }
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: status === 'uploading' || status === 'processing',
  })

  const isProcessing = status === 'uploading' || status === 'processing'

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!uploadedImage ? (
          /* Drop zone */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative group cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300
                ${isDragActive && !isDragReject
                  ? 'border-brand-400 bg-brand-50/50 dark:bg-brand-950/30 scale-[1.02]'
                  : isDragReject
                  ? 'border-red-400 bg-red-50/50 dark:bg-red-950/30'
                  : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/30 dark:hover:bg-brand-950/20'
                }
              `}
            >
              <input {...getInputProps()} />

              {/* Background gradient on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col items-center gap-5">
                {/* Icon */}
                <motion.div
                  animate={isDragActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isDragReject
                      ? 'bg-red-100 dark:bg-red-950/50'
                      : 'bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-950/60 dark:to-accent-950/60'
                  }`}
                >
                  <Upload className={`w-8 h-8 ${isDragReject ? 'text-red-500' : 'text-brand-500'}`} />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isDragActive && !isDragReject
                      ? 'Drop it right here!'
                      : isDragReject
                      ? 'Invalid file type'
                      : 'Drop your image here'}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    or{' '}
                    <span className="text-brand-500 dark:text-brand-400 font-semibold underline underline-offset-2 cursor-pointer">
                      browse from your device
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {['PNG', 'JPG', 'JPEG', 'WEBP'].map((ext) => (
                    <span
                      key={ext}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono font-medium"
                    >
                      {ext}
                    </span>
                  ))}
                  <span className="text-slate-400 dark:text-slate-500 text-xs">• Max 12MB</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Image preview + process */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden shadow-xl"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={uploadedImage.preview}
                alt="Selected image"
                className="w-full h-64 sm:h-80 object-contain bg-[radial-gradient(circle,#f1f5f9_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#1e293b_1px,transparent_1px)] bg-[size:16px_16px]"
              />

              {/* Remove button */}
              {!isProcessing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={onReset}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}

              {/* Progress overlay */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                          <circle
                            cx="32" cy="32" r="28"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="4"
                          />
                          <circle
                            cx="32" cy="32" r="28"
                            fill="none"
                            stroke="url(#grad)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                          />
                          <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#38b4f6" />
                              <stop offset="100%" stopColor="#e879f9" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">
                          {status === 'uploading' ? 'Uploading image...' : 'Removing background...'}
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">{Math.round(progress)}% complete</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* File info + actions */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-950/60 dark:to-accent-950/60 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-5 h-5 text-brand-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                    {uploadedImage.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatFileSize(uploadedImage.size)} · {uploadedImage.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
                {status === 'done' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {!isProcessing && status !== 'done' && (
                  <motion.button
                    onClick={onReset}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Change
                  </motion.button>
                )}
                {status !== 'done' && (
                  <motion.button
                    onClick={onProcess}
                    disabled={isProcessing}
                    whileHover={!isProcessing ? { scale: 1.03 } : {}}
                    whileTap={!isProcessing ? { scale: 0.97 } : {}}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isProcessing
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Remove Background
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
