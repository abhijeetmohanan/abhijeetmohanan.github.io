import { create } from 'zustand';

type AppMode = "boot" | "home" | "about" | "experience" | "projects" | "blog";

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "boot",
  setMode: (mode) => set({ mode }),
}));
