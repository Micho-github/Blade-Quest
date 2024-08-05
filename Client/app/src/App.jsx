import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Structure/Footer";
import Header from "./components/Structure/Header";
import Main from "./components/Structure/Main";
import MusicPlayer from "./components/Music Player/Musicplayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/userContext";

function App() {
  const [Page, SetPage] = useState("LandingPage");
  const [IsStarted, SetIsStarted] = useState(false);
  
  return (
    <UserContextProvider>
      <div className="app">
        {Page === "LandingPage" && (
          <>
            <video autoPlay loop muted playsInline className="background-video">
              <source
                src={require("./Assets/videos/the-dragon-slayer-berserk.1920x1080.mp4")}
                type="video/mp4"
              />
            </video>
            <MusicPlayer />
            {IsStarted && (
              <>
                <div className="curtain_1"></div>
                <div className="curtain_2"></div>
                <div className="sword_1"></div>
                <div className="sword_2"></div>
              </>
            )}
          </>
        )}
        <Header />
        <ToastContainer />
        <Main Page={Page} IsStarted={IsStarted} SetIsStarted={SetIsStarted} />
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
