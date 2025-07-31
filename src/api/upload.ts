import formidable from 'formidable'
import type { ApiRequest, ApiResponse } from './types'
import { v4 as uuidv4 } from 'uuid'
import { uploadToCloudinary } from '../lib/uploadToCloudinary'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const form = formidable({ multiples: false })
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('❌ Error parsing form:', err)
      return res.status(500).json({ success: false, error: 'File parsing error' })
    }

    const file = files.file
    if (!file || Array.isArray(file)) {
      return res.status(400).json({ success: false, error: 'Invalid file upload' })
    }

    const fileId = uuidv4()

    try {
      // For now, just return a mock response since we don't have the actual upload logic
      console.log(`✅ File ${fileId} uploaded successfully`)
      return res.status(200).json({
        success: true,
        fileId,
        url: 'https://example.com/mock-video-url',
      })
    } catch (error) {
      console.error('❌ Upload error:', error)
      return res.status(500).json({ success: false, error: 'Upload failed' })
    }
  })
}
