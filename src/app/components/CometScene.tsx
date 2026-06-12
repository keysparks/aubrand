import React, { useEffect, useState } from 'react';

const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1696236537686-214907dfcd9a?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1581065124660-6fb43ed9e329?w=200&h=200&fit=crop&crop=face',
];

interface CometPerson {
  id: number;
  img: string;
  size: number;
  angle: number;
  startDist: number;
  endDist: number;
  duration: number;
  delay: number;
  tier: 'red' | 'blue' | 'white';
}

const COMETS: CometPerson[] = [
  { id: 1, img: AVATAR_URLS[0], size: 56, angle: 225, startDist: 115, endDist: 45, duration: 5.0, delay: 0,   tier: 'red'   },
  { id: 2, img: AVATAR_URLS[1], size: 38, angle: 320, startDist: 120, endDist: 50, duration: 5.6, delay: 0.8, tier: 'blue'  },
  { id: 3, img: AVATAR_URLS[2], size: 50, angle: 55,  startDist: 112, endDist: 44, duration: 5.2, delay: 1.4, tier: 'red'   },
  { id: 4, img: AVATAR_URLS[3], size: 34, angle: 148, startDist: 122, endDist: 52, duration: 5.8, delay: 0.4, tier: 'white' },
  { id: 5, img: AVATAR_URLS[4], size: 44, angle: 8,   startDist: 116, endDist: 48, duration: 5.4, delay: 2.0, tier: 'red'   },
  { id: 6, img: AVATAR_URLS[5], size: 42, angle: 188, startDist: 118, endDist: 55, duration: 6.0, delay: 1.0, tier: 'blue'  },
  { id: 7, img: AVATAR_URLS[6], size: 32, angle: 278, startDist: 114, endDist: 50, duration: 5.0, delay: 2.4, tier: 'white' },
];

function tierColor(t: 'red' | 'blue' | 'white') {
  if (t === 'red')  return '#E8364E';
  if (t === 'blue') return '#99CCFF';
  return 'rgba(255,255,255,0.95)';
}
function tierGlow(t: 'red' | 'blue' | 'white') {
  if (t === 'red')  return 'rgba(232,54,78,0.9)';
  if (t === 'blue') return 'rgba(153,204,255,0.85)';
  return 'rgba(255,255,255,0.7)';
}
function tierGlowSoft(t: 'red' | 'blue' | 'white') {
  if (t === 'red')  return 'rgba(232,54,78,0.5)';
  if (t === 'blue') return 'rgba(153,204,255,0.45)';
  return 'rgba(255,255,255,0.35)';
}

function degToRad(d: number) { return (d * Math.PI) / 180; }

const STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: Math.random() * 100, y: Math.random() * 100,
  s: Math.random() * 1.8 + 0.4,
  o: Math.random() * 0.4 + 0.08,
  dur: 2.5 + Math.random() * 3.5,
  dd: Math.random() * 6,
}));

const DUST = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 15 + Math.random() * 70, y: 15 + Math.random() * 70,
  s: Math.random() * 2 + 0.8,
  dur: 8 + Math.random() * 10, delay: Math.random() * 5,
  dx: (Math.random() - 0.5) * 30, dy: (Math.random() - 0.5) * 25,
  col: i % 3 === 0 ? 'rgba(232,54,78,0.25)' : i % 3 === 1 ? 'rgba(153,204,255,0.18)' : 'rgba(255,255,255,0.12)',
}));

