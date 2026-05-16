'use client'

import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import type { UploadedImage, ProcessedResult, ProcessingStatus } from '../types'
import { validateFile, base64ToBlob, getFileNameWithoutExtension } from '../lib/utils'

export function useBackgroundRemover() {
  const [status, setStatus] = useState<ProcessingStatus>('idle')
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [result, setResult] = useState<ProcessedResult | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file')
      return
    }

    const preview = URL.createObjectURL(file)
    setUploadedImage({
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type,
    })
    setResult(null)
    setStatus('idle')
    setProgress(0)
  }, [])

  const processImage = useCallback(async () => {
    if (!uploadedImage) {
      toast.error('Please select an image first')
      return
    }

    setStatus('uploading')
    setProgress(10)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval)
          return 85
        }
        return prev + Math.random() * 8
      })
    }, 400)

    try {
      const formData = new FormData()
      formData.append('image', uploadedImage.file)

      setStatus('processing')

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to process image')
      }

      setProgress(95)

      const processedBlob = base64ToBlob(data.imageBase64, 'image/png')
      const processedUrl = URL.createObjectURL(processedBlob)
      const baseName = getFileNameWithoutExtension(uploadedImage.name)

      setResult({
        originalUrl: uploadedImage.preview,
        processedUrl,
        processedBlob,
        fileName: `${baseName}_no_bg.png`,
      })

      setProgress(100)
      setStatus('done')
      toast.success('Background removed successfully! 🎉')
    } catch (error) {
      clearInterval(progressInterval)
      setStatus('error')
      setProgress(0)
      const message = error instanceof Error ? error.message : 'Something went wrong'
      toast.error(message)
    }
  }, [uploadedImage])

  const reset = useCallback(() => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview)
    }
    if (result?.processedUrl) {
      URL.revokeObjectURL(result.processedUrl)
    }
    setUploadedImage(null)
    setResult(null)
    setStatus('idle')
    setProgress(0)
  }, [uploadedImage, result])

  return {
    status,
    uploadedImage,
    result,
    progress,
    handleFileSelect,
    processImage,
    reset,
    isProcessing: status === 'uploading' || status === 'processing',
  }
}
