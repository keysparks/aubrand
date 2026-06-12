import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import cometIcon from '../../../imports/Asset_2_3x.png';
import whiteCometIcon from '../../../imports/Asset_2_3x-1.png';
import redCometIcon from '../../../imports/donw.png';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { GradientWord } from '../GradientWord';
import { SectionLabel } from '../SectionLabel';
import model1 from '../../../imports/5345.jpg';
import model2 from '../../../imports/25376.jpg';

/* ——— Profile data ——— */
const likeProfiles = [
  {
    name: 'Danina',
    age: 26,
    image: model1,
    venue: 'Skyline Rooftop',
    isRed: true,
  },
  {
    name: 'Mayta',
    age: 20,
    image: model2,
    venue: 'The Ruby Lounge',
    isRed: false,
  },
];

const featureHighlights = [
  'Incoming connection requests',
  'Venue context',
  '24-hour countdown',
  'Connections by both do not expire',
];

/* ——— Capsule Countdown Timer ——— */
function MasterCountdown() {
  const [time, setTime] = useState({ h: 0, m: 14, s: 26 });
  useEffect(() => {
    const iv = setInterval(() => {
      setTime((prev) => {
        let total = prev.h * 3600 + prev.m * 60 + prev.s - 1;
        if (total < 0) total = 23 * 3600 + 59 * 60 + 59;
        return { h: Math.floor(total / 3600), m: Math.floor((total % 3600) / 60), s: total % 60 };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: -18, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-50"
      style={{ top: 0, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
    >
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div
          className="relative overflow-hidden"
          style={{
            padding: '11px 28px',
            borderRadius: 20,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.035) 100%)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 28px 80px rgba(0,0,0,0.58), 0 0 48px rgba(191,44,64,0.16), inset 0 1px 0 rgba(255,255,255,0.12)',
            backdropFilter: 'blur(18px)',
          }}
        >
          {/* top glow line */}
          <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(191,44,64,0.5), transparent)' }} />
          {/* shimmer */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }}
            animate={{ x: ['-120%', '200%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 }}
          />
          <div className="flex items-center gap-2 relative z-10"
            style={{ fontFamily: '"JetBrains Mono","SF Mono","IBM Plex Mono",monospace', fontSize: 36, fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.96)' }}>
            <span>{pad(time.h)}</span>
            <motion.span style={{ color: '#BF2C40' }} animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1, repeat: Infinity }}>:</motion.span>
            <span>{pad(time.m)}</span>
            <motion.span style={{ color: '#BF2C40' }} animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1, repeat: Infinity }}>:</motion.span>
            <span>{pad(time.s)}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— Connection Card (rectangular photo style) ——— */
function LikeCard({ profile, delay, floatDelay }: {
  profile: (typeof likeProfiles)[0]; delay: number; floatDelay: number;
}) {
  const { isRed } = profile;
  const accent = isRed ? '#BF2C40' : '#7FA9D3';
  const accentA = isRed ? 'rgba(191,44,64,' : 'rgba(127,169,211,';

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}>
        <div style={{
          width: 230,
          borderRadius: 26,
          overflow: 'hidden',
          background: `radial-gradient(circle at 30% 0%, rgba(255,255,255,0.10), transparent 38%), linear-gradient(180deg, rgba(18,20,30,0.93), rgba(7,8,13,0.91))`,
          border: `1px solid ${accentA}${isRed ? '0.46' : '0.38'})`,
          boxShadow: `0 36px 100px rgba(0,0,0,0.62), 0 0 58px ${accentA}${isRed ? '0.18' : '0.14'}), inset 0 1px 0 rgba(255,255,255,0.10)`,
          backdropFilter: 'blur(18px)',
        }}>
          {/* Top highlight */}
          <div className="absolute top-0 left-4 right-4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentA}0.38), transparent)` }} />

          {/* Shimmer */}
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)' }}
            animate={{ x: ['-120%', '200%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 + delay * 2 }}
          />

          {/* Photo */}
          <div className="relative" style={{ height: 175 }}>
            <ImageWithFallback src={profile.image} alt={profile.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', filter: 'brightness(0.88) contrast(1.06)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 52%, rgba(7,8,13,0.88) 100%)' }} />
            {/* Heart badge on photo */}
            <motion.div
              className="absolute flex items-center justify-center"
              style={{ top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', background: isRed ? 'linear-gradient(135deg, #BF2C40, #E54458)' : 'linear-gradient(135deg, #7FA9D3, #5a89b8)', boxShadow: `0 4px 14px ${accentA}0.50)` }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
            >
              <img src={cometIcon} alt="comet" style={{ width: 15, height: 15, objectFit: 'contain' }} />
            </motion.div>
          </div>

          {/* Card info */}
          <div className="relative z-10" style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Name + age */}
            <div>
              <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.97)', letterSpacing: '-0.02em' }}>{profile.name}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', marginLeft: 3 }}>, {profile.age}</span>
            </div>

            {/* Venue chip */}
            <div className="inline-flex items-center gap-1 self-start" style={{ padding: '4px 9px', borderRadius: 999, background: `${accentA}0.08)`, border: `1px solid ${accentA}0.20)`, fontSize: 11, color: 'rgba(255,255,255,0.62)' }}>
              <MapPin style={{ width: 10, height: 10, color: accent, flexShrink: 0 }} />
              {profile.venue}
            </div>

            {/* Action buttons — Not now + Approach */}
            <div className="flex items-center justify-around pt-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(223,0,0,0.23)', border: '1px solid rgba(249,114,114,0.19)', boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                  <img src={redCometIcon} alt="not now" style={{ width: 22, height: 22, objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.07px' }}>Not now</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(73,239,32,0.24)', border: '1px solid rgba(159,255,62,0.35)', boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                  <img src={whiteCometIcon} alt="approach" style={{ width: 22, height: 22, objectFit: 'contain', transform: 'rotate(-45deg)' }} />
                </div>
                <span style={{ fontSize: 11, color: '#12dd4f', fontWeight: 700, letterSpacing: '-0.07px' }}>Approach</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— OrbitDot — reused ——— */
function OrbitDot({ cx, cy, radius, size, duration, delay, color }: { cx: number; cy: number; radius: number; size: number; duration: number; delay: number; color: string }) {
  return (
    <motion.div className="absolute pointer-events-none"
      style={{ left: cx, top: cy, width: size, height: size }}
      animate={{
        x: [Math.cos(0)*radius, Math.cos(Math.PI*.5)*radius, Math.cos(Math.PI)*radius, Math.cos(Math.PI*1.5)*radius, Math.cos(Math.PI*2)*radius],
        y: [Math.sin(0)*radius, Math.sin(Math.PI*.5)*radius, Math.sin(Math.PI)*radius, Math.sin(Math.PI*1.5)*radius, Math.sin(Math.PI*2)*radius],
        opacity: [0.2, 0.8, 0.2, 0.8, 0.2],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <div className="w-full h-full rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function UrgencyFeature() {
  return (
    <section
      className="overflow-hidden relative"
      id="likes"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 28% 44%, rgba(191,44,64,0.13), transparent 34%),
          radial-gradient(circle at 74% 42%, rgba(127,169,211,0.10), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.66) 100%)' }} />

      {/* Radar arcs — red left */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '26%', width: 500, height: 380, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.08)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '26%', width: 720, height: 540, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.04)', borderRadius: '50%' }} />

      {/* Radar arcs — blue right */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '74%', width: 460, height: 340, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.07)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '74%', width: 660, height: 480, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.03)', borderRadius: '50%' }} />

      {/* Signal dots */}
      {[
        { x: '8%',  y: '22%', c: '#BF2C40' },
        { x: '16%', y: '72%', c: '#BF2C40' },
        { x: '84%', y: '18%', c: '#7FA9D3' },
        { x: '90%', y: '66%', c: '#7FA9D3' },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: 7, height: 7, background: dot.c, boxShadow: `0 0 10px ${dot.c}99, 0 0 20px ${dot.c}44` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ===== Left — Text Content (unchanged) ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <SectionLabel>Connections</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '68px', color: '#fff' }}
            >
              See who wants to
              <br />
              connect before
              <br />
              <GradientWord delay={0.5}>you leave a venue.</GradientWord>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '19px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.68, letterSpacing: '-0.010em' }}
            >
              ApproachU connections will last just 24 hours if no connection is made while together encouraging real-life connections while you're still at the same venue.
            </motion.p>

            <div className="flex flex-col gap-3.5 pt-2">
              {featureHighlights.map((feature, i) => (
                <motion.div key={feature}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3.5"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ background: i % 2 === 0 ? '#BF2C40' : '#7FA9D3', boxShadow: i % 2 === 0 ? '0 0 8px rgba(191,44,64,0.5)' : '0 0 8px rgba(127,169,211,0.5)' }} />
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.010em' }}>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ===== Right — Card Cluster ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full flex justify-center items-center"
            style={{ minHeight: 520 }}
          >
            {/* Ambient glow behind cluster */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(191,44,64,0.10) 0%, rgba(127,169,211,0.05) 45%, transparent 65%)', filter: 'blur(50px)', willChange: 'transform' }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbital rings */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: 440, height: 440, border: '1.5px solid transparent', borderTopColor: 'rgba(191,44,64,0.30)', borderRightColor: 'rgba(191,44,64,0.12)', borderBottomColor: 'transparent', borderLeftColor: 'rgba(191,44,64,0.06)' }}
              animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: 350, height: 350, border: '1px dashed transparent', borderTopColor: 'rgba(127,169,211,0.14)', borderBottomColor: 'rgba(127,169,211,0.08)' }}
              animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orbit dots */}
            <OrbitDot cx={230} cy={230} radius={220} size={5} duration={16} delay={0}   color="rgba(191,44,64,0.65)" />
            <OrbitDot cx={230} cy={230} radius={220} size={4} duration={16} delay={5.3} color="rgba(127,169,211,0.55)" />
            <OrbitDot cx={230} cy={230} radius={175} size={3} duration={13} delay={3}   color="rgba(191,44,64,0.45)" />

            {/* Card cluster container */}
            <div className="relative" style={{ width: 510, height: 420 }}>
              {/* Timer — centered above cards */}
              <MasterCountdown />

              {/* Danina — left, red */}
              <motion.div className="absolute" style={{ left: 10, top: 72 }}>
                <LikeCard profile={likeProfiles[0]} delay={0.3} floatDelay={0.4} />
              </motion.div>

              {/* Mayta — right, blue */}
              <motion.div className="absolute" style={{ left: 270, top: 72 }}>
                <LikeCard profile={likeProfiles[1]} delay={0.5} floatDelay={1.0} />
              </motion.div>

              {/* Connection arc between cards */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <defs>
                  <linearGradient id="connArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#BF2C40" stopOpacity="0" />
                    <stop offset="35%"  stopColor="#BF2C40" stopOpacity="0.35" />
                    <stop offset="65%"  stopColor="#7FA9D3" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7FA9D3" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 125 220 Q 255 175 385 220"
                  fill="none"
                  stroke="url(#connArcGrad)"
                  strokeWidth="1.5"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>

              {/* Bottom glow */}
              <div className="absolute pointer-events-none" style={{ bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 340, height: 60, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(191,44,64,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
