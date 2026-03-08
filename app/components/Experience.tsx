'use client';

import { useAppStore } from '../store';
import ProjectDiagramAnime from './ProjectDiagramAnime';
import InfraWorldMap from './InfraWorldMap';
import { motion } from 'framer-motion';

const caseStudyData = {
  items: [
    { label: "Transit", x: 10, y: 50, type: 'user' as const },
    { label: "Ingress", x: 30, y: 50, type: 'aws' as const },
    { label: "Core Node", x: 60, y: 50, type: 'k8s' as const },
    { label: "Scale-Layer", x: 60, y: 30, type: 'k8s' as const },
    { label: "Monitor", x: 60, y: 70, type: 'k8s' as const },
    { label: "Persistent", x: 90, y: 50, type: 'db' as const },
  ],
  connections: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 5 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
  ]
};

const experiences = [
  {
    company: 'Skit.ai',
    role: 'DevOps Engineer',
    period: 'Jan 2022 - Present',
    highlights: [
      'Built Kubernetes platforms for application & ML workloads with OpenSIPS + RTPengine',
      'Led incident response and RCA, reducing MTTR by 40%',
      'Implemented Karpenter and KEDA, reducing infra costs by 30%',
      'Delivered CI/CD pipelines with GitOps (ArgoCD + GitLab)',
      'Developed reusable Helm charts & Terraform modules',
      'Rolled out observability stack (Prometheus, Grafana, Loki)',
      'Improved pre-production uptime from 50% → 95%',
    ],
  },
  {
    company: 'Skit.ai',
    role: 'DevOps Support Engineer',
    period: 'Aug 2021 - Jan 2022',
    highlights: [
      'Migrated workloads from bare-metal to AWS EKS using Terraform',
      'Automated infra rollouts, reducing delivery time by 70%',
      'Reduced infra costs by consolidating ALBs',
    ],
  },
];

export default function Experience() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Work in Progress Wireframe */}
      <section className="mb-24 relative overflow-hidden rounded-[2rem] border border-accent/20 bg-accent/5 p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="relative z-10">
          <div className="text-accent/40 font-mono text-[10px] tracking-[0.5em] uppercase mb-4 animate-pulse">
            System Protocol // Laboratory Access
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-accent/80 mb-6">
            WORK_IN_PROGRESS
          </h2>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-accent/50 uppercase tracking-widest">
            <span className="w-12 h-[1px] bg-accent/20" />
            Restricted Access
            <span className="w-12 h-[1px] bg-accent/20" />
          </div>
        </div>

        {/* Decorative Wireframe Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-accent/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-accent/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-accent/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-accent/20" />
      </section>

      {/* Professional Timeline */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold mb-12 text-accent border-b border-accent/10 pb-4 inline-block">Professional History</h2>
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <div className="sticky top-24">
                  <div className="text-sm font-mono text-accent/60 mb-1">{exp.period}</div>
                  <h3 className="text-xl font-bold text-text">{exp.company}</h3>
                  <div className="text-accent font-medium">{exp.role}</div>
                </div>
              </div>
              <div className="md:col-span-9">
                <ul className="grid sm:grid-cols-2 gap-6">
                  {exp.highlights.map((highlight, i) => {
                    const parts = highlight.split(/(\d+%|\d+\+)/g);
                    return (
                      <li key={i} className="group/item p-4 rounded-xl bg-surface/50 border border-accent/10 hover:border-accent/20 transition-all">
                        <p className="text-text-muted text-sm leading-relaxed">
                          {parts.map((part, index) => 
                            /(\d+%|\d+\+)/.test(part) ? 
                              <span key={index} className="text-accent font-bold">{part}</span> : 
                              part
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
