"use client";

// app/components/CornerStickmen.tsx
// Place <CornerStickmen /> anywhere in your layout — ideally in the root layout or page wrapper.
// It renders fixed-position stickmen in all 4 corners of the viewport.

import { useEffect, useState } from "react";

const styles = `
  .sk   { fill: none; stroke: rgba(255,255,255,0.55); stroke-linecap: round; stroke-linejoin: round; }
  .sk-f { fill: rgba(255,255,255,0.55); stroke: none; }
  .sk-d { fill: #0a0a0a; stroke: none; }
  .t { stroke-width: 1.2; }
  .m { stroke-width: 1.8; }
  .k { stroke-width: 2.4; }

  /* ── TYPING ── */
  #cs-type { animation: cs-bob 0.4s ease-in-out infinite alternate; transform-origin: 50px 40px; }
  @keyframes cs-bob { from{transform:translateY(0)} to{transform:translateY(-3px)} }
  .cs-ta { animation: cs-ta 0.4s ease-in-out infinite alternate; transform-origin: 38px 55px; }
  .cs-tb { animation: cs-tb 0.4s ease-in-out infinite alternate; transform-origin: 62px 55px; }
  @keyframes cs-ta { from{transform:rotate(0deg)} to{transform:rotate(-18deg)} }
  @keyframes cs-tb { from{transform:rotate(0deg)} to{transform:rotate(18deg)} }
  .cs-cur { animation: cs-cur 0.65s step-end infinite; }
  @keyframes cs-cur { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── SLEEPING ── */
  .cs-zzz1{animation:cs-zf 2.2s ease-in-out infinite;}
  .cs-zzz2{animation:cs-zf 2.2s ease-in-out 0.6s infinite;}
  .cs-zzz3{animation:cs-zf 2.2s ease-in-out 1.2s infinite;}
  @keyframes cs-zf{0%{opacity:0;transform:translate(0,0) scale(.6)}30%{opacity:1}100%{opacity:0;transform:translate(10px,-20px) scale(1.3)}}
  .cs-chest{animation:cs-rise 2s ease-in-out infinite; transform-origin:50px 62px;}
  @keyframes cs-rise{0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.07)}}

  /* ── COFFEE ── */
  .cs-sip{animation:cs-sip 2.2s ease-in-out infinite; transform-origin:44px 52px;}
  @keyframes cs-sip{0%,100%{transform:rotate(0deg)} 35%,65%{transform:rotate(-28deg)}}
  .cs-st1{animation:cs-stm 1.8s ease-in-out infinite;}
  .cs-st2{animation:cs-stm 1.8s ease-in-out .4s infinite;}
  .cs-st3{animation:cs-stm 1.8s ease-in-out .8s infinite;}
  @keyframes cs-stm{0%{opacity:0;transform:translateY(0)}30%{opacity:.9}100%{opacity:0;transform:translateY(-16px)}}
  .cs-hl{animation:cs-hbl 3s ease-in-out infinite; transform-origin:41px 26px;}
  .cs-hr{animation:cs-hbl 3s ease-in-out .1s infinite; transform-origin:59px 26px;}
  @keyframes cs-hbl{0%,85%,100%{transform:scaleY(1)} 92%{transform:scaleY(0.1)}}

  /* ── BOULDER ── */
  #cs-push{animation:cs-lean .6s ease-in-out infinite alternate; transform-origin:40px 55px;}
  @keyframes cs-lean{from{transform:rotate(10deg)} to{transform:rotate(16deg)}}
  .cs-boulder{animation:cs-broll .6s ease-in-out infinite alternate; transform-origin:72px 80px;}
  @keyframes cs-broll{from{transform:rotate(-4deg) translateX(0)} to{transform:rotate(4deg) translateX(2px)}}
  .cs-parm{animation:cs-parm .6s ease-in-out infinite alternate; transform-origin:46px 50px;}
  @keyframes cs-parm{from{transform:rotate(-4deg)} to{transform:rotate(4deg)}}
  .cs-ef1{animation:cs-ef .6s ease-in-out infinite alternate;}
  .cs-ef2{animation:cs-ef .6s ease-in-out .15s infinite alternate;}
  @keyframes cs-ef{from{opacity:.2;transform:scale(.8)} to{opacity:.8;transform:scale(1.1)}}
`;

// ── SVG scenes ──────────────────────────────────────────────

