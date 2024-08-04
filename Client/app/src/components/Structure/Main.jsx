import React, { useContext, useEffect } from "react";
import StartButton from "../Buttons/StartButton";
import RegisterBtn from "../Buttons/RegisterBtn";
import { UserContext } from "../../context/userContext";
export default function Main({ Page, IsStarted, SetIsStarted }) {
  const [UserLoggedIn, SetUserLoggedIn] = React.useState(false);
  const { user, loading, error } = useContext(UserContext);

  return (
    <div className="Main">
      {Page === "LandingPage" &&
        (user ? (
          <>
            <StartButton IsStarted={IsStarted} SetIsStarted={SetIsStarted} />
          </>
        ) : (
          <>
            <RegisterBtn />
          </>
        ))}
    </div>
  );
}
