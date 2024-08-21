import React from "react";
import styles from "./OptionsModals.module.css";
import { FaChevronLeft } from "react-icons/fa";

export default function ResourcesModal({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.resourcesModal}>
        <FaChevronLeft className={styles.backIcon} onClick={onClose} />
        <h1>Resources</h1>
        {""}
      </div>
    </div>
  );
}
