import React, { useState } from 'react'
import UploadForm from '../UploadForm'
import { useAppStore } from '../../store/useAppStore'
import { uploadToCloudinary } from '../../lib/uploadToCloudinary'

const UploadTab: React.FC = () => {
  const { setActiveTab, setProcessing } = useAppStore()

  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleUpload = async (file: File) => {
    setUploadError(null)
    setProcessing(true)

    try {
      const videoUrl = await uploadToCloudinary(file, import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      console.log('✅ Uploaded to Cloudinary:', videoUrl)

      // TODO: Store URL in Zustand or context
      setActiveTab('detect')
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
    </div>
  )
}

export default UploadTab
