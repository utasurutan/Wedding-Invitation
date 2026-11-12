import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function LocationMaps() {
  const { venueName, fullAddress, mapsUrl, embedUrl } = weddingData.location;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName} - ${fullAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-20 px-4 md:px-8 bg-sage-50/50">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
            Petunjuk Arah
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal mt-2 mb-3">
            Peta Lokasi Acara
          </h2>
          <p className="text-stone-600 text-sm max-w-lg mx-auto">
            Kemudahan akses dan panduan navigasi menuju tempat diselenggarakannya momen bahagia kami.
          </p>
        </motion.div>

        {/* Card Peta */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden glass-card shadow-xl p-4 md:p-6"
        >
          {/* Iframe Google Maps */}
          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden relative shadow-inner border border-stone-200">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Pernikahan Rakha & Kinari"
              className="w-full h-full"
            />
          </div>

          {/* Rincian Alamat & Tombol Aksi */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sage-800 font-serif font-bold text-lg">
                <MapPin className="w-5 h-5 text-sage-600 shrink-0" />
                <span>{venueName}</span>
              </div>
              <p className="text-stone-600 text-xs md:text-sm mt-1 max-w-xl">
                {fullAddress}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Tombol Salin Alamat */}
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 hover:border-sage-500 bg-white text-stone-700 text-xs font-medium transition-colors active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-500" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>

              {/* Tombol Buka di Google Maps */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-700 hover:bg-sage-800 text-white text-xs md:text-sm font-medium shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4 text-champagne-300" />
                <span>Buka di Google Maps</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

