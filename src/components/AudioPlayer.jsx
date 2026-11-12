import React, { useEffect, useRef } from 'react';
import { Disc3, Music2, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ isPlaying, setIsPlaying, isOpened }) {
  const audioRef = useRef(null);

  // Efek sync state isPlaying dengan pemutaran tag <audio>
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay dicegah oleh browser, menunggu interaksi pengguna:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  if (!isOpened) return null;

  return (
    <div className="fixed top-5 right-5 z-40">
      {/* Audio Tag HTML5 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/05/16/audio_c976d91f21.mp3?filename=romantic-wedding-piano-112191.mp3"
      />

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-sage-200/80 text-sage-800 hover:text-sage-900 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Piringan Hitam Berputar saat Musik Dimainkan */}
        <div className={`relative flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Disc3 className="w-7 h-7 text-sage-700" />
          <div className="absolute w-2 h-2 rounded-full bg-champagne-400" />
        </div>

        {/* Status Icon Badge */}
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sage-600 text-white flex items-center justify-center text-[10px] shadow-sm">
          {isPlaying ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </span>
      </button>
    </div>
  );
}

