import React, { useContext } from "react";
import { MdNotStarted } from "react-icons/md";
import { IoLogOut, IoNewspaperOutline } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { FaBug } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import SettingsModal from "../Modals/SettingsModal";
import { UserContext } from "../../context/userContext";

export default function DropDownMenu({ Isopen, SetIsOpen, isClosing }) {
  const [ModalIsOpen, SetModalIsOpen] = React.useState(false);
  const { user, logout, loading, error } = useContext(UserContext);

  if (Isopen || isClosing) {
    const menuItems = [
      { Title: "App", Icon: <MdNotStarted /> },
      { Title: "News", Icon: <IoNewspaperOutline /> },
      { Title: "About", Icon: <FaQuestionCircle /> },
      { Title: "Team", Icon: <RiTeamFill /> },
      { Title: "Report Bug", Icon: <FaBug /> },
    ];
    return (
      <>
        <div className={`DropDownMenu ${isClosing ? "closeMenu" : ""}`}>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button style={{ "--delay": `${1 + index * 0.3}s` }}>
                  {item.Title}
                  <div>{item.Icon}</div>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => SetModalIsOpen(true)}
                style={{ "--delay": `${1 + 5 * 0.3}s` }}
              >
                Settings
                <div>
                  <IoSettingsSharp />
                </div>
              </button>
            </li>
            {/* {user && ( */}
            <li>
              <button
                onClick={logout}
                style={{ "--delay": `${1 + 6 * 0.3}s`, color: "#ff5722" }}
              >
                Logout
                <div>
                  <IoLogOut />
                </div>
              </button>
            </li>
            {/* )} */}
          </ul>
        </div>
        {ModalIsOpen && <SettingsModal SetModalIsOpen={SetModalIsOpen} />}
      </>
    );
  }
  return null;
}
