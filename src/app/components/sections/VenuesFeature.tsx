import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { SectionLabel } from '../SectionLabel';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import circleLogo from 'figma:asset/ef07ce09bd9b8f41325ee46380aeccecf54b6100.png';
import venue01 from '../../../imports/venue01.jpg';
import venue02 from '../../../imports/venue02.jpg';

const venueImg1 = venue01;
const venueImg2 = 'https://images.unsplash.com/photo-1771002469947-794293ccc9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY29mZmVlJTIwc2hvcCUyMGxhdHRlJTIwd2FybSUyMGludGVyaW9yfGVufDF8fHx8MTc3MzYzMTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080';
const venueImg3 = venue02;

const featurePills = [
  { label: 'Venue check-in',           color: '#BF2C40' },
  { label: 'Live Check-ins',           color: '#7FA9D3' },
  { label: 'Check-in count preview',   color: '#BF2C40' },
  { label: 'View members after check-in', color: '#7FA9D3' },
];

interface VenueData {
  name: string;
  type: string;
  hereNow: number;
  distance: string;
  image: string;
}

const venueCards: VenueData[] = [
  { name: 'Jenk\'s Club', type: 'Bar · Vibrant',    hereNow: 12, distance: '30 m',  image: venueImg1 },
  { name: 'Brew & Grind',    type: 'Cafe · Cozy',      hereNow: 8,  distance: '130 m', image: venueImg2 },
  { name: 'Martel\'s Tiki Bar', type: 'Lounge · Upscale', hereNow: 15, distance: '115 m', image: venueImg3 },
];

