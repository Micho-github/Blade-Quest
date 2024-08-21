import React, { useEffect, useState } from "react";
import styles from "./MainGamePage.module.css";
import GameModal from "../../Modals/GamePageModals/GameModal";
import ShopModal from "../../Modals/GamePageModals/ShopModal";
import LeaderboardModal from "../../Modals/GamePageModals/LeaderboardModal";
import OptionsModal from "../../Modals/GamePageModals/OptionsModal";
import PlayModal from "../../Modals/GamePageModals/PlayModal";
import { SlSizeFullscreen } from "react-icons/sl";
import { BsPhoneLandscape } from "react-icons/bs";
import { PiDeviceRotate } from "react-icons/pi";

export default function MainGamePage() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    setActiveModal("play");
  }, []);

  const openGame = () => setActiveModal("game");
  const openShop = () => setActiveModal("shop");
  const openLeaderboard = () => setActiveModal("leaderboard");
  const openOptions = () => setActiveModal("options");
  const showPlayModal = () => setActiveModal("play");

  return (
    <div className={styles.container}>
      <div className={styles.overback}></div>
      <div className={styles.playerInfo}>
        <div className={styles.topLeft}>
          <img
            alt="Avatar"
            className={styles.avatar}
            src={require("../../../Assets/images/avatar.png")}
          />
          <div>
            <div className={styles.username}>
              User_name {/*{userData.username}*/}
            </div>
            <div className={styles.xp}>100 {/*{userData.xp}*/} / 1000</div>
            <div className={styles.level}>Level 1 {/*{userData.level}*/}</div>
            <div className={styles.highScore}>
              High Score: 1200 {/*{userData.highScore || 0}*/}
            </div>
          </div>
        </div>
        <div className={styles.topRight}>
          <div className={styles.coins}>
            777 {/*{userData.coins}*/}
            <img
              alt="coins"
              src={require("../../../Assets/images/pixel_coins.png")}
              className={styles.coins_img}
            />
          </div>
          <div className={styles.diamonds}>
            33{/*{userData.gems}*/}
            <img
              alt="Diamonds"
              src={require("../../../Assets/images/pixel_diamonds.png")}
              className={styles.diamonds_img}
            />
          </div>
        </div>
      </div>
      <div className={styles.modalContainer}>
        {activeModal === "game" && <GameModal onExit={showPlayModal} />}
        {activeModal === "shop" && <ShopModal onClose={showPlayModal} />}
        {activeModal === "leaderboard" && (
          <LeaderboardModal onClose={showPlayModal} />
        )}
        {activeModal === "options" && <OptionsModal onClose={showPlayModal} />}
        {activeModal === "play" && <PlayModal onPlay={openGame} />}
      </div>
      {activeModal !== "game" && (
        <div id="overlay-message-small-screen">
          <div>
            Screen too small<br></br>
            <br></br>
          </div>
          <div className="icons">
            <div className="icon-window-adjust">
              <SlSizeFullscreen color="white" />
            </div>
            Or
            <div className="icon-rotate-vr">
              <PiDeviceRotate color="white" />
            </div>
            <div className="icon-portrait">
              <BsPhoneLandscape color="white" />
            </div>
          </div>
          <div>Please Adjust The Window Size On PC.</div>
          <div>Or</div>
          <div>Please Use In Portrait Mode On Mobile.</div>
          <div className="still-appears">
            If this message still appears after rotating to Portrait on mobile
            then your screen size is not supported! Or continue adjusting for
            PC.
          </div>
        </div>
      )}
      {activeModal === "game" && (
        <div id="overlay-message-rotate-screen">
          <div className="icons">
            <div className="icon-rotate-hr">
              <PiDeviceRotate color="white" />
            </div>
            <div className="icon-landscape">
              <BsPhoneLandscape color="white" />
            </div>
          </div>
          <div>
            Please Use In<br></br>Landscape Mode<br></br>For The Game To Start.
          </div>
          <div className="still-appears">
            If this message still appears after rotating to landscape then your
            screen size is not supported!
          </div>
        </div>
      )}
      <div className={styles.gamebar}>
        <img
          alt="Shop"
          src={require("../../../Assets/images/pixel_shop.png")}
          className={styles.shop_img}
          onClick={openShop}
        />
        <img
          alt="Game"
          src={require("../../../Assets/images/pixel_controller.png")}
          className={styles.controller_img}
          onClick={showPlayModal}
        />
        <img
          alt="Options"
          src={require("../../../Assets/images/pixel_options.png")}
          className={styles.options_img}
          onClick={openOptions}
        />
        <img
          alt="Leaderboard"
          src={require("../../../Assets/images/pixel_leaderboard.png")}
          className={styles.leaderboard_img}
          onClick={openLeaderboard}
        />
      </div>
    </div>
  );
}
