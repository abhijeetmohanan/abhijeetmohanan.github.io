'use client';

import Boot from './components/boot/Boot';
import { useAppStore } from './store';
import React, { useEffect } from 'react';
import Deployment from './components/deploy/Deployment'; // Assuming Deployment component will be here

export default function Home() {
  const mode = useAppStore((state) => state.mode);
  const setIsMobile = useAppStore((state) => state.setIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  return (
    <main className="min-h-screen bg-background text-accent font-mono">
      {mode === 'boot' && <Boot />}
      {mode === 'deploying' && <Deployment />}
      {mode === 'scene' && <Scene />}
      {mode === 'terminal' && <Terminal />}
      {mode === 'dashboard' && <Dashboard />}
      {/* Render other components based on mode */}
    </main>
  );
}
