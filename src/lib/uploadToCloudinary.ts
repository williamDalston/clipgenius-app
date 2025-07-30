export async function uploadToCloudinary(file: File, uploadPreset: string): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Cloudinary upload failed')
  }

  const data = await res.json()
  
  // 👇 Trigger processing job after successful upload
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    await fetch(`${baseUrl}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        fileId: data.public_id, 
        style: 'viral',
        url: data.secure_url 
      }),
    })
    console.log('✅ Processing job triggered for fileId:', data.public_id)
  } catch (processErr) {
    console.error('⚠️ Failed to trigger processing job:', processErr)
    // Don't fail the upload if processing trigger fails
  }

  return data.secure_url // ✅ final video URL
}
