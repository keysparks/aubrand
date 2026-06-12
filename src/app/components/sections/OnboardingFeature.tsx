import { motion } from 'motion/react';
import { GradientWord } from '../GradientWord';
import { SectionLabel } from '../SectionLabel';

/* ——— Shared card base ——— */
const cardBase = (accent: 'red' | 'blue'): React.CSSProperties => ({
  background:
    accent === 'red'
      ? `radial-gradient(circle at 24% 0%, rgba(191,44,64,0.12), transparent 34%), linear-gradient(180deg, rgba(18,20,30,0.94), rgba(7,8,13,0.92))`
      : `radial-gradient(circle at 76% 0%, rgba(127,169,211,0.10), transparent 36%), linear-gradient(180deg, rgba(16,18,28,0.90), rgba(6,8,13,0.88))`,
  border: `1px solid ${accent === 'red' ? 'rgba(255,255,255,0.13)' : 'rgba(127,169,211,0.18)'}`,
  borderRadius: 30,
  boxShadow:
    accent === 'red'
      ? '0 44px 120px rgba(0,0,0,0.66), 0 0 68px rgba(191,44,64,0.12), inset 0 1px 0 rgba(255,255,255,0.10)'
      : '0 38px 110px rgba(0,0,0,0.62), 0 0 58px rgba(127,169,211,0.10), inset 0 1px 0 rgba(255,255,255,0.08)',
  backdropFilter: 'blur(18px)',
  overflow: 'hidden' as const,
  position: 'relative' as const,
});

const topHighlight = (accent: 'red' | 'blue') => (
  <div className="absolute top-0 left-5 right-5 h-px pointer-events-none"
    style={{ background: `linear-gradient(90deg, transparent, ${accent === 'red' ? 'rgba(191,44,64,0.40)' : 'rgba(127,169,211,0.36)'}, transparent)` }} />
);

