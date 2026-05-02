'use client';

import dynamic from 'next/dynamic';
import Boot from './components/boot/Boot';
import { useAppStore } from './store';
import { useEffect } from 'react';
import CornerStickmen from './components/CornerStickmen';

const Navigation = dynamic(() => import('./components/Navigation'), { ssr: false });
const About = dynamic(() => import('./components/About'), { ssr: false });
const Experience = dynamic(() => import('./components/Experience'), { ssr: false });
const Blog = dynamic(() => import('./components/Blog'), { ssr: false });
const VideoHero = dynamic(() => import('./components/VideoHero'), { ssr: false });
const InfraPlayground = dynamic(() => import('./components/InfraPlayground'), { ssr: false });

const VIDEO_URL = ''; // Add your video URL here (e.g., '/demo-reel.mp4')

export default function Home() {
  const mode = useAppStore((state) => state.mode);
  const setMode = useAppStore((state) => state.setMode);

 // On load, read the hash and restore the correct mode
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (['about', 'experience', 'blog', 'home', 'playground'].includes(hash)) {
      setMode(hash as any);
    }
  }, [setMode]);


  useEffect(() => {
    if (mode !== 'boot') {
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
      <main className="pt-12 min-h-screen relative overflow-hidden">
        {mode === 'home' && <HomeContent />}
        {mode === 'about' && <About />}
        {mode === 'experience' && <Experience />}
        {mode === 'blog' && <Blog />}
      </main>
      {mode === 'playground' && <InfraPlayground />}
      <CornerStickmen />
    </>
  );
}

function HomeContent() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center px-4 font-mono">
      <div className="relative max-w-4xl mx-auto text-center border-terminal p-8 bg-black/50">
        <VideoHero videoUrl={VIDEO_URL} />
        
        <div className="mb-2 text-accent/50 text-sm uppercase tracking-widest">
          --- System Operator Profile ---
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-accent text-glow">
          Abhijeet Mohanan
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-lg md:text-xl text-accent/80 border-y border-accent/20 py-2">
          <span>KUBERNETES</span>
          <span>AWS</span>
          <span>PLATFORM_ENGINEERING</span>
          <span>GITOPS</span>
        </div>

        <p className="text-md md:text-lg text-accent/70 max-w-2xl mx-auto mb-10 leading-relaxed text-left">
          <span className="text-accent">$ whoami</span><br />
          Building scalable cloud infrastructure, automating deployments, 
          and enabling developer productivity through platform engineering.
          My mission is to abstract complexity and empower developers with 
          robust, self-service infrastructure.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button
            onClick={() => setMode('experience')}
            className="group px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all flex items-center"
          >
            <span className="mr-2">&gt;</span> VIEW_EXP.EXE
          </button>
          <button
            onClick={() => setMode('about')}
            className="group px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all flex items-center"
          >
            <span className="mr-2">&gt;</span> ABOUT_ME.SH
          </button>
        </div>

        <div className="flex justify-center gap-12 text-2xl border-t border-accent/20 pt-8">
          <a href="mailto:abhijeetmohanan@gmail.com" className="hover:text-white transition-colors" title="Email">
            [EMAIL]
          </a>
          <a href="https://linkedin.com/in/abhijeet-mohanan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
            [LINKEDIN]
          </a>
          <a href="https://github.com/abhijeetmohanan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
            [GITHUB]
          </a>
        </div>
      </div>
    </div>
  );
}
