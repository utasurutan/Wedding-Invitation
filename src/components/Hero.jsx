import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MailOpen, Heart, Calendar } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Hero({ isOpened, onOpenInvitation }) {
  const [guestName, setGuestName] = useState('Tamu Undangan');

  useEffect(() => {
    // Membaca parameter 'to' dari query URL (misal: ?to=Nama+Tamu)
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('to');
    if (recipient) {
      // Decode dan bersihkan nama tamu
      setGuestName(decodeURIComponent(recipient.replace(/\+/g, ' ')));
    }
  }, []);

  return (
    <section 
      id="hero" 
      className={`relative w-full min-h-screen flex flex-col justify-between items-center text-center px-4 py-10 transition-all duration-700 select-none ${
        isOpened ? 'relative' : 'fixed inset-0 z-50 overflow-hidden'
      }`}
    >
      {/* Background Image with romantic soft overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 transform filter brightness-75"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-950/80 backdrop-blur-[2px]" />
      </div>

      {/* Ornamen Floral / Aksen Dekoratif Atas */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-4"
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-champagne-200 font-medium">
          The Wedding Celebration of
        </p>
      </motion.div>

      {/* Judul Mempelai & Tanggal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center my-auto"
      >
        {/* Monogram / Inisial */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-champagne-300/40 flex items-center justify-center mb-6 bg-white/5 backdrop-blur-sm shadow-xl">
          <span className="font-serif text-2xl md:text-3xl text-champagne-200 tracking-wider">
            R &amp; K
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight drop-shadow-md">
          Rakha &amp; Kinari
        </h1>

        <div className="flex items-center gap-3 my-4">
          <span className="h-[1px] w-12 bg-champagne-300/60" />
          <Heart className="w-4 h-4 text-champagne-300 fill-champagne-300/50 animate-pulse" />
          <span className="h-[1px] w-12 bg-champagne-300/60" />
        </div>

        <div className="flex items-center gap-2 text-stone-200 text-sm md:text-base tracking-widest font-light">
          <Calendar className="w-4 h-4 text-champagne-300" />
          <span>{weddingData.event.displayDate}</span>
        </div>
      </motion.div>

      {/* Sapaan Tamu & Tombol Buka Undangan */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 w-full max-w-md pb-6 flex flex-col items-center"
      >
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl mb-6">
          <p className="text-xs uppercase tracking-widest text-stone-300 mb-2">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-champagne-200 tracking-wide mb-1 break-words">
            {guestName}
          </h2>
          <p className="text-xs text-stone-300/90 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* CTA Buka Undangan */}
        <button
          onClick={onOpenInvitation}
          type="button"
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-sage-600 via-sage-500 to-sage-600 hover:from-sage-500 hover:to-sage-700 text-white font-medium text-sm md:text-base tracking-wide shadow-lg shadow-sage-950/40 hover:shadow-sage-500/30 transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
        >
          <MailOpen className="w-5 h-5 text-champagne-200 group-hover:scale-110 transition-transform duration-300" />
          <span>Buka Undangan</span>
        </button>
      </motion.div>
    </section>
  );
}

