import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, QrCode, Copy, Check, Send, Sparkles, Wifi } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/weddingData';

export default function WeddingGift() {
  const { bankAccounts, qris, physicalGift } = weddingData.gifts;
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('transfer'); // 'transfer' | 'qris'

  const handleCopyAccount = (bankName, accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(bankName);

    // Micro-interaction: Golden sparkle confetti
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#dfba6d', '#cca048', '#ffffff']
      });
    } catch (e) {}

    setTimeout(() => {
      setCopiedBank(null);
    }, 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${physicalGift.recipient}\n${physicalGift.phone}\n${physicalGift.address}`);
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2000);
  };

  return (
    <section id="gift" className="py-24 px-4 md:px-8 bg-paper relative">
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
            <Gift className="w-3.5 h-3.5 text-champagne-600" />
            <span>Tanda Kasih</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal">
            Amplop Digital &amp; Kado
          </h2>
          <p className="font-serif italic text-stone-600 text-sm md:text-base max-w-lg mx-auto mt-2 leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami dengan senang hati menyediakan fitur amplop digital ini.
          </p>
        </motion.div>

        {/* Tab Switcher: Transfer Bank vs QRIS */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-champagne-300/50 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-display uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'transfer'
                  ? 'bg-stone-900 text-champagne-200 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Transfer Bank</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('qris')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-display uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'qris'
                  ? 'bg-stone-900 text-champagne-200 shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>QRIS Barcode</span>
            </button>
          </div>
        </div>

        {/* Tab Konten: Kartu Bank Realistis */}
        {activeTab === 'transfer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {bankAccounts.map((acc, index) => {
              const isCopied = copiedBank === acc.bankName;

              return (
                <motion.div
                  key={acc.bankName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`p-7 rounded-3xl bg-gradient-to-br ${acc.cardColor} text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border border-champagne-400/30 min-h-[220px]`}
                >
                  {/* Watermark / Shimmer */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />

                  {/* Header Kartu: Chip & Contactless */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Metallic Gold Chip SVG */}
                      <div className="w-10 h-7 rounded bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[1.5px] shadow-sm">
                        <div className="w-full h-full border border-amber-800/40 rounded flex flex-col justify-around py-0.5 px-1">
                          <div className="h-[1px] bg-amber-800/40 w-full" />
                          <div className="h-[1px] bg-amber-800/40 w-full" />
                        </div>
                      </div>
                      <Wifi className="w-4 h-4 text-stone-400 rotate-90" />
                    </div>

                    <span className="font-display font-bold text-lg md:text-xl text-gold-gradient tracking-wider">
                      {acc.bankName}
                    </span>
                  </div>

                  {/* Nomor Rekening Embossed */}
                  <div className="my-6 relative z-10">
                    <span className="font-display text-[9px] uppercase tracking-[0.25em] text-stone-400 block mb-1">
                      {acc.cardType}
                    </span>
                    <p className="font-mono text-2xl md:text-2xl font-bold tracking-widest text-champagne-100 drop-shadow">
                      {acc.accountNumber}
                    </p>
                    <p className="font-serif italic text-sm text-stone-300 mt-1">
                      a.n <span className="font-semibold text-white">{acc.accountHolder}</span>
                    </p>
                  </div>

                  {/* Tombol Salin */}
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(acc.bankName, acc.accountNumber)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-display uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-white/15 hover:bg-white/25 text-champagne-200 border border-white/20 active:scale-95'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab Konten: QRIS */}
        {activeTab === 'qris' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm mx-auto p-8 rounded-3xl wedding-card text-center"
          >
            <h4 className="font-serif text-xl font-bold text-stone-900 mb-1">
              {qris.title}
            </h4>
            <p className="text-xs text-stone-500 font-serif italic mb-6">
              {qris.subTitle}
            </p>

            {/* QRIS Frame */}
            <div className="w-60 h-60 mx-auto bg-white p-4 rounded-2xl shadow-inner border-2 border-stone-200 mb-4 flex items-center justify-center">
              <img
                src={qris.imageUrl}
                alt="Barcode QRIS Wedding"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-display text-[11px] text-stone-500 uppercase tracking-wider">
              Scan barcode di atas dengan aplikasi pembayaran favorit Anda
            </p>
          </motion.div>
        )}

        {/* Pengiriman Kado Fisik */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 max-w-xl mx-auto p-6 rounded-2xl bg-white border border-champagne-300/40 text-center shadow-sm"
        >
          <div className="flex items-center justify-center gap-2 text-stone-900 font-display text-xs uppercase tracking-widest mb-1.5 font-semibold">
            <Send className="w-4 h-4 text-champagne-600" />
            <span>Kirim Kado Fisik</span>
          </div>
          <p className="font-serif text-stone-600 text-sm mb-4">
            Penerima: <span className="font-bold text-stone-900">{physicalGift.recipient}</span> ({physicalGift.phone})
            <br />
            {physicalGift.address}
          </p>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-stone-300 hover:border-champagne-500 bg-white text-stone-700 font-display text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Alamat Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-400" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
