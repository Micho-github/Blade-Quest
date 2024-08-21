import React from "react";
import styles from "./OptionsModals.module.css";
import { FaChevronLeft } from "react-icons/fa";

export default function HowToPlayModal({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.howToPlayModal}>
        <FaChevronLeft className={styles.backIcon} onClick={onClose} />
        <h1>How To Play?</h1>
        <h2>~ Using a Touch Screen:</h2>
        <ul>
          <li>Touch the left side of the Game screen to Hit left.</li>
          <li>Touch the right side of the Game screen to Hit right.</li>
          <li>
            Touch and Hold with two fingers on the game screen to Dodge attacks.
          </li>
        </ul>
        <hr></hr>
        <h2>~ Using a Mouse and a Keyboard:</h2>
        <ul>
          <li>
            Click on the left side of the Game screen with left click to Hit
            left.
          </li>
          <li>
            Click on the right side of the Game screen with left click to Hit
            right.
          </li>
          <li>Press and Hold the Space Bar to Dodge attacks. </li>
        </ul>
      </div>
    </div>
  );
}
