import React, { useState } from 'react'
import UploadForm from '../UploadForm'
import { useAppStore } from '../../store/useAppStore'
import { uploadToCloudinary } from '../../lib/uploadToCloudinary'
import { useProcessingStatus } from '../../hooks/useProcessingStatus'

const UploadTab: React.FC = () => {
  const { setActiveTab, setProcessing } = useAppStore()
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [currentFileId, setCurrentFileId] = useState<string | null>(null)

  const { 
    status, 
    loading: statusLoading, 
    error: statusError,
    isCompleted,
    isFailed,
    isProcessing,
    isPending
  } = useProcessingStatus({ 
    fileId: currentFileId || undefined, 
    enabled: !!currentFileId 
  })

  const handleUpload = async (file: File) => {
    setUploadError(null)
    setProcessing(true)
    setCurrentFileId(null)

    try {
      const videoUrl = await uploadToCloudinary(file, import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      console.log('✅ Uploaded to Cloudinary:', videoUrl)

      // Extract fileId from the URL or response
      // For now, we'll use a placeholder - in real implementation, 
      // the uploadToCloudinary function should return the fileId
      const fileId = 'temp-file-id' // This should come from the upload response
      setCurrentFileId(fileId)

      // Don't navigate to detect tab yet - wait for processing to complete
      // setActiveTab('detect')
    } catch (err: any) {
      console.error(err)
      setUploadError('Upload failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Your Clip</h2>
      <UploadForm onUpload={handleUpload} />
      {uploadError && <p className="text-red-600 mt-4">{uploadError}</p>}
      
      {/* Processing Status Display */}
      {currentFileId && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Processing Status</h3>
          
          {statusLoading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Checking status...</span>
            </div>
          )}
          
          {statusError && (
            <div className="text-red-600">
              <p>Status Error: {statusError}</p>
            </div>
          )}
          
          {status && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  isCompleted ? 'bg-green-100 text-green-800' :
                  isFailed ? 'bg-red-100 text-red-800' :
                  isProcessing ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {status.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Progress:</span>
                <span>{status.progress}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Message:</span>
                <span className="text-gray-600">{status.message}</span>
              </div>
              
              {status.progress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${status.progress}%` }}
                  ></div>
                </div>
              )}
              
              {isCompleted && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">✅ Processing completed!</p>
                  <button 
                    onClick={() => setActiveTab('detect')}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View Results
                  </button>
                </div>
              )}
              
              {isFailed && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 font-medium">❌ Processing failed</p>
                  {status.error && (
                    <p className="text-red-600 text-sm mt-1">{status.error}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UploadTab
