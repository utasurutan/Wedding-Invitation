import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CalendarPlus, Sparkles, Shirt } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function EventSchedule() {
  const { akad, resepsi, calendar, targetDate, dressCode } = weddingData.event;

  // Countdown timer dinamis
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    calendar.title
  )}&dates=${calendar.startDate}/${calendar.endDate}&details=${encodeURIComponent(
    calendar.details
  )}&location=${encodeURIComponent(calendar.location)}`;

  return (
    <section id="schedule" className="py-24 px-4 md:px-8 bg-sage-50/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 mb-2 font-display text-[10px] uppercase tracking-[0.35em] text-champagne-700">
            <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
            <span>Save The Date</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal">
            Waktu &amp; Rangkaian Acara
          </h2>
          <div className="w-12 h-[1px] bg-champagne-400 mx-auto mt-4" />
        </motion.div>

        {/* Minimalist Editorial Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto mb-20 p-8 rounded-3xl wedding-card-dark text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-300 to-transparent" />
          
          <p className="font-display text-[11px] uppercase tracking-[0.3em] text-champagne-300 mb-8">
            {timeLeft.isExpired ? 'Hari Bahagia Telah Tiba' : 'Menghitung Hari Menuju Ikatan Suci'}
          </p>

          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-lg mx-auto">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((unit, index) => (
              <div 
                key={index}
                className="bg-stone-900/70 border border-champagne-400/20 rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center backdrop-blur-sm"
              >
                <span className="font-serif text-3xl md:text-5xl text-gold-gradient font-bold leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-display text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-stone-300 mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Add to Google Calendar CTA */}
          <div className="mt-8">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-champagne-400 to-champagne-500 hover:from-champagne-300 hover:to-champagne-400 text-stone-950 font-display text-xs tracking-wider uppercase font-semibold shadow-lg shadow-champagne-950/40 transition-all active:scale-95"
            >
              <CalendarPlus className="w-4 h-4 text-stone-950" />
              <span>Simpan Tanggal ke Kalender</span>
            </a>
          </div>
        </motion.div>

        {/* Kartu Fisik Akad & Resepsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-3xl wedding-card relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-[10px] uppercase tracking-[0.25em] text-sage-800 font-semibold px-3 py-1 bg-sage-100 rounded-full">
                  {akad.notes}
                </span>
                <span className="font-script text-2xl text-champagne-600">01</span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-stone-900 mb-6">
                {akad.title}
              </h3>

              <div className="space-y-4 font-serif text-stone-700 text-base">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-sage-600 shrink-0" />
                  <span className="font-semibold text-stone-900">{akad.day}, {akad.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-sage-600 shrink-0" />
                  <span>{akad.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">{akad.venue}</p>
                    <p className="text-xs text-champagne-700 font-sans font-medium mt-0.5">{akad.hall}</p>
                    <p className="text-xs text-stone-500 font-sans mt-1">{akad.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 text-xs font-serif italic text-stone-500">
              *Hadir 15 menit sebelum prosesi dimulai.
            </div>
          </motion.div>

          {/* Resepsi Pernikahan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-10 rounded-3xl wedding-card relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-[10px] uppercase tracking-[0.25em] text-champagne-800 font-semibold px-3 py-1 bg-champagne-100 rounded-full">
                  {resepsi.notes}
                </span>
                <span className="font-script text-2xl text-champagne-600">02</span>
              </div>

              <h3 className="font-serif text-3xl font-bold text-stone-900 mb-6">
                {resepsi.title}
              </h3>

              <div className="space-y-4 font-serif text-stone-700 text-base">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-champagne-600 shrink-0" />
                  <span className="font-semibold text-stone-900">{resepsi.day}, {resepsi.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-champagne-600 shrink-0" />
                  <span>{resepsi.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">{resepsi.venue}</p>
                    <p className="text-xs text-champagne-700 font-sans font-medium mt-0.5">{resepsi.hall}</p>
                    <p className="text-xs text-stone-500 font-sans mt-1">{resepsi.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 text-xs font-serif italic text-stone-500">
              *Dimeriahkan oleh jamuan makan siang &amp; alunan musik akustik.
            </div>
          </motion.div>

        </div>

        {/* Dress Code Section dengan Color Swatches Asli */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-white border border-champagne-300/40 text-center shadow-sm"
        >
          <div className="inline-flex items-center gap-2 mb-2 font-display text-xs uppercase tracking-widest text-stone-700">
            <Shirt className="w-4 h-4 text-champagne-600" />
            <span>{dressCode.title}</span>
          </div>
          <p className="font-serif text-sm text-stone-600 mb-5">
            {dressCode.description}
          </p>

          {/* Color Palette Swatches */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            {dressCode.colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-inner border-2 border-white ring-1 ring-stone-200 transform hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="text-[10px] text-stone-500 font-sans mt-1.5 hidden sm:block">
                  {color.name}
                </span>
              </div>
            ))}
          </div>

          <p className="font-display text-[11px] font-semibold tracking-wider text-sage-900 uppercase">
            {dressCode.recommendation}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
