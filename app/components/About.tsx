'use client';

import { useAppStore } from '../store';
import GithubStats from './GithubStats';

const skills = [
  { category: 'Cloud & Orchestration', items: ['AWS (EKS, EC2, RDS, VPC)', 'Kubernetes', 'EKS', 'OpenShift', 'ArgoCD', 'Karpenter', 'KEDA'] },
  { category: 'Infrastructure as Code', items: ['Terraform', 'CloudFormation', 'Ansible', 'Helm', 'Kustomize'] },
  { category: 'CI/CD & Security', items: ['GitLab CI', 'Trivy', 'AWS Inspector', 'DevSecOps'] },
  { category: 'Observability & SRE', items: ['Prometheus', 'Grafana', 'Loki', 'Pyroscope', 'Opsgenie', 'Incident Management'] },
  { category: 'Networking & Telephony', items: ['VPC Design', 'SIP/VoIP', 'OpenSIPS', 'RTPEngine', 'Linkerd', 'Teleport'] },
  { category: 'Languages & DB', items: ['Python', 'Bash', 'HCL', 'PostgreSQL', 'Redis'] },
];

const certifications = [
  'CKA - Certified Kubernetes Administrator',
  'RHCE - Red Hat Certified Engineer',
  'RHCSA - Red Hat Certified System Administrator',
  'Red Hat Certified Specialist in Ansible Automation',
  'Red Hat Certified Specialist in OpenShift Administration',
];

export default function About() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-mono">
      <div className="mb-12 border-b border-accent/30 pb-6">
        <h1 className="text-4xl font-bold mb-4 text-accent text-glow uppercase">
          SYSTEM_INFO://ABOUT
        </h1>
        <p className="text-accent/60 italic">
          Platform & Site Reliability Engineer with 5 years of experience building cloud-native infrastructure.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-accent flex items-center">
          <span className="mr-2 text-sm">#</span> WHO_AM_I
        </h2>
        <div className="terminal-window">
          <p className="text-accent/80 leading-relaxed mb-4">
            I am a Platform and Site Reliability Engineer specializing in building and operating 
            mission-critical, cloud-native production infrastructure. As a sole platform owner, 
            I&apos;ve architected multi-region AWS distributed systems across India, US, and Canada.
          </p>
          <p className="text-accent/80 leading-relaxed mb-4">
            My expertise lies in building Infrastructure as Code platforms from the ground up 
            using Terraform and Kubernetes, enabling microservices to ship reliably at scale. 
            I am particularly passionate about autonomous systems, having built LLM-driven 
            alerting and remediation loops.
          </p>
          <p className="text-accent/80 leading-relaxed">
            Based in Bengaluru, I focus on FinOps, DevSecOps, and scaling infrastructure 
            for high-demand conversational AI platforms.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-accent flex items-center">
          <span className="mr-2 text-sm">#</span> TECH_STACK
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.category} className="terminal-window">
              <h3 className="font-bold text-accent mb-4 underline uppercase text-sm">{skill.category}</h3>
              <ul className="prompt-list space-y-1">
                {skill.items.map((item) => (
                  <li key={item} className="text-accent/80 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-accent flex items-center">
          <span className="mr-2 text-sm">#</span> GIT_METRICS
        </h2>
        <div className="terminal-window overflow-x-auto">
          <GithubStats />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-accent flex items-center">
          <span className="mr-2 text-sm">#</span> CERTIFICATIONS
        </h2>
        <div className="grid md:grid-cols-1 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="terminal-window flex items-center gap-3 text-sm"
            >
              <span className="text-accent">[OK]</span>
              <span className="text-accent/80">{cert}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('experience')}
          className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all"
        >
          &gt; VIEW_EXP.EXE
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
