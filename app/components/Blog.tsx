'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string | null;
  content: string;
}

export default function Blog() {
  const setMode = useAppStore((state) => state.setMode);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/blog/index.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
        
        // Handle direct linking via hash if needed
        const hash = window.location.hash.replace('#blog-', '');
        if (hash) {
          const post = data.find((p: BlogPost) => p.slug === hash);
          if (post) setSelectedPost(post);
        }
      })
      .catch(err => {
        console.error('Failed to fetch blog posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 font-mono text-accent">
        <p className="animate-pulse">LOADING_DATA... [OK]</p>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 font-mono">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-8 text-accent hover:underline flex items-center gap-2"
        >
          &lt;-- RETURN_TO_LIST.SH
        </button>

        <article className="terminal-window mb-12">
          <div className="mb-8 border-b border-accent/30 pb-4">
            <h1 className="text-3xl font-bold mb-2 text-glow">{selectedPost.title}</h1>
            <div className="flex gap-4 text-accent/60 text-sm">
              <span>DATE: {selectedPost.date}</span>
              <span>READ_TIME: {selectedPost.readTime}</span>
            </div>
          </div>

          <div className="prose prose-invert prose-accent max-w-none 
            prose-headings:text-accent prose-headings:font-bold prose-headings:uppercase
            prose-p:text-accent/80 prose-strong:text-accent prose-code:text-accent 
            prose-code:bg-accent/10 prose-code:px-1 prose-pre:bg-black prose-pre:border prose-pre:border-accent/20
            prose-a:text-accent prose-a:underline hover:prose-a:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedPost.content}
            </ReactMarkdown>
          </div>

          {selectedPost.url && (
            <div className="mt-12 pt-6 border-t border-accent/20">
              <a 
                href={selectedPost.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-black transition-all"
              >
                READ_ON_EXTERNAL_PLATFORM.EXE
              </a>
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-mono">
      <div className="mb-12 border-b border-accent/30 pb-6">
        <h1 className="text-4xl font-bold mb-4 text-accent text-glow">
          ARCHIVE://BLOG
        </h1>
        <p className="text-accent/60 italic">
          Collection of thoughts on infrastructure, automation, and systems.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {posts.map((post, index) => (
          <article
            key={index}
            className="group border border-accent/20 p-6 hover:border-accent/60 transition-all bg-black/30"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <button
                onClick={() => setSelectedPost(post)}
                className="text-xl font-bold text-accent hover:text-white transition-colors text-left uppercase text-glow"
              >
                {index}. {post.title}
              </button>
              <span className="text-accent/50 text-sm mt-2 md:mt-0">
                [{post.date}]
              </span>
            </div>
            
            <p className="text-accent/70 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border border-accent/20 text-accent/40 text-xs uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => setSelectedPost(post)}
                className="text-sm text-accent hover:underline"
              >
                READ_MORE.SH
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="flex gap-4">
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
