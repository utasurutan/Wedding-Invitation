import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Gallery() {
  const images = weddingData.gallery;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Buka lightbox
  const openLightbox = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Kunci scroll layar saat modal aktif
  };

  // Tutup lightbox
  const closeLightbox = () => {
    setIsOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Kembalikan scroll
  };

  // Navigasi gambar berikutnya
  const handleNext = (e) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIdx);
    setSelectedImage(images[nextIdx]);
  };

  // Navigasi gambar sebelumnya
  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIdx);
    setSelectedImage(images[prevIdx]);
  };

  // Listener keyboard ESC & Panah kiri/kanan
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(images[nextIdx]);
      }
      if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIdx);
        setSelectedImage(images[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images]);

  return (
    <section id="gallery" className="py-20 px-4 md:px-8 bg-stone-100/50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
            Kenangan &amp; Cerita
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal mt-2 mb-4">
            Galeri Pre-Wedding
          </h2>
          <div className="w-16 h-1 bg-champagne-400 mx-auto rounded-full" />
        </motion.div>

        {/* Grid Foto Pre-Wedding */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(item, index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/5] bg-stone-200 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-base md:text-lg font-medium">{item.title}</p>
                    <p className="text-xs text-stone-300 line-clamp-1">{item.caption}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (State isOpen & selectedImage) */}
      <AnimatePresence>
        {isOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Tombol Tutup (X) */}
            <button
              onClick={closeLightbox}
              aria-label="Tutup Galeri"
              className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Tombol Navigasi Kiri */}
            <button
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Tombol Navigasi Kanan */}
            <button
              onClick={handleNext}
              aria-label="Foto Berikutnya"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Wadah Gambar yang Dipilih */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="text-center mt-4 text-white">
                <h4 className="font-serif text-lg font-medium text-champagne-200">
                  {selectedImage.title}
                </h4>
                <p className="text-xs md:text-sm text-stone-300 mt-1 max-w-lg">
                  {selectedImage.caption}
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  Foto {currentIndex + 1} dari {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

