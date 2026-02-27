"use client";

// app/components/MascotBuddies.tsx
// Drop this file in your components folder and add <MascotBuddies /> to your hero section.

import { useEffect, useState } from "react";

type Mascot = {
  id: string;
  label: string;
  color: string;
  tooltip: string;
  svgContent: React.ReactNode;
  positionClass: string;
  animationDelay: string;
};

const FerrisSVG = () => (
  // Ferris – Rust's crab
  <svg width="72" height="62" viewBox="0 0 70 60" fill="none">
    <ellipse cx="35" cy="35" rx="22" ry="16" fill="#ce4a2e" />
    <circle cx="27" cy="26" r="5" fill="#ce4a2e" />
    <circle cx="43" cy="26" r="5" fill="#ce4a2e" />
    <circle cx="27" cy="25" r="2.5" fill="#fff" />
    <circle cx="43" cy="25" r="2.5" fill="#fff" />
    <circle cx="27.8" cy="24.8" r="1.2" fill="#1a0a00" />
    <circle cx="43.8" cy="24.8" r="1.2" fill="#1a0a00" />
    <path d="M29 38 Q35 43 41 38" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M13 30 Q5 22 8 15" stroke="#ce4a2e" strokeWidth="5" strokeLinecap="round" fill="none" />
    <ellipse cx="8" cy="13" rx="5" ry="4" fill="#ce4a2e" transform="rotate(-20 8 13)" />
    <path d="M57 30 Q65 22 62 15" stroke="#ce4a2e" strokeWidth="5" strokeLinecap="round" fill="none" />
    <ellipse cx="62" cy="13" rx="5" ry="4" fill="#ce4a2e" transform="rotate(20 62 13)" />
    <line x1="18" y1="38" x2="10" y2="48" stroke="#ce4a2e" strokeWidth="3" strokeLinecap="round" />
    <line x1="22" y1="42" x2="16" y2="53" stroke="#ce4a2e" strokeWidth="3" strokeLinecap="round" />
    <line x1="52" y1="38" x2="60" y2="48" stroke="#ce4a2e" strokeWidth="3" strokeLinecap="round" />
    <line x1="48" y1="42" x2="54" y2="53" stroke="#ce4a2e" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const GopherSVG = () => (
  // The Gopher – Go's mascot
  <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
    <ellipse cx="30" cy="48" rx="18" ry="20" fill="#00acd7" />
    <ellipse cx="30" cy="24" rx="20" ry="18" fill="#00acd7" />
    <ellipse cx="12" cy="14" rx="6" ry="8" fill="#00acd7" />
    <ellipse cx="12" cy="14" rx="3.5" ry="5" fill="#f9c5c5" />
    <ellipse cx="48" cy="14" rx="6" ry="8" fill="#00acd7" />
    <ellipse cx="48" cy="14" rx="3.5" ry="5" fill="#f9c5c5" />
    <ellipse cx="30" cy="26" rx="14" ry="12" fill="#c2eaf5" />
    <circle cx="24" cy="22" r="4" fill="#fff" />
    <circle cx="36" cy="22" r="4" fill="#fff" />
    <circle cx="24.5" cy="22" r="2" fill="#1a1a2e" />
    <circle cx="36.5" cy="22" r="2" fill="#1a1a2e" />
    <circle cx="25" cy="21.5" r="0.7" fill="#fff" />
    <circle cx="37" cy="21.5" r="0.7" fill="#fff" />
    <ellipse cx="30" cy="28" rx="3.5" ry="2.5" fill="#f9c5c5" />
    <path d="M26 31 Q30 35 34 31" stroke="#555" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <rect x="28" y="31" width="4" height="4" rx="1" fill="#fff" />
    <path d="M12 50 Q5 44 8 38" stroke="#00acd7" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M48 50 Q55 44 52 38" stroke="#00acd7" strokeWidth="6" strokeLinecap="round" fill="none" />
    <ellipse cx="23" cy="67" rx="7" ry="4" fill="#00acd7" />
    <ellipse cx="37" cy="67" rx="7" ry="4" fill="#00acd7" />
  </svg>
);

const PythonSVG = () => (
  // Python snake
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
    <path
      d="M34 60 Q10 50 12 34 Q14 18 30 18 Q44 18 44 10 Q44 2 34 2"
      stroke="#3572a5" strokeWidth="11" strokeLinecap="round" fill="none"
    />
    <path
      d="M34 60 Q10 50 12 34 Q14 18 30 18 Q44 18 44 10 Q44 2 34 2"
      stroke="#ffd43b" strokeWidth="5" strokeLinecap="round" fill="none"
      strokeDasharray="4 14" strokeDashoffset="2"
    />
    <ellipse cx="34" cy="62" rx="10" ry="7" fill="#3572a5" />
    <circle cx="30" cy="61" r="2.5" fill="#fff" />
    <circle cx="38" cy="61" r="2.5" fill="#fff" />
    <circle cx="30.5" cy="61" r="1.2" fill="#1a1a2e" />
    <circle cx="38.5" cy="61" r="1.2" fill="#1a1a2e" />
    <path d="M34 67 L32 70 M34 67 L36 70" stroke="#e05050" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default function MascotBuddies() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const mascots: Mascot[] = [
    {
      id: "ferris",
      label: "Rust",
      color: "#ce4a2e",
      tooltip: "Hey! I'm Ferris 🦀",
      svgContent: <FerrisSVG />,
      // Left side of hero, vertically centred
      positionClass: "absolute -left-20 top-1/2 -translate-y-1/2",
      animationDelay: "0s",
    },
    {
      id: "gopher",
      label: "Go",
      color: "#00acd7",
      tooltip: "Go Go Gopher! 🐹",
      svgContent: <GopherSVG />,
      // Right side of hero, vertically centred
      positionClass: "absolute -right-20 top-1/2 -translate-y-1/2",
      animationDelay: "1.1s",
    },
    {
      id: "python",
      label: "Python",
      color: "#6fb3e0",
      tooltip: "Ssssup! 🐍",
      svgContent: <PythonSVG />,
      // Top-right, above the avatar
      positionClass: "absolute right-2 top-4",
      animationDelay: "0.55s",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-14px) rotate(3deg); }
        }
        .mascot-float {
          animation: mascotFloat 3.5s ease-in-out infinite;
        }
        .mascot-float:hover {
          transform: scale(1.18) !important;
          transition: transform 0.2s;
        }
      `}</style>

      {mascots.map((m) => (
        <div
          key={m.id}
          className={`${m.positionClass} flex flex-col items-center gap-1.5 cursor-pointer group mascot-float`}
          style={{ animationDelay: m.animationDelay }}
        >
          {/* Tooltip */}
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                       text-xs font-mono px-2 py-0.5 rounded-md
                       bg-gray-900 text-white border border-gray-700
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            {m.tooltip}
          </span>

          {m.svgContent}

          {/* Language badge */}
          <span
            className="text-[0.6rem] font-mono font-bold uppercase tracking-widest
                       px-2 py-0.5 rounded-full border"
            style={{ color: m.color, borderColor: m.color, background: `${m.color}22` }}
          >
            {m.label}
          </span>
        </div>
      ))}
    </>
  );
}
