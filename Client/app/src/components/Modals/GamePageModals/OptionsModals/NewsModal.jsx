import React from "react";
import styles from "./OptionsModals.module.css";
import { FaChevronLeft } from "react-icons/fa";

export default function NewsModal({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.newsModal}>
        <FaChevronLeft className={styles.backIcon} onClick={onClose} />
        <h1>News</h1>
        {""}
      </div>
    </div>
  );
}
