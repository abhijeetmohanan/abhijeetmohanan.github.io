---
title: "Managing systemd with Style: Introducing sdtui"
date: "2024-05-03"
excerpt: "A high-performance, Rust-based TUI for systemd unit management. Featuring live log streaming, regex highlighting, and a responsive multi-threaded engine."
tags: ["Rust", "TUI", "systemd", "Linux"]
readTime: "6 min read"
---

If you've spent any significant time managing Linux servers, you're intimately familiar with `systemctl` and `journalctl`. While powerful, these tools can sometimes feel cumbersome when you need to quickly monitor multiple services, tail logs, and toggle states across both system and user units.

I built **sdtui** to bridge this gap—providing a unified, interactive dashboard that makes systemd management feel instantaneous and visual, without leaving the terminal.

## Key Features

### Multi-threaded Performance
Written in 100% Rust, sdtui uses a multi-threaded engine. Background workers handle system queries and log fetching, ensuring the UI remains buttery smooth even when streaming heavy logs from multiple services.

### Live Log Streaming & Smart Tailing
Watch your service journals in real-time. Smart Tailing automatically scrolls to the latest logs but smartly pauses when you want to scroll back and investigate a specific trace.

### Regex Highlighting
Debug faster with built-in regex highlighting. Easily spot errors, warnings, or specific request IDs across thousands of lines of logs by defining custom highlight patterns.

### Dual-View Mode
Seamlessly toggle between **Local User** and **Full System** views with a single keystroke (`Tab`). No more typing `--user` every time.

## Why Rust?

Rust was the natural choice for sdtui. The memory safety guarantees and fearless concurrency allowed me to build a non-blocking log streamer that is both robust and extremely fast. The result is a tool that feels like a native extension of the Linux kernel.

## Getting Started

You can find sdtui on GitHub. It's open-source and easy to install via Cargo.

```bash
cargo install sdtui
```
