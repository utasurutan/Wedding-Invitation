import React, { useEffect, useRef, useState } from 'react';
import { Disc3, Volume2, VolumeX, Music } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function AudioPlayer({ isPlaying, setIsPlaying, isOpened }) {
  const audioRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay ditunda oleh kebijakan browser:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  if (!isOpened) return null;

  return (
    <div className="fixed top-5 right-5 z-40">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={weddingData.audio.src}
      />

      <div className="relative flex items-center">
        {/* Tooltip info lagu */}
        <div 
          className={`absolute right-14 bg-stone-900/90 text-white text-xs px-3.5 py-1.5 rounded-full border border-champagne-300/30 whitespace-nowrap shadow-xl transition-all duration-300 pointer-events-none ${
            showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span className="text-champagne-300 font-semibold">{weddingData.audio.title}</span>
          <span className="text-stone-300 text-[10px] ml-1.5 font-sans">&bull; {weddingData.audio.artist}</span>
          <span className="text-stone-400 text-[10px] ml-1 font-sans">({isPlaying ? 'Memutar' : 'Jeda'})</span>
        </div>

        {/* Tombol Pemutar Musik Estetik */}
        <button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
          className="group relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 backdrop-blur-md shadow-2xl border border-champagne-300/40 text-stone-200 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          {/* Piringan Hitam Berputar */}
          <div className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-stone-950 border border-stone-800 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Disc3 className="w-5 h-5 text-champagne-400" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-200" />
          </div>

          {/* Equalizer Bars Animasi */}
          <div className="flex items-end gap-[2px] h-4 w-4 justify-center">
            <span className={`w-[2.5px] bg-champagne-400 rounded-full transition-all ${isPlaying ? 'animate-eq-1' : 'h-1'}`} />
            <span className={`w-[2.5px] bg-champagne-300 rounded-full transition-all ${isPlaying ? 'animate-eq-2' : 'h-2'}`} />
            <span className={`w-[2.5px] bg-champagne-400 rounded-full transition-all ${isPlaying ? 'animate-eq-3' : 'h-1'}`} />
          </div>

          {/* Ikon Volume */}
          <div className="text-stone-300 group-hover:text-champagne-200 transition-colors">
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
          </div>
        </button>
      </div>
    </div>
  );
}
