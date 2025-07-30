// File validation utilities
export const validateVideoFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 500 * 1024 * 1024; // 500MB
  const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'];

  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 500MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Please select a valid video file (MP4, MOV, AVI, WebM)' };
  }

  return { isValid: true };
};

// Format utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Theme utilities
export const getThemeClasses = (theme: 'light' | 'dark') => {
  return {
    light: {
      bg: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
      text: 'text-gray-900',
      card: 'bg-white border-gray-200',
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900',
      text: 'text-white',
      card: 'bg-gray-800 border-gray-700',
    },
  }[theme];
};

// Download utilities
export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 