import React, { useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserClick = () => {
      const audio = audioRef.current;
      audio.play().catch(error => {
        console.error('Playback error:', error);
      });

      document.removeEventListener('click', handleUserClick);
    };

    document.addEventListener('click', handleUserClick);

    return () => {
      document.removeEventListener('click', handleUserClick);
    };
  }, []);
   useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
    }
  }, [audioRef.current]);

  return (
    <audio ref={audioRef} src="/assets/music/background-music-landing-page.mp3" loop />
  );
};

export default MusicPlayer;

///public/assets/music/background-music-landing-page.mp3