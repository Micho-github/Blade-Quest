import React from "react";
import styles from "./GamePageModals.module.css";

export default function PlayModal({ onPlay }) {
  return (
    <div className={styles.container}>
      <div className={styles.playModal}>
        <div className={styles.playImages}>
          <img
            alt="Blade Quest"
            className={styles.logo_img}
            src={require("../../../Assets/images/logo-no-background.png")}
          />
          <img
            alt="Play"
            className={styles.play_img}
            src={require("../../../Assets/images/pixel_play.png")}
            onClick={onPlay}
          />
        </div>
      </div>
    </div>
  );
}
