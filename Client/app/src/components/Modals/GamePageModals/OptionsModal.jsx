import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GamePageModals.module.css";
import { FaTimes } from "react-icons/fa";
import NewsModal from "./OptionsModals/NewsModal";
import HowToPlayModal from "./OptionsModals/HowToPlayModal";
import ResourcesModal from "./OptionsModals/ResourcesModal";
import SettingsModal from "./OptionsModals/SettingsModal";

export default function OptionsModal({ onClose }) {
  const navigate = useNavigate();
  const [activeOptionsModal, setActiveOptionsModal] = useState(null);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCloseOptionsModal = () => {
    setActiveOptionsModal(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsModal}>
        <FaTimes className={styles.closeIcon} onClick={onClose} />
        <h1>Options</h1>
        <div className={styles.optionsIcons}>
          <img
            alt="Home"
            className={styles.optionsIcon}
            src={require("../../../Assets/images/pixel_home.png")}
            onClick={handleHomeClick}
          />
          <img
            alt="News"
            className={styles.optionsIcon}
            src={require("../../../Assets/images/pixel_news.png")}
            onClick={() => setActiveOptionsModal("news")}
          />
          <img
            alt="Resources"
            className={styles.optionsIcon}
            src={require("../../../Assets/images/pixel_resources_links.png")}
            onClick={() => setActiveOptionsModal("resources")}
          />
          <img
            alt="Settings"
            className={styles.optionsIcon}
            src={require("../../../Assets/images/pixel_settings.png")}
            onClick={() => setActiveOptionsModal("settings")}
          />
          <div></div>
          <img
            alt="How To Play"
            className={styles.optionsIcon}
            src={require("../../../Assets/images/pixel_howToPlay.png")}
            onClick={() => setActiveOptionsModal("howToPlay")}
          />
        </div>
      </div>
      {activeOptionsModal === "news" && (
        <NewsModal onClose={handleCloseOptionsModal} />
      )}
      {activeOptionsModal === "howToPlay" && (
        <HowToPlayModal onClose={handleCloseOptionsModal} />
      )}
      {activeOptionsModal === "resources" && (
        <ResourcesModal onClose={handleCloseOptionsModal} />
      )}
      {activeOptionsModal === "settings" && (
        <SettingsModal onClose={handleCloseOptionsModal} />
      )}
    </div>
  );
}
