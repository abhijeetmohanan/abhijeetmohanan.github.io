'use client';

import dynamic from 'next/dynamic';
import Boot from './components/boot/Boot';
import { useAppStore } from './store';
import { useEffect } from 'react';
import MascotBuddies from "./components/MascotsBuddies";

const Navigation = dynamic(() => import('./components/Navigation'), { ssr: false });
const About = dynamic(() => import('./components/About'), { ssr: false });
const Experience = dynamic(() => import('./components/Experience'), { ssr: false });
const Blog = dynamic(() => import('./components/Blog'), { ssr: false });
const VideoHero = dynamic(() => import('./components/VideoHero'), { ssr: false });

const VIDEO_URL = ''; // Add your video URL here (e.g., '/demo-reel.mp4')

export default function Home() {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

  useEffect(() => {
    const path = window.location.pathname.replace(/\//g, '').replace('index.html', '');
    if (path && path !== '' && path !== 'home') {
      if (path === 'about' || path === 'experience' || path === 'blog') {
        setMode(path);
      }
    }
  }, []);

  useEffect(() => {
    if (mode !== 'boot') {
      const currentPath = window.location.pathname.replace(/\//g, '').replace('index.html', '');
      const targetPath = mode === 'home' ? '' : mode;
      const expectedUrl = targetPath ? `/${targetPath}/` : '/';
      if (window.location.pathname !== expectedUrl && window.location.pathname !== '/') {
        window.history.replaceState(null, '', expectedUrl);
      }
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
        {mode === 'blog' && <Blog />}
      </main>
    </>
  );
}

function HomeContent() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative max-w-4xl mx-auto text-center">
        <VideoHero videoUrl={VIDEO_URL} />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-accent">
          Abhijeet Mohanan
        </h1>
        <MascotBuddies />
        <p className="text-2xl md:text-3xl text-text-muted font-mono mb-8">
          Infrastructure Engineer
        </p>
        <p className="text-lg text-text-muted max-w-2xl mx-auto mb-12">
          Building scalable cloud infrastructure, automating deployments, 
          and enabling developer productivity through platform engineering.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setMode('experience')}
            className="px-6 py-3 rounded-lg font-medium transition-all bg-accent text-slate-900 hover:bg-accent/80"
          >
            View Experience
          </button>
          <button
            onClick={() => setMode('about')}
            className="px-6 py-3 rounded-lg font-medium transition-all border border-accent text-accent hover:bg-accent/10"
          >
            About Me
          </button>
        </div>

        <div className="flex justify-center gap-8 text-3xl">
          <a href="mailto:abhijeetmohanan@gmail.com" className="text-accent hover:opacity-60 transition-opacity" title="Email">
            &#9993;
          </a>
          <a href="https://linkedin.com/in/abhijeet-mohanan" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-60 transition-opacity font-bold" title="LinkedIn">
            in
          </a>
          <a href="https://github.com/abhijeetmohanan" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-60 transition-opacity" title="GitHub">
            &#128187;
          </a>
        </div>
      </div>
    </div>
  );
}
