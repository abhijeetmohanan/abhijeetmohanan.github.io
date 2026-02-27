'use client';

import { useAppStore } from '../store';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: 'Kubernetes Autoscaling with Karpenter',
    excerpt: 'Learn how to implement cost-effective cluster autoscaling using Karpenter on AWS EKS.',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Kubernetes', 'AWS', 'Karpenter'],
  },
  {
    title: 'GitOps with ArgoCD - A Practical Guide',
    excerpt: 'Set up declarative continuous deployment using ArgoCD and GitHub for your Kubernetes clusters.',
    date: '2023-11-20',
    readTime: '10 min read',
    tags: ['GitOps', 'ArgoCD', 'DevOps'],
  },
  {
    title: 'Reducing MTTR with Incident Automation',
    excerpt: 'How we improved our incident response time by 40% using automation and proper tooling.',
    date: '2023-09-05',
    readTime: '6 min read',
    tags: ['Incident Response', 'Automation', 'SRE'],
  },
  {
    title: 'Building Reusable Terraform Modules',
    excerpt: 'Best practices for creating modular, maintainable infrastructure as code.',
    date: '2023-07-12',
    readTime: '7 min read',
    tags: ['Terraform', 'IaC', 'AWS'],
  },
  {
    title: 'Observability Stack: Prometheus + Grafana + Loki',
    excerpt: 'Set up comprehensive monitoring and logging for your cloud-native applications.',
    date: '2023-05-28',
    readTime: '12 min read',
    tags: ['Observability', 'Prometheus', 'Grafana'],
  },
];

export default function Blog() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-gradient">Blog</span>
      </h1>

      <p className="text-text-muted mb-8">
        Thoughts on cloud infrastructure, DevOps, and platform engineering.
      </p>

      <div className="space-y-6 mb-12">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-surface p-6 rounded-lg border border-accent/20 hover:border-accent/40 transition-all hover:transform hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
              <h2 className="text-xl font-semibold text-white hover:text-accent cursor-pointer">
                {post.title}
              </h2>
              <span className="text-text-muted text-sm mt-2 md:mt-0 font-mono">
                {post.date}
              </span>
            </div>
            <p className="text-text-muted mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-background text-accent text-xs rounded border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-text-muted text-sm">{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-surface p-6 rounded-lg border border-accent/20 mb-12">
        <h3 className="text-lg font-semibold text-white mb-2">Want to write?</h3>
        <p className="text-text-muted text-sm">
          I&apos;m always looking to share knowledge. If you have a topic idea or want to collaborate,
          reach out to me on LinkedIn or email.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('home')}
          className="px-6 py-3 rounded-lg font-medium bg-accent text-background hover:bg-accent/80 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
