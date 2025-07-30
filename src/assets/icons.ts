// Icon constants for consistent usage
export const ICONS = {
  // Navigation
  HOME: '🏠',
  UPLOAD: '📤',
  PROCESS: '⚙️',
  EXPORT: '📥',
  
  // Status
  SUCCESS: '✅',
  ERROR: '❌',
  WARNING: '⚠️',
  INFO: 'ℹ️',
  
  // Actions
  PLAY: '▶️',
  PAUSE: '⏸️',
  STOP: '⏹️',
  DOWNLOAD: '⬇️',
  SHARE: '📤',
  EDIT: '✏️',
  DELETE: '🗑️',
  
  // Features
  AI: '🤖',
  VIRAL: '🚀',
  CLIP: '🎬',
  STYLE: '🎨',
  MUSIC: '🎵',
  CAPTION: '💬',
  
  // Social
  TIKTOK: '📱',
  INSTAGRAM: '📸',
  YOUTUBE: '📺',
  TWITTER: '🐦',
  
  // Processing
  LOADING: '⏳',
  PROCESSING: '🔄',
  COMPLETE: '🎉',
  
  // File types
  VIDEO: '🎥',
  AUDIO: '🎵',
  IMAGE: '🖼️',
  DOCUMENT: '📄',
} as const;

// Icon mapping for different contexts
export const getIconForFileType = (fileType: string): string => {
  if (fileType.startsWith('video/')) return ICONS.VIDEO;
  if (fileType.startsWith('audio/')) return ICONS.AUDIO;
  if (fileType.startsWith('image/')) return ICONS.IMAGE;
  return ICONS.DOCUMENT;
};

export const getIconForStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'success':
    case 'completed':
      return ICONS.SUCCESS;
    case 'error':
    case 'failed':
      return ICONS.ERROR;
    case 'warning':
      return ICONS.WARNING;
    case 'processing':
    case 'loading':
      return ICONS.PROCESSING;
    default:
      return ICONS.INFO;
  }
};

export const getIconForPlatform = (platform: string): string => {
  switch (platform.toLowerCase()) {
    case 'tiktok':
      return ICONS.TIKTOK;
    case 'instagram':
      return ICONS.INSTAGRAM;
    case 'youtube':
      return ICONS.YOUTUBE;
    case 'twitter':
      return ICONS.TWITTER;
    default:
      return ICONS.SHARE;
  }
}; 