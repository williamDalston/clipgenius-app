export interface UploadResponse {
  success: boolean;
  fileId?: string;
  error?: string;
  progress?: number;
}

export interface ProcessingStatus {
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
  fileId?: string;
}

export class UploadAPI {
  private static baseUrl = '/api';

  static async uploadFile(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  static async getProcessingStatus(fileId: string): Promise<ProcessingStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/status/${fileId}`);
      
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : 'Status check failed',
      };
    }
  }

  static async downloadClip(clipId: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/download/${clipId}`);
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return response.blob();
  }
} 