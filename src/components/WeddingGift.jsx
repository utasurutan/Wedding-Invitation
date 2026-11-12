import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, QrCode, Copy, Check, Send, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function WeddingGift() {
  const { bankAccounts, qris, physicalGift } = weddingData.gifts;
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('transfer'); // 'transfer' | 'qris'

  const handleCopyAccount = (bankName, accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedBank(bankName);
    setTimeout(() => {
      setCopiedBank(null);
    }, 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${physicalGift.recipient}\n${physicalGift.phone}\n${physicalGift.address}`);
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false), 2000;
    });
  };

  return (
    <section id="gift" className="py-20 px-4 md:px-8 bg-sage-50/70 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-champagne-100 text-champagne-700 mb-3">
            <Gift className="w-6 h-6" />
          </div>
          <span className="block text-xs uppercase tracking-[0.25em] text-sage-700 font-semibold">
            Tanda Kasih
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 font-normal mt-2 mb-3">
            Amplop Digital
          </h2>
          <p className="text-stone-600 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami dengan senang hati menyediakan fitur amplop digital ini.
          </p>
        </motion.div>

        {/* Tab Switcher: Transfer Bank vs QRIS */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-sage-200 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeTab === 'transfer'
                  ? 'bg-sage-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Transfer Bank</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('qris')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeTab === 'qris'
                  ? 'bg-sage-600 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>QRIS</span>
            </button>
          </div>
        </div>

        {/* Tab Konten: Transfer Bank */}
        {activeTab === 'transfer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {bankAccounts.map((acc, index) => {
              const isCopied = copiedBank === acc.bankName;

              return (
                <motion.div
                  key={acc.bankName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-3xl glass-card border border-stone-200/80 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Chip kartu / logo bank */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif font-extrabold text-xl text-sage-800 tracking-wider">
                        {acc.bankName}
                      </span>
                      <CreditCard className="w-6 h-6 text-champagne-500" />
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">
                        Nomor Rekening
                      </p>
                      <p className="font-mono text-xl md:text-2xl font-bold text-stone-800 tracking-wider">
                        {acc.accountNumber}
                      </p>
                      <p className="text-xs text-stone-600 mt-1">
                        a.n <span className="font-semibold text-stone-800">{acc.accountHolder}</span>
                      </p>
                    </div>
                  </div>

                  {/* Tombol Salin Rekening */}
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(acc.bankName, acc.accountNumber)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs md:text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-sage-100 hover:bg-sage-200 text-sage-800 active:scale-95'
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
            className="max-w-sm mx-auto p-6 rounded-3xl glass-card border border-stone-200/80 shadow-xl text-center"
          >
            <h4 className="font-serif text-lg font-bold text-stone-800 mb-1">
              {qris.title}
            </h4>
            <p className="text-xs text-stone-500 mb-6">
              {qris.subTitle}
            </p>

            {/* Gambar Barcode QRIS */}
            <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-inner border border-stone-200 mb-4 flex items-center justify-center">
              <img
                src={qris.imageUrl}
                alt="Barcode QRIS Wedding"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[11px] text-stone-500">
              Silakan scan barcode di atas menggunakan aplikasi Mobile Banking atau E-Wallet pilihan Anda.
            </p>
          </motion.div>
        )}

        {/* Pengiriman Kado Fisik */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-xl mx-auto p-5 rounded-2xl bg-white/70 border border-sage-200/80 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-sage-800 font-medium text-xs md:text-sm mb-1">
            <Send className="w-4 h-4 text-sage-600" />
            <span>Kirim Kado Fisik</span>
          </div>
          <p className="text-stone-600 text-xs mb-3">
            Penerima: <span className="font-semibold text-stone-800">{physicalGift.recipient}</span> ({physicalGift.phone})
            <br />
            {physicalGift.address}
          </p>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-stone-300 hover:border-sage-500 bg-white text-stone-700 text-xs transition-colors"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Alamat Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>
        </motion.div>

      </div>
    </section>
  );
}

