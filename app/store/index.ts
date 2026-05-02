import { create } from 'zustand';

type AppMode = "boot" | "home" | "about" | "experience" | "projects" | "blog" | "playground";

type AppTheme = "dark" | "light";

interface AppState {
  mode: AppMode;
  theme: AppTheme;
  setMode: (mode: AppMode) => void;
  toggleTheme: () => void;
  setTheme: (theme: AppTheme) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: "boot",
  theme: "dark",
  setMode: (mode) => set({ mode }),
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  },
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
    return { theme: newTheme };
  }),
}));
