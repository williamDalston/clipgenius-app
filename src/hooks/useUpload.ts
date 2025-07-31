import { useState, useCallback } from 'react';

interface ProcessingStatus {
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  message: string;
  fileId: string;
}

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
      // Mock upload for now
      const mockResponse = {
        success: true,
        fileId: 'mock-file-id-' + Date.now(),
        url: 'https://example.com/mock-video-url'
      };
      
      if (mockResponse.success && mockResponse.fileId) {
        setProcessingStatus({
          status: 'uploading',
          progress: 0,
          message: 'File uploaded successfully, processing...',
          fileId: mockResponse.fileId,
        });
      } else {
        setError('Upload failed');
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