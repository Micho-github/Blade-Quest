import React from "react";
import "./styles.css";
import { LuSwords } from "react-icons/lu";
export default function Start({ IsStarted, SetIsStarted }) {
  return (
    <button
      className={`StartBtn ${IsStarted ? "close" : ""}`}
      onClick={() => SetIsStarted(true)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <LuSwords size={30} />
      Start
    </button>
  );
}
