import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Profiles() {
  const { groom, bride, quote, quoteSource } = weddingData.couple;

  return (
    <section id="profiles" className="relative py-20 px-4 md:px-8 bg-sage-50 overflow-hidden">
      {/* Background Floral Texture Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-100 rounded-full filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-champagne-100 rounded-full filter blur-3xl opacity-60 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Kutipan Ayat Suci */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-sage-100 border border-sage-200 text-xs font-serif tracking-widest text-sage-800">
            Bismillahirrahmanirrahim
          </div>
          <p className="font-serif italic text-stone-700 text-sm md:text-base leading-relaxed mb-3">
            "{quote}"
          </p>
          <p className="text-xs font-semibold uppercase tracking-wider text-sage-700">
            {quoteSource}
          </p>

          <div className="mt-8">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-normal">
              Kedua Mempelai
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-md mx-auto">
              Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:
            </p>
          </div>
        </motion.div>

        {/* Pasangan Mempelai: 2 Kolom Sejajar di Desktop, Tumpuk di Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative">
          
          {/* Ikon Penghubung di Tengah untuk Layar Besar */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-champagne-50 border-2 border-champagne-300 items-center justify-center shadow-lg">
            <span className="font-serif text-xl font-bold text-champagne-600">&amp;</span>
          </div>

          {/* Kartu Mempelai Pria (Rakha) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl glass-card hover:shadow-xl transition-shadow duration-300"
          >
            {/* Bingkai Foto Arch / Arsitektural */}
            <div className="relative mb-6">
              <div className="w-48 h-60 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-xl relative z-10">
                <img
                  src={groom.photo}
                  alt={groom.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-champagne-300/60 -z-0" />
            </div>

            <span className="font-script text-4xl text-sage-600 mb-1">
              {groom.nickname}
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              {groom.name}
            </h3>

            <div className="w-12 h-[2px] bg-champagne-300 mb-4" />

            <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
              Putra Pertama dari:
            </p>
            <p className="text-sm font-medium text-stone-800">
              {groom.father}
            </p>
            <p className="text-sm font-medium text-stone-800 mb-4">
              &amp; {groom.mother}
            </p>

            <a
              href={groom.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-sage-100 text-stone-700 hover:text-sage-800 text-xs font-medium transition-colors"
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
            className="flex flex-col items-center text-center p-8 rounded-3xl glass-card hover:shadow-xl transition-shadow duration-300"
          >
            {/* Bingkai Foto Arch / Arsitektural */}
            <div className="relative mb-6">
              <div className="w-48 h-60 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-xl relative z-10">
                <img
                  src={bride.photo}
                  alt={bride.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-champagne-300/60 -z-0" />
            </div>

            <span className="font-script text-4xl text-sage-600 mb-1">
              {bride.nickname}
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              {bride.name}
            </h3>

            <div className="w-12 h-[2px] bg-champagne-300 mb-4" />

            <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
              Putri Kedua dari:
            </p>
            <p className="text-sm font-medium text-stone-800">
              {bride.father}
            </p>
            <p className="text-sm font-medium text-stone-800 mb-4">
              &amp; {bride.mother}
            </p>

            <a
              href={bride.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-sage-100 text-stone-700 hover:text-sage-800 text-xs font-medium transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>{bride.instagramHandle}</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

