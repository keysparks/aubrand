import { motion } from 'motion/react';
import { MapPin, Send } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GradientWord } from '../GradientWord';
import { SectionLabel } from '../SectionLabel';

const AVATAR_URL =
  'https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3QlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzczNjQwODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080';

const chatMessages = [
  { id: 1, text: 'Hey There. I saw you earlier and hoped you were on ApproachU', sent: false, delay: 0.5 },
  { id: 2, text: 'Hi. Yes, Cool.. I think I saw you just walk downstairs',        sent: true,  delay: 0.9 },
  { id: 3, text: 'Yes, we are down here now, why don\'t you guys stop by',        sent: false, delay: 1.3 },
  { id: 4, text: "Ok.. We'll be right there",                                     sent: true,  delay: 1.7 },
];

const messagingFeatures = [
  'Venue-anchored conversations',
  'Mutual connection chats',
  'Real-time messaging',
  'Chat anytime after successful connection',
];

/* ——— Chat Bubble ——— */
function ChatBubble({ text, sent, delay }: { text: string; sent: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: sent ? 10 : -10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-[80%] ${sent ? 'self-end' : 'self-start'}`}
    >
      <div
        style={sent ? {
          borderRadius: '18px 18px 4px 18px',
          background: 'linear-gradient(135deg, #BF2C40 0%, #E04458 100%)',
          color: '#fff',
          fontSize: 14,
          lineHeight: 1.45,
          padding: '10px 16px',
          boxShadow: '0 8px 28px rgba(191,44,64,0.32), inset 0 1px 0 rgba(255,255,255,0.18)',
        } : {
          borderRadius: '18px 18px 18px 4px',
          background: 'rgba(255,255,255,0.065)',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.82)',
          fontSize: 14,
          lineHeight: 1.45,
          padding: '10px 16px',
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

/* ——— Main Section ——— */
export function MessagingFeature() {
  return (
    <section
      className="overflow-hidden relative"
      id="messages"
      style={{
        padding: 'clamp(100px, 11vw, 160px) 0',
        background: `
          radial-gradient(circle at 26% 44%, rgba(191,44,64,0.13), transparent 34%),
          radial-gradient(circle at 76% 42%, rgba(127,169,211,0.10), transparent 36%),
          linear-gradient(180deg, #010000 0%, #050507 52%, #010000 100%)
        `,
      }}
    >
      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.66) 100%)' }} />

      {/* Section radar arcs */}
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '26%', width: 500, height: 380, transform: 'translate(-50%,-50%)', border: '1px solid rgba(191,44,64,0.07)', borderRadius: '50%' }} />
      <div className="absolute pointer-events-none" style={{ top: '50%', left: '76%', width: 460, height: 340, transform: 'translate(-50%,-50%)', border: '1px solid rgba(127,169,211,0.06)', borderRadius: '50%' }} />

      {/* Signal dots */}
      {[
        { x: '8%',  y: '22%', c: '#BF2C40' },
        { x: '16%', y: '72%', c: '#BF2C40' },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ===== Right text (DOM first = mobile first) ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 lg:order-2"
          >
            <SectionLabel>Messages</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, fontSize: '68px', color: '#fff' }}
            >
              Conversations that
              <br />
              start somewhere <GradientWord delay={1}>real</GradientWord>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ fontSize: '19px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.68, letterSpacing: '-0.010em' }}
            >
              Every conversation on ApproachU begins with a shared venue. Chat with people
              you've connected with while you're both at the same place.
            </motion.p>

            <div className="flex flex-col gap-3.5 pt-2">
              {messagingFeatures.map((feature, i) => (
                <motion.div key={feature}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3.5"
                >
                  <span className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ background: i % 2 === 0 ? '#BF2C40' : '#7FA9D3', boxShadow: i % 2 === 0 ? '0 0 8px rgba(191,44,64,0.5)' : '0 0 8px rgba(127,169,211,0.5)' }} />
                  <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.010em' }}>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ===== Left — Chat Visual ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex justify-center items-center lg:order-1"
            style={{ minHeight: 580 }}
          >
            {/* Radar rings behind panel */}
            {[600, 480, 360, 245].map((size, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
                style={{ width: size, height: size, border: `1px solid ${i < 2 ? `rgba(191,44,64,${0.10 - i * 0.03})` : `rgba(127,169,211,${0.09 - (i-2) * 0.03})`}` }}
              />
            ))}

            {/* Ambient glow */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{ width: 380, height: 420, background: 'radial-gradient(circle, rgba(191,44,64,0.09) 0%, rgba(127,169,211,0.05) 45%, transparent 65%)', filter: 'blur(50px)', willChange: 'transform' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ——— Chat Panel ——— */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden flex flex-col scale-75 sm:scale-100 origin-center"
              style={{
                width: 420,
                borderRadius: 34,
                background: `radial-gradient(circle at 24% 0%, rgba(191,44,64,0.11), transparent 34%), linear-gradient(180deg, rgba(18,20,30,0.94), rgba(7,8,13,0.92))`,
                border: '1px solid rgba(255,255,255,0.13)',
                boxShadow: '0 44px 120px rgba(0,0,0,0.66), 0 0 68px rgba(191,44,64,0.12), 0 0 70px rgba(127,169,211,0.08), inset 0 1px 0 rgba(255,255,255,0.10)',
                backdropFilter: 'blur(18px)',
              }}
            >
              {/* Inner top highlight */}
              <div className="absolute top-0 left-6 right-6 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }} />

              {/* Shimmer */}
              <motion.div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)' }}
                animate={{ x: ['-120%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 7 }}
              />

              {/* — Header pill — */}
              <div className="flex justify-center pt-5 pb-4 px-5">
                <div className="px-5 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', fontSize: 13, color: 'rgba(255,255,255,0.70)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                  Messages / Conversations
                </div>
              </div>

              {/* — Match + Venue row — */}
              <div className="flex items-center justify-between px-4 pb-4 gap-3">
                {/* Chloe matched chip */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl relative overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(191,44,64,0.10)', border: '1px solid rgba(191,44,64,0.26)', backdropFilter: 'blur(12px)' }}>
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1.5px solid rgba(191,44,64,0.50)', boxShadow: '0 0 10px rgba(191,44,64,0.25)' }}>
                    <ImageWithFallback src={AVATAR_URL} alt="Chloe" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.92)', fontWeight: 600, lineHeight: 1.2 }}><span style={{ color: '#fff' }}>Chloe</span> matched</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.42)', lineHeight: 1 }}>with you! Say hello.</p>
                  </div>
                </div>

                {/* Venue chip */}
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl flex-shrink-0"
                  style={{ background: 'rgba(127,169,211,0.09)', border: '1px solid rgba(127,169,211,0.24)', backdropFilter: 'blur(12px)' }}>
                  <MapPin style={{ width: 11, height: 11, color: '#7FA9D3', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>The Alchemist Bar</span>
                </div>
              </div>

              {/* — Divider — */}
              <div className="mx-4 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* — Chat messages — */}
              <div className="flex flex-col gap-2.5 px-4 py-4 overflow-hidden" style={{ flex: 1 }}>
                {chatMessages.map((msg) => (
                  <ChatBubble key={msg.id} text={msg.text} sent={msg.sent} delay={msg.delay} />
                ))}

                {/* Typing bubble — outgoing red style */}
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.94 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  className="self-end"
                >
                  <div style={{ borderRadius: '18px 18px 4px 18px', background: 'linear-gradient(135deg, #BF2C40, #E04458)', boxShadow: '0 8px 28px rgba(191,44,64,0.32), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '10px 16px', fontSize: 14, color: '#fff' }}>
                    Typing...
                  </div>
                </motion.div>
              </div>

              {/* — Divider — */}
              <div className="mx-4 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* — Live status — */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.3 }}
                className="flex justify-center pt-3 pb-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(7,9,14,0.88)', border: '1px solid rgba(127,169,211,0.20)', boxShadow: '0 8px 24px rgba(0,0,0,0.40), 0 0 20px rgba(127,169,211,0.08)' }}>
                  <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.7)' }}
                    animate={{ opacity: [1, 0.35, 1], scale: [1, 0.75, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.68)', textTransform: 'uppercase' }}>Live now @ The Alchemist Bar</span>
                </div>
              </motion.div>

              {/* — Input field — */}
              <div className="px-4 pb-5 pt-1">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.5 }}
                  className="flex items-center gap-2 px-4"
                  style={{ height: 50, borderRadius: 18, background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.10)' }}
                >
                  <span className="flex-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>Type a message...</span>
                  <motion.div className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(127,169,211,0.18)', border: '1px solid rgba(127,169,211,0.28)' }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Send style={{ width: 13, height: 13, color: '#7FA9D3' }} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Small signal dots around panel */}
            {[
              { x: '-6%',  y: '18%', c: '#BF2C40', d: 0 },
              { x: '102%', y: '62%', c: '#7FA9D3', d: 1.4 },
              { x: '8%',   y: '90%', c: '#7FA9D3', d: 2.6 },
              { x: '96%',  y: '12%', c: '#BF2C40', d: 2.0 },
            ].map((dot, i) => (
              <motion.div key={i} className="absolute pointer-events-none rounded-full"
                style={{ left: dot.x, top: dot.y, width: 5, height: 5, background: dot.c, boxShadow: `0 0 10px ${dot.c}` }}
                animate={{ opacity: [0.15, 0.65, 0.15], scale: [0.8, 1.5, 0.8] }}
                transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: dot.d }}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}