const Typing = () => (
  <svg width="100" height="110" viewBox="0 0 100 110">
    {/* monitor */}
    <rect className="sk t" x="18" y="2" width="64" height="38" rx="3"/>
    <line className="sk t" x1="44" y1="40" x2="44" y2="46"/>
    <line className="sk t" x1="56" y1="40" x2="56" y2="46"/>
    <line className="sk t" x1="30" y1="46" x2="70" y2="46"/>
    <line className="sk t" x1="26" y1="12" x2="56" y2="12"/>
    <line className="sk t" x1="26" y1="18" x2="68" y2="18"/>
    <line className="sk t" x1="26" y1="24" x2="52" y2="24"/>
    <rect className="sk-f cs-cur" x="53" y="21" width="1.5" height="6"/>
    {/* keyboard */}
    <rect className="sk t" x="10" y="78" width="80" height="20" rx="3"/>
    <rect className="sk t" x="14" y="82" width="8" height="5" rx="1"/>
    <rect className="sk t" x="25" y="82" width="8" height="5" rx="1"/>
    <rect className="sk t" x="36" y="82" width="8" height="5" rx="1"/>
    <rect className="sk t" x="47" y="82" width="8" height="5" rx="1"/>
    <rect className="sk t" x="58" y="82" width="8" height="5" rx="1"/>
    <rect className="sk t" x="69" y="82" width="8" height="5" rx="1"/>
    <rect className="sk t" x="26" y="90" width="48" height="5" rx="1"/>
    <g id="cs-type">
      <circle className="sk k" cx="50" cy="54" r="9"/>
      <line className="sk k" x1="50" y1="63" x2="50" y2="70"/>
      <line className="sk k" x1="50" y1="70" x2="50" y2="82"/>
      <line className="sk m cs-ta" x1="50" y1="73" x2="32" y2="80"/>
      <line className="sk m cs-tb" x1="50" y1="73" x2="68" y2="80"/>
      <line className="sk k" x1="50" y1="82" x2="40" y2="95"/>
      <line className="sk k" x1="50" y1="82" x2="60" y2="95"/>
    </g>
  </svg>
);

const Sleeping = () => (
  <svg width="110" height="100" viewBox="0 0 110 100">
    <line className="sk t" x1="5" y1="88" x2="105" y2="88"/>
    <ellipse className="sk t" cx="22" cy="84" rx="16" ry="6"/>
    <circle className="sk k" cx="22" cy="74" r="9"/>
    <path className="sk t" d="M17 73 Q19.5 71 22 73"/>
    <path className="sk t" d="M22 73 Q24.5 71 27 73"/>
    <line className="sk k cs-chest" x1="31" y1="78" x2="72" y2="78"/>
    <line className="sk m" x1="45" y1="74" x2="52" y2="82"/>
    <line className="sk m" x1="60" y1="74" x2="55" y2="82"/>
    <line className="sk k" x1="72" y1="78" x2="88" y2="75"/>
    <line className="sk k" x1="88" y1="75" x2="102" y2="80"/>
    <line className="sk k" x1="72" y1="78" x2="86" y2="83"/>
    <line className="sk k" x1="86" y1="83" x2="100" y2="86"/>
    <text className="cs-zzz1 sk-f" x="36" y="64" fontSize="9" fill="rgba(255,255,255,0.55)" fontFamily="monospace" fontWeight="bold">z</text>
    <text className="cs-zzz2 sk-f" x="46" y="52" fontSize="12" fill="rgba(255,255,255,0.55)" fontFamily="monospace" fontWeight="bold">z</text>
    <text className="cs-zzz3 sk-f" x="58" y="38" fontSize="16" fill="rgba(255,255,255,0.55)" fontFamily="monospace" fontWeight="bold">Z</text>
  </svg>
);

const Coffee = () => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <circle className="sk k" cx="50" cy="28" r="9"/>
    <path className="sk m cs-hl" d="M43 26 Q46.5 23 50 26"/>
    <path className="sk m cs-hr" d="M50 26 Q53.5 23 57 26"/>
    <path className="sk t" d="M45 32 Q50 37 55 32"/>
    <line className="sk k" x1="50" y1="37" x2="50" y2="44"/>
    <line className="sk k" x1="50" y1="44" x2="50" y2="68"/>
    <line className="sk m" x1="50" y1="50" x2="66" y2="62"/>
    <line className="sk m cs-sip" x1="50" y1="50" x2="34" y2="62"/>
    <circle className="sk t" cx="33" cy="63" r="2.5"/>
    <rect className="sk m" x="14" y="60" width="20" height="22" rx="2"/>
    <path className="sk m" d="M34 65 Q42 65 42 71 Q42 77 34 77"/>
    <path className="sk t cs-st1" d="M19 58 Q21 52 19 46"/>
    <path className="sk t cs-st2" d="M24 58 Q26 51 24 45"/>
    <path className="sk t cs-st3" d="M29 58 Q31 52 29 46"/>
    <line className="sk k" x1="50" y1="68" x2="40" y2="86"/>
    <line className="sk k" x1="50" y1="68" x2="60" y2="86"/>
    <line className="sk k" x1="40" y1="86" x2="30" y2="90"/>
    <line className="sk k" x1="60" y1="86" x2="70" y2="90"/>
  </svg>
);

