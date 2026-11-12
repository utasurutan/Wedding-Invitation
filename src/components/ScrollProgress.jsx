import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress({ isOpened }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  if (!isOpened) return null;

  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-50 pointer-events-none bg-stone-200/20">
      <motion.div
        className="h-full bg-gradient-to-r from-champagne-400 via-amber-300 to-sage-500 origin-left shadow-[0_0_8px_rgba(223,186,109,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}

