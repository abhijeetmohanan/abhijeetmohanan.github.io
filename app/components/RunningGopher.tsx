'use client';

import { useEffect, useState } from 'react';

export default function RunningGopher() {
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const moveGopher = () => {
      setPosition((prev) => {
        let newX = prev.x + (Math.random() * 2 + 1) * direction;
        let newY = prev.y + (Math.random() * 2 - 1);

        if (newX > 90 || newX < 5) {
          setDirection((d) => -d);
          newX = Math.max(5, Math.min(90, newX));
        }
        if (newY > 85 || newY < 10) {
          newY = Math.max(10, Math.min(85, newY));
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveGopher, 100);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      className="fixed pointer-events-none z-0 transition-all duration-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `scaleX(${direction})`,
      }}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce"
      >
        <ellipse cx="50" cy="55" rx="30" ry="35" fill="#00ADD8" />
        <ellipse cx="50" cy="70" rx="20" ry="20" fill="#00ADD8" />
        <circle cx="35" cy="40" r="12" fill="white" />
        <circle cx="65" cy="40" r="12" fill="white" />
        <circle cx="37" cy="40" r="6" fill="black" />
        <circle cx="63" cy="40" r="6" fill="black" />
        <ellipse cx="50" cy="52" rx="8" ry="5" fill="#0077B5" />
        <path d="M45 55 Q50 62 55 55" stroke="white" strokeWidth="2" fill="none" />
        <ellipse cx="25" cy="35" rx="8" ry="15" fill="#00ADD8" />
        <ellipse cx="75" cy="35" rx="8" ry="15" fill="#00ADD8" />
        <ellipse cx="20" cy="35" rx="5" ry="10" fill="#00ADD8" />
        <ellipse cx="80" cy="35" rx="5" ry="10" fill="#00ADD8" />
        <ellipse cx="35" cy="85" rx="8" ry="5" fill="#00ADD8" />
        <ellipse cx="65" cy="85" rx="8" ry="5" fill="#00ADD8" />
      </svg>
    </div>
  );
}
