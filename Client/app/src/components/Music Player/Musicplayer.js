import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      audio.play().catch((error) => {
        console.error("Playback error:", error);
      });
    };

    if (location.pathname === "/") {
      playAudio();

      const handleUserClick = () => {
        playAudio();
        document.removeEventListener("click", handleUserClick);
      };

      document.addEventListener("click", handleUserClick);

      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          audio.pause();
        } else if (location.pathname === "/") {
          playAudio();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("click", handleUserClick);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } else {
      audio.pause();
    }
  }, [location.pathname]);

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
