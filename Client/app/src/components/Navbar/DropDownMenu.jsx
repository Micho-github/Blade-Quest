import React, { useContext } from "react";
import { MdNotStarted } from "react-icons/md";
import { IoLogOut, IoNewspaperOutline } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { FaBug } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import SettingsModal from "../Modals/SettingsModal";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DropDownMenu({
  Isopen,
  SetIsOpen,
  isClosing,
  setIsClosing,
}) {
  const [ModalIsOpen, SetModalIsOpen] = React.useState(false);
  const { user, logout, loading, error } = useContext(UserContext);

  const handleClick = () => {
    if (Isopen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        SetIsOpen(false);
      }, 500);
    }
  };

  if (Isopen || isClosing) {
    const menuItems = [
      { Title: "Main Menu", Icon: <MdNotStarted />, link: "/" },
      { Title: "News", Icon: <IoNewspaperOutline />, link: "" },
      { Title: "About", Icon: <FaQuestionCircle />, link: "" },
      { Title: "Team", Icon: <RiTeamFill />, link: "" },
      { Title: "Resources", Icon: <GrResources />, link: "" },
      { Title: "Report Bug", Icon: <FaBug />, link: "" },
    ];
    return (
      <>
        <div className={`DropDownMenu ${isClosing ? "closeMenu" : ""}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  style={{ all: "unset" }}
                  onClick={handleClick}
                >
                  <button style={{ "--delay": `${1 + index * 0.3}s` }}>
                    {item.Title}
                    <div>{item.Icon}</div>
                  </button>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => SetModalIsOpen(true)}
                style={{ "--delay": `${1 + 6 * 0.3}s` }}
              >
                Settings
                <div>
                  <IoSettingsSharp />
                </div>
              </button>
            </li>
            {user && (
              <li>
                <button
                  onClick={logout}
                  style={{ "--delay": `${1 + 7 * 0.3}s`, color: "#ff5722" }}
                >
                  Logout
                  <div>
                    <IoLogOut />
                  </div>
                </button>
              </li>
            )}
          </ul>
        </div>
        {ModalIsOpen && <SettingsModal SetModalIsOpen={SetModalIsOpen} />}
      </>
    );
  }
  return null;
}
