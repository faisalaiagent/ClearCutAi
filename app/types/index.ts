export type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error'

export interface UploadedImage {
  file: File
  preview: string
  name: string
  size: number
  type: string
}

export interface ProcessedResult {
  originalUrl: string
  processedUrl: string
  processedBlob: Blob
  fileName: string
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface RemoveBgResponse {
  success: boolean
  imageBase64?: string
  error?: string
}

export type FileValidationResult = {
  valid: boolean
  error?: string
}
