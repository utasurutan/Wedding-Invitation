import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check, Car, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function LocationMaps() {
  const { venueName, fullAddress, mapsUrl, embedUrl, parkingNotes } = weddingData.location;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName} - ${fullAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-24 px-4 md:px-8 bg-paper relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 mb-2 font-display text-[10px] uppercase tracking-[0.35em] text-champagne-700">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Navigasi Acara</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal">
            Peta Lokasi Acara
          </h2>
          <p className="font-serif italic text-stone-600 text-sm md:text-base max-w-md mx-auto mt-2">
            Panduan lokasi untuk mempermudah perjalanan Anda menuju tempat berbahagia kami.
          </p>
        </motion.div>

        {/* Map Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden wedding-card p-4 md:p-6"
        >
          {/* Iframe Google Maps */}
          <div className="w-full h-80 md:h-[420px] rounded-2xl overflow-hidden relative shadow-inner border border-stone-200">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Pernikahan Rakha & Kinari"
            />
          </div>

          {/* Rincian Alamat & Aksi */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xl">
                <MapPin className="w-5 h-5 text-champagne-600 shrink-0" />
                <span>{venueName}</span>
              </div>
              <p className="text-stone-600 font-serif text-sm mt-1 max-w-xl">
                {fullAddress}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs text-sage-800 font-sans">
                <Car className="w-3.5 h-3.5 text-sage-600" />
                <span>{parkingNotes}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 hover:border-champagne-500 bg-white text-stone-700 text-xs font-display tracking-wider font-semibold transition-all active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-champagne-200 text-xs font-display tracking-wider uppercase font-semibold shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-champagne-400" />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
