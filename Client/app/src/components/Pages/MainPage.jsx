import React, { useContext } from 'react'
import StartButton from "../Buttons/StartButton";
import RegisterBtn from "../Buttons/RegisterBtn";
import { UserContext } from '../../context/userContext';

export default function MainPage({ Page, IsStarted, SetIsStarted }) {
    const [UserLoggedIn, SetUserLoggedIn] = React.useState(false);
    const { user, loading, error } = useContext(UserContext);
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
