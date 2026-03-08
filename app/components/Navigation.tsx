'use client';

import { useAppStore } from '../store';

const navItems = [
  { name: 'Home', mode: 'home' },
  { name: 'About', mode: 'about' },
  { name: 'Experience', mode: 'experience' },
  { name: 'Blog', mode: 'blog' },
];

export default function Navigation() {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-accent/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={() => setMode('home')} className="font-mono text-xl font-bold text-accent hover:opacity-70">
              AM
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const isActive = mode === item.mode;
                return (
                  <button
                    key={item.name}
                    onClick={() => setMode(item.mode as any)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-muted hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
              
              <button
                onClick={() => useAppStore.getState().toggleTheme()}
                className="ml-4 p-2 rounded-md text-text-muted hover:text-accent hover:bg-accent/5 transition-all text-lg"
                title="Toggle Theme"
              >
                {useAppStore((state) => state.theme === 'dark' ? '☀️' : '🌙')}
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <select
              className="bg-surface text-gray-300 px-3 py-2 rounded-md text-sm border border-accent/20"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
            >
              {navItems.map((item) => (
                <option key={item.name} value={item.mode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
