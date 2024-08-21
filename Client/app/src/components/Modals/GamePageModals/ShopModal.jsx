import React from "react";
import styles from "./GamePageModals.module.css";
import { FaTimes } from "react-icons/fa";

export default function ShopModal({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.shopModal}>
        <FaTimes className={styles.closeIcon} onClick={onClose} />
        <h1>Shop</h1>
      </div>
    </div>
  );
}
