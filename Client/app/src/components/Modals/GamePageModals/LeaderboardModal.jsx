import React from "react";
import styles from "./GamePageModals.module.css";
import { FaTimes } from "react-icons/fa";

export default function LeaderboardModal({ onClose }) {
  return (
    <div className={styles.modal}>
      <FaTimes className={styles.closeIcon} onClick={onClose} />
      <h2>Leaderboard</h2>
      {/* Add leaderboard content here */}
    </div>
  );
}
