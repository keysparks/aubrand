import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import heroImage from "../../../imports/hero-6-2.png";
import Logo from "../../../imports/image-1.png"
import { CometScene } from '../CometScene';

const AppleIcon = () => (
  <svg viewBox="0 0 384 512" className="w-6 h-6" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" fill="#4285F4"/>
    <path fill="#34A853" d="M3.396.319A1 1 0 0 1 4.004.2l.004.002L17.556 8.234l-3.764 3.765L3.396.319z"/>
    <path fill="#FBBC04" d="M3.396 23.681L13.792 12l3.764 3.766L4.008 23.798l-.004.002a1 1 0 0 1-.608-.119z"/>
    <path fill="#EA4335" d="M21.395 10.492l-3.839-2.258L13.792 12l3.764 3.766 3.839-2.258c.728-.404.728-1.412 0-2.016z"/>
  </svg>
);

function AmbientStar({ x, y, size, delay, duration }: { x: string; y: string; size: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: 'white' }}
      animate={{ opacity: [0.02, 0.28, 0.02], scale: [0.7, 1.2, 0.7] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = sectionRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stars = useMemo(() =>
    Array.from({ length: 22 }, () => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })), []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] w-full max-w-[100vw] flex flex-col overflow-hidden bg-[#070a19]"
      id="product"
    >
      {/* z-0: Background image */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
        style={{
          x: (mousePos.x - 0.5) * -16,
          y: (mousePos.y - 0.5) * -16,
        }}
      >
        <img
          src={heroImage}
          alt="Night city skyline"
          className="w-[calc(100%+50px)] h-[calc(100%+170px)] max-w-none object-cover object-center -ml-[25px] -mt-[25px]"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(7,10,25,0.22) 0%, rgba(7,10,25,0.08) 40%, rgba(7,10,25,0.35) 100%)' }}
        />
      </motion.div>

      {/* z-1: Depth + light leaks */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a19] via-transparent to-[#070a19]/45" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#070a19] to-transparent" />
        <motion.div
          className="absolute top-[18%] left-[10%] w-[550px] h-[550px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,54,78,0.11) 0%, rgba(232,54,78,0.03) 45%, transparent 70%)', filter: 'blur(90px)' }}
          animate={{ scale: [1, 1.28, 1], opacity: [0.28, 0.58, 0.28] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[8%] w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(153,204,255,0.09) 0%, rgba(153,204,255,0.02) 45%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.22, 0.48, 0.22] }}
          transition={{ duration: 8, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[30%] left-[-8%] w-[116%] h-[100px]"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(232,54,78,0.03) 30%, rgba(232,54,78,0.055) 50%, rgba(232,54,78,0.03) 70%, transparent 95%)', filter: 'blur(28px)', transform: 'rotate(-3.5deg)' }}
          animate={{ opacity: [0.4, 0.75, 0.4], y: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[62%] left-[-8%] w-[116%] h-[80px]"
          style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(153,204,255,0.025) 35%, rgba(153,204,255,0.05) 55%, rgba(153,204,255,0.025) 75%, transparent 90%)', filter: 'blur(24px)', transform: 'rotate(2deg)' }}
          animate={{ opacity: [0.3, 0.6, 0.3], y: [0, 6, 0] }}
          transition={{ duration: 10, delay: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* z-2: Stars */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {stars.map((star, i) => (
          <AmbientStar key={`s-${i}`} x={star.x} y={star.y} size={star.size} delay={star.delay} duration={star.duration} />
        ))}
      </div>

      {/* z-2: Orbital rings */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{ width: '130vh', height: '80vh', border: '1px solid rgba(255,255,255,0.025)', transform: 'translate(-50%, -50%) rotate(-20deg)' }}
          animate={{ rotate: ['-20deg', '-18deg', '-20deg'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{ width: '165vh', height: '105vh', border: '1px solid rgba(255,255,255,0.015)', transform: 'translate(-50%, -50%) rotate(-20deg)' }}
          animate={{ rotate: ['-20deg', '-22deg', '-20deg'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* z-3: CometScene — always BELOW hero text */}
      <CometScene />

      {/* z-4: Vignette */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(7,10,25,0.55) 100%)' }}
      />

      {/* z-10: Hero content — always on top */}
      <div className="relative z-10 flex flex-col min-h-screen w-full overflow-hidden">
        <div className="flex flex-col items-center w-full px-6 lg:px-12">

          <div className="h-[80px] sm:h-[110px] md:h-[110px] lg:h-[90px]" />

 
          <img src={Logo} alt="ApproachU" className="h-40 -z-1 sm:h-20 sm:w-90 md:h-50 md:w-120" />
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="
              font-elephant
              font-extrabold
              tracking-[-0.02em]
              leading-[1.08]
              text-[42px]
              sm:text-[62px]
              md:text-[100px]
              lg:text-[100px]
              text-white
              text-center
              w-full
              max-w-[900px]
            "
          >
            See who&apos;s where
            <br />
            <motion.span
              style={{
                background: 'linear-gradient(90deg, #BF2C40, #E04458, #7FA9D3, #BF2C40, #E04458)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
              }}
              animate={{ backgroundPosition: ['0% center', '100% center'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              meet them now
            </motion.span>
          </motion.h1>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Store buttons */}
        <motion.div
          id="hero-download"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pb-10 px-4 w-full max-w-[340px] sm:max-w-none mx-auto"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer overflow-hidden flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
            style={{ background: 'rgba(10,12,28,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)' }}
          >
            <AppleIcon />
            <div className="flex flex-col items-start">
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>Download on the</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3 }}>App Store</span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-3 px-5 py-2.5 rounded-2xl cursor-pointer overflow-hidden flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
            style={{ background: 'rgba(10,12,28,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)' }}
          >
            <GooglePlayIcon />
            <div className="flex flex-col items-start">
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>Get it on</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3 }}>Google Play</span>
            </div>
          </motion.button>

          {/* QR — sm+ only */}
          <div
            className="flex flex-col items-center gap-1 rounded-2xl p-2 flex-shrink-0"
            style={{ background: 'rgba(10,12,28,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 8px 28px rgba(0,0,0,0.45)' }}
          >
            <div className="bg-white rounded-lg p-1.5">
              <svg width="72" height="72" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="44" height="44" rx="4" fill="none" stroke="black" strokeWidth="6"/>
                <rect x="18" y="18" width="24" height="24" rx="3" fill="black"/>
                <rect x="108" y="8" width="44" height="44" rx="4" fill="none" stroke="black" strokeWidth="6"/>
                <rect x="118" y="18" width="24" height="24" rx="3" fill="black"/>
                <rect x="8" y="108" width="44" height="44" rx="4" fill="none" stroke="black" strokeWidth="6"/>
                <rect x="18" y="118" width="24" height="24" rx="3" fill="black"/>
                <rect x="60" y="12" width="8" height="8" rx="1" fill="black"/>
                <rect x="76" y="12" width="8" height="8" rx="1" fill="black"/>
                <rect x="92" y="12" width="8" height="8" rx="1" fill="black"/>
                <rect x="60" y="24" width="8" height="8" rx="1" fill="black"/>
                <rect x="76" y="24" width="16" height="8" rx="1" fill="black"/>
                <rect x="60" y="36" width="16" height="8" rx="1" fill="black"/>
                <rect x="84" y="36" width="8" height="8" rx="1" fill="black"/>
                <rect x="12" y="60" width="8" height="8" rx="1" fill="black"/>
                <rect x="28" y="60" width="8" height="8" rx="1" fill="black"/>
                <rect x="44" y="60" width="8" height="8" rx="1" fill="black"/>
                <rect x="60" y="56" width="8" height="16" rx="1" fill="black"/>
                <rect x="76" y="60" width="8" height="8" rx="1" fill="black"/>
                <rect x="92" y="56" width="8" height="8" rx="1" fill="black"/>
                <rect x="108" y="60" width="8" height="8" rx="1" fill="black"/>
                <rect x="124" y="60" width="8" height="16" rx="1" fill="black"/>
                <rect x="140" y="60" width="8" height="8" rx="1" fill="black"/>
                <rect x="12" y="76" width="16" height="8" rx="1" fill="black"/>
                <rect x="36" y="76" width="8" height="8" rx="1" fill="black"/>
                <rect x="68" y="76" width="8" height="8" rx="1" fill="black"/>
                <rect x="84" y="76" width="16" height="8" rx="1" fill="black"/>
                <rect x="108" y="76" width="8" height="8" rx="1" fill="black"/>
                <rect x="140" y="76" width="8" height="8" rx="1" fill="black"/>
                <rect x="12" y="92" width="8" height="8" rx="1" fill="black"/>
                <rect x="44" y="92" width="16" height="8" rx="1" fill="black"/>
                <rect x="68" y="92" width="8" height="8" rx="1" fill="black"/>
                <rect x="84" y="88" width="8" height="16" rx="1" fill="black"/>
                <rect x="100" y="92" width="8" height="8" rx="1" fill="black"/>
                <rect x="124" y="92" width="8" height="8" rx="1" fill="black"/>
                <rect x="60" y="108" width="8" height="8" rx="1" fill="black"/>
                <rect x="76" y="112" width="16" height="8" rx="1" fill="black"/>
                <rect x="100" y="108" width="8" height="8" rx="1" fill="black"/>
                <rect x="116" y="112" width="8" height="8" rx="1" fill="black"/>
                <rect x="140" y="108" width="8" height="8" rx="1" fill="black"/>
                <rect x="60" y="124" width="8" height="8" rx="1" fill="black"/>
                <rect x="76" y="124" width="8" height="8" rx="1" fill="black"/>
                <rect x="100" y="124" width="16" height="8" rx="1" fill="black"/>
                <rect x="124" y="124" width="8" height="8" rx="1" fill="black"/>
                <rect x="60" y="140" width="16" height="8" rx="1" fill="black"/>
                <rect x="84" y="140" width="8" height="8" rx="1" fill="black"/>
                <rect x="108" y="140" width="8" height="8" rx="1" fill="black"/>
                <rect x="124" y="136" width="8" height="16" rx="1" fill="black"/>
                <rect x="140" y="140" width="8" height="8" rx="1" fill="black"/>
              </svg>
            </div>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>Scan to download</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}