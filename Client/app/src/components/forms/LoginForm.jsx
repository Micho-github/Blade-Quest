import React from "react";
import { useFormik } from "formik";
import LoginSchema from "../Schemas/LoginSchema";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import debounce from "lodash.debounce";
import { UserContext } from "../../context/userContext";
import Cookies from "js-cookie";
export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [SubmitLoading, SetSubmitLoading] = React.useState(false);
  const [SubmitError, SetSubmitError] = React.useState("");
  const { fetchProfile } = React.useContext(UserContext);

  const handleSubmit = async (values) => {
    SetSubmitLoading(true);
    SetSubmitError("");

    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      source.cancel("Request timeout, please try again.");
    }, 15000);

    try {
      if (window.grecaptcha) {
        const token = await window.grecaptcha.execute(
          "6Lf7xh4qAAAAAEe3mfD91ctZznBBkCMUD00SgKRI",
          { action: "login" }
        );

        const { data } = await axios.post(
          "/login",
          {
            email: values.Email,
            password: values.Password,
            recaptchaToken: token,
          },
          {
            cancelToken: source.token,
          }
        );
        clearTimeout(timeoutId);

        if (data.success === false) {
          SetSubmitError(data.error);
          console.log(data.error);
        } else {
          formik.resetForm();
          toast.success("login Successfull!", { theme: "dark" });
          console.log("login Successfull!");
          Cookies.set('Auth_token', data.token, { secure: true, sameSite: 'None' });
          fetchProfile();
        }
      } else {
        toast.error("Recaptcha not loaded yet, Please check your connection.", {
          theme: "dark",
        });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request canceled:", error.message);
        toast.error(error.message, { theme: "dark" });
      } else {
        console.error("An error occurred:", error);
        toast.error("Error connecting to server, please try again later.", {
          theme: "dark",
        });
      }
    }
    setTimeout(() => {
      SetSubmitLoading(false);
    }, 1000);
  };

  const debouncedTogglePasswordVisibility = React.useCallback(
    debounce(() => setShowPassword(!showPassword), 200),
    [showPassword]
  );

  const HandleEmailChange = (e) => {
    formik.setFieldValue("Email", e.target.value);
  };

  const HandlePasswordChange = (e) => {
    formik.setFieldValue("Password", e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form id="login" onSubmit={formik.handleSubmit}>
      <h3>Login</h3>
      <div className="mail">
        <input
          type="email"
          name="Email"
          id="Email"
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
      <div className="passwd">
        <input
          type={showPassword ? "text" : "password"}
          id="Password"
          name="Password"
          className={`${
            formik.errors.Password && formik.touched.Password
              ? "invalid"
              : formik.touched.Password
              ? "valid"
              : ""
          }`}
          onChange={(e) => HandlePasswordChange(e)}
          onBlur={formik.handleBlur}
          value={formik.values.Password}
        />
        <div
          role="button"
          className="toggle-password"
          onClick={debouncedTogglePasswordVisibility}
        >
          {showPassword ? <BiSolidHide size={25} /> : <BiSolidShow size={25} />}
        </div>
        <label>Password</label>
        {formik.touched.Password && formik.errors.Password && (
          <div className="error">{formik.errors.Password}</div>
        )}
        <div className="captcha-text">
        This site is protected by reCAPTCHA and the Google&nbsp;
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
        <a href="https://policies.google.com/terms" >Terms of Service</a> apply.
        </div>
        {SubmitError ? (
          <div className="error" style={{ paddingTop: "10px" }}>
            {SubmitError}
          </div>
        ) : null}
      </div>
      <div className="forgot-pwd">
        <div className="text">Forgot your Password?</div>
      </div>
      <div className="submit">
        <button disabled={SubmitLoading} type="submit" className="login-btn">
          <div>
            {SubmitLoading ? (
              <>
                <MoonLoader size={15} color="white" />
              </>
            ) : (
              "Login"
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
