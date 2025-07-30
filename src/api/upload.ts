// File: /api/upload.ts
import { v2 as cloudinary } from 'cloudinary';
import formidable, { File } from 'formidable';
import fs from 'fs';

// Generic request/response types for non-Next.js/Vercel environment
type ApiRequest = any;
type ApiResponse = any;

// Ensure Vercel disables its default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Cloudinary with your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({
    uploadDir: '/tmp',
    keepExtensions: true,
    maxFileSize: 1024 * 1024 * 500, // 500MB max
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(400).json({ success: false, error: 'File parsing failed' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file || typeof file === 'undefined') {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }
    if (!file || !file.filepath) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    try {
      const upload = await cloudinary.uploader.upload(file.filepath, {
        resource_type: 'video',
        folder: 'clipgenius_uploads',
      });

      // Clean up the temporary file
      fs.unlink(file.filepath, () => {});

      // 👇 Trigger processing job after successful upload
      try {
        const baseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:3000';
        await fetch(`${baseUrl}/api/process`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            fileId: upload.public_id, 
            style: 'viral',
            url: upload.secure_url 
          }),
        });
        console.log('✅ Processing job triggered for fileId:', upload.public_id);
      } catch (processErr) {
        console.error('⚠️ Failed to trigger processing job:', processErr);
        // Don't fail the upload if processing trigger fails
      }

      return res.status(200).json({
        success: true,
        fileId: upload.public_id,
        url: upload.secure_url,
      });
    } catch (uploadErr) {
      console.error('Cloudinary upload error:', uploadErr);
      return res.status(500).json({ success: false, error: 'Upload failed' });
    }
  });
}
