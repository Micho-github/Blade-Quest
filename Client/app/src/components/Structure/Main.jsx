import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../Pages/MainPage";
import EmailVerify from "../Pages/EmailVerify";
import PasswordReset from "../Pages/PasswordReset";
import PageNotFound from "../Pages/PageNotFound";
import MainGamePage from "../Pages/MainGamePage";

export default function Main({ Page, IsStarted, SetIsStarted }) {
  return (
    <div className="Main">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              Page={Page}
              IsStarted={IsStarted}
              SetIsStarted={SetIsStarted}
            />
          }
        />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/reset-password/:id/:token" element={<PasswordReset />} />
        <Route path="/MainGamePage" element={<MainGamePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
