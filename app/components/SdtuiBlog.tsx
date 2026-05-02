'use client';

import { useAppStore } from '../store';

export default function SdtuiBlog() {
  const setMode = useAppStore((state) => state.setMode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => setMode('blog')}
        className="mb-8 text-accent hover:underline flex items-center gap-2"
      >
        ← Back to Blog
      </button>

      <article className="prose prose-invert prose-accent max-w-none">
        <h1 className="text-4xl font-bold mb-4 text-accent">
          Managing systemd with Style: Introducing sdtui
        </h1>
        
        <div className="flex gap-4 text-text-muted mb-8 font-mono text-sm">
          <span>2024-05-03</span>
          <span>•</span>
          <span>6 min read</span>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-accent/20 mb-8 italic text-text-muted">
          sdtui is a high-performance, multi-threaded TUI designed to simplify the management of systemd units on Linux. 
          It serves as a modern, interactive alternative to systemctl and journalctl.
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-accent">The Motivation</h2>
          <p className="text-text-muted leading-relaxed mb-4">
            If you&apos;ve spent any significant time managing Linux servers, you&apos;re intimately familiar with <code className="text-accent">systemctl</code> and <code className="text-journal">journalctl</code>. 
            While powerful, these tools can sometimes feel cumbersome when you need to quickly monitor multiple services, tail logs, and toggle states across both system and user units.
          </p>
          <p className="text-text-muted leading-relaxed">
            I built <strong>sdtui</strong> to bridge this gap—providing a unified, interactive dashboard that makes systemd management feel instantaneous and visual, without leaving the terminal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
          
          <div className="space-y-6">
            <div className="bg-surface p-4 rounded-lg border border-accent/10">
              <h3 className="text-xl font-medium mb-2 text-text">Multi-threaded Performance</h3>
              <p className="text-text-muted">
                Written in 100% Rust, sdtui uses a multi-threaded engine. Background workers handle system queries and log fetching, 
                ensuring the UI remains buttery smooth even when streaming heavy logs from multiple services.
              </p>
            </div>

            <div className="bg-surface p-4 rounded-lg border border-accent/10">
              <h3 className="text-xl font-medium mb-2 text-text">Live Log Streaming & Smart Tailing</h3>
              <p className="text-text-muted">
                Watch your service journals in real-time. Smart Tailing automatically scrolls to the latest logs but smartly 
                pauses when you want to scroll back and investigate a specific trace.
              </p>
            </div>

            <div className="bg-surface p-4 rounded-lg border border-accent/10">
              <h3 className="text-xl font-medium mb-2 text-text">Regex Highlighting</h3>
              <p className="text-text-muted">
                Debug faster with built-in regex highlighting. Easily spot errors, warnings, or specific request IDs 
                across thousands of lines of logs by defining custom highlight patterns.
              </p>
            </div>

            <div className="bg-surface p-4 rounded-lg border border-accent/10">
              <h3 className="text-xl font-medium mb-2 text-text">Dual-View Mode</h3>
              <p className="text-text-muted">
                Seamlessly toggle between <strong>Local User</strong> and <strong>Full System</strong> views with a single keystroke (<kbd className="bg-background px-1 rounded text-accent">Tab</kbd>). 
                No more typing <code className="text-accent">--user</code> every time.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Why Rust?</h2>
          <p className="text-text-muted leading-relaxed">
            Rust was the natural choice for sdtui. The memory safety guarantees and fearless concurrency allowed me to build 
            a non-blocking log streamer that is both robust and extremely fast. The result is a tool that feels like a 
            native extension of the Linux kernel.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Getting Started</h2>
          <p className="text-text-muted mb-4">
            You can find sdtui on GitHub. It&apos;s open-source and easy to install via Cargo.
          </p>
          <div className="bg-background p-4 rounded border border-accent/20 font-mono text-sm">
            <span className="text-accent">$</span> cargo install sdtui
          </div>
        </section>
      </article>

      <div className="flex gap-4 border-t border-accent/20 pt-8">
        <a 
          href="https://github.com/abhijeetmohanan/sdtui" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-medium bg-accent text-black hover:bg-accent/80 transition-all"
        >
          View on GitHub
        </a>
        <button
          onClick={() => setMode('blog')}
          className="px-6 py-3 rounded-lg font-medium border border-accent text-accent hover:bg-accent/10 transition-all"
        >
          Back to Blog List
        </button>
      </div>
    </div>
  );
}
