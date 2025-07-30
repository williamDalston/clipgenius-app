import { useState, useEffect, useCallback } from 'react'

interface ProcessingStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'not_found'
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

interface UseProcessingStatusOptions {
  fileId?: string
  pollInterval?: number
  enabled?: boolean
}

export function useProcessingStatus({ 
  fileId, 
  pollInterval = 2000, 
  enabled = true 
}: UseProcessingStatusOptions) {
  const [status, setStatus] = useState<ProcessingStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = useCallback(async () => {
    if (!fileId) return

    try {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/status/${fileId}`)
      
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`)
      }

      const data = await response.json()
      setStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch status')
      console.error('Status polling error:', err)
    } finally {
      setLoading(false)
    }
  }, [fileId])

  // Initial fetch
  useEffect(() => {
    if (fileId && enabled) {
      fetchStatus()
    }
  }, [fileId, enabled, fetchStatus])

  // Polling effect
  useEffect(() => {
    if (!fileId || !enabled) return

    const interval = setInterval(() => {
      fetchStatus()
    }, pollInterval)

    return () => clearInterval(interval)
  }, [fileId, enabled, pollInterval, fetchStatus])

  // Stop polling when completed or failed
  useEffect(() => {
    if (status?.status === 'completed' || status?.status === 'failed') {
      // Stop polling by setting enabled to false
      // This will be handled by the component using this hook
    }
  }, [status?.status])

  return {
    status,
    loading,
    error,
    refetch: fetchStatus,
    isCompleted: status?.status === 'completed',
    isFailed: status?.status === 'failed',
    isProcessing: status?.status === 'processing',
    isPending: status?.status === 'pending',
  }
} 