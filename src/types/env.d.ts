/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string
  readonly VITE_API_BASE_URL: string
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 