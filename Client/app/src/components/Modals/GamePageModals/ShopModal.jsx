import React from "react";
import styles from "./GamePageModals.module.css";
import { FaTimes } from "react-icons/fa";

export default function ShopModal({ onClose }) {
  return (
    <div className={styles.modal}>
      <FaTimes className={styles.closeIcon} onClick={onClose} />
      <h2>Shop</h2>
      {/* Add shop content here */}
    </div>
  );
}
