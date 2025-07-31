import type { VercelRequest, VercelResponse } from '@vercel/node'
import { v4 as uuidv4 } from 'uuid'
import { updateJobStatus } from './status/[fileId]'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { script, voice, visual } = req.body

  if (!script || typeof script !== 'string') {
    return res.status(400).json({ success: false, error: 'Script is required' })
  }

  const fileId = uuidv4()
  updateJobStatus(fileId, {
    status: 'processing',
    progress: 0,
    message: 'Generating video from script...'
  })

  // Simulate async work with setTimeout (replace with real TTS + video generation logic)
  setTimeout(async () => {
    try {
      // Simulate audio + visual generation
      console.log(`🎙️ Generating voice [${voice}] and visuals [${visual}] from script...`)
      
      // Replace with actual backend/cli.ts call or job trigger
      await new Promise((resolve) => setTimeout(resolve, 3000))

      updateJobStatus(fileId, {
        status: 'completed',
        progress: 100,
        message: 'Video generated successfully!',
        result: {
          clips: [
            {
              id: fileId,
              url: `https://example.com/fake-video/${fileId}.mp4`,
              title: 'Generated Clip',
              duration: 30
            }
          ]
        }
      })
    } catch (err) {
      console.error(err)
      updateJobStatus(fileId, {
        status: 'failed',
        progress: 100,
        message: 'Generation failed',
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    }
  }, 1000)

  return res.status(200).json({ success: true, fileId })
}
