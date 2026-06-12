import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import approachULogo from '../../../imports/image-1.png';

const NAV_LINKS = [
  'How it Works',
  'Venues',
  'Discover',
  'Connections',
  'Messages',
  'Safety',
  'Onboarding',
  'Pricing',
].map(item => item.toUpperCase());

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-full flex items-center justify-between"
        style={{
          background: 'rgba(7,10,25,0.78)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 18px 60px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          padding: '8px 10px 8px 16px',
        }}
      >
        {/* Logo */}
        <a href="#product" className="flex-shrink-0 flex items-center">
          <img src={approachULogo} alt="ApproachU" className="h-9 w-auto object-contain" />
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[13.5px] text-white/60 hover:text-white/95 transition-colors duration-200 px-3.5 py-1.5 rounded-full hover:bg-white/[0.04]"
              style={{ letterSpacing: '-0.01em' }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-2">
          {/* <motion.a
            href="#hero-download"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center justify-center rounded-full text-white text-[13px] h-[38px] px-6 overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #BF2C40 0%, #a02235 100%)',
              border: '1px solid rgba(255,255,255,0.16)',
              boxShadow: '0 8px 24px rgba(191,44,64,0.30), inset 0 1px 0 rgba(255,255,255,0.18)',
              fontWeight: 600,
              letterSpacing: '0em',
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }}
              animate={{ x: ['-120%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
            />
            <span className="relative z-10">Download</span>
          </motion.a> */}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-full w-9 h-9 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(7,10,25,0.92)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.60)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col py-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] uppercase text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors px-5 py-3"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {item}
                </a>
              ))}
              {/* <div className="px-4 pt-2 pb-3">
                <button
                  className="w-full flex items-center justify-center rounded-full text-white text-[14px] h-[44px] relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #BF2C40 0%, #a02235 100%)',
                    border: '1px solid rgba(255,255,255,0.16)',
                    boxShadow: '0 8px 24px rgba(191,44,64,0.30)',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Download
                </button>
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
