'use client';

import { useAppStore } from '../store';

const navItems = [
  { name: '0:home', mode: 'home' },
  { name: '1:about', mode: 'about' },
  { name: '2:exp', mode: 'experience' },
  { name: '3:blog', mode: 'blog' },
  { name: '4:lab', mode: 'playground' },
];

export default function Navigation() {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-accent/30 font-mono text-sm">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-1">
            <span className="text-accent font-bold mr-4">[ABHIJEET@PORTFOLIO]</span>
            <div className="hidden md:flex items-center space-x-0">
              {navItems.map((item) => {
                const isActive = mode === item.mode;
                return (
                  <button
                    key={item.name}
                    onClick={() => setMode(item.mode as any)}
                    className={`px-3 py-1 transition-colors ${
                      isActive
                        ? 'bg-accent text-black font-bold'
                        : 'text-accent hover:bg-accent/10'
                    }`}
                  >
                    {isActive ? `*${item.name}` : ` ${item.name}`}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center text-accent/50 text-xs hidden sm:flex">
             <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
             <span className="ml-4 uppercase">{mode}</span>
          </div>

          <div className="md:hidden">
            <select
              className="bg-background text-accent text-xs border border-accent/30 py-1"
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
