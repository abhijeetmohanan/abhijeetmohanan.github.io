'use client';

import { useAppStore } from '../store';

const experiences = [
  {
    company: 'Skit.ai',
    role: 'DevOps Engineer',
    period: '2021 - Present',
    description: 'Leading platform engineering initiatives, managing large-scale Kubernetes clusters, and automating multi-cloud infrastructure.',
    achievements: [
      'Implemented GitOps using ArgoCD for 50+ microservices.',
      'Reduced cloud costs by 30% through spot instance optimization.',
      'Built custom CLI tools in Go for internal developer self-service.',
    ],
  },
  {
    company: 'Previous Co',
    role: 'Associate Engineer',
    period: '2020 - 2021',
    description: 'Focused on CI/CD pipeline automation and monitoring infrastructure.',
    achievements: [
      'Migrated legacy Jenkins pipelines to GitLab CI.',
      'Set up comprehensive monitoring using Prometheus and Grafana.',
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
