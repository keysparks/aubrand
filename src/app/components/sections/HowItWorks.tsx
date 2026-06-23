import { motion } from 'motion/react';
import { GradientWord } from '../GradientWord';
import { SectionLabel } from '../SectionLabel';
import whiteCometIcon from '../../../imports/Asset_2_3x-1.png';
import { MessageCircleHeart } from 'lucide-react';

/* ——— CSS SVG Icons ——— */
const IconCalendar = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    <path d="M8 14h.01M12 14h.01M8 18h.01M12 18h.01M16 14h.01"/>
  </svg>
);
const IconPin = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconSearch = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconConnect = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const cardPositions = [
  { top: '10%', left: '50%' },     // Step 1
  { top: '45%', left: '85%' },    // Step 2
  { top: '95%', left: '75%' },    // Step 3
  { top: '95%', left: '25%' },    // Step 4
  { top: '45%', left: '15%' },    // Step 5
];

const steps = [
  {
    Icon: IconSearch,
    title: 'DISCOVER where to go',
    description: 'Open ApproachU and see the venue options near you.',
    accent: '#BF2C40',
    accentRgb: '191,44,64',
  },
  {
    Icon: IconPin,
    title: 'See WHO\'S THERE',
    description: 'See what spots are hot, who is there, or planning to go.',
    accent: '#7FA9D3',
    accentRgb: '127,169,211',
  },
  {
    Icon: IconCalendar,
    title: 'PLAN TO GO or CHECK IN',
    description: 'Hear venue details, events, specials, and see who else plans to go there.',
    accent: '#BF2C40',
    accentRgb: '191,44,64',
  },
  {
    Icon: IconConnect,
    title: 'FIND YOUR PEOPLE',
    description: 'Browse profiles of everyone checked in.',
    accent: '#7FA9D3',
    accentRgb: '127,169,211',
  },
  {
    Icon: MessageCircleHeart,
    title: 'CONNECT & APPROACH',
    description: 'Connect, chat, and meet instantly.',
    accent: '#BF2C40',
    accentRgb: '191,44,64',
  },
];

/* ——— Signal Dot ——— */
function TwinklingStar({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'white' }}
      animate={{ opacity: [0.02, 0.28, 0.02], scale: [0.7, 1.2, 0.7] }}
      transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ——— Animated Orbital Ring ——— */
function OrbitalRing({ width, height, rotate, opacity, color, delay, pulseScale }: {
  width: string; height: string; rotate: string; opacity: number; color: string; delay: number; pulseScale?: [number, number, number];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay }}
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{ width, height, transform: `translate(-50%, -50%) rotate(${rotate})`, borderRadius: '50%' }}
    >
      <motion.div
        className="w-full h-full rounded-[50%]"
        style={{ border: `1px solid ${color}`, opacity }}
        animate={{ scale: pulseScale || [1, 1.02, 1], opacity: [opacity, opacity * 1.5, opacity] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: delay * 2 }}
      />
    </motion.div>
  );
}

/* ——— Animated Comet ——— */
function AnimatedComet({ startX, startY, endX, endY, color, width, duration, delay }: {
  startX: string; startY: string; endX: string; endY: string; color: 'red' | 'blue'; width: number; duration: number; delay: number;
}) {
  const glowCol = color === 'red' ? 'rgba(191,44,64,0.6)' : 'rgba(127,169,211,0.6)';
  const dx = parseFloat(endX) - parseFloat(startX);
  const dy = parseFloat(endY) - parseFloat(startY);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return (
    <motion.div
      className="absolute pointer-events-none z-[5]"
      style={{ left: startX, top: startY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0], left: [startX, endX], top: [startY, endY] }}
      transition={{ duration, delay, repeat: Infinity, repeatDelay: duration * 0.8, ease: 'easeInOut' }}
    >
      <div className="rounded-full" style={{ width: 5, height: 5, background: color === 'red' ? '#BF2C40' : '#7FA9D3', boxShadow: `0 0 10px ${glowCol}, 0 0 20px ${glowCol}` }} />
      <div className="absolute top-1/2 right-full -translate-y-1/2" style={{ width, height: 2, background: `radial-gradient(circle at right, ${color === 'red' ? '#BF2C40' : '#7FA9D3'}, ${glowCol} 40%, transparent 100%)`, filter: 'blur(0.5px)', transform: `rotate(${angle}deg)`, transformOrigin: 'right center' }} />
    </motion.div>
  );
}

