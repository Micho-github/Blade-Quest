import React, { useState } from "react";
import styles from "./GamePageModals.module.css";
import { FaTimes } from "react-icons/fa";

export default function GameModal({ onExit }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleExitClick = () => {
    setShowConfirmation(true);
  };

  const handleReturnToGame = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameModal}>
        <iframe
          src="/BladeQuestGame/index.html"
          title="Blade Quest"
          className={styles.iframe}
        />
        <FaTimes className={styles.exitGame} onClick={handleExitClick} />
      </div>
      {showConfirmation && (
        <div className={styles.confirmationPopup}>
          <div className={styles.popupContent}>
            <h1>Are you sure you want to exit the game?</h1>
            <p>You will lose all unclaimed progress</p>
            <button onClick={handleReturnToGame}>Return to Game</button>
            <button onClick={onExit}>Exit to Game Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}
