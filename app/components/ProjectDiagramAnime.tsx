'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface DiagramProps {
  items: { label: string; x: number; y: number; type: 'k8s' | 'aws' | 'db' | 'user' }[];
  connections: { from: number; to: number }[];
}

const Icons = {
  k8s: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-accent" strokeWidth="1.5">
      <path d="M12 2L19.5 5.5V12M12 2L4.5 5.5V12M12 2V22M19.5 12L12 15.5L4.5 12M19.5 12V18.5L12 22M4.5 12V18.5L12 22" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-accent" strokeWidth="1.5">
      <path d="M17.5 19C19.9301 19 21.9 17.0301 21.9 14.6C21.9 12.1699 19.9301 10.2 17.5 10.2C17.4162 10.2 17.3331 10.2023 17.2507 10.2069C16.8286 7.42582 14.4323 5.3 11.5 5.3C8.46243 5.3 6 7.76243 6 10.8C6 11.1306 6.02927 11.4544 6.08544 11.769C3.76672 12.3831 2 14.4907 2 17C2 19.7614 4.23858 22 7 22H17" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  db: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-accent" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5V19C3 20.6569 7.02944 22 12 22C16.9706 22 21 20.6569 21 19V5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 12C3 13.6569 7.02944 15 12 15C16.9706 15 21 13.6569 21 12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-accent" strokeWidth="1.5">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function ProjectDiagramAnime({ items, connections }: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pulse animation for nodes
    animate('.node-glow', {
      scale: [1, 1.2],
      opacity: [1, 0.3, 0.1], 
      ease: 'inOutQuad',
      duration: 1500,
      alternate: true,
      loop: true,
      delay: stagger(200)
    });

    // Particle flow animation
    animate('.flow-particle', {
      strokeDashoffset: [20, 0],
      ease: 'linear',
      duration: 3000,
      loop: true,
      delay: stagger(400)
    });

    // Glitch-like entrance
    animate('.node-container', {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      opacity: [0, 1],
      ease: 'inSteps(5)',
      duration: 400,
      delay: stagger(100)
    });

  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-video md:aspect-[21/9] bg-surface-bright/50 rounded-[2rem] group transition-all duration-700"
      style={{ 
        boxShadow: '0 0 60px var(--accent-glow)',
        border: '1px solid rgba(56, 189, 248, 0.4)'
      }}
    >
      {/* Dynamic Aura (Outer) */}
      <div className="absolute -inset-1 bg-accent/10 rounded-[2.1rem] blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      {/* Inner Masked Engine */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,128,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
        
        {/* Radar Grid */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, i) => {
            const from = items[conn.from];
            const to = items[conn.to];
            const controlX = from.x + (to.x - from.x) * 0.5;
            const path = `M ${from.x} ${from.y} C ${controlX} ${from.y}, ${controlX} ${to.y}, ${to.x} ${to.y}`;
            
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="var(--accent)" strokeWidth="0.2" opacity="0.1" />
                <path d={path} fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="2 6" className="flow-particle" opacity="0.4" />
              </g>
            );
          })}
        </svg>

        {items.map((item, i) => (
          <div 
            key={i} 
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node"
          >
            <div className="node-glow absolute inset-0 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="node-container relative p-4 bg-surface/90 border border-accent/30 rounded-xl backdrop-blur-sm flex flex-col items-center shadow-lg group-hover/node:border-accent transition-all duration-300">
              <div className="text-accent mb-2">
                {Icons[item.type]}
              </div>
              <span className="text-[10px] font-mono font-bold text-text uppercase tracking-widest whitespace-nowrap">
                {item.label}
              </span>
              <div className="mt-2 w-8 h-[2px] bg-accent/20 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        ))}

        {/* Hero Stats */}
        <div className="absolute bottom-6 left-6 flex gap-8 z-20">
          {[
            { label: 'Latency', val: '12ms', color: 'text-green-400' },
            { label: 'SLA', val: '99.9%', color: 'text-accent' },
            { label: 'Uptime', val: '95%', color: 'text-purple-400' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-text-muted">{stat.label}</span>
              <span className={`text-sm font-mono font-bold ${stat.color}`}>{stat.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
