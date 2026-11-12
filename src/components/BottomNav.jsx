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

    // Deteksi section yang sedang terlihat saat di-scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
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
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-4 inset-x-0 mx-auto w-fit max-w-[95vw] z-40"
      >
        <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-white/90 backdrop-blur-lg rounded-full border border-sage-200/80 shadow-2xl shadow-sage-950/15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-sage-800 font-semibold'
                    : 'text-stone-500 hover:text-sage-700'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-sage-100/90 rounded-full -z-10 border border-sage-300/40"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-sage-700' : ''}`} />
                <span className="text-[10px] md:text-xs mt-0.5 tracking-tight font-medium">
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

