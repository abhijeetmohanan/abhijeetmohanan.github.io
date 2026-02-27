import React, { useEffect, useRef } from 'react';
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
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootLog.length) {
          const p = document.createElement('p');
          p.textContent = bootLog[i];
          bootLogRef.current?.appendChild(p);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setMode('deploying');
          }, 1000);
        }
      }, 200);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <div ref={bootLogRef} className="text-left w-full max-w-2xl overflow-hidden">
        {/* Boot log lines will be appended here */}
      </div>
    </div>
  );
};

export default Boot;
