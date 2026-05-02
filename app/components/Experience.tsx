'use client';

import { useAppStore } from '../store';

const experiences = [
  {
    company: 'Skit.ai',
    role: 'Senior Platform Engineer',
    period: 'Apr 2024 - Present',
    description: 'Sole platform owner for a conversational AI platform, architecting multi-region distributed systems across India, US, and Canada.',
    achievements: [
      'Built "Kavach", an autonomous alerting system powered by Claude AI for intelligent triage and auto-remediation.',
      'Designed multi-region expansion with region-level fault isolation and disaster recovery.',
      'Implemented Karpenter and KEDA for intelligent node provisioning and event-driven autoscaling on EKS.',
      'Led FinOps initiative reducing cluster costs by 30% through rightsizing and spot instance optimization.',
      'Architected per-client IAM isolation and secrets management for 18+ enterprise banking clients.',
    ],
  },
  {
    company: 'Skit.ai',
    role: 'DevOps Engineer',
    period: 'Jan 2023 - Mar 2024',
    description: 'Owned the entire Terraform and CloudFormation codebase across 3 production regions.',
    achievements: [
      'Developed GitOps framework with GitLab Runners and ArgoCD, reducing release times by 50%.',
      'Established DevSecOps pipeline integrating Trivy and AWS Inspector into CI/CD workflows.',
      'Architected and implemented production EKS lifecycle from VPC design to multi-region scaling.',
      'Halved compute footprint by rightsizing ASG node groups through systematic workload profiling.',
      'Deployed full observability stack (Grafana, Prometheus, Loki, Pyroscope) and Linkerd service mesh.',
    ],
  },
  {
    company: 'Vernacular.ai (now Skit.ai)',
    role: 'DevOps Support Engineer',
    period: 'Jun 2021 - Dec 2022',
    description: 'Managed client-specific on-premises systems for enterprise banking deployments.',
    achievements: [
      'Led comprehensive on-premises setup reducing delivery time from 1 week to 2 days via Ansible.',
      'Leveraged Terraform to establish and manage EKS clusters for improved scalability.',
      'Optimized resource allocation reducing ALBs from 7 to 2, significantly cutting networking costs.',
      'Built a semi-automated Python application to improve SDLC workflow, cutting lead time by 45%.',
    ],
  },
];

export default function Experience() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-mono">
      <div className="mb-12 border-b border-accent/30 pb-6">
        <h1 className="text-4xl font-bold mb-4 text-accent text-glow uppercase">
          HISTORY://EXPERIENCE
        </h1>
        <p className="text-accent/60 italic">
          Professional career log and technical milestones.
        </p>
      </div>

      <div className="space-y-12 mb-12 relative border-l border-accent/20 pl-8 ml-4">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[41px] top-1 w-4 h-4 bg-background border-2 border-accent rounded-none shadow-[0_0_8px_var(--accent-glow)]" />
            
            <div className="terminal-window">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 border-b border-accent/10 pb-2">
                <div>
                  <h3 className="text-xl font-bold text-accent uppercase">{exp.role}</h3>
                  <p className="text-accent/80 font-bold">{exp.company}</p>
                </div>
                <span className="text-accent/50 text-sm font-bold mt-2 md:mt-0">
                  [{exp.period}]
                </span>
              </div>
              
              <p className="text-accent/70 mb-6 italic text-sm">
                &gt; {exp.description}
              </p>

              <div className="space-y-3">
                <p className="text-xs text-accent/40 uppercase font-bold tracking-widest">Achievements:</p>
                <ul className="prompt-list space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-accent/80 text-sm leading-relaxed">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('blog')}
          className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all"
        >
          &gt; READ_BLOG.EXE
        </button>
        <button
          onClick={() => setMode('home')}
          className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all"
        >
          &lt;-- CD ..
        </button>
      </div>
    </div>
  );
}
