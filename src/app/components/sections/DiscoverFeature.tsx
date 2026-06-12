import { motion } from 'motion/react';
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import cometIcon from '../../../imports/Asset_2_3x.png';
import redCometIcon from '../../../imports/donw.png';
import whiteCometIcon from '../../../imports/Asset_2_3x-1.png';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SectionLabel } from '../SectionLabel';
import redGirl from '../../../imports/2151831085.jpg';
import girl2 from '../../../imports/18022.jpg';
import girl3 from '../../../imports/257.jpg';

/* ——— Profile data ——— */
const profiles = [
  {
    name: 'Yuki',
    age: 27,
    image: girl2,
    interests: ['Live Music', 'Cocktails'],
    venue: 'Skyline Rooftop',
  },
  {
    name: 'Sophie',
    age: 24,
    image: girl3,
    interests: ['House Music', 'Wine'],
    venue: 'The Ruby Lounge',
  },
  {
    name: 'Elena',
    age: 25,
    image: redGirl,
    interests: ['Jazz Nights', 'Photography'],
    venue: 'Brew & Grind',
  },
];

const featureHighlights = [
  { label: 'Real-time venue discovery',   color: '#BF2C40' },
  { label: 'Profile Picture cards',        color: '#7FA9D3' },
  { label: 'Profiles with up to 5 photos', color: '#BF2C40' },
  { label: 'Advanced discovery filters',   color: '#7FA9D3' },
];

/* ——— Orbit Particle — kept from original ——— */
function OrbitParticle({ radius, size, duration, delay, color, cx = 0, cy = 0 }: { radius: number; size: number; duration: number; delay: number; color: string; cx?: number; cy?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: size, height: size, top: '50%', left: cx }}
      animate={{
        x: [Math.cos(0)*radius, Math.cos(Math.PI*.5)*radius, Math.cos(Math.PI)*radius, Math.cos(Math.PI*1.5)*radius, Math.cos(Math.PI*2)*radius],
        y: [Math.sin(0)*radius - size/2, Math.sin(Math.PI*.5)*radius - size/2, Math.sin(Math.PI)*radius - size/2, Math.sin(Math.PI*1.5)*radius - size/2, Math.sin(Math.PI*2)*radius - size/2],
        opacity: [0.2, 0.7, 0.2, 0.7, 0.2],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      <div className="w-full h-full rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
    </motion.div>
  );
}

