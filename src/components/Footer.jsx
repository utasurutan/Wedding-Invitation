import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-stone-900 text-stone-300 py-16 px-4 text-center overflow-hidden">
      {/* Decorative floral or pattern background */}
      <div className="absolute inset-0 bg-wedding-pattern opacity-5" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-12 rounded-full border border-champagne-400/30 flex items-center justify-center mx-auto mb-6 bg-white/5">
            <Heart className="w-5 h-5 text-champagne-300 fill-champagne-300/40" />
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-white font-normal mb-3">
            Rakha &amp; Kinari
          </h3>

          <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto mb-8">
            Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian, kami mengucapkan terima kasih yang tulus dari lubuk hati yang terdalam.
          </p>

          <div className="text-xs text-stone-400 space-y-1 mb-10">
            <p className="uppercase tracking-widest text-champagne-300 font-medium">Kami Yang Berbahagia</p>
            <p className="font-serif text-base text-stone-200">Keluarga Besar Bpk. Hendra Aditama &amp; Ibu Ratna Dewi</p>
            <p className="font-serif text-base text-stone-200">&amp;</p>
            <p className="font-serif text-base text-stone-200">Keluarga Besar Bpk. Bambang Supriyadi &amp; Ibu Siti Rahmawati</p>
          </div>

          {/* Tombol Kembali ke Atas */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs transition-colors mb-8"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Kembali ke Atas</span>
          </button>

          <p className="text-[11px] text-stone-500 tracking-wider">
            &copy; 2026 The Wedding of Rakha &amp; Kinari. Designed with love.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

