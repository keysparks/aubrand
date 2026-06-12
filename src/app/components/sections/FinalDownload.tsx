import { motion } from 'motion/react';
import { Download, Home, Apple, Play } from 'lucide-react';
import { useMemo } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GradientWord } from '../GradientWord';
import { SectionLabel } from '../SectionLabel';

/* ——— Avatar data ——— */
const avatars = [
  { src: 'https://images.unsplash.com/flagged/photo-1579924711789-872f06ecf220?q=80&w=120&auto=format&fit=crop', trail: '#E8364E' },
  { src: 'https://images.unsplash.com/photo-1724118135481-50436d913231?q=80&w=120&auto=format&fit=crop', trail: '#99CCFF' },
  { src: 'https://images.unsplash.com/photo-1757347398206-7425300ef990?q=80&w=120&auto=format&fit=crop', trail: '#E8364E' },
  { src: 'https://images.unsplash.com/photo-1769071167136-f25178b607dd?q=80&w=120&auto=format&fit=crop', trail: '#99CCFF' },
  { src: 'https://images.unsplash.com/photo-1659481993364-4512775ed911?q=80&w=120&auto=format&fit=crop', trail: '#E8364E' },
  { src: 'https://images.unsplash.com/photo-1769636929231-3cd7f853d038?q=80&w=120&auto=format&fit=crop', trail: '#99CCFF' },
];

/* ——— Orbital positions for each avatar (ellipse %) ——— */
const orbitalPositions = [
  { cx: '18%', cy: '55%', angle: -20, orbitRx: 60, orbitRy: 20 },
  { cx: '78%', cy: '42%', angle: 15, orbitRx: 55, orbitRy: 18 },
  { cx: '12%', cy: '38%', angle: -35, orbitRx: 50, orbitRy: 15 },
  { cx: '85%', cy: '60%', angle: 25, orbitRx: 65, orbitRy: 22 },
  { cx: '30%', cy: '68%', angle: -10, orbitRx: 45, orbitRy: 16 },
  { cx: '70%', cy: '32%', angle: 30, orbitRx: 55, orbitRy: 20 },
];

