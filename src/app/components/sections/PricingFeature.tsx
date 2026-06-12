import { motion } from 'motion/react';
import { Check, Crown, Gem, Lock } from 'lucide-react';
import { useState } from 'react';
import { GradientWord } from '../GradientWord';
import { SectionLabel } from '../SectionLabel';

/* ——— Plan data (unchanged) ——— */
const plans = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '$0',
    period: '',
    accent: 'neutral' as const,
    Icon: Lock,
    cta: 'Get Started',
    comingSoon: false,
    highlights: [
      'Limited connections',
      'See nearby venues',
      'Blurred "Who wants to connect with you"',
      'Blurred messages preview',
      'Basic discovery filters',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    period: '/month',
    accent: 'red' as const,
    popular: true,
    Icon: Crown,
    cta: 'Get Premium',
    comingSoon: false,
    highlights: [
      'Unlimited connections',
      'Advanced Filters',
      'Unlimited Chat',
      'See Who wants to connect with you',
      'Read All Messages',
      'Profile Visibility',
      'Unlimited Venue Connections',
    ],
  },
  {
    id: 'plus',
    name: 'Premium Plus',
    price: '',
    period: '',
    accent: 'blue' as const,
    Icon: Gem,
    cta: 'Get Premium+',
    comingSoon: true,
    highlights: [
      'Everything in Premium',
      'Extended Chat Time',
      'Priority in Discover',
      'And much, much more...',
    ],
  },
];

/* ——— Accent styles — brand colors ——— */
const accentStyles = {
  neutral: {
    border: 'rgba(255,255,255,0.09)',
    borderHover: 'rgba(255,255,255,0.15)',
    glow: 'transparent',
    glowOuter: 'transparent',
    topLine: 'rgba(255,255,255,0.10)',
    iconBg: 'rgba(255,255,255,0.07)',
    iconBorder: 'rgba(255,255,255,0.12)',
    iconColor: 'rgba(255,255,255,0.45)',
    btnBg: 'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))',
    btnBorder: 'rgba(255,255,255,0.14)',
    btnText: 'rgba(255,255,255,0.70)',
    btnGlow: 'none',
    nameColor: 'rgba(255,255,255,0.82)',
    checkColor: 'rgba(255,255,255,0.38)',
  },
  red: {
    border: 'rgba(191,44,64,0.42)',
    borderHover: 'rgba(191,44,64,0.60)',
    glow: 'rgba(191,44,64,0.08)',
    glowOuter: 'rgba(191,44,64,0.16)',
    topLine: 'rgba(191,44,64,0.55)',
    iconBg: 'rgba(191,44,64,0.14)',
    iconBorder: 'rgba(191,44,64,0.28)',
    iconColor: '#BF2C40',
    btnBg: 'linear-gradient(135deg, #BF2C40 0%, #E04458 100%)',
    btnBorder: 'rgba(191,44,64,0.55)',
    btnText: '#ffffff',
    btnGlow: '0 14px 40px rgba(191,44,64,0.40), inset 0 1px 0 rgba(255,255,255,0.20)',
    nameColor: '#ffffff',
    checkColor: '#BF2C40',
  },
  blue: {
    border: 'rgba(127,169,211,0.28)',
    borderHover: 'rgba(127,169,211,0.46)',
    glow: 'rgba(127,169,211,0.06)',
    glowOuter: 'rgba(127,169,211,0.12)',
    topLine: 'rgba(127,169,211,0.42)',
    iconBg: 'rgba(127,169,211,0.12)',
    iconBorder: 'rgba(127,169,211,0.24)',
    iconColor: '#7FA9D3',
    btnBg: 'linear-gradient(135deg, rgba(127,169,211,0.18), rgba(127,169,211,0.08))',
    btnBorder: 'rgba(127,169,211,0.34)',
    btnText: '#7FA9D3',
    btnGlow: '0 10px 28px rgba(127,169,211,0.20), 0 0 40px rgba(127,169,211,0.06)',
    nameColor: 'rgba(255,255,255,0.90)',
    checkColor: '#7FA9D3',
  },
};