const Boulder = () => (
  <svg width="120" height="110" viewBox="0 0 110 110">
    <line className="sk t" x1="5" y1="98" x2="105" y2="98"/>
    {/* effort lines */}
    <line className="sk t cs-ef1" x1="28" y1="32" x2="18" y2="24"/>
    <line className="sk t cs-ef2" x1="24" y1="38" x2="12" y2="34"/>
    <line className="sk t cs-ef1" x1="26" y1="28" x2="20" y2="18"/>
    <g id="cs-push">
      <circle className="sk k" cx="30" cy="40" r="9"/>
      <path className="sk m" d="M23 37 L27 41 M27 37 L23 41"/>
      <path className="sk m" d="M33 37 L37 41 M37 37 L33 41"/>
      <path className="sk t" d="M24 46 Q30 50 36 46"/>
      <line className="sk t" x1="27" y1="46" x2="27" y2="49"/>
      <line className="sk t" x1="30" y1="47" x2="30" y2="50"/>
      <line className="sk t" x1="33" y1="46" x2="33" y2="49"/>
      <line className="sk k" x1="30" y1="49" x2="34" y2="56"/>
      <line className="sk k" x1="34" y1="56" x2="42" y2="78"/>
      <line className="sk m cs-parm" x1="38" y1="62" x2="58" y2="54"/>
      <line className="sk m cs-parm" x1="40" y1="68" x2="60" y2="62"/>
      <circle className="sk t" cx="59" cy="54" r="2.5"/>
      <circle className="sk t" cx="61" cy="62" r="2.5"/>
      <line className="sk k" x1="42" y1="78" x2="28" y2="94"/>
      <line className="sk k" x1="42" y1="78" x2="52" y2="94"/>
      <line className="sk k" x1="28" y1="94" x2="18" y2="98"/>
      <line className="sk k" x1="52" y1="94" x2="62" y2="98"/>
    </g>
    <g className="cs-boulder">
      <circle className="sk k" cx="72" cy="78" r="20"/>
      <path className="sk t" d="M62 68 Q68 72 65 78"/>
      <path className="sk t" d="M74 60 Q78 66 74 72"/>
      <path className="sk t" d="M80 74 Q76 80 82 84"/>
    </g>
  </svg>
);

// ── Corner wrapper ───────────────────────────────────────────

type Corner = {
  id: string;
  label: string;
  scene: React.ReactNode;
  position: React.CSSProperties;
  flip?: boolean;
};

export default function CornerStickmen() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const corners: Corner[] = [
    {
      id: "top-left",
      label: "coding away",
      scene: <Typing />,
      position: { top: "1rem", left: "1rem" },
    },
    {
      id: "top-right",
      label: "napping hard",
      scene: <Sleeping />,
      position: { top: "1rem", right: "1rem" },
      flip: true,
    },
    {
      id: "bottom-left",
      label: "coffee mode",
      scene: <Coffee />,
      position: { bottom: "1rem", left: "1rem" },
    },
    {
      id: "bottom-right",
      label: "fixing a bug",
      scene: <Boulder />,
      position: { bottom: "1rem", right: "1rem" },
      flip: true,
    },
  ];

  return (
    <>
      <style>{styles}</style>
      {corners.map((c) => (
        <div
          key={c.id}
          style={{
            position: "fixed",
            ...c.position,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            opacity: 0.7,
            pointerEvents: "none",
            zIndex: 0,
            transform: c.flip ? "scaleX(-1)" : undefined,
          }}
        >
          {c.scene}
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "0.55rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              transform: c.flip ? "scaleX(-1)" : undefined,
            }}
          >
            {c.label}
          </span>
        </div>
      ))}
    </>
  );
}
