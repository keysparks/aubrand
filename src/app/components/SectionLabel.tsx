import { motion } from 'motion/react';

export function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        fontFamily: '"Inter Tight", sans-serif',
        fontSize: '34px',
        fontWeight: 600,
        letterSpacing: '0.16em',
        color: '#E8364E',
        textTransform: 'uppercase',
        textAlign: center ? 'center' : 'left',
        marginBottom: '8px',
      }}
    >
      {children}
    </motion.p>
  );
}
