'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { animate, stagger } from 'animejs';

type ServiceType = 'eks' | 'alb' | 'lambda' | 'acm' | 'ses' | 'kms' | 'ec2' | 'asg' | 'rds' | 'dc' | 'vpc' | 'cw' | 'r53' | 'iam';

interface ServiceNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: ServiceType;
  description?: string;
  interactive?: boolean;
}

const services: ServiceNode[] = [
  // Networking & Entrance
  { id: 'r53', label: 'Route 53', x: 200, y: 300, type: 'r53' },
  { id: 'dc', label: 'Direct Connect', x: 200, y: 500, type: 'dc' },
  { id: 'vpc', label: 'VPC', x: 500, y: 400, type: 'vpc' },
  { id: 'alb', label: 'ALB', x: 700, y: 400, type: 'alb' },
  
  // Computing Cluster
  { id: 'eks', label: 'EKS', x: 1000, y: 300, type: 'eks', interactive: true },
  { id: 'ec2', label: 'EC2', x: 1000, y: 500, type: 'ec2', interactive: true },
  { id: 'asg', label: 'ASG', x: 1200, y: 500, type: 'asg' },
  { id: 'lambda', label: 'Lambda', x: 1200, y: 300, type: 'lambda' },
  
  // Database & Storage
  { id: 'rds', label: 'RDS', x: 1500, y: 400, type: 'rds' },
  
  // Security & Identity
  { id: 'iam', label: 'IAM', x: 1000, y: 100, type: 'iam' },
  { id: 'kms', label: 'KMS', x: 1200, y: 100, type: 'kms' },
  { id: 'acm', label: 'ACM', x: 800, y: 100, type: 'acm' },
  
  // Observability & Communication
  { id: 'cw', label: 'CloudWatch', x: 1000, y: 700, type: 'cw' },
  { id: 'ses', label: 'SES', x: 1500, y: 700, type: 'ses' },
];

const connections = [
  { from: 'r53', to: 'vpc' },
  { from: 'dc', to: 'vpc' },
  { from: 'vpc', to: 'alb' },
  { from: 'alb', to: 'eks' },
  { from: 'alb', to: 'ec2' },
  { from: 'eks', to: 'rds' },
  { from: 'ec2', to: 'rds' },
  { from: 'eks', to: 'cw' },
  { from: 'ec2', to: 'cw' },
  { from: 'lambda', to: 'rds' },
  { from: 'eks', to: 'ses' },
];

