import { motion } from 'motion/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { LegalModal } from '../LegalModal';
import footerBg from '../../../imports/footer-bg-2.jpg';

/* ——— Social Icons ——— */
const socials = [
  {
    name: 'Instagram',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'X',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

/* ——— Main Footer ——— */

export function Footer() {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = footerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stars = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      x: `${(i * 37 + 11) % 100}%`,
      y: `${(i * 53 + 7) % 100}%`,
      size: (i % 3) * 0.7 + 0.4,
      delay: (i * 0.4) % 5,
      duration: 3 + (i % 4),
    })), []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-[#010000]" style={{ minHeight: 760 }}>

      {/* ===== Parallax BG Image ===== */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: (mousePos.x - 0.5) * -16,
          y: (mousePos.y - 0.5) * -16,
          width: 'calc(100% + 50px)',
          height: 'calc(100% + 50px)',
          top: -25,
          left: -25,
        }}
      >
        <img src={footerBg} alt="" className="w-full h-full object-cover object-center" style={{ opacity: 0.92 }} />
      </motion.div>

      {/* Dark overlay — heavy at top so nav text reads, fades out toward illustration */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(1,0,0,0.88) 0%, rgba(1,0,0,0.70) 22%, rgba(1,0,0,0.20) 55%, rgba(1,0,0,0.10) 80%, rgba(1,0,0,0.55) 100%)' }} />

      {/* Red light leak — top left */}
      <motion.div className="absolute pointer-events-none"
        style={{ top: '18%', left: '10%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(191,44,64,0.11) 0%, rgba(191,44,64,0.03) 45%, transparent 70%)', filter: 'blur(90px)' }}
        animate={{ scale: [1, 1.28, 1], opacity: [0.28, 0.58, 0.28] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blue haze — bottom right */}
      <motion.div className="absolute pointer-events-none"
        style={{ bottom: '15%', right: '8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(127,169,211,0.09) 0%, rgba(127,169,211,0.02) 45%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.22, 0.48, 0.22] }}
        transition={{ duration: 8, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Aurora band — red */}
      <motion.div className="absolute pointer-events-none"
        style={{ top: '30%', left: '-8%', width: '116%', height: 100, background: 'linear-gradient(90deg, transparent 5%, rgba(191,44,64,0.03) 30%, rgba(191,44,64,0.055) 50%, rgba(191,44,64,0.03) 70%, transparent 95%)', filter: 'blur(28px)', transform: 'rotate(-3.5deg)' }}
        animate={{ opacity: [0.4, 0.75, 0.4], y: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Aurora band — blue */}
      <motion.div className="absolute pointer-events-none"
        style={{ top: '62%', left: '-8%', width: '116%', height: 80, background: 'linear-gradient(90deg, transparent 10%, rgba(127,169,211,0.025) 35%, rgba(127,169,211,0.05) 55%, rgba(127,169,211,0.025) 75%, transparent 90%)', filter: 'blur(24px)', transform: 'rotate(2deg)' }}
        animate={{ opacity: [0.3, 0.6, 0.3], y: [0, 6, 0] }}
        transition={{ duration: 10, delay: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Ambient stars */}
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size, background: 'white' }}
          animate={{ opacity: [0.02, 0.28, 0.02], scale: [0.7, 1.2, 0.7] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ===== Content ===== */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: 760 }}>
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 flex flex-col flex-1" style={{ paddingTop: 72, paddingBottom: 0 }}>

          {/* Store buttons + QR — centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center justify-center gap-4 mb-10"
            style={{ marginTop: 200 }}
          >
            {/* App Store */}
            <motion.a href="#" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-3 overflow-hidden cursor-pointer"
              style={{ height: 56, paddingLeft: 18, paddingRight: 22, borderRadius: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 22px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', transition: 'border-color 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(191,44,64,0.40)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 60px rgba(0,0,0,0.52), 0 0 24px rgba(191,44,64,0.16), inset 0 1px 0 rgba(255,255,255,0.10)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.10)'; }}>
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }}
                animate={{ x: ['-120%', '200%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }} />
              <svg className="w-6 h-6 text-white relative z-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="relative z-10">
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', lineHeight: 1, marginBottom: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Download on the</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>App Store</p>
              </div>
            </motion.a>

            {/* Google Play */}
            <motion.a href="#" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-3 overflow-hidden cursor-pointer"
              style={{ height: 56, paddingLeft: 18, paddingRight: 22, borderRadius: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 22px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)', transition: 'border-color 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(127,169,211,0.36)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 60px rgba(0,0,0,0.52), 0 0 24px rgba(127,169,211,0.14), inset 0 1px 0 rgba(255,255,255,0.10)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.10)'; }}>
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)' }}
                animate={{ x: ['-120%', '200%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }} />
              <svg className="w-6 h-6 relative z-10 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.61 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.384.22-.724.61-.92z" fill="#4285F4" />
                <path d="M17.12 8.58L5.074.658C4.546.342 3.92.274 3.61 1.814l10.183 10.183 3.327-3.417z" fill="#EA4335" />
                <path d="M3.61 22.186c.31 1.54.936 1.472 1.464 1.156L17.12 15.42l-3.327-3.417L3.61 22.186z" fill="#34A853" />
                <path d="M20.942 10.653l-3.822-2.073-3.327 3.417 3.327 3.417 3.822-2.073c.758-.413.758-2.275 0-2.688z" fill="#FBBC04" />
              </svg>
              <div className="relative z-10">
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', lineHeight: 1, marginBottom: 3, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Get it on</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Google Play</p>
              </div>
            </motion.a>

            {/* QR */}
            <motion.div whileHover={{ scale: 1.05 }}
              style={{ borderRadius: 16, padding: 8, background: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 22px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)' }}>
              <div style={{ width: 68, height: 68, borderRadius: 10, background: '#ffffff', overflow: 'hidden', position: 'relative' }}>
                <div className="absolute inset-[5px] grid grid-cols-9 grid-rows-9 gap-[0.5px]">
                  {Array.from({ length: 81 }, (_, i) => {
                    const row = Math.floor(i / 9), col = i % 9;
                    const isFinder = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
                    const isData = !isFinder && ((row * 13 + col * 7 + row * col) % 5) < 2;
                    return <div key={i} className="rounded-[0.5px]" style={{ background: (isFinder || isData) ? '#1a1a2e' : 'transparent' }} />;
                  })}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-sm flex items-center justify-center" style={{ background: '#BF2C40' }}>
                  <div className="w-1 h-1 rounded-[1px] bg-white" />
                </div>
              </div>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.40)', textAlign: 'center', marginTop: 6, letterSpacing: '0.02em' }}>Scan to download</p>
            </motion.div>
          </motion.div>

          {/* Bottom bar: centered copyright + legal links */}
          <div className="flex flex-col items-center gap-8 pb-8">
            <div className="flex items-center gap-2">
              {socials.map((social, i) => (
                <motion.a key={social.name} href="#"
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center cursor-pointer"
                  style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.borderColor = i % 2 === 0 ? 'rgba(191,44,64,0.40)' : 'rgba(127,169,211,0.36)'; el.style.boxShadow = i % 2 === 0 ? '0 0 16px rgba(191,44,64,0.22)' : '0 0 16px rgba(127,169,211,0.18)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.60)'; el.style.borderColor = 'rgba(255,255,255,0.10)'; el.style.boxShadow = 'none'; }}>
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>
              <span>&copy; {new Date().getFullYear()} Approach U. All rights reserved.</span>
              <span>•</span>
              <button onClick={() => setModal('privacy')} className="hover:text-white/70 transition-colors bg-transparent border-0 p-0 cursor-pointer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>Privacy Policy</button>
              <span>•</span>
              <button onClick={() => setModal('terms')} className="hover:text-white/70 transition-colors bg-transparent border-0 p-0 cursor-pointer" style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>Terms of Service</button>
              <span>•</span>
              <a href="#safety" className="hover:text-white/70 transition-colors" style={{ color: 'rgba(255,255,255,0.28)' }}>Safety</a>
            </div>
          </div>

        </div>
      </div>

      <LegalModal type={modal} onClose={() => setModal(null)} />
    </footer>
  );
}
