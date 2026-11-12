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

export default function App() {
  // State Global: Apakah undangan sudah dibuka oleh pengguna?
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  
  // State Global: Status pemutaran musik latar
  const [isPlaying, setIsPlaying] = useState(false);

  // Kunci scroll halaman (Scroll Lock) saat undangan belum dibuka
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

  // Handler saat tombol "Buka Undangan" diklik pada cover depan (Hero)
  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    setIsPlaying(true);

    // Scroll mulus menuju bagian profil kedua mempelai
    setTimeout(() => {
      const targetElement = document.getElementById('profiles');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-sage-50 text-stone-800 font-sans selection:bg-sage-200 selection:text-sage-900 relative">
      
      {/* 1. Cover Depan (Hero dengan parameter URL ?to=...) */}
      <Hero 
        isOpened={isInvitationOpened} 
        onOpenInvitation={handleOpenInvitation} 
      />

      {/* 2. Audio Player (Fixed di pojok layar) & Bottom Navigation */}
      <AudioPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        isOpened={isInvitationOpened} 
      />

      <BottomNav 
        isOpened={isInvitationOpened} 
      />

      {/* Konten Utama Undangan (Hanya terbuka setelah Buka Undangan) */}
      <main className={`transition-opacity duration-1000 ${isInvitationOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 3. Profil Mempelai */}
        <Profiles />

        {/* 4. Jadwal Acara & Dynamic Countdown Timer */}
        <EventSchedule />

        {/* 5. Peta Lokasi (Iframe Google Maps & CTA Native) */}
        <LocationMaps />

        {/* 6. Galeri Dokumentasi Pre-Wedding & Lightbox Modal */}
        <Gallery />

        {/* 7. Amplop Digital (Rekening Bank & QRIS) */}
        <WeddingGift />

        {/* 8. Buku Tamu & Formulir RSVP */}
        <RSVP />

        {/* Footer & Penutup */}
        <Footer />
      </main>

    </div>
  );
}

