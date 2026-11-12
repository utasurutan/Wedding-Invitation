import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, MapPin, Image as ImageIcon, Gift, MessageSquareHeart } from 'lucide-react';

const navItems = [
  { id: 'profiles', label: 'Mempelai', icon: User },
  { id: 'schedule', label: 'Jadwal', icon: Calendar },
  { id: 'location', label: 'Lokasi', icon: MapPin },
  { id: 'gallery', label: 'Galeri', icon: ImageIcon },
  { id: 'gift', label: 'Hadiah', icon: Gift },
  { id: 'rsvp', label: 'RSVP', icon: MessageSquareHeart },
];

export default function BottomNav({ isOpened }) {
  const [activeSection, setActiveSection] = useState('profiles');

  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!isOpened) return null;

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 90, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 inset-x-0 mx-auto w-fit max-w-[95vw] z-40"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 bg-stone-900/90 backdrop-blur-xl rounded-full border border-champagne-300/30 shadow-2xl shadow-stone-950/40">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-champagne-200 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBottomNavPill"
                    className="absolute inset-0 bg-sage-800/80 rounded-full -z-10 border border-champagne-400/40 shadow-inner"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className={`w-4 h-4 md:w-4.5 md:h-4.5 transition-transform duration-200 ${isActive ? 'scale-110 text-champagne-300' : ''}`} />
                <span className="text-[10px] md:text-[11px] mt-0.5 tracking-tight font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
