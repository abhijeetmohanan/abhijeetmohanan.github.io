'use client';

import { useRef, useEffect } from 'react';

interface VideoHeroProps {
  videoUrl?: string;
}

export default function VideoHero({ videoUrl }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  if (!videoUrl) return null;

  return (
    <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden rounded-lg border border-accent/20">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
}
