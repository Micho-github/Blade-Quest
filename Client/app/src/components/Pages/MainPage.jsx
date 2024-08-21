import React, { useContext } from "react";
import StartButton from "../Buttons/StartButton";
import RegisterBtn from "../Buttons/RegisterBtn";
import { UserContext } from "../../context/userContext";
import Header from "../Structure/Header";
import { SlSizeFullscreen } from "react-icons/sl";
import { PiDeviceRotate } from "react-icons/pi";
import { BsPhoneLandscape } from "react-icons/bs";

export default function MainPage({ Page, IsStarted, SetIsStarted }) {
  const [UserLoggedIn, SetUserLoggedIn] = React.useState(false);
  const { user, loading, error } = useContext(UserContext);
  return (
    <React.Fragment>
      <Header />
      {Page === "MainPage" &&
        (user ? (
          <>
            <StartButton IsStarted={IsStarted} SetIsStarted={SetIsStarted} />
          </>
        ) : (
          <>
            <RegisterBtn />
          </>
        ))}
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
          then your screen size is not supported! Or continue adjusting for PC.
        </div>
      </div>
    </React.Fragment>
  );
}
