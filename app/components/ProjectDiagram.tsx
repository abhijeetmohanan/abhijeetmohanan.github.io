'use client';

import { motion } from 'framer-motion';

interface DiagramProps {
  title: string;
  description: string;
  items: { label: string; x: number; y: number; type: 'k8s' | 'aws' | 'db' | 'user' }[];
  connections: { from: number; to: number }[];
  groups?: { label: string; x: number; y: number; w: number; h: number; color?: string }[];
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

export default function ProjectDiagram({ title, description, items, connections, groups = [] }: DiagramProps) {
  return (
    <div className="group relative glass p-8 rounded-3xl mb-12 overflow-hidden border border-accent/10 hover:border-accent/30 transition-all duration-500 shadow-2xl">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden" 
           style={{ backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="relative mb-8">
        <h3 className="text-2xl font-bold text-accent mb-2 tracking-tight">{title}</h3>
        <p className="text-text-muted text-sm max-w-xl leading-relaxed">{description}</p>
      </div>

      <div className="relative h-[480px] w-full border border-accent/5 rounded-2xl bg-slate-950/20 backdrop-blur-sm overflow-hidden p-4">
        {/* Render Groups / Zones first (behind) */}
        {groups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ 
              left: `${group.x}%`, 
              top: `${group.y}%`, 
              width: `${group.w}%`, 
              height: `${group.h}%` 
            }}
            className="absolute border border-dashed border-accent/30 rounded-3xl bg-accent/5 backdrop-blur-[2px]"
          >
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-slate-950/90 text-[11px] font-bold text-accent/70 uppercase tracking-widest border border-accent/20 rounded-full shadow-lg h-fit">
              {group.label}
            </div>
          </motion.div>
        ))}

        {/* Connection Lines with Animated Particles */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {connections.map((conn, i) => {
            const from = items[conn.from];
            const to = items[conn.to];
            
            // Smoother bezier curve (unitless numbers for viewBox)
            const controlPointX = from.x + (to.x - from.x) * 0.5;
            const path = `M ${from.x} ${from.y} C ${controlPointX} ${from.y}, ${controlPointX} ${to.y}, ${to.x} ${to.y}`;
            
            return (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  className="text-accent/10"
                  strokeWidth="0.5"
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  className="text-accent"
                  strokeWidth="0.4"
                  strokeDasharray="1 3"
                  filter="url(#glow)"
                  animate={{ strokeDashoffset: [-8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  opacity="0.3"
                />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.05 }}
            style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
            className="absolute z-10"
          >
            <div className="relative group/node flex flex-col items-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 -m-2 rounded-2xl bg-accent/5 opacity-0 group-hover/node:opacity-100 transition-opacity blur-xl" />
              
              {/* Node Container */}
              <div className="relative p-4 rounded-2xl bg-slate-900/80 border border-accent/20 backdrop-blur-md flex flex-col items-center gap-3 min-w-[100px] shadow-xl group-hover/node:border-accent/50 group-hover/node:transform group-hover/node:-translate-y-1 transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-accent/5 group-hover/node:bg-accent/10 transition-colors">
                  {Icons[item.type]}
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className="h-1 w-8 rounded-full bg-accent/20 overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