/* ——— Venue Card — vertical, reference style ——— */
function VenueCard({ venue, delay }: { venue: VenueData; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[18px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(12,15,24,0.96) 0%, rgba(6,8,14,0.92) 100%)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(255,255,255,0.13)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.75), 0 0 40px rgba(191,44,64,0.08), inset 0 1px 0 rgba(255,255,255,0.10)',
      }}
    >
      {/* Image with Status chip */}
      <div className="relative overflow-hidden" style={{ height: 118 }}>
        <ImageWithFallback src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 100%)' }} />
        {/* Status chip */}
        <div className="absolute top-2.5 right-2.5">
          <span style={{
            background: 'rgba(18,22,36,0.82)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.16)', borderRadius: 20,
            padding: '3px 10px', fontSize: '11px', color: 'rgba(255,255,255,0.82)', fontWeight: 500,
          }}>Status</span>
        </div>
      </div>

      {/* Text */}
      <div style={{ padding: '12px 14px 14px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', letterSpacing: '-0.022em', lineHeight: 1.2 }}>{venue.name}</h4>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>Venue / Vibe</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full" style={{ background: 'rgba(191,44,64,0.18)', border: '1px solid rgba(191,44,64,0.32)', padding: '4px 10px', fontSize: '11px', fontWeight: 600, color: '#e07080' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF2C40] animate-pulse flex-shrink-0" />
            Live check-in
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full" style={{ background: 'rgba(127,169,211,0.14)', border: '1px solid rgba(127,169,211,0.28)', padding: '4px 10px', fontSize: '11px', fontWeight: 500, color: '#7FA9D3' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Distance
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ——— Phone Mockup ——— */
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.88 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full flex justify-center items-center"
      style={{ minHeight: 580, perspective: '1200px' }}
    >
      {/* Ambient glow behind phone — red top-left, blue bottom-right */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 38% 28%, rgba(191,44,64,0.22) 0%, transparent 48%), radial-gradient(ellipse at 72% 72%, rgba(127,169,211,0.18) 0%, transparent 46%)',
        filter: 'blur(40px)',
      }} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 55% 50%, rgba(191,44,64,0.08) 0%, rgba(127,169,211,0.07) 45%, transparent 65%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Radar arc behind phone */}
      <div className="absolute pointer-events-none" style={{
        top: '50%', left: '55%', width: 420, height: 320,
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(127,169,211,0.08)',
        borderRadius: '50%',
      }} />
      <div className="absolute pointer-events-none" style={{
        top: '50%', left: '55%', width: 540, height: 420,
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(191,44,64,0.06)',
        borderRadius: '50%',
      }} />

      {/* Phone wrapper */}
      <motion.div
        className="relative"
        style={{ width: 300, transformStyle: 'preserve-3d', filter: 'drop-shadow(0 40px 100px rgba(0,0,0,0.62)) drop-shadow(0 0 48px rgba(127,169,211,0.12))' }}
        animate={{ rotateY: [-4, -2, -4], rotateX: [2, 0, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Phone body */}
        <div
          className="relative rounded-[44px] overflow-hidden"
          style={{
            aspectRatio: '9/18',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 100%)',
            border: '1px solid rgba(255,255,255,0.13)',
            boxShadow: '0 44px 120px rgba(0,0,0,0.64), 0 0 70px rgba(127,169,211,0.10), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {/* Inner phone bg */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #14182a 0%, #08090f 100%)' }} />

          {/* Blue rim light — right edge */}
          <div className="absolute top-[8%] bottom-[8%] right-0 w-[2px] pointer-events-none rounded-full" style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(127,169,211,0.35) 30%, rgba(127,169,211,0.20) 70%, transparent 100%)',
          }} />

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20" />

          {/* Status bar */}
          <div className="relative flex items-center justify-between px-8 pt-4 pb-1 z-10">
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.70)', fontWeight: 500 }}>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-[3px] rounded-full bg-white/50" style={{ height: 4 + i * 2 }} />
                ))}
              </div>
              <div className="w-4 h-2.5 rounded-sm border border-white/40 relative ml-1">
                <div className="absolute inset-[2px] rounded-[1px] bg-white/60" />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2 relative z-10">
            <div className="flex items-center gap-2">
              <img src={circleLogo} alt="ApproachU" className="w-8 h-8 rounded-full object-cover" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.90)' }}>ApproachU</span>
            </div>
            <Navigation className="w-4 h-4 text-white/40" />
          </div>

          {/* Map area */}
          <div className="relative mx-2.5 rounded-2xl overflow-hidden" style={{ height: 'calc(100% - 80px)' }}>
            {/* Dark map grid */}
            <div className="absolute inset-0" style={{
              background: `
                linear-gradient(rgba(127,169,211,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(127,169,211,0.03) 1px, transparent 1px),
                radial-gradient(ellipse at 40% 35%, rgba(99,140,190,0.07) 0%, transparent 55%),
                #07080e
              `,
              backgroundSize: '28px 28px, 28px 28px, 100% 100%, 100% 100%',
            }} />

            {/* Road paths */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="none">
              <line x1="0" y1="30%" x2="100%" y2="28%" stroke="#7FA9D3" strokeWidth="2" />
              <line x1="0" y1="55%" x2="100%" y2="58%" stroke="#7FA9D3" strokeWidth="1.5" />
              <line x1="0" y1="78%" x2="100%" y2="75%" stroke="#7FA9D3" strokeWidth="1.5" />
              <line x1="25%" y1="0" x2="28%" y2="100%" stroke="#7FA9D3" strokeWidth="1.5" />
              <line x1="60%" y1="0" x2="58%" y2="100%" stroke="#7FA9D3" strokeWidth="1.5" />
            </svg>

            {/* Radar rings — animated concentric from center */}
            <div className="absolute pointer-events-none" style={{ top: '46%', left: '40%' }}>
              {/* Center glow */}
              <div style={{ width: 18, height: 18, marginLeft: -9, marginTop: -9, borderRadius: '50%', background: 'radial-gradient(circle, rgba(191,44,64,0.95) 0%, rgba(191,44,64,0.4) 50%, transparent 100%)', boxShadow: '0 0 16px rgba(191,44,64,0.9), 0 0 32px rgba(191,44,64,0.5)' }} />
              {/* Ring 1 */}
              <motion.div style={{ position: 'absolute', width: 60, height: 60, marginLeft: -30, marginTop: -30, top: 0, left: 0, borderRadius: '50%', border: '1px solid rgba(191,44,64,0.55)' }} animate={{ scale: [1, 2.2], opacity: [0.7, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
              {/* Ring 2 */}
              <motion.div style={{ position: 'absolute', width: 60, height: 60, marginLeft: -30, marginTop: -30, top: 0, left: 0, borderRadius: '50%', border: '1px solid rgba(191,44,64,0.4)' }} animate={{ scale: [1, 3.2], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.7 }} />
              {/* Ring 3 */}
              <motion.div style={{ position: 'absolute', width: 60, height: 60, marginLeft: -30, marginTop: -30, top: 0, left: 0, borderRadius: '50%', border: '1px solid rgba(191,44,64,0.25)' }} animate={{ scale: [1, 4.4], opacity: [0.35, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.4 }} />
            </div>

            {/* Map pins — red (live venues) */}
            <motion.div className="absolute top-[18%] left-[20%] z-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-[#BF2C40] flex items-center justify-center shadow-[0_0_16px_rgba(191,44,64,0.65)]">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                <motion.div className="absolute inset-0 rounded-full border-2 border-[#BF2C40]/40" animate={{ scale: [1, 2.5], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
              </div>
            </motion.div>

            <motion.div className="absolute top-[42%] right-[22%] z-10" animate={{ y: [0, -4, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
              <div className="w-6 h-6 rounded-full bg-[#BF2C40] flex items-center justify-center shadow-[0_0_14px_rgba(191,44,64,0.55)]">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <motion.div className="absolute inset-0 rounded-full border-2 border-[#BF2C40]/30" animate={{ scale: [1, 2.2], opacity: [0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }} />
            </motion.div>

            {/* Map pin — blue (nearby) */}
            <motion.div className="absolute bottom-[30%] left-[40%] z-10" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
              <div className="w-6 h-6 rounded-full bg-[#7FA9D3] flex items-center justify-center shadow-[0_0_14px_rgba(127,169,211,0.5)]">
                <MapPin className="w-3 h-3 text-[#070a19]" />
              </div>
            </motion.div>

            {/* User location dot */}
            <div className="absolute top-[48%] left-[35%] z-10">
              <div className="w-3 h-3 rounded-full bg-[#7FA9D3] shadow-[0_0_10px_rgba(127,169,211,0.6)]" />
              <motion.div className="absolute inset-0 rounded-full bg-[#7FA9D3]/20" animate={{ scale: [1, 3], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Card 1 — upper left, overlapping left edge of phone */}
        <div className="absolute z-20" style={{ top: '8%', left: -100, width: 250 }}>
          <VenueCard venue={venueCards[0]} delay={0.4} />
        </div>
        {/* Card 2 — lower right, overlapping right edge of phone */}
        <div className="absolute z-20" style={{ bottom: '8%', right: -100, width: 250 }}>
          <VenueCard venue={venueCards[2]} delay={0.65} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function VenuesFeature() {
  return (
    <section
      className="overflow-hidden relative"
      id="venues"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 22% 38%, rgba(191,44,64,0.15), transparent 34%),
          radial-gradient(circle at 78% 42%, rgba(127,169,211,0.13), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.64) 100%)' }} />

      {/* Radar arcs — left red */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '18%', width: 480, height: 360, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.09)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '18%', width: 700, height: 520, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.05)', borderRadius: '50%' }} />

      {/* Radar arcs — right blue */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '78%', width: 460, height: 340, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.09)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '78%', width: 680, height: 500, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.05)', borderRadius: '50%' }} />

      {/* ── Rotating radar sweep — centered on phone column ── */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '68%' }}>
        {/* Sweep */}
        <div style={{
          width: 720, height: 720,
          marginLeft: -360, marginTop: -360,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(191,44,64,0.20) 16deg, rgba(191,44,64,0.06) 28deg, transparent 36deg, transparent 360deg)',
          animation: 'venues-radar 6s linear infinite',
        }} />

        {/* Concentric rings — alternating red / blue */}
        {([
          { r: 110, col: 'rgba(191,44,64,0.22)', dur: 3.0 },
          { r: 190, col: 'rgba(127,169,211,0.16)', dur: 3.5 },
          { r: 280, col: 'rgba(191,44,64,0.12)', dur: 4.2 },
          { r: 360, col: 'rgba(127,169,211,0.08)', dur: 5.0 },
        ] as { r: number; col: string; dur: number }[]).map(({ r, col, dur }, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, border: `1px solid ${col}` }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}

        {/* Expanding pulse — fires every ~5s */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 60, height: 60, marginLeft: -30, marginTop: -30, border: '1.5px solid rgba(191,44,64,0.75)' }}
          animate={{ scale: [1, 7], opacity: [0.75, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.5 }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 60, height: 60, marginLeft: -30, marginTop: -30, border: '1px solid rgba(127,169,211,0.5)' }}
          animate={{ scale: [1, 5.5], opacity: [0.5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.5, delay: 1.2 }}
        />
      </div>

      <style>{`
        @keyframes venues-radar {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* Intentional signal dots — 4 only */}
      {[
        { x: '12%', y: '28%', c: '#BF2C40' },
        { x: '20%', y: '68%', c: '#BF2C40' },
        { x: '80%', y: '22%', c: '#7FA9D3' },
        { x: '86%', y: '64%', c: '#7FA9D3' },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: 7, height: 7, background: dot.c, boxShadow: `0 0 10px ${dot.c}99, 0 0 20px ${dot.c}44` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <SectionLabel>Venues</SectionLabel>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                fontSize: '68px',
                color: 'rgba(255,255,255,0.97)',
              }}
            >
              Discover{' '}
              <span style={{
                background: 'linear-gradient(90deg, #BF2C40 0%, #D75A69 46%, #7FA9D3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>venues</span>
              <br />
              with live check-ins
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '19px', color: 'rgba(255,255,255,0.66)', lineHeight: 1.65, letterSpacing: '-0.010em', maxWidth: 520 }}
            >
              Interactive map showing bars, cafés, and lounges near you.
              See who's checked in, browse venue offers, and find your next connection.
            </motion.p>

            {/* Feature bullets */}
            <div className="flex flex-col pt-2" style={{ gap: '16px' }}>
              {featurePills.map((pill, i) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.09 }}
                  className="flex items-center gap-4"
                >
                  <div
                    className="flex-shrink-0 rounded-full"
                    style={{ width: 8, height: 8, background: pill.color, boxShadow: `0 0 10px ${pill.color}80` }}
                  />
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.76)', lineHeight: 1.6, letterSpacing: '-0.010em' }}>
                    {pill.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Phone */}
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
