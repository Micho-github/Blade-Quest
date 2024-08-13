import React, { useRef } from "react";
import "./Styles.css";
import { IoMdClose } from "react-icons/io";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";
import ForgotPasswordForm from '../forms/ForgotPasswordForm'

export default function LoginModal({ SetModalIsOpen }) {
  const [RegisterType, SetRegisterType] = React.useState("Login");
  const [IsResetPassword,SetIsResetPassword] = React.useState(false);
  const containerRef = useRef(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };
  return (
    <div className="modal-window">
      <div className="veen">
        <div className="login-btn splits">
          <p>Already a user?</p>
          <button
            className={`${RegisterType === "Login" ? "active" : ""}`}
            onClick={() => {
              scrollToTop();
              SetRegisterType("Login");
            }}
          >
            Login
          </button>
        </div>
        <div className="rgstr-btn splits">
          <p>Don't have an account?</p>
          <button
            className={`${RegisterType === "SignUp" ? "active" : ""} `}
            onClick={() => SetRegisterType("SignUp")}
          >
            SignUp
          </button>
        </div>
        <div
          className={`wrapper ${RegisterType === "Login" ? "" : RegisterType === "SignUp" ? "move" : RegisterType === "ForgotPassword" ? "forgot": ""} `}
          ref={containerRef}
        >
          <div
            title="Close"
            onClick={() => SetModalIsOpen(false)}
            className="modal-close move"
          >
            <IoMdClose size={30} />
          </div>
          <LoginForm RegisterType={RegisterType} SetRegisterType={SetRegisterType}/>
          <ForgotPasswordForm RegisterType={RegisterType} SetRegisterType={SetRegisterType}/>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