/* ——— Twinkling Star ——— */
function TwinklingStar({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'white' }}
      animate={{ opacity: [0.03, 0.6, 0.03], scale: [0.8, 1.3, 0.8] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ——— Comet Avatar ——— */
function CometAvatar({ avatar, position, index }: { avatar: typeof avatars[number]; position: typeof orbitalPositions[number]; index: number }) {
  const trailAngle = position.angle;
  const trailLength = 65 + index * 8;

  return (
    <motion.div
      className="absolute z-20"
      style={{ left: position.cx, top: position.cy, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{
          x: [0, position.orbitRx * 0.3, 0, -position.orbitRx * 0.3, 0],
          y: [0, -position.orbitRy * 0.3, 0, position.orbitRy * 0.3, 0],
        }}
        transition={{ duration: 12 + index * 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.8 }}
      >
        {/* Comet trail */}
        <div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: trailLength,
            height: 20,
            transform: `translate(-100%, -50%) rotate(${trailAngle}deg)`,
            transformOrigin: 'right center',
            background: `linear-gradient(90deg, transparent, ${avatar.trail}22 30%, ${avatar.trail}55 70%, ${avatar.trail}88)`,
            borderRadius: '50px 0 0 50px',
            filter: 'blur(4px)',
          }}
        />

        {/* Trail glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: trailLength * 0.6,
            height: 6,
            transform: `translate(-90%, -50%) rotate(${trailAngle}deg)`,
            transformOrigin: 'right center',
            background: `linear-gradient(90deg, transparent, ${avatar.trail})`,
            borderRadius: '50px',
            filter: 'blur(2px)',
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        />

        {/* Avatar circle */}
        <div className="relative">
          {/* Glow ring */}
          <motion.div
            className="absolute -inset-1 rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${avatar.trail}44, transparent 50%, ${avatar.trail}22)`,
              filter: 'blur(2px)',
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
          />
          <div
            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden"
            style={{
              border: `2px solid ${avatar.trail}88`,
              boxShadow: `0 0 16px ${avatar.trail}44, 0 4px 12px rgba(0,0,0,0.5)`,
            }}
          >
            <ImageWithFallback
              src={avatar.src}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function FinalDownload() {
  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * 2.2 + 0.5,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 3.5,
      })),
    []
  );

  return (
    <section className="py-24 md:py-32 overflow-hidden relative" id="download">
      {/* ===== Background starfield ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star, i) => (
          <TwinklingStar key={`ds-${i}`} {...star} />
        ))}

        {/* Central radial glow behind headline */}
        <motion.div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(232,54,78,0.06) 0%, rgba(153,204,255,0.03) 35%, transparent 65%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Red nebula bottom */}
        <motion.div
          className="absolute bottom-[-5%] left-[20%] w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,54,78,0.05) 0%, transparent 60%)', filter: 'blur(55px)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Blue nebula top-right */}
        <motion.div
          className="absolute top-[10%] right-[5%] w-[350px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(153,204,255,0.04) 0%, transparent 60%)', filter: 'blur(50px)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        {/* Shooting comets */}
        <motion.div
          className="absolute top-[15%] left-0 h-px"
          style={{ width: 100, background: 'linear-gradient(90deg, transparent, rgba(153,204,255,0.35), transparent)' }}
          animate={{ x: ['-10%', '110vw'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 8, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute bottom-[25%] right-0 h-px"
          style={{ width: 80, background: 'linear-gradient(270deg, transparent, rgba(232,54,78,0.3), transparent)' }}
          animate={{ x: ['5vw', '-110vw'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 10, ease: [0.4, 0, 0.2, 1], delay: 4 }}
        />

        {/* Aurora whisp */}
        <motion.div
          className="absolute top-[55%] left-[-5%] w-[110%] h-[50px]"
          style={{
            background: 'linear-gradient(90deg, transparent 10%, rgba(232,54,78,0.012) 35%, rgba(153,204,255,0.015) 65%, transparent 90%)',
            filter: 'blur(18px)',
          }}
          animate={{ opacity: [0.15, 0.35, 0.15], y: [0, -4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Glow dots */}
        {[
          { x: '5%', y: '20%', c: '#99CCFF', d: 0 },
          { x: '95%', y: '35%', c: '#E8364E', d: 1 },
          { x: '15%', y: '75%', c: '#E8364E', d: 2.5 },
          { x: '85%', y: '80%', c: '#99CCFF', d: 3.5 },
          { x: '50%', y: '10%', c: '#E8364E', d: 1.5 },
        ].map((dot, i) => (
          <motion.div
            key={`gd-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: dot.x, top: dot.y, width: 3, height: 3, borderRadius: '50%',
              background: dot.c, boxShadow: `0 0 10px ${dot.c}`,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: dot.d }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* ===== Top: Text Content ===== */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[13px] font-semibold tracking-widest uppercase mb-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(153,204,255,0.12), rgba(153,204,255,0.04))',
              border: '1px solid rgba(153,204,255,0.3)',
              color: '#99CCFF',
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(153,204,255,0.08), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            />
            <Download className="w-3.5 h-3.5 mr-2 relative z-10" />
            <span className="relative z-10">Get The App</span>
          </motion.div>

          {/* Headline */}
          <SectionLabel center>Get the app</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-[52px] font-bold tracking-tight leading-[1.08] text-white mb-5"
          >
            Meet people where
            <br />
            life <GradientWord delay={0.5}>happens</GradientWord>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[17px] text-white/50 leading-relaxed max-w-lg mx-auto"
          >
            Discover who's around you right now and start conversations
            that lead to real-life connections.
          </motion.p>
        </div>

        {/* ===== Cosmic Orbital Scene ===== */}
        <div className="relative mx-auto" style={{ maxWidth: 800, height: 340 }}>

          {/* Orbital ellipses */}
          {[
            { rx: 320, ry: 85, opacity: 0.07, delay: 0, dash: '4 8' },
            { rx: 250, ry: 65, opacity: 0.09, delay: 0.5, dash: '3 6' },
            { rx: 180, ry: 48, opacity: 0.12, delay: 1, dash: '2 5' },
            { rx: 110, ry: 32, opacity: 0.15, delay: 1.5, dash: '0' },
          ].map((orbit, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                width: orbit.rx * 2,
                height: orbit.ry * 2,
                marginLeft: -orbit.rx,
                marginTop: -orbit.ry,
                borderRadius: '50%',
                border: `1px ${orbit.dash === '0' ? 'solid' : 'dashed'} rgba(255,255,255,${orbit.opacity})`,
                ...(orbit.dash !== '0' ? {} : {}),
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + orbit.delay * 0.15 }}
            >
              {/* Rotating glow point on each orbit */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#E8364E' : '#99CCFF',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? '#E8364E' : '#99CCFF'}`,
                  top: -1,
                  left: '50%',
                  marginLeft: -3,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
                // rotate around center
              />
            </motion.div>
          ))}

          {/* ——— Central Venue Hub ——— */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer pulse rings */}
            {[1, 2, 3].map(ring => (
              <motion.div
                key={`ring-${ring}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 56 + ring * 24,
                  height: 56 + ring * 24,
                  border: `1px solid rgba(232,54,78,${0.15 - ring * 0.03})`,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.08, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: ring * 0.6 }}
              />
            ))}

            {/* Hub glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(232,54,78,0.2) 0%, rgba(232,54,78,0.04) 50%, transparent 70%)',
                filter: 'blur(15px)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Venue icon */}
            <motion.div
              className="relative w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(160deg, rgba(232,54,78,0.3) 0%, rgba(232,54,78,0.1) 100%)',
                border: '2px solid rgba(232,54,78,0.4)',
                boxShadow: '0 0 30px rgba(232,54,78,0.2), 0 8px 25px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Home className="w-6 h-6 text-[#E8364E]" />
            </motion.div>
          </motion.div>

          {/* ——— Comet Avatars ——— */}
          {avatars.map((avatar, i) => (
            <CometAvatar key={`ca-${i}`} avatar={avatar} position={orbitalPositions[i]} index={i} />
          ))}

          {/* ——— City Skyline Silhouette ——— */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10" style={{ height: 80 }}>
            {/* Skyline gradient fade */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #070a19 0%, transparent 100%)',
              }}
            />
            {/* SVG Skyline */}
            <svg
              viewBox="0 0 800 80"
              className="absolute bottom-0 w-full"
              style={{ opacity: 0.15 }}
              preserveAspectRatio="none"
            >
              <path
                d="M0 80 L0 60 L30 60 L30 45 L40 45 L40 55 L60 55 L60 38 L70 38 L70 30 L80 30 L80 38 L95 38 L95 50 L110 50 L110 42 L120 42 L120 35 L130 35 L130 20 L140 20 L140 35 L150 35 L150 50 L170 50 L170 40 L185 40 L185 55 L200 55 L200 45 L210 45 L210 30 L215 30 L215 15 L225 15 L225 30 L235 30 L235 50 L260 50 L260 42 L270 42 L270 35 L275 35 L275 25 L285 25 L285 10 L290 10 L290 25 L300 25 L300 45 L320 45 L320 55 L340 55 L340 42 L350 42 L350 28 L360 28 L360 18 L365 18 L365 8 L375 8 L375 18 L380 18 L380 28 L390 28 L390 42 L410 42 L410 50 L430 50 L430 38 L440 38 L440 22 L445 22 L445 12 L455 12 L455 22 L460 22 L460 38 L480 38 L480 48 L500 48 L500 55 L520 55 L520 45 L535 45 L535 32 L540 32 L540 20 L550 20 L550 32 L560 32 L560 48 L580 48 L580 55 L600 55 L600 42 L615 42 L615 35 L625 35 L625 25 L630 25 L630 15 L640 15 L640 25 L650 25 L650 40 L670 40 L670 50 L690 50 L690 55 L710 55 L710 45 L720 45 L720 38 L730 38 L730 48 L750 48 L750 55 L770 55 L770 50 L790 50 L790 60 L800 60 L800 80 Z"
                fill="rgba(255,255,255,0.5)"
              />
              {/* Building windows (tiny dots) */}
              {Array.from({ length: 40 }, (_, i) => (
                <rect
                  key={`w-${i}`}
                  x={50 + Math.random() * 700}
                  y={20 + Math.random() * 40}
                  width={2}
                  height={2.5}
                  rx={0.5}
                  fill={Math.random() > 0.5 ? '#E8364E' : '#99CCFF'}
                  opacity={Math.random() * 0.4 + 0.1}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* ===== Download Buttons + QR ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-10 md:mt-14"
        >
          {/* App Store Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-3 px-6 py-3.5 rounded-xl overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(232,54,78,0.3)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(232,54,78,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }}
              animate={{ x: ['-120%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
            {/* Apple icon */}
            <svg className="w-6 h-6 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="relative z-10">
              <p className="text-[10px] text-white/50 leading-none">Download on</p>
              <p className="text-[16px] font-semibold text-white leading-tight">App Store</p>
            </div>
          </motion.a>

          {/* Google Play Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-3 px-6 py-3.5 rounded-xl overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }}
              animate={{ x: ['-120%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 7, ease: 'easeInOut' }}
            />
            {/* Play icon */}
            <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill="none">
              <path d="M3.61 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.384.22-.724.61-.92z" fill="#4285F4"/>
              <path d="M17.12 8.58L5.074.658C4.546.342 3.92.274 3.61 1.814l10.183 10.183 3.327-3.417z" fill="#EA4335"/>
              <path d="M3.61 22.186c.31 1.54.936 1.472 1.464 1.156L17.12 15.42l-3.327-3.417L3.61 22.186z" fill="#34A853"/>
              <path d="M20.942 10.653l-3.822-2.073-3.327 3.417 3.327 3.417 3.822-2.073c.758-.413.758-2.275 0-2.688z" fill="#FBBC04"/>
            </svg>
            <div className="relative z-10">
              <p className="text-[10px] text-white/50 leading-none">Get it on</p>
              <p className="text-[16px] font-semibold text-white leading-tight">Google Play</p>
            </div>
          </motion.a>

          {/* QR Code Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 ml-0 sm:ml-3"
          >
            {/* QR Code (CSS-generated placeholder) */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0"
              style={{
                background: 'white',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(153,204,255,0.08)',
              }}
            >
              {/* QR pattern built with CSS grid */}
              <div className="absolute inset-[6px] grid grid-cols-9 grid-rows-9 gap-[1px]">
                {/* Top-left finder */}
                {[0,1,2,3,4,5,6].map(r => [0,1,2,3,4,5,6].map(c => {
                  const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
                  const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
                  const show = isBorder || isInner;
                  return r < 7 && c < 7 ? null : null;
                }))}
                {/* Simplified QR using semi-random pattern */}
                {Array.from({ length: 81 }, (_, i) => {
                  const row = Math.floor(i / 9);
                  const col = i % 9;
                  // Finder patterns (top-left, top-right, bottom-left)
                  const isTopLeftFinder = row < 3 && col < 3;
                  const isTopRightFinder = row < 3 && col > 5;
                  const isBottomLeftFinder = row > 5 && col < 3;
                  const isFinder = isTopLeftFinder || isTopRightFinder || isBottomLeftFinder;
                  // Center of finders
                  const isFinderCenter = (row === 1 && col === 1) || (row === 1 && col === 7) || (row === 7 && col === 1);
                  // Border of finders
                  const isFinderBorder = isFinder && !isFinderCenter;
                  // Data pattern
                  const hash = ((row * 13 + col * 7 + row * col) % 5);
                  const isData = !isFinder && hash < 2;

                  const filled = isFinder || isData;

                  return (
                    <div
                      key={i}
                      className="rounded-[0.5px]"
                      style={{
                        background: filled
                          ? isFinderCenter ? '#E8364E' : '#1a1a2e'
                          : 'transparent',
                      }}
                    />
                  );
                })}
              </div>
              {/* Center logo dot */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-sm flex items-center justify-center"
                style={{ background: '#E8364E' }}
              >
                <div className="w-1.5 h-1.5 rounded-[1px] bg-white" />
              </div>

              {/* Subtle glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{ boxShadow: 'inset 0 0 15px rgba(153,204,255,0.1)' }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <div>
              <p className="text-[13px] text-white/40 leading-snug">
                QR code for quick
                <br />
                mobile download
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}