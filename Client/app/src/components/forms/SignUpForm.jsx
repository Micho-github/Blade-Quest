import React, { useEffect } from "react";
import debounce, { EmailHighlighted } from "../functions/functions";
import { useFormik } from "formik";
import SignupSchema from "../Schemas/SignupSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import PasswordStrengthMeter from "../PasswordStrengthChecker/StrengthMeter";
import TermsAndcond from "../Buttons/TermsAndcond";
import TermsModal from "../Modals/TermsModal";
import { ClipLoader, MoonLoader } from "react-spinners";
export default function SignUpForm() {
  const [showPassword, SetShowPassword] = React.useState(false);
  const [SubmitLoading, SetSubmitLoading] = React.useState(false);
  const [SubmitError, SetSubmitError] = React.useState("");
  const [SubmitResponse, SetSubmitResponse] = React.useState("");
  const [UserCheckLoading, SetUserCheckLoading] = React.useState(false);
  const [UsernameResponse, SetUsernameResponse] = React.useState("");
  const [cancelTokenSource, SetCancelTokenSource] = React.useState(null);
  const [UserExist, SetUserExist] = React.useState(true);
  const [TermModalIsOpen, SetTermModalIsOpen] = React.useState(false);
  const source = axios.CancelToken.source();

  const timeoutId = setTimeout(() => {
    source.cancel("Error connecting to server, please try again.");
  }, 15000);

  const HandleEmailChange = (e) => {
    formik.setFieldValue("Email", e.target.value);
  };

  const HandleUserNameChange = (e) => {
    formik.setFieldValue("UserName", e.target.value);
    SetUsernameResponse("");
  };

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
        SetSubmitLoading(true);
        if (window.grecaptcha) {
          const token = await window.grecaptcha.execute(
            "6Lf7xh4qAAAAAEe3mfD91ctZznBBkCMUD00SgKRI",
            { action: "signup" }
          );

          const { data, status } = await axios.post(
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

          if (status === 201) {
            formik.resetForm();
            SetUsernameResponse("");
            SetSubmitResponse(data.message);
            toast.success("Account Created!", { theme: "dark" });
            console.log("Account Created!");
          } else {
            console.error(`Unexpected error: ${status}`, data);
            toast.error(`Unexpected error: ${status}`, { theme: "dark" });
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
        clearTimeout(timeoutId);

        if (axios.isCancel(error)) {
          console.error("Request canceled:", error.message);
          toast.error(error.message, { theme: "dark" });
        } else if (error.response) {
          const { status, data } = error.response;
  
          if (status === 400 || status === 409) {
            SetSubmitError(data.message);
            toast.error(data.message, { theme: "dark" });
            console.log(data.message);
          } else {
            console.error(`Unexpected error: ${status}`, data);
            toast.error(`Unexpected error: ${status}`, { theme: "dark" });
          }
        } else {
          console.error("An error occurred:", error);
          toast.error("An error occurred, please try again later.", { theme: "dark" });
        }
      } finally {
        SetSubmitLoading(false);
      }
    },
  });

  
  const checkUsername = React.useCallback(
    debounce(async (username, source) => {
      const timeoutId = setTimeout(() => {
        SetUsernameResponse({ message: "Failed to fetch usermame." });
        source.cancel("Request timed out. Check your connection.");
      }, 15000);

      try {
        const { data, status } = await axios.post(
          "/checkusername",
          { username: username },
          { cancelToken: source.token }
        );

        clearTimeout(timeoutId);

        if (status === 200 || status === 201) {
          SetUserExist(false);
          SetUsernameResponse({ message: data.message });
          console.log(data.message);
        } else {
          SetUserExist(true);
          SetUsernameResponse({ message: "Unexpected status code received." });
          console.log("Unexpected status code:", status);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        SetUserExist(true);
        if (axios.isCancel(error)) {
          console.error("Request canceled:", error.message);
          toast.error(error.message, { theme: "dark" });
        } else if (error.response) {
          const { status, data } = error.response;

          if (status === 400 || status === 409) {
            SetUsernameResponse({ message: data.message });
            console.log(data.message);
          } else {
            SetUsernameResponse({ message: "Failed to fetch usermame." });
            console.error("Unexpected error:", status, data);
            toast.error(
              "An unexpected error occurred, please try again later.",
              {
                theme: "dark",
              }
            );
          }
        } else {
          console.error("An error occurred:", error);
          SetUsernameResponse({ message: "Failed to fetch usermame." });
          toast.error("Error connecting to server, please try again later.", {
            theme: "dark",
          });
        }
      } finally {
        SetUserCheckLoading(false);
      }
    }, 3000),
    []
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (formik.values.UserName && !formik.errors.UserName) {
      SetCancelTokenSource(source); // Store the source for cancellation if needed
      SetUserExist(true);
      SetUserCheckLoading(true);
      checkUsername(formik.values.UserName, source);
    }

    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel(
          "Operation canceled due to component unmount or UserName change."
        );
      }
    };
  }, [formik.values.UserName, formik.errors.UserName]);

  return (
    <>
      <form id="register" onSubmit={formik.handleSubmit}>
        <h3>SignUp</h3>
        {SubmitLoading ? (
          <div className="center-loader">
            <ClipLoader size={40} color="white" />
          </div>
        ) : SubmitResponse ? (
          <div
            className="center-loader"
            style={{ color: "#31ff22", textAlign: "start" }}
          >
            {EmailHighlighted(SubmitResponse)}
          </div>
        ) : (
          <>
            <div className="mail">
              <input
                type="email"
                name="Email"
                id="NewEmail"
                className={`
                  ${
                    formik.errors.Email && formik.touched.Email
                      ? "invalid"
                      : formik.touched.Email
                      ? "valid"
                      : ""
                  }`}
                onChange={(e) => HandleEmailChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
                disabled={SubmitLoading}
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
                maxLength={20}
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
                disabled={SubmitLoading}
              />
              <label>UserName</label>
              {formik.touched.UserName && formik.errors.UserName && (
                <div className="error">{formik.errors.UserName}</div>
              )}

              {!formik.errors.UserName &&
                (UserCheckLoading ? (
                  <div style={{ marginTop: "5px" }}>
                    <ClipLoader size={20} color="white" />
                  </div>
                ) : (
                  UsernameResponse && (
                    <div
                      className={`usernamecheck ${
                        UsernameResponse.message === "Username Available"
                          ? "available"
                          : "taken"
                      }`}
                    >
                      {UsernameResponse.message === "Username Available" ? (
                        <>
                          <FaCheckCircle />
                          <span>{UsernameResponse.message}</span>
                        </>
                      ) : (
                        <>
                          <IoCloseCircleSharp />
                          <span>{UsernameResponse.message}</span>
                        </>
                      )}
                    </div>
                  )
                ))}
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
                maxLength={32}
                id="NewPassword"
                onChange={(e) => HandlePasswordChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
                disabled={SubmitLoading}
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
                  formik.errors.RepeatedPassword &&
                  formik.touched.RepeatedPassword
                    ? "invalid"
                    : formik.touched.RepeatedPassword
                    ? "valid"
                    : ""
                }`}
                maxLength={32}
                id="RepeatedPassword"
                onChange={(e) => HandleRepeatedPasswordChange(e)}
                onBlur={formik.handleBlur}
                value={formik.values.RepeatedPassword}
                disabled={SubmitLoading}
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
                SubmitLoading={SubmitLoading}
              />
            </div>
            {SubmitError ? (
              <div className="error" style={{ paddingTop: "10px" }}>
                {SubmitError}
              </div>
            ) : null}

            <div className="submit">
              <button
                type="submit"
                disabled={
                  UserExist ||
                  SubmitLoading ||
                  Object.keys(formik.errors).length > 0
                }
                className="signup-btn"
              >
                {SubmitLoading ? (
                  <div>
                    <MoonLoader size={15} color="white" />
                  </div>
                ) : (
                  "SignUp"
                )}
              </button>
            </div>
          </>
        )}
      </form>
      {TermModalIsOpen && (
        <TermsModal formik={formik} SetTermModalIsOpen={SetTermModalIsOpen} />
      )}
    </>
  );
}
