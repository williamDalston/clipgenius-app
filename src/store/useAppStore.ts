import React from 'react';

// Simple state management for the app
export interface AppStore {
  activeTab: string;
  processing: boolean;
  credits: number;
  highlights: Array<{ id: number; start: string; end: string; text: string; score: number; selected: boolean }>;
  selectedStylePreset: string;
}

// Default state
export const defaultAppState: AppStore = {
  activeTab: 'upload',
  processing: false,
  credits: 47,
  highlights: [
    { id: 1, start: '0:12', end: '0:28', text: 'This AI breakthrough will change everything...', score: 0.95, selected: true },
    { id: 2, start: '2:45', end: '3:12', text: 'But here\'s the thing that really blows my mind...', score: 0.87, selected: true },
    { id: 3, start: '5:23', end: '5:48', text: 'Imagine being able to create viral content...', score: 0.82, selected: false },
    { id: 4, start: '8:01', end: '8:19', text: 'The secret that top creators don\'t tell you...', score: 0.91, selected: true }
  ],
  selectedStylePreset: 'viral',
};

// Simple state manager
export class AppStateManager {
  private static instance: AppStateManager;
  private state: AppStore = defaultAppState;
  private listeners: Array<(state: AppStore) => void> = [];

  static getInstance(): AppStateManager {
    if (!AppStateManager.instance) {
      AppStateManager.instance = new AppStateManager();
    }
    return AppStateManager.instance;
  }

  getState(): AppStore {
    return { ...this.state };
  }

  setState(newState: Partial<AppStore>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  subscribe(listener: (state: AppStore) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Actions
  setActiveTab(tab: string): void {
    this.setState({ activeTab: tab });
  }

  setProcessing(status: boolean): void {
    this.setState({ processing: status });
  }

  setCredits(amount: number): void {
    this.setState({ credits: amount });
  }

  setHighlights(highlights: AppStore['highlights']): void {
    this.setState({ highlights });
  }

  toggleHighlight(id: number): void {
    this.setState({
      highlights: this.state.highlights.map(h =>
        h.id === id ? { ...h, selected: !h.selected } : h
      )
    });
  }

  setSelectedStylePreset(presetId: string): void {
    this.setState({ selectedStylePreset: presetId });
  }
}

export const appStore = AppStateManager.getInstance();

// Hook for React components
export const useAppStore = () => {
  const [state, setState] = React.useState(appStore.getState());

  React.useEffect(() => {
    const unsubscribe = appStore.subscribe(setState);
    return unsubscribe;
  }, []);

  const hookReturn = {
    ...state,
    setActiveTab: appStore.setActiveTab.bind(appStore),
    setProcessing: appStore.setProcessing.bind(appStore),
    setCredits: appStore.setCredits.bind(appStore),
    setHighlights: appStore.setHighlights.bind(appStore),
    toggleHighlight: appStore.toggleHighlight.bind(appStore),
    setSelectedStylePreset: appStore.setSelectedStylePreset.bind(appStore),
  };

  // Add getState method for backward compatibility
  (hookReturn as any).getState = () => appStore.getState();

  return hookReturn;
};
