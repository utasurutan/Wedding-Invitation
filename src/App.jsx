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
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-800 font-sans selection:bg-sage-200 selection:text-sage-900 relative">
      
      {/* 1. Cover Depan (Hero dengan parameter URL ?to=...) */}
      <Hero 
        isOpened={isInvitationOpened} 
        onOpenInvitation={handleOpenInvitation} 
      />

      {/* 2. Audio Player & Bottom Navigation */}
      <AudioPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        isOpened={isInvitationOpened} 
      />

      <BottomNav 
        isOpened={isInvitationOpened} 
      />

      {/* Konten Utama Undangan */}
      <main className={`transition-opacity duration-1000 ${isInvitationOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 3. Profil Mempelai & Love Story Timeline */}
        <Profiles />

        {/* 4. Jadwal Acara, Countdown Timer & Dress Code Palette */}
        <EventSchedule />

        {/* 5. Peta Lokasi (Iframe Google Maps & CTA Native) */}
        <LocationMaps />

        {/* 6. Galeri Pre-Wedding & Lightbox Modal */}
        <Gallery />

        {/* 7. Amplop Digital (Realistic Bank Cards & QRIS) */}
        <WeddingGift />

        {/* 8. Buku Tamu & Formulir RSVP */}
        <RSVP />

        {/* Footer */}
        <Footer />
      </main>

    </div>
  );
}
