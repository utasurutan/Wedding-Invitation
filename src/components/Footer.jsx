import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-stone-950 text-stone-300 py-20 px-4 text-center overflow-hidden border-t border-champagne-300/20">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Monogram Seal */}
          <div className="w-14 h-14 rounded-full border border-champagne-400/40 flex items-center justify-center mx-auto mb-6 bg-white/5 shadow-2xl">
            <span className="font-display text-lg text-gold-gradient font-bold tracking-widest pl-0.5">
              R &amp; K
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-5xl text-white font-normal mb-4">
            Rakha <span className="font-script text-champagne-300 text-3xl md:text-4xl">&amp;</span> Kinari
          </h3>

          <p className="font-serif italic text-stone-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10">
            Atas kehadiran, doa restu, dan kehangatan yang Bapak/Ibu/Saudara/i berikan, kami mengucapkan terima kasih yang tak terhingga.
          </p>

          <div className="font-serif text-xs md:text-sm text-stone-300 space-y-2 mb-12">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-champagne-400 font-semibold">
              Keluarga Besar
            </p>
            <p className="font-medium text-stone-200">
              Keluarga Bpk. Ir. Hendra Aditama &amp; Ibu Dra. Hj. Ratna Dewi
            </p>
            <p className="text-champagne-300 font-script text-xl">&amp;</p>
            <p className="font-medium text-stone-200">
              Keluarga Bpk. Drs. H. Bambang Supriyadi &amp; Ibu Hj. Siti Rahmawati, M.Pd.
            </p>
          </div>

          {/* Tombol Kembali ke Atas */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-champagne-300 border border-champagne-400/30 text-xs font-display tracking-widest uppercase font-semibold transition-all mb-10 cursor-pointer active:scale-95 shadow-md"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Kembali ke Atas</span>
          </button>

          <p className="font-display text-[10px] text-stone-500 tracking-[0.25em] uppercase">
            &copy; MMXXVI The Wedding of Rakha &amp; Kinari &bull; All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
