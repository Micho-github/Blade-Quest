import React from "react";
import "./styles.css";
export default function SideMenuBtn({ Isopen, SetIsOpen,setIsClosing }) {
  const handleClick = () => {
    SetIsOpen(!Isopen);
    if(Isopen){
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      SetIsOpen(false);
    }, 500);
  }
  }
  return (
    <div
      id="nav-icon3"
      className={`${Isopen ? "open" : ""}`}
      onClick={handleClick}
    >
      <span style={{ background: "#2a2929" }}></span>
      <span style={{ background: "#2a2929" }}></span>
      <span style={{ background: "#2a2929" }}></span>
      <span style={{ background: "#2a2929" }}></span>
    </div>
  );
}