/* ——— Plan Card ——— */
function PlanCard({ plan, index, isSelected, onClick }: {
  plan: (typeof plans)[number]; index: number; isSelected: boolean; onClick: () => void;
}) {
  const s = accentStyles[plan.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.12 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col ${plan.popular ? 'z-10 md:-mt-6' : ''}`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="px-4 py-1.5 rounded-full text-[11px] font-bold text-white tracking-[0.12em] uppercase"
            style={{ background: 'linear-gradient(135deg, #BF2C40 0%, #E04458 100%)', boxShadow: '0 6px 22px rgba(191,44,64,0.48), inset 0 1px 0 rgba(255,255,255,0.20)' }}>
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Outer glow blob */}
      {plan.accent !== 'neutral' && (
        <motion.div className="absolute -inset-4 rounded-[34px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${s.glowOuter}, transparent 70%)`, filter: 'blur(24px)', willChange: 'transform' }}
          animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
        />
      )}

      {/* Card */}
      <motion.div
        whileHover={{ y: -5, scale: 1.015 }}
        onClick={onClick}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col flex-1 overflow-hidden cursor-pointer"
        style={{
          borderRadius: 28,
          background: plan.accent === 'red'
            ? `radial-gradient(circle at 24% 0%, rgba(191,44,64,0.14), transparent 40%), linear-gradient(180deg, rgba(18,20,30,0.94), rgba(7,8,13,0.92))`
            : plan.accent === 'blue'
            ? `radial-gradient(circle at 76% 0%, rgba(127,169,211,0.10), transparent 38%), linear-gradient(180deg, rgba(16,18,28,0.92), rgba(6,8,13,0.90))`
            : `linear-gradient(180deg, rgba(18,20,30,0.88), rgba(7,8,13,0.90))`,
          backdropFilter: 'blur(18px)',
          border: `1px solid ${isSelected ? s.borderHover : s.border}`,
          boxShadow: `0 36px 100px rgba(0,0,0,0.56), 0 0 48px ${s.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        {/* Top highlight */}
        <div className="absolute top-0 left-6 right-6 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${s.topLine}, transparent)` }} />
        {/* Shimmer */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)' }}
          animate={{ x: ['-120%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 6 + index * 2, ease: 'easeInOut' }}
        />

        <div className="p-6 sm:p-8 flex flex-col flex-1 relative z-10">
          {/* Icon + name */}
          <div className="flex flex-col items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: s.iconBg, border: `1.5px solid ${s.iconBorder}`, boxShadow: `0 0 20px ${s.glow}` }}>
              <plan.Icon className="w-5 h-5" style={{ color: s.iconColor }} />
            </div>
            <h3 style={{ fontSize: 21, fontFamily: '"Inter Tight", sans-serif', fontWeight: 700, letterSpacing: '-0.030em', color: s.nameColor, textAlign: 'center' }}>
              {plan.name}
            </h3>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            {plan.comingSoon ? (
              <span style={{ fontSize: 'clamp(26px, 3vw, 34px)', fontFamily: '"Inter Tight", sans-serif', fontWeight: 760, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#7FA9D3' }}>
                Coming Soon!!
              </span>
            ) : (
              <>
                <span style={{ fontSize: 'clamp(44px, 4.5vw, 58px)', fontFamily: '"Inter Tight", sans-serif', fontWeight: 760, letterSpacing: '-0.045em', lineHeight: 1, color: '#ffffff' }}>
                  {plan.price}
                </span>
                {plan.period && <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', marginLeft: 4 }}>{plan.period}</span>}
              </>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3 flex-1 mb-6">
            {plan.highlights.map((feature, i) => (
              <motion.div key={feature}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.1 + i * 0.055 }}
                className="flex items-start gap-2.5"
              >
                <div className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center mt-[1px]"
                  style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}` }}>
                  <Check className="w-2.5 h-2.5" style={{ color: s.checkColor }} />
                </div>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.4 }}>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full overflow-hidden"
            style={{ height: 50, borderRadius: 16, background: s.btnBg, border: `1px solid ${s.btnBorder}`, boxShadow: s.btnGlow, fontSize: 14, fontWeight: 700, color: s.btnText, cursor: 'pointer' }}
          >
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)' }}
              animate={{ x: ['-120%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 + index, ease: 'easeInOut' }}
            />
            <span className="relative z-10">{plan.cta}</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function PricingFeature() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  return (
    <section
      className="overflow-hidden relative"
      id="pricing"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 50% 38%, rgba(191,44,64,0.16), transparent 38%),
          radial-gradient(circle at 22% 44%, rgba(191,44,64,0.09), transparent 30%),
          radial-gradient(circle at 78% 44%, rgba(127,169,211,0.09), transparent 30%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 38%, rgba(0,0,0,0.70) 100%)' }} />

      {/* Large radar rings behind card row */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{ width: 960, height: 640, border: '1px solid rgba(191,44,64,0.07)', borderRadius: '50%' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{ width: 1200, height: 800, border: '1px solid rgba(127,169,211,0.04)', borderRadius: '50%' }} />

      {/* Signal dots */}
      {[
        { x: '6%',  y: '20%', c: '#BF2C40' },
        { x: '14%', y: '76%', c: '#BF2C40' },
        { x: '86%', y: '16%', c: '#7FA9D3' },
        { x: '92%', y: '70%', c: '#7FA9D3' },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: 7, height: 7, background: dot.c, boxShadow: `0 0 10px ${dot.c}99, 0 0 20px ${dot.c}44` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel center>Pricing</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '68px', color: 'rgba(255,255,255,0.97)', marginBottom: 20, whiteSpace: 'nowrap' }}
          >
            Choose your <GradientWord delay={0.5}>Approach</GradientWord>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: 17, color: 'rgba(255,255,255,0.60)', lineHeight: 1.65, letterSpacing: '-0.010em' }}
          >
            Unlock more visibility, deeper discovery, and unlimited connections.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-[960px] mx-auto items-end">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} isSelected={selectedPlan === plan.id} onClick={() => setSelectedPlan(plan.id)} />
          ))}
        </div>

      </div>
    </section>
  );
}
