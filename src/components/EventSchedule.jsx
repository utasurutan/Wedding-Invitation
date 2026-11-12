import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CalendarPlus, HeartHandshake } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function EventSchedule() {
  const { akad, resepsi, calendar, targetDate } = weddingData.event;

  // State Countdown
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

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // URL Google Calendar Generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    calendar.title
  )}&dates=${calendar.startDate}/${calendar.endDate}&details=${encodeURIComponent(
    calendar.details
  )}&location=${encodeURIComponent(calendar.location)}`;

  return (
    <section id="schedule" className="py-20 px-4 md:px-8 bg-stone-100/70 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
            Save The Date
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal mt-2 mb-4">
            Waktu &amp; Tempat Acara
          </h2>
          <div className="w-16 h-1 bg-champagne-400 mx-auto rounded-full" />
        </motion.div>

        {/* Dynamic Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto mb-16 p-6 md:p-8 rounded-3xl bg-sage-800 text-white shadow-xl shadow-sage-950/20 text-center relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-sage-700 rounded-full filter blur-2xl opacity-40 -translate-y-1/2 translate-x-1/2" />
          
          <p className="text-xs md:text-sm uppercase tracking-widest text-champagne-300 font-medium mb-6 relative z-10">
            {timeLeft.isExpired ? 'Acara Sedang Berlangsung' : 'Menghitung Hari Menuju Hari Bahagia'}
          </p>

          <div className="grid grid-cols-4 gap-2 md:gap-4 relative z-10">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center shadow-inner"
              >
                <span className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-champagne-200">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs tracking-wider uppercase text-stone-300 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Add to Google Calendar Button */}
          <div className="mt-8 relative z-10">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-champagne-400 hover:bg-champagne-300 text-stone-900 font-medium text-xs md:text-sm tracking-wide transition-all shadow-md active:scale-95"
            >
              <CalendarPlus className="w-4 h-4 text-stone-900" />
              <span>Ingatkan di Google Calendar</span>
            </a>
          </div>
        </motion.div>

        {/* Kartu Rincian Acara (Akad Nikah & Resepsi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-8 rounded-3xl glass-card border border-sage-200 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sage-700">
                {akad.notes}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mt-1 mb-4">
                {akad.title}
              </h3>

              <div className="space-y-3 text-stone-600 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-sage-600 shrink-0" />
                  <span className="font-medium text-stone-800">{akad.day}, {akad.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>{akad.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{akad.venue}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{akad.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs text-stone-500 italic">
              *Diharapkan hadir tepat waktu demi kelancaran prosesi akad suci.
            </div>
          </motion.div>

          {/* Resepsi Pernikahan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 rounded-3xl glass-card border border-champagne-300/80 flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-champagne-400 text-stone-900 text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-bl-xl">
              Utama
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-champagne-100 text-champagne-800 flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-champagne-800">
                {resepsi.notes}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mt-1 mb-4">
                {resepsi.title}
              </h3>

              <div className="space-y-3 text-stone-600 text-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-champagne-700 shrink-0" />
                  <span className="font-medium text-stone-800">{resepsi.day}, {resepsi.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-champagne-700 shrink-0" />
                  <span>{resepsi.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-champagne-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-stone-800">{resepsi.venue}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{resepsi.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs text-stone-500 italic">
              *Dress Code: Nuansa Sage Green, Earth Tone, atau Batik Formal.
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

