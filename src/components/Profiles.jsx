import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Profiles() {
  const { groom, bride, quote, quoteSource } = weddingData.couple;
  const { loveStory } = weddingData;

  return (
    <section id="profiles" className="relative py-24 px-4 md:px-8 bg-paper overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-sage-200/40 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-champagne-200/40 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Kutipan Ayat Suci (Editorial Typography) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/80 border border-champagne-300/50 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span className="font-serif italic text-xs tracking-widest text-stone-700">
              Bismillahirrahmanirrahim
            </span>
          </div>

          <p className="font-serif italic text-stone-700 text-base md:text-lg leading-relaxed mb-3">
            "{quote}"
          </p>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-sage-800">
            {quoteSource}
          </p>

          <div className="mt-10">
            <span className="font-display text-[10px] uppercase tracking-[0.35em] text-champagne-700 font-semibold block mb-1">
              Pasangan Berbahagia
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal">
              Kedua Mempelai
            </h2>
            <p className="font-serif text-stone-600 text-sm md:text-base mt-2 max-w-md mx-auto italic">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengikat janji suci pernikahan:
            </p>
          </div>
        </motion.div>

        {/* Pasangan Mempelai: 2 Kolom Sejajar Desktop, Stack di Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center relative mb-24">
          
          {/* Ampersand Center Crest untuk Desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#fbf9f6] border border-champagne-300 shadow-xl items-center justify-center">
            <span className="font-script text-3xl text-gold-gradient font-bold">&amp;</span>
          </div>

          {/* Kartu Mempelai Pria (Rakha) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 md:p-10 rounded-3xl wedding-card hover:shadow-xl transition-all duration-500"
          >
            {/* Foto Arch Mewah dengan Double Hairline Border */}
            <div className="relative mb-6">
              <div className="w-48 h-64 md:w-52 md:h-70 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-white shadow-2xl relative z-10">
                <img
                  src={groom.photo}
                  alt={groom.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -inset-2.5 rounded-t-full rounded-b-3xl border border-champagne-300/70 -z-0" />
            </div>

            <span className="font-script text-4xl md:text-5xl text-gold-gradient mb-1">
              {groom.nickname}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-2">
              {groom.name}
            </h3>

            <div className="w-10 h-[1.5px] bg-champagne-400 my-2" />

            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-stone-500 mt-2">
              {groom.order}
            </p>
            <p className="font-serif text-base text-stone-800 font-medium mt-1">
              {groom.father}
            </p>
            <p className="font-serif text-base text-stone-800 font-medium mb-5">
              &amp; {groom.mother}
            </p>

            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-champagne-100/70 text-stone-700 hover:text-stone-900 text-xs font-medium border border-stone-200 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>{groom.instagramHandle}</span>
            </a>
          </motion.div>

          {/* Kartu Mempelai Wanita (Kinar) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 md:p-10 rounded-3xl wedding-card hover:shadow-xl transition-all duration-500"
          >
            {/* Foto Arch Mewah dengan Double Hairline Border */}
            <div className="relative mb-6">
              <div className="w-48 h-64 md:w-52 md:h-70 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-white shadow-2xl relative z-10">
                <img
                  src={bride.photo}
                  alt={bride.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -inset-2.5 rounded-t-full rounded-b-3xl border border-champagne-300/70 -z-0" />
            </div>

            <span className="font-script text-4xl md:text-5xl text-gold-gradient mb-1">
              {bride.nickname}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-2">
              {bride.name}
            </h3>

            <div className="w-10 h-[1.5px] bg-champagne-400 my-2" />

            <p className="font-display text-[10px] uppercase tracking-[0.25em] text-stone-500 mt-2">
              {bride.order}
            </p>
            <p className="font-serif text-base text-stone-800 font-medium mt-1">
              {bride.father}
            </p>
            <p className="font-serif text-base text-stone-800 font-medium mb-5">
              &amp; {bride.mother}
            </p>

            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-champagne-100/70 text-stone-700 hover:text-stone-900 text-xs font-medium border border-stone-200 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>{bride.instagramHandle}</span>
            </a>
          </motion.div>

        </div>

        {/* Love Story Timeline (Sentuhan Manusiawi & Romantis) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto pt-8 border-t border-champagne-300/40 text-center"
        >
          <div className="inline-flex items-center gap-1.5 mb-2 text-champagne-700 font-display text-[11px] uppercase tracking-[0.3em]">
            <Heart className="w-3.5 h-3.5 fill-champagne-500/20 text-champagne-600" />
            <span>Kisah Kasih Kami</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-stone-900 mb-10">
            Perjalanan Menuju Hari Bahagia
          </h3>

          <div className="relative border-l-2 border-champagne-200 ml-4 md:mx-auto md:max-w-xl text-left space-y-8 pl-6">
            {loveStory.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Marker Dot */}
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-champagne-400 border-2 border-white shadow" />
                
                <span className="font-display text-xs font-bold text-sage-800 tracking-wider">
                  {milestone.year}
                </span>
                <h4 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                  {milestone.title}
                </h4>
                <p className="font-serif text-stone-600 text-sm leading-relaxed mt-1">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
