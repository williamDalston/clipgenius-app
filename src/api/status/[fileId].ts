// File: /api/status/[fileId].ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

// In-memory job store (⚠️ stateless in production)
const jobStatus = new Map<
  string,
  {
    status: 'pending' | 'processing' | 'completed' | 'failed'
    progress: number
    message: string
    result?: {
      clips: Array<{
        id: string
        url: string
        title: string
        duration: number
      }>
    }
    error?: string
  }
>()

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const fileId = req.query.fileId

  if (!fileId || typeof fileId !== 'string') {
    return res.status(400).json({ success: false, error: 'File ID is required' })
  }

  const status = jobStatus.get(fileId)

  if (!status) {
    return res.status(404).json({
      success: false,
      error: 'Job not found',
      status: 'not_found',
    })
  }

  return res.status(200).json({
    success: true,
    fileId,
    ...status,
  })
}

// 🛠️ These helper functions can be imported from this file by backend/cli.ts or other functions

export function updateJobStatus(
  fileId: string,
  status: {
    status: 'pending' | 'processing' | 'completed' | 'failed'
    progress?: number
    message?: string
    result?: any
    error?: string
  }
) {
  const current = jobStatus.get(fileId) || {
    status: 'pending',
    progress: 0,
    message: 'Job created',
  }

  jobStatus.set(fileId, {
    ...current,
    ...status,
  })

  console.log(`📊 Job status updated for ${fileId}:`, jobStatus.get(fileId))
}

export function getJobStatus(fileId: string) {
  return jobStatus.get(fileId)
}
