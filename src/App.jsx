import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import AudioPlayer from './components/AudioPlayer';
import BottomNav from './components/BottomNav';
import Profiles from './components/Profiles';
import EventSchedule from './components/EventSchedule';
import LocationMaps from './components/LocationMaps';
import Gallery from './components/Gallery';
import WeddingGift from './components/WeddingGift';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import FloatingPetals from './components/FloatingPetals';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  // Mulai otomatis memutar musik saat website pertama kali dibuka
  const [isPlaying, setIsPlaying] = useState(true);

  // Kunci Scroll Layar sebelum undangan dibuka
  useEffect(() => {
    if (!isInvitationOpened) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInvitationOpened]);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    setIsPlaying(true);

    setTimeout(() => {
      const targetElement = document.getElementById('profiles');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-800 font-sans selection:bg-sage-200 selection:text-sage-900 relative">
      
      {/* 1. Indikator Progress Scroll Emas di Paling Atas */}
      <ScrollProgress isOpened={isInvitationOpened} />

      {/* 2. Animasi Kelopak Bunga Gugur Lembut Saat di-Scroll (Floating Petals) */}
      {isInvitationOpened && <FloatingPetals count={20} />}

      {/* 3. Audio Player (Aktif sejak awal buka web & dapat dikontrol) */}
      <AudioPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
      />

      {/* 4. Cover Depan (Hero dengan parameter URL ?to=...) */}
      <Hero 
        isOpened={isInvitationOpened} 
        onOpenInvitation={handleOpenInvitation} 
      />

      {/* 5. Floating Bottom Navigation Bar */}
      <BottomNav 
        isOpened={isInvitationOpened} 
      />

      {/* Konten Utama Undangan dengan Scroll Reveal */}
      <main className={`transition-opacity duration-1000 ${isInvitationOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 6. Profil Mempelai & Love Story Timeline */}
        <Profiles />

        {/* 7. Jadwal Acara, Countdown Timer & Dress Code Palette */}
        <EventSchedule />

        {/* 8. Peta Lokasi (Iframe Google Maps & CTA Native) */}
        <LocationMaps />

        {/* 9. Galeri Pre-Wedding & Lightbox Modal */}
        <Gallery />

        {/* 10. Amplop Digital (Realistic Bank Cards & QRIS) */}
        <WeddingGift />

        {/* 11. Buku Tamu & Formulir RSVP */}
        <RSVP />

        {/* Footer */}
        <Footer />
      </main>

    </div>
  );
}