/* ——— 1. Onboarding Progress Card (front-left) ——— */
function OnboardingProgressCard() {
  const steps = [
    { label: 'Onboarding step',  desc: 'Create your personal profile.',       status: 'active'   as const },
    { label: 'Profile step',     desc: 'Fill in your front info and starts.',  status: 'current'  as const },
    { label: 'Interest steps',   desc: 'Start discovering profile steps.',     status: 'pending'  as const },
    { label: 'First step',       desc: 'Begin with for new minutes.',          status: 'inactive' as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-30"
      style={{ left: '0%', top: '15%', width: 282 }}
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={cardBase('red')}>
        {topHighlight('red')}
        <div className="relative px-6 pt-6 pb-6">
          <p style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em', marginBottom: 20 }}>
            Onboarding Progress
          </p>

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                {/* Timeline */}
                <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 2 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                    background: step.status === 'active' ? '#BF2C40' : 'transparent',
                    border: step.status === 'active' ? 'none' : step.status === 'current' ? '2px solid #BF2C40' : step.status === 'pending' ? '1.5px solid rgba(127,169,211,0.5)' : '1.5px solid rgba(255,255,255,0.15)',
                    boxShadow: step.status === 'active' ? '0 0 12px rgba(191,44,64,0.7)' : step.status === 'current' ? '0 0 8px rgba(191,44,64,0.35)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {step.status === 'current' && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#BF2C40' }} />}
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 28, background: i === 0 ? 'linear-gradient(180deg, #BF2C40, rgba(191,44,64,0.2))' : i === 1 ? 'rgba(127,169,211,0.25)' : 'rgba(255,255,255,0.08)' }} />
                  )}
                </div>
                {/* Text */}
                <div className="pb-5">
                  <p style={{ fontSize: 13, fontWeight: 600, color: step.status === 'active' ? '#fff' : step.status === 'current' ? 'rgba(255,255,255,0.82)' : step.status === 'pending' ? 'rgba(127,169,211,0.80)' : 'rgba(255,255,255,0.35)', letterSpacing: '-0.01em' }}>
                    {step.label}
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)', marginTop: 2, lineHeight: 1.45 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Continue button */}
          <motion.div
            className="w-full flex items-center justify-center mt-1"
            style={{ height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #BF2C40 0%, #E04458 100%)', boxShadow: '0 16px 44px rgba(191,44,64,0.36), inset 0 1px 0 rgba(255,255,255,0.22)', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'default' }}
            animate={{ boxShadow: ['0 12px 36px rgba(191,44,64,0.30)', '0 16px 52px rgba(191,44,64,0.50)', '0 12px 36px rgba(191,44,64,0.30)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Continue
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— 2. Profile Setup Form Card (center-right, behind progress) ——— */
function ProfileSetupCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, x: 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-20"
      style={{ right: '4%', top: '22%', width: 228 }}
    >
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ ...cardBase('blue'), opacity: 0.88 }}>
        {topHighlight('blue')}
        <div className="relative px-5 pt-5 pb-5">
          <p style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em', marginBottom: 16 }}>Profile Setup</p>

          {[{ label: 'Name', placeholder: '' }, { label: 'Gender', placeholder: 'Female', arrow: true }, { label: 'Email', placeholder: '' }].map((field) => (
            <div key={field.label} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>{field.label}</p>
              <div style={{ height: 46, borderRadius: 14, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 12, color: 'rgba(255,255,255,0.60)' }}>
                <span>{field.placeholder}</span>
                {field.arrow && (
                  <svg style={{ width: 12, height: 12, color: 'rgba(255,255,255,0.28)', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                )}
              </div>
            </div>
          ))}

          <div style={{ height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #BF2C40, #E04458)', boxShadow: '0 10px 30px rgba(191,44,64,0.32), inset 0 1px 0 rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', marginTop: 4 }}>
            Next
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— 3. Phone Verification Card (top-right) ——— */
function PhoneVerificationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, x: 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-25"
      style={{ right: '2%', top: '-4%', width: 238 }}
    >
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ ...cardBase('blue'), opacity: 0.82 }}>
        {topHighlight('blue')}
        <div className="relative px-5 pt-5 pb-5">
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em' }}>Phone Verification</p>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(127,169,211,0.12)', border: '1px solid rgba(127,169,211,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: 14, height: 14, color: '#7FA9D3' }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
              </svg>
            </div>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginBottom: 14 }}>Please enter your OTP code</p>

          {/* OTP boxes */}
          <div className="flex gap-2">
            {[true, true, true, false, false, false].map((filled, i) => (
              <div key={i} style={{ width: 36, height: 46, borderRadius: 12, background: filled ? 'rgba(127,169,211,0.10)' : 'rgba(255,255,255,0.04)', border: `1px solid ${filled ? 'rgba(127,169,211,0.32)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: filled ? 'rgba(255,255,255,0.88)' : 'transparent', boxShadow: filled ? '0 0 12px rgba(127,169,211,0.12)' : 'none' }}>
                {filled ? '•' : ''}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— 4. OTP Mini Card (bottom-left) ——— */
function OTPMiniCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, x: -15 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-10"
      style={{ left: '-2%', bottom: '2%', width: 175 }}
    >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ ...cardBase('blue'), opacity: 0.78 }}>
        {topHighlight('blue')}
        <div className="relative px-4 pt-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <svg style={{ width: 14, height: 14, color: '#7FA9D3', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.80)' }}>OTP</p>
          </div>
          <div className="flex gap-1.5">
            {[true, true, false, false].map((filled, i) => (
              <div key={i} style={{ width: 32, height: 38, borderRadius: 10, background: filled ? 'rgba(127,169,211,0.10)' : 'rgba(255,255,255,0.04)', border: `1px solid ${filled ? 'rgba(127,169,211,0.28)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: filled ? 'rgba(255,255,255,0.80)' : 'transparent' }}>
                {filled ? '•' : ''}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function OnboardingFeature() {
  const features = [
    'Quick phone verification',
    'Simple profile setup',
    'Add photos and interests',
    'Enable location to discover venues',
  ];

  return (
    <section
      className="overflow-hidden relative"
      id="onboarding"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 30% 44%, rgba(191,44,64,0.14), transparent 34%),
          radial-gradient(circle at 74% 40%, rgba(127,169,211,0.11), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.66) 100%)' }} />

      {/* Section radar arcs */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '28%', width: 520, height: 400, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.07)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '74%', width: 460, height: 340, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.06)', borderRadius: '50%' }} />

      {/* Signal dots */}
      {[
        { x: '8%',  y: '22%', c: '#BF2C40' },
        { x: '16%', y: '74%', c: '#BF2C40' },
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ——— Right text (unchanged) ——— */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:order-2"
          >
            <SectionLabel>Onboarding</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '68px' }}
            >
              <span className="text-white">Get started</span>
              <br />
              <span className="text-white">in </span><GradientWord delay={1}>minutes</GradientWord>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '19px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.68, letterSpacing: '-0.010em', maxWidth: '32rem' }}
            >
              Create your profile, add photos, and start discovering people at the same venues around you.
            </motion.p>

            <div className="flex flex-col gap-3 mt-2">
              {features.map((feat, i) => (
                <motion.div key={feat}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: i % 2 === 0 ? '#BF2C40' : '#7FA9D3', boxShadow: i % 2 === 0 ? '0 0 8px rgba(191,44,64,0.5)' : '0 0 8px rgba(127,169,211,0.5)' }} />
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.010em' }}>{feat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ——— Left: Card Stack ——— */}
          <div className="relative w-full min-h-[580px] lg:order-1 flex items-center justify-center">

            {/* Radar rings behind card stack */}
            {[580, 440, 320].map((size, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
                style={{ width: size, height: size * 0.75, border: `1px solid ${i === 0 ? 'rgba(191,44,64,0.08)' : i === 1 ? 'rgba(191,44,64,0.05)' : 'rgba(127,169,211,0.06)'}` }} />
            ))}

            {/* Ambient glow */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: 420, height: 380, background: 'radial-gradient(ellipse, rgba(191,44,64,0.10) 0%, rgba(127,169,211,0.06) 45%, transparent 65%)', filter: 'blur(50px)', willChange: 'transform' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Card scene — flat layered (no 3D transform) */}
            <div className="relative" style={{ width: 500, height: 560 }}>
              <PhoneVerificationCard />
              <ProfileSetupCard />
              <OnboardingProgressCard />
              <OTPMiniCard />

              {/* Connector lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18 }} viewBox="0 0 500 560">
                <defs>
                  <linearGradient id="onb-r" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BF2C40" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7FA9D3" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="onb-b" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7FA9D3" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#BF2C40" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <motion.line x1="260" y1="200" x2="380" y2="60"
                  stroke="url(#onb-b)" strokeWidth="1"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 }} />
                <motion.line x1="270" y1="280" x2="400" y2="300"
                  stroke="url(#onb-r)" strokeWidth="1"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1 }} />
                <motion.line x1="180" y1="430" x2="85" y2="480"
                  stroke="url(#onb-b)" strokeWidth="1"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.2 }} />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
