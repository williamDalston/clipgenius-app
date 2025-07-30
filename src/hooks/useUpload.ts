import { useState, useCallback } from 'react';
import { UploadAPI, UploadResponse, ProcessingStatus } from '../api/upload';

interface UseUploadReturn {
  uploadFile: (file: File) => Promise<void>;
  processingStatus: ProcessingStatus | null;
  isUploading: boolean;
  error: string | null;
  reset: () => void;
}

export const useUpload = (): UseUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await UploadAPI.uploadFile(file);
      
      if (response.success && response.fileId) {
        setProcessingStatus({
          status: 'uploading',
          progress: 0,
          message: 'File uploaded successfully, processing...',
          fileId: response.fileId,
        });
      } else {
        setError(response.error || 'Upload failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsUploading(false);
    setProcessingStatus(null);
    setError(null);
  }, []);

  return {
    uploadFile,
    processingStatus,
    isUploading,
    error,
    reset,
  };
}; 