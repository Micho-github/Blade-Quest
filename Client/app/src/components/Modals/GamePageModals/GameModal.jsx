import React, { useState } from "react";
import styles from "./GamePageModals.module.css";
import HowToPlayModal from "./HowToPlayModal";

export default function GameModal() {
  const [isHowToPlayOpen, setHowToPlayOpen] = useState(false);
  const [isGameModalOpen, setGameModalOpen] = useState(true);

  const openHowToPlay = () => {
    setGameModalOpen(false); // Close the game modal
    setHowToPlayOpen(true); // Open the HowToPlay modal
  };

  const closeHowToPlay = () => {
    setHowToPlayOpen(false); // Close the HowToPlay modal
    setGameModalOpen(true); // Reopen the game modal
  };

  return (
    <div className={styles.container}>
      {isGameModalOpen && (
        <div className={styles.modal}>
          <iframe
            src="/BladeQuestGame/index.html"
            title="Blade Quest"
            className={styles.iframe}
          />
          <img
            src={require("../../../Assets/images/pixel_help.png")}
            alt="Help"
            className={styles.howToPlay_img}
            onClick={openHowToPlay} // Open HowToPlay modal on click
          />
        </div>
      )}
      {isHowToPlayOpen && <HowToPlayModal onClose={closeHowToPlay} />}
    </div>
  );
}
