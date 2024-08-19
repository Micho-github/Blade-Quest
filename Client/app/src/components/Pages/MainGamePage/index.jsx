import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainGamePage.module.css";
import axios from "axios";
import GameModal from "../../Modals/GamePageModals/GameModal";
import ShopModal from "../../Modals/GamePageModals/ShopModal";
import LeaderboardModal from "../../Modals/GamePageModals/LeaderboardModal";

export default function MainGamePage() {
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   // Fetch user data
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get("/api/user/USER_ID"); // Replace USER_ID with actual user ID
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  const [activeModal, setActiveModal] = useState("game");

  const closeModals = () => setActiveModal("game");

  const openGame = () => setActiveModal("game");
  const openShop = () => setActiveModal("shop");
  const openLeaderboard = () => setActiveModal("leaderboard");

  return (
    <div className={styles.container}>
      <div className={styles.surroundings}>
        <div className={styles.topLeft}>
          <div className={styles.username}>
            User_name{/*{userData.username}*/}
          </div>
          <div className={styles.highScore}>
            High Score: 1200 {/*{userData.highScore || 0}*/}
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
        {activeModal === "game" && <GameModal />}
        {activeModal === "shop" && <ShopModal onClose={closeModals} />}
        {activeModal === "leaderboard" && (
          <LeaderboardModal onClose={closeModals} />
        )}
      </div>
      <div className={styles.navbar}>
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
          onClick={openGame}
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
