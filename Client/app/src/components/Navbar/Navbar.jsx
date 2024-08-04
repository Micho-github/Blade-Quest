import React from "react";
import SideMenuBtn from "../Buttons/SideMenuBtn";
import DropDownMenu from "./DropDownMenu";

export default function Navbar() {
  const [Isopen,SetIsOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  
  return (
    <>
    <div className="Navbar">
      <SideMenuBtn Isopen={Isopen} SetIsOpen={SetIsOpen} isClosing={isClosing} setIsClosing={setIsClosing}/>
      <img
        alt="logo"
        src={require("../../Assets/images/Blade-Quest-logo-black.png")}
        width={250}
        className="game-logo"
      />
      
    </div>
    <div>
    <DropDownMenu Isopen={Isopen} SetIsOpen={SetIsOpen} isClosing={isClosing}/>
    </div>
    </>
  );
}