/* ——— Glass Step Card — vertical layout matching reference ——— */
function StepCard({ step, index, delay }: { step: (typeof steps)[0]; index: number; delay: number }) {
  const { Icon } = step;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="relative rounded-2xl p-6 cursor-default"
      style={{
        background: `radial-gradient(circle at 20% 0%, rgba(${step.accentRgb},0.12) 0%, transparent 55%), rgba(255,255,255,0.04)`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid rgba(${step.accentRgb},0.28)`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 40px rgba(${step.accentRgb},0.10), inset 0 1px 0 rgba(255,255,255,0.09)`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-4 right-4 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${step.accentRgb},0.4), transparent)` }} />

      {/* Step label + Icon */}
      <div className="flex items-start justify-between mb-5">
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', fontWeight: 500, letterSpacing: '0.02em' }}>
          Step {index + 1}
        </span>
        <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, background: `rgba(${step.accentRgb},0.1)`, border: `1px solid rgba(${step.accentRgb},0.25)` }}>
          <Icon color={step.accent} />
        </div>
      </div>

      <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'rgba(255,255,255,0.93)', letterSpacing: '-0.025em', marginBottom: '10px', lineHeight: 1.2 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.52)', lineHeight: 1.65 }}>
        {step.description}
      </p>
    </motion.div>
  );
}

/* ——— Central Glowing Orb with dashed rings ——— */
function CentralOrb() {
  const rings = [
    { r: 60,  opacity: 0.5, speed: 20 },
    { r: 90,  opacity: 0.3, speed: 28 },
    { r: 120, opacity: 0.18, speed: 38 },
    { r: 155, opacity: 0.09, speed: 50 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
        {/* Dashed rings */}
        {rings.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ width: ring.r * 2, height: ring.r * 2, border: `1px dashed rgba(191,44,64,${ring.opacity})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: ring.speed, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Deep glow */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 110, height: 110, background: 'radial-gradient(circle, rgba(191,44,64,0.55) 0%, rgba(191,44,64,0.08) 55%, transparent 70%)', filter: 'blur(18px)', willChange: 'transform' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orb */}
        <motion.div
          className="relative rounded-full z-10 flex items-center justify-center"
          style={{ width: 44, height: 44, background: 'radial-gradient(circle at 35% 30%, rgba(230,130,140,0.55) 0%, #BF2C40 42%, #8a1e2c 100%)', boxShadow: '0 0 22px rgba(191,44,64,0.95), 0 0 55px rgba(191,44,64,0.5), 0 0 100px rgba(191,44,64,0.2)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src={whiteCometIcon} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
        </motion.div>

        {/* Pulse rings */}
        <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 44, height: 44, border: '1.5px solid rgba(191,44,64,0.7)' }}
          animate={{ scale: [1, 3.2], opacity: [0.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div className="absolute rounded-full pointer-events-none" style={{ width: 44, height: 44, border: '1px solid rgba(191,44,64,0.4)' }}
          animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
        />
      </div>
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden"
      id="how-it-works"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 28% 44%, rgba(191,44,64,0.13), transparent 34%),
          radial-gradient(circle at 74% 42%, rgba(127,169,211,0.11), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.68) 100%)' }}
      />

      {/* Radar rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{ width: 900, height: 580, border: '1px solid rgba(191,44,64,0.06)', borderRadius: '50%' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{ width: 1150, height: 720, border: '1px solid rgba(127,169,211,0.04)', borderRadius: '50%' }}
      />

      {/* Signal dots — 4 intentional */}
      {[
        { x: '7%',  y: '22%', c: '#BF2C40' },
        { x: '13%', y: '74%', c: '#BF2C40' },
        { x: '87%', y: '18%', c: '#7FA9D3' },
        { x: '91%', y: '70%', c: '#7FA9D3' },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: 7, height: 7, background: dot.c, boxShadow: `0 0 10px ${dot.c}99, 0 0 20px ${dot.c}44` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
          <SectionLabel center>How it works</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }} className="mb-5"
            style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 200, letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '21px', color: 'rgba(255,255,255,0.97)' }}
          >
            <span className="text-white">Connect with people who share </span><GradientWord>your interests</GradientWord><span className="text-white">,</span>
            <br />
            <span className="text-white">at the exact same location.</span>
          </motion.h2>
        </div>

        {/* === Desktop Layout === */}
        <div className="relative w-full max-w-[1100px] mx-auto hidden md:block" style={{ aspectRatio: '16/9' }}>
          {/* Orbital rings */}
          <OrbitalRing width="42%" height="60%" rotate="-22deg" opacity={0.15} color="rgba(191,44,64,0.15)" delay={0.1} pulseScale={[1, 1.03, 1]} />
          <OrbitalRing width="60%" height="82%" rotate="-22deg" opacity={0.1} color="rgba(127,169,211,0.12)" delay={0.2} pulseScale={[1, 1.02, 1]} />
          <OrbitalRing width="80%" height="105%" rotate="-22deg" opacity={0.06} color="rgba(255,255,255,0.08)" delay={0.3} pulseScale={[1.01, 0.99, 1.01]} />

          {/* Animated comets */}
          <AnimatedComet startX="5%" startY="18%" endX="30%" endY="10%" color="red" width={120} duration={3.5} delay={0} />
          <AnimatedComet startX="88%" startY="28%" endX="65%" endY="20%" color="blue" width={100} duration={4} delay={2} />
          <AnimatedComet startX="12%" startY="72%" endX="35%" endY="80%" color="red" width={90} duration={3} delay={1.5} />
          <AnimatedComet startX="82%" startY="68%" endX="62%" endY="78%" color="blue" width={110} duration={3.8} delay={3} />

          {/* Central orb */}
          <CentralOrb />

          {/* Step cards — 2×2 corners */}
          {steps.map((step, i) => (
            <div
              key={i}
              className="absolute z-30"
              style={{
                top: cardPositions[i].top,
                left: cardPositions[i].left,
                width: '320px',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <StepCard
                step={step}
                index={i}
                delay={0.2 + i * 0.15}
              />
            </div>
          ))}
        </div>

        {/* === Mobile Layout === */}
        <div className="md:hidden">
          <div className="relative w-full mx-auto mb-10" style={{ aspectRatio: '1/0.6' }}>
            <OrbitalRing width="50%" height="75%" rotate="-22deg" opacity={0.12} color="rgba(191,44,64,0.12)" delay={0.1} />
            <OrbitalRing width="75%" height="100%" rotate="-22deg" opacity={0.07} color="rgba(127,169,211,0.08)" delay={0.2} />
            <AnimatedComet startX="10%" startY="22%" endX="38%" endY="15%" color="red" width={80} duration={3} delay={0} />
            <AnimatedComet startX="85%" startY="58%" endX="60%" endY="68%" color="blue" width={70} duration={3.5} delay={1.5} />
            <CentralOrb />
          </div>
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => <StepCard key={`ms-${i}`} step={step} index={i} delay={0.1 + i * 0.12} />)}
          </div>
        </div>
      </div>
    </section>
  );
}