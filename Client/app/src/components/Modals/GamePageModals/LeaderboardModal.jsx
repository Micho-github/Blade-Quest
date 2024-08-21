import React from "react";
import styles from "./GamePageModals.module.css";
import { FaTimes } from "react-icons/fa";

export default function LeaderboardModal({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.leaderboardModal}>
        <FaTimes className={styles.closeIcon} onClick={onClose} />
        <h1>Leaderboard</h1>
        {""}
      </div>
    </div>
  );
}
