import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquareHeart, CheckCircle2, Users, Clock, ThumbsUp } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    presence: 'Hadir',
    guestCount: 1,
    message: '',
  });

  const [guestbookList, setGuestbookList] = useState(() => {
    // Muat data dari localStorage jika ada, atau gunakan default
    const saved = localStorage.getItem('wedding_rsvp_rakha_kinar');
    return saved ? JSON.parse(saved) : weddingData.initialGuests;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill nama dari parameter URL jika ada
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

  // Simpan ke localStorage setiap ada perubahan daftar tamu
  useEffect(() => {
    localStorage.setItem('wedding_rsvp_rakha_kinar', JSON.stringify(guestbookList));
  }, [guestbookList]);

  // Handler input perubahan form terkontrol (Controlled Component)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mock-up handleSubmit yang mencegah refresh halaman dan menambah data ke state
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg('Mohon isi nama lengkap dan ucapan doa Anda.');
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
      };

      // Tambahkan ke urutan teratas list
      setGuestbookList((prev) => [newGuestEntry, ...prev]);
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      // Reset form
      setFormData((prev) => ({
        ...prev,
        message: '',
      }));

      // Hilangkan pesan sukses setelah 4 detik
      setTimeout(() => {
        setSubmittedSuccess(false);
      }, 4000);
    }, 600);
  };

  return (
    <section id="rsvp" className="py-20 px-4 md:px-8 bg-stone-100/70 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-100 text-sage-700 mb-3">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <span className="block text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
            Konfirmasi &amp; Harapan
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal mt-2 mb-3">
            RSVP &amp; Buku Tamu
          </h2>
          <p className="text-stone-600 text-xs md:text-sm max-w-lg mx-auto">
            Kehadiran dan doa restu Anda merupakan suatu kehormatan dan kebahagiaan yang tak ternilai bagi kami.
          </p>
        </motion.div>

        {/* Card Formulir RSVP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="p-6 md:p-8 rounded-3xl glass-card border border-sage-200/90 shadow-xl mb-16"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Nama Lengkap */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Nama Lengkap *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Dimas Arya &amp; Partner"
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-stone-300 focus:border-sage-600 focus:ring-2 focus:ring-sage-200 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all"
              />
            </div>

            {/* Grid Konfirmasi Kehadiran & Jumlah Tamu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dropdown Kehadiran */}
              <div>
                <label htmlFor="presence" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Konfirmasi Kehadiran *
                </label>
                <select
                  id="presence"
                  name="presence"
                  value={formData.presence}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-stone-300 focus:border-sage-600 focus:ring-2 focus:ring-sage-200 text-sm text-stone-900 outline-none transition-all cursor-pointer"
                >
                  <option value="Hadir">Ya, Saya Akan Hadir</option>
                  <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
                  <option value="Masih Ragu">Belum Pasti / Masih Ragu</option>
                </select>
              </div>

              {/* Input Jumlah Tamu */}
              <div>
                <label htmlFor="guestCount" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Jumlah Orang Hadir
                </label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  disabled={formData.presence === 'Tidak Hadir'}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-stone-300 focus:border-sage-600 focus:ring-2 focus:ring-sage-200 text-sm text-stone-900 outline-none transition-all cursor-pointer disabled:bg-stone-100 disabled:text-stone-400"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </div>
            </div>

            {/* Textarea Ucapan & Doa */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Pesan, Harapan &amp; Doa Restu *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan ucapan dan doa terbaik Anda untuk kedua mempelai..."
                className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-stone-300 focus:border-sage-600 focus:ring-2 focus:ring-sage-200 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all resize-y"
              />
            </div>

            {/* Alert Error / Sukses */}
            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">
                {errorMsg}
              </p>
            )}

            {submittedSuccess && (
              <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Terima kasih! Konfirmasi dan doa restu Anda telah berhasil terkirim.</span>
              </div>
            )}

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sage-700 to-sage-600 hover:from-sage-600 hover:to-sage-800 text-white font-medium text-sm md:text-base tracking-wide shadow-lg shadow-sage-950/20 hover:shadow-sage-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Send className="w-4 h-4 text-champagne-300" />
              <span>{isSubmitting ? 'Mengirim Ucapan...' : 'Kirim Konfirmasi & Ucapan'}</span>
            </button>
          </form>
        </motion.div>

        {/* Tampilan Daftar Ucapan (Guestbook List) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-semibold flex items-center gap-2">
              <span>Doa Restu dari Sahabat &amp; Keluarga</span>
            </h3>
            <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 font-semibold text-xs border border-sage-200">
              {guestbookList.length} Pesan
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {guestbookList.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="p-5 rounded-2xl bg-white/90 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar Inisial */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-500 to-sage-700 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-stone-900 leading-tight">
                          {entry.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {/* Badge Status Kehadiran */}
                          <span
                            className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              entry.presence === 'Hadir'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : entry.presence === 'Tidak Hadir'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {entry.presence} {entry.presence === 'Hadir' && `(${entry.guestCount} org)`}
                          </span>
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {entry.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pesan Ucapan */}
                  <p className="text-stone-700 text-xs md:text-sm mt-3 leading-relaxed pl-13 border-l-2 border-sage-200 ml-5 pl-4">
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

