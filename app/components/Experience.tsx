'use client';

import { useAppStore } from '../store';

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

const experiences: Experience[] = [
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
      'Mentored interns on cloud-native fundamentals',
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
      'Stabilized environments through proactive monitoring',
    ],
  },
  {
    company: 'Skit.ai (Vernacular.ai)',
    role: 'DevOps Intern',
    period: 'Apr 2021 - Jul 2021',
    highlights: [
      'Assisted with Kubernetes upgrades',
      'Implemented syslog + Promtail logging integration',
      'Evaluated monitoring solutions (Zabbix vs Prometheus)',
      'Set up Label Studio for ML labeling pipelines',
    ],
  },
];

const achievements = [
  { icon: '&#9889;', title: 'Autoscaling Platform', desc: 'Implemented Karpenter and KEDA for dynamic scaling' },
  { icon: '&#128736;', title: 'Internal Developer Platform', desc: 'GitOps-driven IDP for self-service infrastructure' },
  { icon: '&#9729;', title: 'Cloud Migration', desc: 'Migrated workloads to AWS EKS for scalability' },
  { icon: '&#128200;', title: 'Observability', desc: 'Automated DORA metrics pipeline' },
];

export default function Experience() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-gradient">Experience</span>
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-accent">Work History</h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-surface p-6 rounded-lg border border-accent/20"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <p className="text-accent">{exp.company}</p>
                </div>
                <span className="text-text-muted text-sm font-mono mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-text-muted flex items-start gap-2">
                    <span className="text-accent">&#8226;</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-accent">Key Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-surface p-5 rounded-lg border border-accent/20 hover:border-accent/40 transition-colors"
            >
              <span className="text-2xl" dangerouslySetInnerHTML={{ __html: achievement.icon }} />
              <h3 className="font-semibold text-white mt-2">{achievement.title}</h3>
              <p className="text-text-muted text-sm mt-1">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('projects')}
          className="px-6 py-3 rounded-lg font-medium bg-accent text-background hover:bg-accent/80 transition-all"
        >
          View Projects
        </button>
        <button
          onClick={() => setMode('home')}
          className="px-6 py-3 rounded-lg font-medium border border-accent text-accent hover:bg-accent/10 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
