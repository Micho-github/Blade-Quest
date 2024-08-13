import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Structure/Footer";
import Header from "./components/Structure/Header";
import Main from "./components/Structure/Main";
import MusicPlayer from "./components/Music Player/Musicplayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/userContext";
import LoadingSpinner from "./components/Pages/LoadingPage";
import axios from "axios";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { LoadingProvider, LoadingContext } from "./context/LoadingContext";
import PageNotFound from "./components/Pages/PageNotFound";
// axios.defaults.baseURL = "http://localhost:8000/api/V1";
axios.defaults.baseURL = "https://bladequest-api.vercel.app/api/V1";
axios.defaults.withCredentials = true;

function App() {
  const [Page, SetPage] = useState("MainPage");
  const [IsStarted, SetIsStarted] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isPageReady, setIsPageReady] = useState(false);
  const param = useParams();

  useEffect(() => {
    const checkGrecaptchaLoaded = () => {
      if (window.grecaptcha) {
        setIsPageReady(true);
        setIsLoading(false);
      } else {
        setTimeout(checkGrecaptchaLoaded, 100); // Check again after 100ms
      }
    };

    setIsLoading(true);
    checkGrecaptchaLoaded();
  }, [setIsLoading]);

  return (
    <div className="app">
      {!isPageReady && <LoadingSpinner />}
      {isPageReady && (
        <>
          <MusicPlayer />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {Page === "MainPage" && (
                    <>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`background-video ${IsStarted && "move"}`}
                      >
                        <source
                          src={require("./Assets/videos/the-dragon-slayer-berserk.1920x1080.mp4")}
                          type="video/mp4"
                        />
                      </video>

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
                </>
              }
            />
          </Routes>
          <Header />
          <ToastContainer />
          <Main Page={Page} IsStarted={IsStarted} SetIsStarted={SetIsStarted} />
          <Footer />
        </>
      )}
    </div>
  );
}
export default App;
