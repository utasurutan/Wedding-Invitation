import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Calendar, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';

export default function Hero({ isOpened, onOpenInvitation }) {
  const [guestName, setGuestName] = useState('Tamu Terhormat');
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Membaca query parameter ?to=Nama+Tamu dari URL
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('to');
    if (recipient) {
      setGuestName(decodeURIComponent(recipient.replace(/\+/g, ' ')));
    }
  }, []);

  const handleOpenClick = () => {
    setIsOpening(true);

    // Efek kembang api emas & sage (Bespoke Golden Confetti)
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#dfba6d', '#cca048', '#91ac8c', '#ffffff', '#dcceb4'],
        ticks: 200,
        gravity: 0.9,
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      onOpenInvitation();
    }, 600);
  };

  return (
    <section 
      id="hero" 
      className={`relative w-full min-h-screen flex items-center justify-center text-center px-4 py-8 overflow-hidden transition-all duration-1000 ${
        isOpened ? 'relative' : 'fixed inset-0 z-50 overflow-hidden'
      }`}
    >
      {/* Background Image: High-fashion Editorial Wedding with Layered Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 transform filter brightness-[0.68] contrast-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/40 to-stone-950/85 backdrop-blur-[1px]" />
      </div>

      {/* Ornamen Garis Halus Gilded Gold Frame */}
      <div className="absolute inset-4 md:inset-8 border border-champagne-300/30 rounded-3xl pointer-events-none z-10 flex flex-col justify-between p-4">
        <div className="flex justify-between items-center text-champagne-200/40 text-[10px] tracking-[0.3em] uppercase font-display">
          <span>The Wedding</span>
          <span>MMXXVI</span>
        </div>
        <div className="flex justify-between items-center text-champagne-200/40 text-[10px] tracking-[0.3em] uppercase font-display">
          <span>Jakarta</span>
          <span>28.11.2026</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-xl w-full flex flex-col items-center justify-between min-h-[85vh] py-6">
        
        {/* Header Kategori */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="font-display text-[11px] md:text-xs uppercase tracking-[0.45em] text-champagne-300 font-semibold mb-2 drop-shadow">
            The Wedding Celebration of
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-champagne-300 to-transparent" />
        </motion.div>

        {/* Monogram & Nama Mempelai */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center my-6"
        >
          {/* Royal Seal Monogram */}
          <div className="relative mb-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-champagne-300/50 flex items-center justify-center bg-stone-900/40 backdrop-blur-md shadow-2xl">
              <span className="font-display text-2xl md:text-3xl text-gold-gradient font-bold tracking-widest pl-1">
                R &amp; K
              </span>
            </div>
            <div className="absolute -inset-1.5 rounded-full border border-champagne-400/20 animate-spin-slow" />
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight drop-shadow-lg leading-none">
            Rakha <span className="font-script text-champagne-300 text-4xl sm:text-5xl md:text-6xl mx-1 font-light">&amp;</span> Kinari
          </h1>

          <p className="font-serif italic text-stone-300 text-base md:text-lg mt-3 tracking-wide drop-shadow">
            {weddingData.event.displayDate}
          </p>
        </motion.div>

        {/* Amplop Tamu & Tombol Buka Undangan */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full flex flex-col items-center"
        >
          {/* Kartu Penerima Undangan (Parchment Card with Gilded Border) */}
          <div className="w-full max-w-sm rounded-2xl p-6 bg-stone-900/60 backdrop-blur-md border border-champagne-300/30 shadow-2xl mb-6 relative overflow-hidden text-center">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-300 to-transparent" />
            
            <p className="font-display text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-champagne-200/90 mb-2 font-medium">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold tracking-wide drop-shadow mb-1">
              {guestName}
            </h2>
            
            <p className="text-[11px] text-stone-300/80 italic font-serif">
              Kami dengan hormat mengundang Anda untuk hadir berbagi kebahagiaan.
            </p>
          </div>

          {/* Tombol Interaktif Buka Undangan dengan Royal Wax Stamp Accent */}
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            type="button"
            className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-gradient-to-r from-sage-800 via-sage-700 to-sage-800 hover:from-sage-700 hover:to-sage-600 text-white font-medium text-sm md:text-base tracking-widest uppercase font-display shadow-2xl shadow-stone-950/80 border border-champagne-300/40 hover:border-champagne-200 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-champagne-300 text-stone-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-3.5 h-3.5 fill-stone-900" />
            </div>
            <span className="text-champagne-100 font-semibold tracking-[0.2em]">
              {isOpening ? 'Membuka...' : 'Buka Undangan'}
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
