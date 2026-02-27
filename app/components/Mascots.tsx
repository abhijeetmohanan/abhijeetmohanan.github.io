'use client';

import React from 'react';

// Simple SVGs for mascots (inline for simplicity)
const GoGopher = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="#00ADD8">
    <ellipse cx="50" cy="55" rx="30" ry="35" />
    <ellipse cx="50" cy="70" rx="20" ry="20" />
    <circle cx="35" cy="40" r="12" fill="white" />
    <circle cx="65" cy="40" r="12" fill="white" />
    <circle cx="37" cy="40" r="6" fill="black" />
    <circle cx="63" cy="40" r="6" fill="black" />
    <ellipse cx="50" cy="52" rx="8" ry="5" fill="#0077B5" />
    <path d="M45 55 Q50 62 55 55" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

const RustCrab = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FF9955">
    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z" />
    <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 5c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.21-1.79-4-4-4z" />
  </svg>
);

const PythonSnake = () => (
  <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#FFD43B">
    <path d="M32 2c-5.33 0-10 4.67-10 10v4c0 5.33-4.67 10-10 10s-10-4.67-10-10V12c0-5.33-4.67-10-10-10v40c5.33 0 10-4.67 10-10v-4c0-5.33 4.67-10 10-10s10 4.67 10 10v4c0 5.33 4.67 10 10 10s10-4.67 10-10v-4c0-5.33 4.67-10 10-10V12c-5.33 0-10 4.67-10 10v4c0 5.33-4.67 10-10 10s-10-4.67-10-10v-4c0-5.33-4.67-10-10-10z" />
  </svg>
);

export default function Mascots() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Position mascots around the center name */}
      <div className="absolute" style={{ top: '10%', left: '20%' }}>
        <GoGopher className="animate-bounce" />
      </div>
      <div className="absolute" style={{ top: '30%', right: '15%' }}>
        <RustCrab className="animate-bounce" />
      </div>
      <div className="absolute" style={{ bottom: '15%', left: '30%' }}>
        <PythonSnake className="animate-bounce" />
      </div>
    </div>
  );
}
