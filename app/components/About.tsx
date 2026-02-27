'use client';

import { useAppStore } from '../store';

const skills = [
  { category: 'Cloud & Orchestration', items: ['Kubernetes', 'AWS', 'EKS', 'OpenShift', 'Linkerd', 'Istio'] },
  { category: 'Infrastructure as Code', items: ['Terraform', 'CloudFormation', 'Ansible'] },
  { category: 'CI/CD & GitOps', items: ['Jenkins', 'GitLab CI', 'ArgoCD', 'GitHub Actions'] },
  { category: 'Observability', items: ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'OpenTelemetry'] },
  { category: 'Languages', items: ['Python', 'Bash', 'Go'] },
];

const certifications = [
  'CKA - Certified Kubernetes Administrator',
  'RHCE - Red Hat Certified Engineer',
  'OpenShift Specialist',
  'RHCSA - Red Hat Certified System Administrator',
];

export default function About() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-accent">
        About Me
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent">Who I Am</h2>
        <div className="bg-surface p-6 rounded-lg border border-accent/20">
          <p className="text-text-muted leading-relaxed mb-4">
            I&apos;m a DevOps Engineer with 4+ years of experience in building and operating 
            cloud-native platforms. I specialize in Kubernetes, infrastructure automation, 
            and creating developer-friendly platforms.
          </p>
          <p className="text-text-muted leading-relaxed mb-4">
            My passion lies in solving complex infrastructure challenges, reducing MTTR, 
            and enabling teams to ship software faster and more reliably.
          </p>
          <p className="text-text-muted leading-relaxed">
            When I&apos;m not automating everything, you can find me exploring new cloud 
            technologies, contributing to open-source, or mentoring aspiring engineers.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent">Tech Stack</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.category} className="bg-surface p-4 rounded-lg border border-accent/20">
              <h3 className="font-medium text-accent mb-3">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-background text-text-muted text-sm rounded-full border border-accent/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-accent">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="bg-surface p-4 rounded-lg border border-accent/20 flex items-center gap-3"
            >
              <span className="text-accent">&#10003;</span>
              <span className="text-text-muted">{cert}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('experience')}
          className="px-6 py-3 rounded-lg font-medium bg-accent text-black hover:bg-accent/80 transition-all"
        >
          View Experience
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
