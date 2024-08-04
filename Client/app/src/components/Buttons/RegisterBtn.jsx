import React from "react";
import './styles.css'
import LoginModal from "../Modals/RegisterModal";

export default function RegisterBtn() {
    const [ModalIsOpen,SetModalIsOpen] = React.useState(false);
  return (
    <div>
        {ModalIsOpen ? null:(
      <button
      onClick={()=>SetModalIsOpen(true)}
      className="register-btn btn-12">
        <span>Register Now</span>
        <span>Join Us</span>
      </button>
      )}
      {ModalIsOpen && <LoginModal SetModalIsOpen={SetModalIsOpen}/>}
    </div>
  );
}