const ServiceIcons: Record<string, React.ReactNode> = {
  eks: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 stroke-accent" strokeWidth="1.5">
      <path d="M12 2L19.5 5.5V12M12 2L4.5 5.5V12M12 2V22M19.5 12L12 15.5L4.5 12M19.5 12V18.5L12 22M4.5 12V18.5L12 22" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  alb: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 stroke-accent" strokeWidth="1.5">
      <path d="M12 3V21M3 12H21M17 7L21 12L17 17M7 7L3 12L7 17" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lambda: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 stroke-accent" strokeWidth="1.5">
      <path d="M7 16V4L17 12L7 20V16Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  rds: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 stroke-accent" strokeWidth="1.5">
      <ellipse cx="12" cy="7" rx="8" ry="4"/>
      <path d="M4 7V17C4 19.2091 7.58172 21 12 21C16.4183 21 20 19.2091 20 17V7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12C4 14.2091 7.58172 16 12 16C16.4183 16 20 14.2091 20 12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Default fallback icon
  default: (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 stroke-accent" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 3V21M15 3V21M3 9H21M3 15H21" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export default function InfraWorldMap() {
  const constraintsRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Maintenance crew positions (simplified)
  const [crew, setCrew] = useState([
    { id: 1, x: 500, y: 400, target: 'alb' },
    { id: 2, x: 1000, y: 300, target: 'eks' },
    { id: 3, x: 1500, y: 400, target: 'rds' },
  ]);

  useEffect(() => {
    // Animate crew movements
    const interval = setInterval(() => {
      setCrew(prev => prev.map(c => {
        const targetNode = services.find(s => s.id === c.target);
        if (!targetNode) return c;
        
        // Random drift around target
        return {
          ...c,
          x: targetNode.x + (Math.random() * 100 - 50),
          y: targetNode.y + (Math.random() * 100 - 50),
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-surface/30 rounded-[2.5rem] overflow-hidden border border-accent/20 cursor-grab active:cursor-grabbing shadow-2xl">
      {/* HUD Info Overlay */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-accent uppercase tracking-widest">System Live // Infra-Map v1.0</span>
        </div>
        <p className="text-[10px] text-text-muted font-mono uppercase tracking-wider max-w-[200px]">
          Pan through the ecosystem to explore architectual blueprints. Double-click EKS/EC2 for node-level details.
        </p>
      </div>

      {/* Constraints for panning */}
      <div ref={constraintsRef} className="absolute inset-[-500px]" />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        className="absolute w-[2000px] h-[1200px]"
        initial={{ x: -400, y: -200 }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Data Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.5" />
            </marker>
          </defs>
          {connections.map((conn, i) => {
            const fromService = services.find(s => s.id === conn.from);
            const toService = services.find(s => s.id === conn.to);
            if (!fromService || !toService) return null;

            return (
              <g key={i}>
                <line 
                  x1={fromService.x} y1={fromService.y} 
                  x2={toService.x} y2={toService.y} 
                  stroke="var(--accent)" 
                  strokeWidth="1" 
                  opacity="0.1" 
                />
                <circle r="2" fill="var(--accent)">
                  <animateMotion 
                    dur={`${2 + Math.random() * 2}s`} 
                    repeatCount="indefinite" 
                    path={`M ${fromService.x} ${fromService.y} L ${toService.x} ${toService.y}`} 
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Maintenance Crew */}
        {crew.map(member => (
          <motion.div
            key={member.id}
            animate={{ x: member.x, y: member.y }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute z-10 pointer-events-none"
          >
            <div className="relative flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-accent/40 blur-sm animate-pulse" />
              <div className="text-[12px] -mt-3">👷</div>
              <div className="absolute top-4 text-[6px] font-mono text-accent opacity-50 whitespace-nowrap uppercase">
                Repairing_{member.target}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Service Nodes */}
        {services.map((service) => (
          <motion.div
            key={service.id}
            style={{ left: service.x, top: service.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            whileHover={{ scale: 1.1 }}
            onClick={() => service.interactive && setSelectedNode(service.id)}
          >
            <div className="relative group cursor-pointer">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center p-4 bg-surface/80 border border-accent/20 rounded-2xl backdrop-blur-md shadow-xl transition-all group-hover:border-accent/60">
                <div className="mb-2 transition-transform group-hover:rotate-12">
                  {ServiceIcons[service.type] || ServiceIcons.default}
                </div>
                <span className="text-[9px] font-mono font-bold text-text uppercase tracking-[0.2em] whitespace-nowrap">
                  {service.label}
                </span>
                
                {service.interactive && (
                  <div className="mt-2 text-[6px] text-accent/50 animate-pulse uppercase tracking-widest">
                    {"//"} Click to Inspect
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Drill-down Modal (Sketch) */}
      {selectedNode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="relative w-full max-w-2xl bg-surface border border-accent/40 rounded-[2rem] p-12 overflow-hidden shadow-[0_0_100px_var(--accent-glow)]">
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-8 right-8 text-accent hover:scale-110 transition-transform font-mono text-sm uppercase tracking-widest"
            >
              [ Close_View ]
            </button>
            <h3 className="text-4xl font-black text-accent mb-2 uppercase italic tracking-tighter">
              {selectedNode}_BLUEPRINT
            </h3>
            <p className="text-text-muted font-mono text-xs uppercase tracking-widest mb-8">
              Infrastructure Node :: Tier-1 Production Environment
            </p>
            
            <div className="grid grid-cols-3 gap-6 opacity-80">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-video border border-accent/20 rounded-xl bg-accent/5 flex flex-col items-center justify-center p-4">
                  <div className="w-8 h-8 rounded-lg border border-accent/40 animate-pulse mb-2" />
                  <div className="w-12 h-1 bg-accent/20 rounded-full" />
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-4 border border-accent/10 bg-accent/5 rounded-xl">
              <p className="text-[10px] font-mono text-text-muted/60 leading-loose">
                &gt; Loading node wireframes...<br/>
                &gt; Fetching Kubernetes manifest states...<br/>
                &gt; [ OK ] All systems nominal.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
