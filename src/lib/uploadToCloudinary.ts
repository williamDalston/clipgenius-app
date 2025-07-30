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
  return data.secure_url // ✅ final video URL
}
