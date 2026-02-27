'use client';

import dynamic from 'next/dynamic';
import Boot from './components/boot/Boot';
import { useAppStore } from './store';
import { useEffect } from 'react';

const Navigation = dynamic(() => import('./components/Navigation'), { ssr: false });
const About = dynamic(() => import('./components/About'), { ssr: false });
const Experience = dynamic(() => import('./components/Experience'), { ssr: false });
const Projects = dynamic(() => import('./components/Projects'), { ssr: false });
const Blog = dynamic(() => import('./components/Blog'), { ssr: false });

export default function Home() {
  const mode = useAppStore((state) => state.mode);

  useEffect(() => {
    if (mode !== 'boot') {
      window.history.replaceState(null, '', `/${mode === 'home' ? 'home' : mode}`);
    }
  }, [mode]);

  if (mode === 'boot') {
    return <Boot />;
  }

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen">
        {mode === 'home' && <HomeContent />}
        {mode === 'about' && <About />}
        {mode === 'experience' && <Experience />}
        {mode === 'projects' && <Projects />}
        {mode === 'blog' && <Blog />}
      </main>
    </>
  );
}

function HomeContent() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient">Abhijeet Mohanan</span>
        </h1>
        <p className="text-2xl md:text-3xl text-text-muted font-mono mb-8">
          DevOps Engineer
        </p>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">
          Building scalable cloud infrastructure, automating deployments, 
          and enabling developer productivity through platform engineering.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setMode('experience')}
            className="px-6 py-3 rounded-lg font-medium transition-all bg-accent text-background hover:bg-accent/80"
          >
            View Experience
          </button>
          <button
            onClick={() => setMode('about')}
            className="px-6 py-3 rounded-lg font-medium transition-all border border-accent text-accent hover:bg-accent/10"
          >
            About Me
          </button>
          <button
            onClick={() => setMode('projects')}
            className="px-6 py-3 rounded-lg font-medium transition-all border border-accent text-accent hover:bg-accent/10"
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
}