/* ——— Profile Card — upgraded styles ——— */
function ProfileCard({ profile, style, zIndex, delay, isActive }: {
  profile: (typeof profiles)[0]; style: React.CSSProperties; zIndex: number; delay: number; isActive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute rounded-[30px] overflow-hidden"
      style={{
        ...style,
        zIndex,
        width: 280,
        height: 400,
        background: 'linear-gradient(180deg, rgba(18,20,30,0.92) 0%, rgba(7,8,13,0.90) 100%)',
        border: isActive ? '1.5px solid rgba(191,44,64,0.48)' : '1px solid rgba(127,169,211,0.22)',
        boxShadow: isActive
          ? '0 36px 100px rgba(0,0,0,0.62), 0 0 55px rgba(191,44,64,0.18), inset 0 1px 0 rgba(255,255,255,0.10)'
          : '0 36px 100px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.06)',
        opacity: isActive ? 1 : 0.75,
      }}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <ImageWithFallback src={profile.image} alt={profile.name} className="w-full h-full object-cover object-top" style={{ filter: 'brightness(0.88) contrast(1.08)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 48%, rgba(7,8,13,0.72) 65%, rgba(7,8,13,0.97) 100%)' }} />
        {isActive && <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(191,44,64,0.10), transparent 55%)' }} />}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2.5">
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{profile.name}</h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.48)', marginTop: 3 }}>{profile.age} years</p>
        </div>

        {/* Interest chips */}
        <div className="flex gap-1.5 flex-wrap">
          {profile.interests.map(interest => (
            <span key={interest} className="px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.075)', border: '1px solid rgba(255,255,255,0.10)', fontSize: '12px', color: 'rgba(255,255,255,0.76)' }}>
              {interest}
            </span>
          ))}
        </div>

        {/* Venue chip */}
        <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full" style={{ background: 'rgba(127,169,211,0.11)', border: '1px solid rgba(127,169,211,0.22)', fontSize: '12px', color: 'rgba(255,255,255,0.82)' }}>
          <MapPin className="w-3 h-3" style={{ color: '#7FA9D3' }} />
          {profile.venue}
        </span>

        {/* Action buttons — active card only */}
        {isActive && (
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
        )}
      </div>

      {/* Active shimmer */}
      {isActive && (
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)' }}
          animate={{ x: ['-120%', '200%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
        />
      )}
    </motion.div>
  );
}

/* ——— Swipe Arrows — kept ——— */
function SwipeArrows() {
  return (
    <>
      <motion.div className="absolute z-40 pointer-events-none" style={{ bottom: '20%', left: '-10px' }}
        initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.8 }}>
        <motion.div animate={{ x: [-3, 3, -3], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(191,44,64,0.12)', border: '1px solid rgba(191,44,64,0.25)', boxShadow: '0 0 16px rgba(191,44,64,0.15)' }}>
            <ArrowLeft className="w-4 h-4 text-[#BF2C40]" />
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="absolute z-40 pointer-events-none" style={{ top: '35%', right: '0px' }}
        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 2.0 }}>
        <motion.div animate={{ x: [3, -3, 3], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(127,169,211,0.10)', border: '1px solid rgba(127,169,211,0.20)', boxShadow: '0 0 16px rgba(127,169,211,0.12)' }}>
            <ArrowRight className="w-4 h-4 text-[#7FA9D3]" />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

/* ——— Main Section ——— */
export function DiscoverFeature() {
  return (
    <section
      className="overflow-hidden relative"
      id="discover"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 28% 42%, rgba(191,44,64,0.16), transparent 34%),
          radial-gradient(circle at 78% 44%, rgba(127,169,211,0.11), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.66) 100%)' }} />

      {/* Radar arcs — left red (behind card deck) */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '25%', width: 500, height: 380, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.09)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '25%', width: 720, height: 540, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.05)', borderRadius: '50%' }} />

      {/* Radar arcs — right blue (behind text) */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '76%', width: 460, height: 340, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.08)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '76%', width: 660, height: 480, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.04)', borderRadius: '50%' }} />

      {/* Signal dots — 4 intentional */}
      {[
        { x: '10%', y: '25%', c: '#BF2C40' },
        { x: '18%', y: '70%', c: '#BF2C40' },
        { x: '82%', y: '20%', c: '#7FA9D3' },
        { x: '88%', y: '68%', c: '#7FA9D3' },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: 7, height: 7, background: dot.c, boxShadow: `0 0 10px ${dot.c}99, 0 0 20px ${dot.c}44` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3.5 + i*0.5, repeat: Infinity, ease: 'easeInOut', delay: i*0.8 }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ===== Left — Card Fan Stack ===== */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative w-full flex justify-center items-center"
            style={{ minHeight: 560 }}
          >
            {/* Ambient glow — centred on Elena (front card at left:0) */}
            <motion.div className="absolute pointer-events-none" style={{ top: '50%', left: '140px', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(191,44,64,0.13) 0%, rgba(127,169,211,0.05) 45%, transparent 65%)', filter: 'blur(48px)', willChange: 'transform' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.75, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbital rings centred on deck */}
            <motion.div className="absolute pointer-events-none" style={{ top: '50%', left: '140px', width: 440, height: 440, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(191,44,64,0.07)' }}
              animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div className="absolute pointer-events-none" style={{ top: '50%', left: '140px', width: 340, height: 340, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px dashed rgba(127,169,211,0.08)' }}
              animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orbit particles centred on deck */}
            <OrbitParticle radius={220} size={5} duration={18} delay={0}  color="rgba(191,44,64,0.6)"  cx={140} />
            <OrbitParticle radius={220} size={4} duration={18} delay={6}  color="rgba(127,169,211,0.5)" cx={140} />
            <OrbitParticle radius={220} size={3} duration={18} delay={12} color="rgba(191,44,64,0.4)"  cx={140} />
            <OrbitParticle radius={170} size={4} duration={14} delay={3}  color="rgba(127,169,211,0.5)" cx={140} />
            <OrbitParticle radius={170} size={3} duration={14} delay={10} color="rgba(191,44,64,0.5)"  cx={140} />

            {/* Card fan container — right-peek stack matching reference */}
            <div className="relative" style={{ width: 480, height: 500 }}>

              {/* Large radar ring behind deck */}
              <div className="absolute pointer-events-none" style={{ top: '46%', left: '38%', width: 440, height: 440, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(191,44,64,0.14)', boxShadow: 'inset 0 0 80px rgba(191,44,64,0.04)' }} />
              <div className="absolute pointer-events-none" style={{ top: '46%', left: '38%', width: 320, height: 320, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px solid rgba(127,169,211,0.09)' }} />

              {/* Marco — back card, peeks far right */}
              <motion.div className="absolute" style={{ left: 170, top: 0 }}
                animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
                <div style={{ transform: 'rotate(13deg)', transformOrigin: 'bottom center' }}>
                  <ProfileCard profile={profiles[1]} style={{ position: 'relative' }} zIndex={10} delay={0.2} />
                </div>
              </motion.div>

              {/* Bianca — middle card, peeks right */}
              <motion.div className="absolute" style={{ left: 88, top: 18 }}
                animate={{ y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
                <div style={{ transform: 'rotate(6deg)', transformOrigin: 'bottom center' }}>
                  <ProfileCard profile={profiles[0]} style={{ position: 'relative' }} zIndex={20} delay={0.4} />
                </div>
              </motion.div>

              {/* Elena — front card (active), slight left lean */}
              <motion.div className="absolute" style={{ left: 0, top: 36 }}
                animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                <div style={{ transform: 'rotate(-2deg)', transformOrigin: 'bottom center' }}>
                  <ProfileCard profile={profiles[2]} style={{ position: 'relative' }} zIndex={30} delay={0.6} isActive />
                </div>
              </motion.div>

              <SwipeArrows />

              {/* Bottom glow under cards */}
              <div className="absolute bottom-[-30px] left-[30%] -translate-x-1/2 w-[320px] h-[60px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(191,44,64,0.20) 0%, transparent 75%)', filter: 'blur(22px)' }}
              />
            </div>
          </motion.div>

          {/* ===== Right — Text Content ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <SectionLabel>Discover</SectionLabel>

            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '68px', color: 'rgba(255,255,255,0.97)' }}
            >
              See who's{' '}
              <span style={{ background: 'linear-gradient(90deg, #BF2C40 0%, #D75A69 46%, #7FA9D3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nearby</span>
              <br />right now
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '19px', color: 'rgba(255,255,255,0.66)', lineHeight: 1.65, letterSpacing: '-0.010em', maxWidth: 500 }}
            >
              Discover people checked in at the same venue. Move through profiles, view photos, and instantly connect with someone at the same place and moment.
            </motion.p>

            {/* Feature highlights */}
            <div className="flex flex-col pt-2" style={{ gap: '16px' }}>
              {featureHighlights.map((f, i) => (
                <motion.div key={f.label}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i*0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 rounded-full" style={{ width: 8, height: 8, background: f.color, boxShadow: `0 0 10px ${f.color}80` }} />
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.76)', lineHeight: 1.6, letterSpacing: '-0.010em' }}>{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
