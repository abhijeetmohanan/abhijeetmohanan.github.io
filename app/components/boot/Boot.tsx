import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store';

const bootLog = [
  "Initializing system...",
  "Loading kernel modules...",
  "Mounting filesystems...",
  "Starting network services...",
  "Configuring devices...",
  "Running system checks...",
  "System Ready."
];

const Boot: React.FC = () => {
  const bootLogRef = useRef<HTMLDivElement>(null);
  const setMode = useAppStore((state) => state.setMode);

  useEffect(() => {
    if (bootLogRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(bootLogRef.current!.querySelector('.deploy-button'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            delay: 0.5,
          });
        },
      });

      bootLog.forEach((line, index) => {
        if (line === "System Ready.") {
          tl.to(bootLogRef.current, {
            duration: 0.5,
            onStart: () => {
              const readyLine = document.createElement('p');
              readyLine.textContent = line;
              bootLogRef.current?.appendChild(readyLine);
            }
          });
        } else {
          tl.to({}, { // Placeholder for sequencing
            duration: 0.1, // Small delay between lines
            onComplete: () => {
              const p = document.createElement('p');
              p.textContent = line;
              p.style.opacity = '0';
              bootLogRef.current?.appendChild(p);
              gsap.to(p, { opacity: 1, duration: 0.3 });
            }
          });
        }
      });

      return () => {
        tl.kill();
      };
    }
  }, []);

  const handleDeploy = () => {
    setMode('deploying');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <div ref={bootLogRef} className="text-left w-full max-w-2xl overflow-hidden">
        {/* Boot log lines will be appended here by GSAP */}
      </div>
      <button
        onClick={handleDeploy}
        className="deploy-button mt-8 px-6 py-3 bg-accent text-background rounded-md text-lg font-bold opacity-0 translate-y-4 hover:bg-opacity-80 transition-colors duration-300"
      >
        🚀 Deploy Abhijeet
      </button>
    </div>
  );
};

export default Boot;
