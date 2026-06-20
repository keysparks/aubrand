import { motion } from 'motion/react';
import { EyeOff, Pause, UserX, X } from 'lucide-react';
import { SectionLabel } from '../SectionLabel';

const safetyCards = [
  {
    Icon: EyeOff,
    title: 'Go Invisible',
    description: 'Hide from Discover while keeping full access to matches & messages',
    isBlue: true,
    border: 'rgba(127,169,211,0.28)',
    glow: 'rgba(127,169,211,0.16)',
    iconColor: '#7FA9D3',
    topLine: 'rgba(127,169,211,0.32)',
  },
  {
    Icon: Pause,
    title: 'Pause Account',
    description: 'Take a break for 24 hours, 3 days, or 1 week',
    isBlue: true,
    border: 'rgba(127,169,211,0.34)',
    glow: 'rgba(127,169,211,0.18)',
    iconColor: '#7FA9D3',
    topLine: 'rgba(127,169,211,0.36)',
  },
  {
    Icon: UserX,
    title: 'Block & Report',
    description: "They won't see your profile or be able to contact you",
    isBlue: false,
    border: 'rgba(191,44,64,0.38)',
    glow: 'rgba(191,44,64,0.18)',
    iconColor: '#BF2C40',
    topLine: 'rgba(191,44,64,0.40)',
  },
  {
    Icon: X,
    title: 'Permanently End Chat',
    description: 'Removed from both sides instantly',
    isBlue: false,
    border: 'rgba(191,44,64,0.46)',
    glow: 'rgba(191,44,64,0.22)',
    iconColor: '#BF2C40',
    topLine: 'rgba(191,44,64,0.50)',
  },
];

export function SafetyFeature() {
  return (
    <section
      className="overflow-hidden relative"
      id="safety"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 28% 42%, rgba(191,44,64,0.13), transparent 34%),
          radial-gradient(circle at 74% 40%, rgba(127,169,211,0.12), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.68) 100%)' }} />

      {/* Large protective ring behind card row */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{ width: 900, height: 560, border: '1px solid rgba(191,44,64,0.06)', borderRadius: '50%' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{ width: 1100, height: 680, border: '1px solid rgba(127,169,211,0.04)', borderRadius: '50%' }} />

      {/* Blue arc — left (Go Invisible / Pause) */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '22%', width: 480, height: 360, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.08)', borderRadius: '50%' }} />
      {/* Red arc — right (Block / End Chat) */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '78%', width: 480, height: 360, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.08)', borderRadius: '50%' }} />

      {/* Signal dots — 4 intentional */}
      {[
        { x: '8%',  y: '24%', c: '#7FA9D3' },
        { x: '16%', y: '74%', c: '#7FA9D3' },
        { x: '84%', y: '20%', c: '#BF2C40' },
        { x: '90%', y: '68%', c: '#BF2C40' },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: 7, height: 7, background: dot.c, boxShadow: `0 0 10px ${dot.c}99, 0 0 20px ${dot.c}44` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ===== Centered Heading ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel center>Safety</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="whitespace-normal sm:whitespace-nowrap"
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontSize: 'clamp(38px, 9vw, 68px)',
              color: 'rgba(255,255,255,0.97)',
              marginBottom: '24px',
            }}
          >
            You're always <span style={{ background: 'linear-gradient(90deg, #BF2C40 0%, #D75A69 46%, #7FA9D3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in control</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '19px', color: 'rgba(255,255,255,0.66)', lineHeight: 1.65, letterSpacing: '-0.010em', maxWidth: 680, margin: '0 auto' }}
          >
            ApproachU puts safety first, and decisions in your hands — go invisible, take a break,
            or remove connections entirely. Every tool is one tap away.
          </motion.p>
        </div>

        {/* ===== Four Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyCards.map((card, i) => {
            const Icon = card.Icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative flex flex-col gap-5 overflow-hidden"
                style={{
                  padding: '30px 28px',
                  borderRadius: 26,
                  background: `radial-gradient(circle at 24% 0%, rgba(255,255,255,0.08), transparent 34%), linear-gradient(180deg, rgba(18,20,30,0.92), rgba(7,8,13,0.90))`,
                  border: `1px solid ${card.border}`,
                  boxShadow: `0 34px 90px rgba(0,0,0,0.58), 0 0 40px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.10)`,
                  backdropFilter: 'blur(18px)',
                }}
              >
                {/* Inner top highlight */}
                <div className="absolute top-0 left-5 right-5 h-px pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.topLine}, transparent)` }} />

                {/* Shimmer */}
                <motion.div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)' }}
                  animate={{ x: ['-120%', '200%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 + i * 1.5 }}
                />

                {/* Icon badge */}
                <div className="relative z-10 flex-shrink-0"
                  style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: `radial-gradient(circle at 40% 30%, ${card.glow}, transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))`,
                    border: `1px solid ${card.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 16px 44px rgba(0,0,0,0.45), 0 0 24px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.10)`,
                  }}
                >
                  <Icon style={{ width: 22, height: 22, color: card.iconColor, strokeWidth: 1.75 }} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: 'rgba(255,255,255,0.94)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}