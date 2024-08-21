import React, { useState } from "react";
import styles from "./OptionsModals.module.css";
import { FaChevronLeft } from "react-icons/fa";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function SettingsModal({ onClose }) {
  const [volume, setVolume] = useState(1); // Volume range between 0 (mute) and 1 (max)
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    document.querySelectorAll("audio").forEach((audio) => {
      audio.volume = newVolume;
    });
  };

  const toggleMute = () => {
    const newMuteStatus = !isMuted;
    setIsMuted(newMuteStatus);
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = newMuteStatus;
    });
    setVolume(newMuteStatus ? 0 : 1); // Adjust slider position when muted/unmuted
  };
  return (
    <div className={styles.container}>
      <div className={styles.settingsModal}>
        <FaChevronLeft className={styles.backIcon} onClick={onClose} />
        <h1>Settings</h1>
        <div className={styles.settings}>
          <div className={styles.volumeControl}>
            <label htmlFor="volume">
              <button className={styles.muteButton} onClick={toggleMute}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              disabled={isMuted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
