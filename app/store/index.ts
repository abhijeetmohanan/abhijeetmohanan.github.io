import { create } from 'zustand';

type AppMode = "boot" | "scene" | "terminal" | "dashboard";

interface AppState {
  mode: AppMode;
  selectedNode: string | null;
  isMobile: boolean;
  setMode: (mode: AppMode) => void;
  setSelectedNode: (node: string | null) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "boot",
  selectedNode: null,
  isMobile: false,
  setMode: (mode) => set({ mode }),
  setSelectedNode: (selectedNode) => set({ selectedNode }),
  setIsMobile: (isMobile) => set({ isMobile }),
}));
