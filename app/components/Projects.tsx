'use client';

import { useAppStore } from '../store';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Kubernetes Autoscaling Platform',
    description: 'Implemented Karpenter for cluster autoscaling and KEDA for event-driven scaling, reducing infrastructure costs by 30%.',
    tech: ['Kubernetes', 'Karpenter', 'KEDA', 'AWS EKS'],
  },
  {
    title: 'Internal Developer Platform',
    description: 'Built a GitOps-driven platform using ArgoCD for self-service infrastructure provisioning.',
    tech: ['ArgoCD', 'Terraform', 'Helm', 'GitLab'],
  },
  {
    title: 'Observability Stack',
    description: 'Deployed comprehensive monitoring with Prometheus, Grafana, Loki for centralized logging and DORA metrics.',
    tech: ['Prometheus', 'Grafana', 'Loki', 'Python'],
  },
  {
    title: 'CI/CD Pipeline Optimization',
    description: 'Redesigned deployment pipelines improving deployment frequency and reliability.',
    tech: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Terraform Modules',
    description: 'Created reusable infrastructure modules for VPC, EKS, and RDS deployments.',
    tech: ['Terraform', 'AWS', 'CloudFormation'],
  },
  {
    title: 'Incident Response Automation',
    description: 'Automated incident response workflows with JIRA, OpsGenie integration.',
    tech: ['Python', 'JIRA', 'OpsGenie', 'Grafana'],
  },
];

export default function Projects() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-gradient">Projects</span>
      </h1>

      <p className="text-text-muted mb-8">
        Here are some of the key projects I&apos;ve worked on. 
        Check my <a href="https://github.com/abhijeetmohanan" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a> for more.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-surface p-6 rounded-lg border border-accent/20 hover:border-accent/40 transition-all hover:transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
            <p className="text-text-muted text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-background text-accent text-xs rounded border border-accent/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('blog')}
          className="px-6 py-3 rounded-lg font-medium bg-accent text-background hover:bg-accent/80 transition-all"
        >
          Read Blog
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
