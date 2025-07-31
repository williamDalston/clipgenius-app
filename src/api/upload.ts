import formidable from 'formidable'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { v4 as uuidv4 } from 'uuid'
import { uploadToCloudinary } from '../lib/uploadToCloudinary'
import { saveJobMetadata } from '../../database/firestore'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      const cloudinaryResult = await uploadToCloudinary(file.filepath)

      await saveJobMetadata(fileId, {
        status: 'uploading',
        progress: 10,
        userId: 'anonymous', // later: Clerk user ID
        originalFileName: file.originalFilename || 'unnamed',
        cloudinaryUrl: cloudinaryResult.secure_url,
      })

      console.log(`✅ File ${fileId} uploaded successfully`)
      return res.status(200).json({
        success: true,
        fileId,
        url: cloudinaryResult.secure_url,
      })
    } catch (error) {
      console.error('❌ Upload or Firestore error:', error)
      return res.status(500).json({ success: false, error: 'Upload failed' })
    }
  })
}
