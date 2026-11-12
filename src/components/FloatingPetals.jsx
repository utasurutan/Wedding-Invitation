import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Komponen animasi kelopak bunga sakura / mawar berjatuhan lembut saat halaman di-scroll
export default function FloatingPetals({ count = 18 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + (Math.random() * 8 - 4)}%`,
      size: Math.random() * 12 + 10, // 10px - 22px
      duration: Math.random() * 8 + 10, // 10s - 18s
      delay: Math.random() * 10,
      sway: Math.random() * 60 + 30, // 30px - 90px
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.35, // 0.35 - 0.75
      color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#fce7f3' : '#fed7aa', // Soft Rose, Blush, Champagne
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: -40,
            x: 0,
            rotate: petal.rotate,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, petal.sway, -petal.sway, petal.sway / 2, 0],
            rotate: [petal.rotate, petal.rotate + 180, petal.rotate + 360],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.3,
          }}
        >
          {/* SVG Kelopak Bunga Organik */}
          <svg
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
          >
            <path
              d="M15 0C6 10 0 22 5 32C10 42 20 42 25 32C30 22 24 10 15 0Z"
              fill={petal.color}
              fillOpacity="0.85"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

