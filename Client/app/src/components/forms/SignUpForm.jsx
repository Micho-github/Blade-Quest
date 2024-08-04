import React, { useEffect } from "react";
import debounce from "../functions/functions";
import { Formik, useFormik } from "formik";
import SignupSchema from "../Schemas/SignupSchema";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import PasswordStrengthMeter from "../PasswordStrengthChecker/StrengthMeter";
import TermsAndcond from "../Buttons/TermsAndcond";
import TermsModal from "../Modals/TermsModal";
export default function SignUpForm() {
  const [showPassword, SetShowPassword] = React.useState(false);
  const [SubmitLoading, SetSubmitLoading] = React.useState(false);
  const [SubmitMessage, SetSubmitMessage] = React.useState("");
  const [UsernameResponse, SetUsernameResponse] = React.useState("");
  const [cancelTokenSource, SetCancelTokenSource] = React.useState(null);
  const [UserExist, SetUserExist] = React.useState(true);
  const [TermModalIsOpen, SetTermModalIsOpen] = React.useState(false);
  const source = axios.CancelToken.source();

  const timeoutId = setTimeout(() => {
    source.cancel("Request timeout, please try again.");
  }, 15000);

  const HandleEmailChange = (e) => {
    formik.setFieldValue("Email", e.target.value);
  };

  const HandleUserNameChange = (e) => {
    formik.setFieldValue("UserName", e.target.value);
    SetUsernameResponse("");
  };

  const checkUsername = React.useCallback(
    debounce(async (username) => {
      SetCancelTokenSource(source);
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Operation canceled due to new request.");
      }

      try {
        const { data } = await axios.post(
          "/checkusername",
          {
            username: username,
          },
          {
            cancelToken: source.token,
          }
        );
        clearTimeout(timeoutId);

        if (data.success === false) {
          SetUserExist(true);
          SetUsernameResponse({ message: data.error });
          console.log(data.error);
        } else {
          SetUserExist(false);
          SetUsernameResponse({ message: data.message });
          console.log(data.message);
        }
      } catch (error) {
        SetUserExist(true);
        if (axios.isCancel(error)) {
          console.error("Request canceled:", error.message);
          toast.error(error.message, { theme: "dark" });
        } else {
          console.error("An error occurred:", error);
          toast.error("An error occurred, please try again later.", {
            theme: "dark",
          });
        }
      }
    }, 3000), // 3 seconds debounce
    [cancelTokenSource]
  );

  const HandlePasswordChange = (e) => {
    formik.setFieldValue("Password", e.target.value);
  };

  const HandleRepeatedPasswordChange = (e) => {
    formik.setFieldValue("RepeatedPassword", e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      UserName: "",
      Password: "",
      RepeatedPassword: "",
      terms: false,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        if (window.grecaptcha) {
          const token = await window.grecaptcha.execute(
            "6Lf7xh4qAAAAAEe3mfD91ctZznBBkCMUD00SgKRI",
            { action: "signup" }
          );

          const { data } = await axios.post(
            "/signup",
            {
              email: values.Email,
              username: values.UserName,
              password: values.Password,
              recaptchaToken: token,
            },
            {
              cancelToken: source.token,
            }
          );
          clearTimeout(timeoutId);

          if (data.success === false) {
            SetSubmitMessage(data.error);
            console.log(data.error);
          } else {
            formik.resetForm();
            SetUsernameResponse("");
            toast.success("Account Created!", { theme: "dark" });
            console.log("Account Created!");
          }
        } else {
          toast.error(
            "Recaptcha not loaded yet, Please check your connection.",
            {
              theme: "dark",
            }
          );
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("Request canceled:", error.message);
          toast.error(error.message, { theme: "dark" });
        } else {
          console.error("An error occurred:", error);
          toast.error("An error occurred, please try again later.", {
            theme: "dark",
          });
        }
      }
      setTimeout(() => {
        SetSubmitLoading(false);
      }, 1000);
    },
  });

  useEffect(() => {
    if (formik.values.UserName) {
      checkUsername(formik.values.UserName);
    }
  }, [formik.values.UserName]);

  return (
    <>
      <form id="register" onSubmit={formik.handleSubmit}>
        <h3>SignUp</h3>
        <div className="mail">
          <input
            type="email"
            name="Email"
            id="NewEmail"
            className={`${
              formik.errors.Email && formik.touched.Email
                ? "invalid"
                : formik.touched.Email
                ? "valid"
                : ""
            }`}
            onChange={(e) => HandleEmailChange(e)}
            onBlur={formik.handleBlur}
            value={formik.values.Email}
          />
          <label>Email</label>
          {formik.touched.Email && formik.errors.Email && (
            <div className="error">{formik.errors.Email}</div>
          )}
        </div>
        <div className="uid">
          <input
            type="text"
            name="UserName"
            id="UserName"
            className={`${
              formik.errors.UserName && formik.touched.UserName
                ? "invalid"
                : formik.touched.UserName
                ? "valid"
                : ""
            }`}
            onChange={(e) => HandleUserNameChange(e)}
            onBlur={formik.handleBlur}
            value={formik.values.UserName}
          />
          <label>UserName</label>
          {formik.touched.UserName && formik.errors.UserName && (
            <div className="error">{formik.errors.UserName}</div>
          )}
          {!formik.errors.UserName && UsernameResponse && (
            <div className="usernamecheck">
              {UsernameResponse.message === "Username Available" ? (
                <div className="available">
                  {" "}
                  <div>
                    <FaCheckCircle />
                  </div>{" "}
                  <div>{UsernameResponse.message} </div>
                </div>
              ) : (
                <div className="taken">
                  {" "}
                  <IoCloseCircleSharp /> {UsernameResponse.message}{" "}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="passwd">
          <input
            type={showPassword ? "text" : "password"}
            name="Password"
            className={`${
              formik.errors.Password && formik.touched.Password
                ? "invalid"
                : formik.touched.Password
                ? "valid"
                : ""
            }`}
            id="NewPassword"
            onChange={(e) => HandlePasswordChange(e)}
            onBlur={formik.handleBlur}
            value={formik.values.Password}
          />
          <label>Password</label>
          {formik.touched.Password && formik.errors.Password && (
            <div className="error">{formik.errors.Password}</div>
          )}
          {formik.touched.Password && (
            <PasswordStrengthMeter password={formik.values.Password} />
          )}
        </div>
        <div className="passwd">
          <input
            type="password"
            name="RepeatedPassword"
            className={`${
              formik.errors.RepeatedPassword && formik.touched.RepeatedPassword
                ? "invalid"
                : formik.touched.RepeatedPassword
                ? "valid"
                : ""
            }`}
            id="RepeatedPassword"
            onChange={(e) => HandleRepeatedPasswordChange(e)}
            onBlur={formik.handleBlur}
            value={formik.values.RepeatedPassword}
          />
          <label>Repeated Password</label>
          {formik.touched.RepeatedPassword &&
            formik.errors.RepeatedPassword && (
              <div className="error">{formik.errors.RepeatedPassword}</div>
            )}
        </div>
        <div>
          <TermsAndcond
            formik={formik}
            SetTermModalIsOpen={SetTermModalIsOpen}
          />
        </div>
        <div className="submit">
          <button type="submit" disabled={UserExist} className="signup-btn">
            SignUp
          </button>
        </div>
      </form>
      {TermModalIsOpen && (
        <TermsModal formik={formik} SetTermModalIsOpen={SetTermModalIsOpen} />
      )}
    </>
  );
}
