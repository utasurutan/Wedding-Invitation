import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquareHeart, CheckCircle2, Clock, Heart, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    presence: 'Hadir',
    guestCount: 1,
    message: '',
  });

  const [guestbookList, setGuestbookList] = useState(() => {
    const saved = localStorage.getItem('wedding_rsvp_rakha_kinar');
    return saved ? JSON.parse(saved) : weddingData.initialGuests;
  });

  const [filterPresence, setFilterPresence] = useState('Semua'); // 'Semua' | 'Hadir' | 'Tidak Hadir'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill dari parameter URL ?to=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('to');
    if (recipient) {
      setFormData((prev) => ({
        ...prev,
        name: decodeURIComponent(recipient.replace(/\+/g, ' ')),
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wedding_rsvp_rakha_kinar', JSON.stringify(guestbookList));
  }, [guestbookList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Like reaction pada ucapan
  const handleLike = (id) => {
    setGuestbookList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
      )
    );
  };

  // Mock-up handleSubmit dengan Confetti Celebration
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg('Mohon lengkapi nama dan ucapan doa restu Anda.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newGuestEntry = {
        id: Date.now(),
        name: formData.name.trim(),
        presence: formData.presence,
        guestCount: Number(formData.guestCount),
        message: formData.message.trim(),
        createdAt: 'Baru saja',
        likes: 1
      };

      setGuestbookList((prev) => [newGuestEntry, ...prev]);
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      // Confetti burst pada pengiriman RSVP
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#71906b', '#dfba6d', '#ffffff']
        });
      } catch (e) {}

      // Reset field pesan saja
      setFormData((prev) => ({
        ...prev,
        message: '',
      }));

      setTimeout(() => {
        setSubmittedSuccess(false);
      }, 5000);
    }, 500);
  };

  const filteredList = guestbookList.filter((item) => {
    if (filterPresence === 'Semua') return true;
    return item.presence === filterPresence;
  });

  const totalAttending = guestbookList
    .filter((g) => g.presence === 'Hadir')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

  return (
    <section id="rsvp" className="py-24 px-4 md:px-8 bg-sage-50/50 relative">
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
            <span>Konfirmasi Kehadiran</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal">
            RSVP &amp; Buku Tamu
          </h2>
          <p className="font-serif italic text-stone-600 text-sm md:text-base max-w-lg mx-auto mt-2">
            Kehadiran dan doa restu Anda merupakan suatu kehormatan dan kebahagiaan yang tak ternilai bagi kami.
          </p>
        </motion.div>

        {/* Card Formulir RSVP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-10 rounded-3xl wedding-card shadow-xl mb-16"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-display text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                Nama Lengkap Tamu *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Bpk. Dimas Arya &amp; Partner"
                className="w-full px-4 py-3.5 rounded-2xl bg-stone-50/70 border border-stone-300 focus:border-sage-600 focus:bg-white focus:ring-2 focus:ring-sage-200 font-serif text-base text-stone-900 placeholder-stone-400 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="presence" className="block font-display text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                  Konfirmasi Kehadiran *
                </label>
                <select
                  id="presence"
                  name="presence"
                  value={formData.presence}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl bg-stone-50/70 border border-stone-300 focus:border-sage-600 focus:bg-white focus:ring-2 focus:ring-sage-200 font-serif text-base text-stone-900 outline-none transition-all cursor-pointer"
                >
                  <option value="Hadir">Ya, Saya Pasti Hadir</option>
                  <option value="Tidak Hadir">Mohon Maaf, Berhalangan Hadir</option>
                  <option value="Masih Ragu">Belum Pasti / Ragu-ragu</option>
                </select>
              </div>

              <div>
                <label htmlFor="guestCount" className="block font-display text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                  Jumlah Orang Hadir
                </label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  disabled={formData.presence === 'Tidak Hadir'}
                  className="w-full px-4 py-3.5 rounded-2xl bg-stone-50/70 border border-stone-300 focus:border-sage-600 focus:bg-white focus:ring-2 focus:ring-sage-200 font-serif text-base text-stone-900 outline-none transition-all cursor-pointer disabled:bg-stone-100 disabled:text-stone-400"
                >
                  <option value="1">1 Orang Tamu</option>
                  <option value="2">2 Orang Tamu</option>
                  <option value="3">3 Orang Tamu</option>
                  <option value="4">4 Orang Tamu</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block font-display text-xs uppercase tracking-wider text-stone-700 mb-2 font-semibold">
                Pesan, Harapan &amp; Doa Restu *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan kata-kata doa dan ucapan terbaik untuk Rakha &amp; Kinari..."
                className="w-full px-4 py-3.5 rounded-2xl bg-stone-50/70 border border-stone-300 focus:border-sage-600 focus:bg-white focus:ring-2 focus:ring-sage-200 font-serif text-base text-stone-900 placeholder-stone-400 outline-none transition-all resize-y"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3.5 rounded-xl font-medium">
                {errorMsg}
              </p>
            )}

            {submittedSuccess && (
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-emerald-900 bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Terima kasih! Konfirmasi kehadiran dan ucapan doa restu Anda telah berhasil tersimpan.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sage-800 to-sage-700 hover:from-sage-700 hover:to-sage-600 text-white font-display text-xs md:text-sm tracking-widest uppercase font-semibold shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Send className="w-4 h-4 text-champagne-300" />
              <span>{isSubmitting ? 'Mengirimkan...' : 'Kirim Konfirmasi & Ucapan'}</span>
            </button>
          </form>
        </motion.div>

        {/* Tampilan Feed Buku Tamu (Guestbook Feed) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl text-stone-900 font-bold">
                Doa Restu Sahabat &amp; Kerabat
              </h3>
              <p className="text-xs text-stone-500 font-serif italic mt-0.5">
                Total {totalAttending} tamu telah mengonfirmasi kehadiran
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-stone-200/60 w-fit">
              {['Semua', 'Hadir', 'Tidak Hadir'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterPresence(tab)}
                  className={`px-3.5 py-1 rounded-full text-xs font-display tracking-wider transition-all cursor-pointer ${
                    filterPresence === tab
                      ? 'bg-white text-stone-900 shadow-sm font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* List Ucapan */}
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {filteredList.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-600 to-stone-800 text-champagne-100 font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-stone-900">
                          {entry.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`inline-flex items-center text-[10px] font-display font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              entry.presence === 'Hadir'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-stone-100 text-stone-600 border border-stone-200'
                            }`}
                          >
                            {entry.presence} {entry.presence === 'Hadir' && `(${entry.guestCount} org)`}
                          </span>
                          <span className="text-[11px] text-stone-400 font-sans flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {entry.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tombol Like */}
                    <button
                      type="button"
                      onClick={() => handleLike(entry.id)}
                      className="flex items-center gap-1 text-stone-400 hover:text-rose-500 transition-colors p-1.5 cursor-pointer"
                      title="Sukai Ucapan"
                    >
                      <Heart className="w-4 h-4 hover:fill-rose-500 transition-transform active:scale-125" />
                      <span className="text-xs font-sans font-medium">{entry.likes || 0}</span>
                    </button>
                  </div>

                  <p className="font-serif italic text-stone-700 text-sm md:text-base leading-relaxed pl-4 border-l-2 border-champagne-300 ml-4">
                    "{entry.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
