'use client';

import { useAppStore } from '../store';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'A Pod with Public IP',
    excerpt: 'Discover how to assign a public IP address and a dedicated security group to a Kubernetes Pod. Ideal for handling real-time streaming (RTP) in private subnets securely.',
    date: '2022-09-22',
    readTime: '5 min read',
    tags: ['AWS', 'Kubernetes', 'Networking'],
    url: 'https://dev.to/abhijeetmohanan/a-pod-with-public-ip-59m7',
  },
  {
    title: 'Deploying kubernetes on containers using kind',
    excerpt: 'Kind is an installation tool used to deploy kubernetes cluster in containers. Learn how to run local Kubernetes clusters using Docker container nodes for development and CI.',
    date: '2021-06-25',
    readTime: '8 min read',
    tags: ['Kubernetes', 'Testing', 'Kind'],
    url: 'https://dev.to/abhijeetmohanan/deploying-kubernetes-on-containers-using-kind-27l5',
  },
];

export default function Blog() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-accent">
        Blog
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
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold text-text hover:text-accent transition-colors"
              >
                {post.title}
              </a>
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
        <h3 className="text-lg font-semibold text-text mb-2">Want to write?</h3>
        <p className="text-text-muted text-sm">
          I&apos;m always looking to share knowledge. If you have a topic idea or want to collaborate,
          reach out to me on LinkedIn or email.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMode('home')}
          className="px-6 py-3 rounded-lg font-medium bg-accent text-black hover:bg-accent/80 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
