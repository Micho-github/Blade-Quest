import React, { useRef, useEffect } from "react";

const MusicPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.error("Playback error:", error);
      });
    };

    playAudio();

    const handleUserClick = () => {
      playAudio();
      document.removeEventListener("click", handleUserClick);
    };

    document.addEventListener("click", handleUserClick);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        audio.pause();
      } else {
        playAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("click", handleUserClick);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
    }
  }, [audioRef.current]);

  return (
    <audio
      ref={audioRef}
      src="/assets/music/background-music-landing-page.mp3"
      loop
    />
  );
};

export default MusicPlayer;
