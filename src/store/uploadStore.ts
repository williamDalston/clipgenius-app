// Simple state management for upload functionality
export interface UploadState {
  currentFile: File | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  clips: Array<{
    id: string;
    name: string;
    duration: string;
    viralScore: number;
    url?: string;
  }>;
}

// Default state
export const defaultUploadState: UploadState = {
  currentFile: null,
  isProcessing: false,
  progress: 0,
  error: null,
  clips: [],
};

// State management utilities
export class UploadStateManager {
  private static instance: UploadStateManager;
  private state: UploadState = defaultUploadState;
  private listeners: Array<(state: UploadState) => void> = [];

  static getInstance(): UploadStateManager {
    if (!UploadStateManager.instance) {
      UploadStateManager.instance = new UploadStateManager();
    }
    return UploadStateManager.instance;
  }

  getState(): UploadState {
    return { ...this.state };
  }

  setState(newState: Partial<UploadState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: (state: UploadState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Actions
  setFile(file: File | null): void {
    this.setState({ currentFile: file });
  }

  setProcessing(processing: boolean): void {
    this.setState({ isProcessing: processing });
  }

  setProgress(progress: number): void {
    this.setState({ progress });
  }

  setError(error: string | null): void {
    this.setState({ error });
  }

  addClip(clip: UploadState['clips'][0]): void {
    this.setState({ clips: [...this.state.clips, clip] });
  }

  reset(): void {
    this.setState(defaultUploadState);
  }
}

export const uploadStore = UploadStateManager.getInstance(); 