export function CometScene() {
  const [containerSize, setContainerSize] = useState(1100);

  useEffect(() => {
    const update = () => {
      setContainerSize(Math.max(window.innerWidth, window.innerHeight) * 1.15);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const center = containerSize / 2;
  const [hoveredComet, setHoveredComet] = useState<number | null>(null);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '50%', left: '50%',
        width: containerSize, height: containerSize,
        transform: 'translate(-50%, -50%)',
        overflow: 'visible',
        zIndex: 5,
      }}
    >
      {/* Nebula glow overlays */}
      <div className="absolute" style={{
        top: '40%', left: '50%', width: 500, height: 500,
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(232,54,78,0.05) 0%, rgba(232,54,78,0.01) 45%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      <div className="absolute" style={{
        top: '28%', left: '30%', width: 200, height: 200,
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(153,204,255,0.04) 0%, transparent 70%)',
        filter: 'blur(30px)',
        animation: 'cs-nebula 12s ease-in-out infinite alternate',
      }} />
      <div className="absolute" style={{
        top: '60%', left: '72%', width: 160, height: 160,
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(153,204,255,0.03) 0%, transparent 70%)',
        filter: 'blur(24px)',
        animation: 'cs-nebula 10s ease-in-out infinite alternate-reverse',
      }} />

      {/* Orbit guide rings */}
      <svg className="absolute pointer-events-none" style={{
        top: 0, left: 0, width: containerSize, height: containerSize, opacity: 0.035,
      }}>
        <circle cx={center} cy={center} r={center * 0.42} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 14" />
        <circle cx={center} cy={center} r={center * 0.65} fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="3 18" />
      </svg>

      {/* Floating dust */}
      {DUST.map(p => (
        <div key={`d${p.id}`} className="absolute rounded-full pointer-events-none" style={{
          left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
          background: p.col, boxShadow: `0 0 ${p.s * 2.5}px ${p.col}`,
          animation: `cs-dust-${p.id} ${p.dur}s ease-in-out infinite ${p.delay}s`, opacity: 0,
        }} />
      ))}
      <style>{DUST.map(p => `
        @keyframes cs-dust-${p.id} {
          0%,100%{opacity:0;transform:translate(0,0) scale(.4)}
          25%{opacity:.5}
          50%{opacity:.35;transform:translate(${p.dx}px,${p.dy}px) scale(1)}
          80%{opacity:.1}
        }`).join('')}
      </style>

      {/* Ambient passing comets */}
      {[
        { id: 0, x1: -8,  y1: 18, x2: 108, y2: 42,  len: 60, head: 3,   dur: 5,   dl: 2,  col: 'rgba(255,255,255,0.45)',  tail: 'rgba(255,255,255,0.05)' },
        { id: 1, x1: 110, y1: 55, x2: -10, y2: 35,  len: 42, head: 2,   dur: 5.5, dl: 9,  col: 'rgba(232,54,78,0.35)',    tail: 'rgba(232,54,78,0.045)' },
        { id: 2, x1: 25,  y1: -5, x2: 80,  y2: 105, len: 50, head: 2.5, dur: 6.5, dl: 16, col: 'rgba(153,204,255,0.3)',   tail: 'rgba(153,204,255,0.035)' },
      ].map(c => {
        const angle = Math.atan2(c.y2 - c.y1, c.x2 - c.x1) * (180 / Math.PI);
        return (
          <div key={`ac-${c.id}`} className="absolute pointer-events-none" style={{
            left: 0, top: 0, width: '100%', height: '100%', zIndex: 5,
          }}>
            <div style={{
              position: 'absolute',
              left: `${c.x1}%`, top: `${c.y1}%`,
              width: c.len, height: c.head,
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%',
              animation: `cs-pass-${c.id} ${c.dur}s ease-in-out infinite ${c.dl}s`,
              opacity: 0,
            }}>
              <div style={{
                position: 'absolute', right: c.head, top: '50%',
                width: c.len - c.head, height: 1, transform: 'translateY(-50%)',
                background: `linear-gradient(90deg, transparent 0%, ${c.tail} 30%, ${c.col} 100%)`,
                borderRadius: 1,
              }} />
              <div style={{
                position: 'absolute', right: 0, top: '50%',
                width: c.head, height: c.head, transform: 'translateY(-50%)',
                borderRadius: '50%', background: c.col,
                boxShadow: `0 0 ${c.head * 3}px ${c.col}, 0 0 ${c.head * 5}px ${c.tail}`,
              }} />
            </div>
          </div>
        );
      })}

      {/* Comet avatars */}
      {COMETS.map(c => {
        const rad = degToRad(c.angle);
        const startX = center + Math.cos(rad) * (c.startDist / 100) * center;
        const startY = center + Math.sin(rad) * (c.startDist / 100) * center;
        const endX   = center + Math.cos(rad) * (c.endDist   / 100) * center;
        const endY   = center + Math.sin(rad) * (c.endDist   / 100) * center;
        const anim    = `cs-comet-${c.id}`;
        const color   = tierColor(c.tier);
        const glow    = tierGlow(c.tier);
        const glowSoft = tierGlowSoft(c.tier);
        const isHovered = hoveredComet === c.id;
        const tailLength = c.size * 3.5;
        const tailWidth  = c.size * 0.85;

        return (
          <div key={c.id} style={{ pointerEvents: 'auto' }}>
            <style>{`
              @keyframes ${anim} {
                0%   { left:${startX}px; top:${startY}px; opacity:1; }
                12%  { opacity:1; }
                50%  { left:${endX}px; top:${endY}px; opacity:1; }
                65%  { left:${endX}px; top:${endY}px; opacity:1; }
                80%  { left:${endX}px; top:${endY}px; opacity:0.95; }
                95%  { left:${startX}px; top:${startY}px; opacity:0.85; }
                100% { left:${startX}px; top:${startY}px; opacity:1; }
              }
              @keyframes cs-wobble-${c.id} {
                0%,100% { transform: translate(-50%,-50%) rotate(0deg) scale(${isHovered ? 1.12 : 1}); }
                25% { transform: translate(-50%,-50%) rotate(${isHovered ? 3 : 1}deg) scale(${isHovered ? 1.12 : 1}); }
                75% { transform: translate(-50%,-50%) rotate(${isHovered ? -3 : -1}deg) scale(${isHovered ? 1.12 : 1}); }
              }
            `}</style>
            <div
              className="absolute cursor-pointer"
              onMouseEnter={() => setHoveredComet(c.id)}
              onMouseLeave={() => setHoveredComet(null)}
              style={{
                left: startX, top: startY,
                width: c.size + 2, height: c.size + 2,
                zIndex: isHovered ? 15 : 10,
                animation: `${anim} ${isHovered ? c.duration * 0.85 : c.duration}s cubic-bezier(.25,.46,.45,.94) infinite ${c.delay}s`,
                willChange: 'left, top, opacity, transform',
              }}
            >
              {/* Comet tail */}
              <div className="absolute pointer-events-none" style={{
                left: '50%', top: '50%',
                width: tailLength + c.size, height: tailWidth + c.size,
                transformOrigin: `${c.size / 2}px ${(tailWidth + c.size) / 2}px`,
                transform: `translate(-${c.size / 2}px, -${(tailWidth + c.size) / 2}px) rotate(${c.angle}deg)`,
                zIndex: 0,
              }}>
                <svg width={tailLength + c.size} height={tailWidth + c.size}
                  viewBox={`0 0 ${tailLength + c.size} ${tailWidth + c.size}`}
                  style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id={`tail-grad-${c.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor={color} stopOpacity="0.92" />
                      <stop offset="35%"  stopColor={color} stopOpacity="0.62" />
                      <stop offset="70%"  stopColor={color} stopOpacity="0.28" />
                      <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={`tail-inner-${c.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor={color} stopOpacity="0.75" />
                      <stop offset="50%"  stopColor={color} stopOpacity="0.38" />
                      <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M ${c.size/2} ${(tailWidth+c.size)/2 - tailWidth*0.4}
                        L ${c.size/2} ${(tailWidth+c.size)/2 + tailWidth*0.4}
                        L ${tailLength+c.size/2} ${(tailWidth+c.size)/2+1}
                        L ${tailLength+c.size/2} ${(tailWidth+c.size)/2-1} Z`}
                    fill={`url(#tail-grad-${c.id})`}
                  />
                  <path
                    d={`M ${c.size/2} ${(tailWidth+c.size)/2 - tailWidth*0.18}
                        L ${c.size/2} ${(tailWidth+c.size)/2 + tailWidth*0.18}
                        L ${tailLength*0.7+c.size/2} ${(tailWidth+c.size)/2+0.5}
                        L ${tailLength*0.7+c.size/2} ${(tailWidth+c.size)/2-0.5} Z`}
                    fill={`url(#tail-inner-${c.id})`}
                  />
                </svg>
              </div>

              {/* Glow halo behind avatar */}
              <div className="absolute rounded-full pointer-events-none" style={{
                left: '50%', top: '50%',
                width: c.size + (isHovered ? 24 : 16), height: c.size + (isHovered ? 24 : 16),
                transform: 'translate(-50%,-50%)',
                background: `radial-gradient(circle, ${glow} 0%, ${glowSoft} 40%, transparent 75%)`,
                filter: 'blur(10px)',
                zIndex: 1, opacity: isHovered ? 1.0 : 0.88,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }} />

              {/* Avatar circle */}
              <div className="absolute rounded-full overflow-hidden" style={{
                left: '50%', top: '50%',
                width: c.size, height: c.size,
                transform: 'translate(-50%,-50%)',
                border: `2.5px solid ${color}`,
                boxShadow: isHovered
                  ? `0 0 22px ${glow}, 0 0 40px ${glowSoft}, inset 0 0 8px ${glowSoft}`
                  : `0 0 18px ${glow}, 0 0 30px ${glowSoft}, inset 0 0 6px ${glowSoft}`,
                zIndex: 2,
                animation: `cs-wobble-${c.id} ${isHovered ? 2.5 : 4}s ease-in-out infinite`,
                transition: 'box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}>
                <img
                  src={c.img} alt=""
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: 'center 15%',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                />
              </div>

              {/* Ripple on hover */}
              {isHovered && (
                <div className="absolute rounded-full pointer-events-none" style={{
                  left: '50%', top: '50%',
                  width: c.size, height: c.size,
                  transform: 'translate(-50%,-50%)',
                  border: `1.5px solid ${color}`,
                  zIndex: 1,
                  animation: 'cs-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                }} />
              )}

              {/* Online dot */}
              <div className="absolute rounded-full" style={{
                left: `calc(50% + ${c.size * 0.35}px)`,
                top:  `calc(50% - ${c.size * 0.35}px)`,
                width: isHovered ? 11 : 9, height: isHovered ? 11 : 9,
                background: '#22C55E', border: '2px solid #070a19', zIndex: 3,
                boxShadow: isHovered
                  ? '0 0 16px rgba(34,197,94,1), 0 0 28px rgba(34,197,94,0.7)'
                  : '0 0 10px rgba(34,197,94,0.9), 0 0 18px rgba(34,197,94,0.5)',
                transition: 'all 0.3s ease',
              }} />
            </div>
          </div>
        );
      })}

      {/* Shooting stars */}
      {[
        { t: '10%', l: '16%', w: 50, r: -35, d: 3.5, dl: 1,  col: 'rgba(255,255,255,0.28)' },
        { t: '22%', l: '82%', w: 32, r: -25, d: 4.5, dl: 4,  col: 'rgba(232,54,78,0.18)' },
        { t: '70%', l: '60%', w: 28, r: -42, d: 4,   dl: 7,  col: 'rgba(153,204,255,0.18)' },
      ].map((s, i) => (
        <div key={`sh${i}`} className="absolute" style={{
          top: s.t, left: s.l, width: s.w, height: 1,
          background: `linear-gradient(90deg, ${s.col} 0%, transparent 100%)`,
          transform: `rotate(${s.r}deg)`,
          animation: `cs-shoot ${s.d}s ease-in infinite ${s.dl}s`, opacity: 0,
        }} />
      ))}

      {/* ─── Radar sweep — "scanning for nearby people" ─── */}
      <div className="absolute pointer-events-none rounded-full" style={{
        top: '50%', left: '50%',
        width: center * 1.3, height: center * 1.3,
        transform: 'translate(-50%, -50%)',
        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(232,54,78,0.22) 12deg, rgba(232,54,78,0.08) 20deg, transparent 28deg, transparent 360deg)',
        animation: 'cs-radar 9s linear infinite',
        zIndex: 3,
      }} />

      {/* ─── Galaxy spiral arms ─── */}
      <div className="absolute pointer-events-none rounded-full" style={{
        top: '50%', left: '50%',
        width: center * 1.08, height: center * 1.08,
        transform: 'translate(-50%, -50%)',
        background: 'conic-gradient(from 60deg, transparent 0%, rgba(153,204,255,0.016) 10%, transparent 26%, rgba(232,54,78,0.01) 56%, transparent 66%, transparent 100%)',
        filter: 'blur(22px)',
        animation: 'cs-galaxy 60s linear infinite',
        zIndex: 2,
      }} />

      {/* ─── Signal lines — packets traveling from avatars toward center ─── */}
      <svg className="absolute pointer-events-none" style={{ top: 0, left: 0, width: containerSize, height: containerSize, zIndex: 4, overflow: 'visible' }}>
        {COMETS.filter(c => c.tier === 'red').map((c, i) => {
          const rad = degToRad(c.angle);
          const ex = center + Math.cos(rad) * (c.endDist / 100) * center;
          const ey = center + Math.sin(rad) * (c.endDist / 100) * center;
          return (
            <line key={c.id}
              x1={ex} y1={ey} x2={center} y2={center}
              stroke="rgba(232,54,78,0.2)"
              strokeWidth="0.6"
              strokeDasharray="4 340"
              style={{ animation: `cs-signal ${4.2 + i * 1.1}s linear infinite ${i * 2}s` }}
            />
          );
        })}
      </svg>

      {/* All keyframes */}
      <style>{`
        @keyframes cs-twinkle {
          0%,100% { opacity:.3; transform:scale(1) }
          50%      { opacity:1;  transform:scale(1.25) }
        }
        @keyframes cs-nebula {
          0%   { transform:translate(-50%,-50%) scale(1) }
          100% { transform:translate(-45%,-55%) scale(1.1) }
        }
        @keyframes cs-shoot {
          0%   { opacity:0;  transform:rotate(var(--r,-35deg)) translateX(0) }
          8%   { opacity:.6 }
          35%  { opacity:0;  transform:rotate(var(--r,-35deg)) translateX(60px) }
          100% { opacity:0 }
        }
        @keyframes cs-pass-0 {
          0%  { left:-8%;  top:18%; opacity:0 }  5%  { opacity:.7 }
          55% { opacity:.5 } 85% { opacity:.15 } 100% { left:108%; top:42%; opacity:0 }
        }
        @keyframes cs-pass-1 {
          0%  { left:110%; top:55%; opacity:0 } 5%  { opacity:.7 }
          55% { opacity:.5 } 85% { opacity:.15 } 100% { left:-10%; top:35%; opacity:0 }
        }
        @keyframes cs-pass-2 {
          0%  { left:25%;  top:-5%; opacity:0 } 5%  { opacity:.7 }
          55% { opacity:.5 } 85% { opacity:.15 } 100% { left:80%; top:105%; opacity:0 }
        }
        @keyframes cs-ripple {
          0%   { transform:translate(-50%,-50%) scale(1);   opacity:.5 }
          50%  { transform:translate(-50%,-50%) scale(1.1); opacity:.8 }
          100% { transform:translate(-50%,-50%) scale(1.2); opacity:0 }
        }
        @keyframes cs-radar {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes cs-galaxy {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes cs-signal {
          from { stroke-dashoffset:-340; }
          to   { stroke-dashoffset:0; }
        }
      `}</style>
    </div>
  );
}
