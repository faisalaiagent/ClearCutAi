import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    // Validate API key is configured
    const apiKey = process.env.REMOVE_BG_API_KEY
    if (!apiKey || apiKey === 'your_remove_bg_api_key_here') {
      return NextResponse.json(
        {
          success: false,
          error: 'Remove.bg API key is not configured. Please add REMOVE_BG_API_KEY to your .env.local file.',
        },
        { status: 500 }
      )
    }

    // Parse the incoming form data
    const formData = await request.formData()
    const imageFile = formData.get('image') as File | null

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image file provided.' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    if (!validTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Please upload PNG, JPG, JPEG, or WEBP.' },
        { status: 400 }
      )
    }

    // Validate file size (12MB max for remove.bg)
    const maxSize = 12 * 1024 * 1024
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 12MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const imageBuffer = await imageFile.arrayBuffer()
    const imageBytes = new Uint8Array(imageBuffer)

    // Build form data for remove.bg API
    const removeBgFormData = new FormData()
    const blob = new Blob([imageBytes], { type: imageFile.type })
    removeBgFormData.append('image_file', blob, imageFile.name)
    removeBgFormData.append('size', 'auto')
    removeBgFormData.append('format', 'png')

    // Call remove.bg API
    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgFormData,
    })

    // Handle remove.bg API errors
    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text()
      let errorMessage = 'Failed to process image.'

      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.errors && errorJson.errors.length > 0) {
          errorMessage = errorJson.errors[0].title || errorMessage
        }
      } catch {
        // Use default error message
      }

      if (removeBgResponse.status === 402) {
        errorMessage = 'API credit limit reached. Please check your remove.bg account.'
      } else if (removeBgResponse.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again in a moment.'
      } else if (removeBgResponse.status === 401) {
        errorMessage = 'Invalid API key. Please check your REMOVE_BG_API_KEY configuration.'
      }

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: removeBgResponse.status }
      )
    }

    // Get the processed image as array buffer
    const processedImageBuffer = await removeBgResponse.arrayBuffer()

    // Convert to base64 to send back to client
    const base64Image = Buffer.from(processedImageBuffer).toString('base64')

    return NextResponse.json({
      success: true,
      imageBase64: base64Image,
    })
  } catch (error) {
    console.error('Background removal error:', error)

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { success: false, error: 'Network error. Could not reach remove.bg API.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
