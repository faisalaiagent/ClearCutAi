'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BeforeAfterSliderProps {
  originalUrl: string
  processedUrl: string
}

export function BeforeAfterSlider({ originalUrl, processedUrl }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }, [isDragging, updatePosition])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    updatePosition(e.touches[0].clientX)
  }, [isDragging, updatePosition])

  const stopDragging = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', stopDragging)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', stopDragging)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDragging)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', stopDragging)
    }
  }, [handleMouseMove, handleTouchMove, stopDragging])

  return (
    <div className="w-full">
      <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
        Drag to compare before & after
      </p>
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl"
        style={{ aspectRatio: '16/9', minHeight: '200px', maxHeight: '420px' }}
        onMouseDown={(e) => { setIsDragging(true); updatePosition(e.clientX) }}
        onTouchStart={(e) => { setIsDragging(true); updatePosition(e.touches[0].clientX) }}
      >
        {/* Processed image (background - transparent checker) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#334155_1px,transparent_1px)] bg-[size:14px_14px]" />
        <img
          src={processedUrl}
          alt="Background removed"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />

        {/* Original image (clipped on left side) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
          <img
            src={originalUrl}
            alt="Original"
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute inset-y-0 flex flex-col items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full bg-white shadow-lg" />
          <motion.div
            animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-white flex items-center justify-center"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 4L1 8L5 12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 4L15 8L11 12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
          Before
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-500/80 backdrop-blur-sm text-white text-xs font-semibold">
          After ✨
        </div>
      </div>
    </div>
  )
}
