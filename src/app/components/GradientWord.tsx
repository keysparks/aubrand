import { motion } from 'motion/react';

interface GradientWordProps {
  children: React.ReactNode;
  delay?: number;
}

export function GradientWord({ children, delay = 0 }: GradientWordProps) {
  return (
    <motion.span
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        background: 'linear-gradient(90deg, #E8364E 0%, #E8364E 30%, #b05070 55%, #99CCFF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        backgroundSize: '200% 100%',
        display: 'inline',
      }}
    >
      {children}
    </motion.span>
  );
}
