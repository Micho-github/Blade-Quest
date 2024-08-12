import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import SignupSchema from "../Schemas/SignupSchema";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { MoonLoader } from "react-spinners";
import { EmailHighlighted } from "../functions/functions";

export default function ResetPasswordForm() {
  const [SubmitLoading, SetSubmitLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const HandleEmailChange = (e) => {
    formik.setFieldValue("Email", e.target.value);
  };

  const handleSubmit = async (values) => {
    SetSubmitLoading(true);
    setError("");
    setMsg("");
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      source.cancel("Request timeout, please try again.");
    }, 30000);

    try {
      if (window.grecaptcha) {
        const token = await window.grecaptcha.execute(
          "6Lf7xh4qAAAAAEe3mfD91ctZznBBkCMUD00SgKRI",
          { action: "requestReset" }
        );

        const { data, status } = await axios.post(
          "/reset-password",
          {
            email: values.Email,
          },
          {
            cancelToken: source.token,
          }
        );
        clearTimeout(timeoutId);
        if (status === 200) {
          formik.resetForm();
          if (data.message) {
            setMsg(data.message);
            return SetSubmitLoading(false);
          }
        } else {
          throw new Error("Unexpected status code received.");
        }
      } else {
        toast.error("Recaptcha not loaded yet, Please check your connection.", {
          theme: "dark",
        });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 || status === 409) {
          setError(data.message);
        } else {
          console.error(`Unexpected error: ${status}`, data);
          toast.error(`Unexpected error: ${status}`, { theme: "dark" });
        }
      } else if (axios.isCancel(error)) {
        console.error("Request canceled:", error.message);
        toast.error(error.message, { theme: "dark" });
      } else {
        console.error("An error occurred:", error);
        toast.error("Error connecting to server, please try again later.", {
          theme: "dark",
        });
      }
    } finally {
      setTimeout(() => {
        SetSubmitLoading(false);
      }, 1000);
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: SignupSchema.pick(["Email"]),
    onSubmit: handleSubmit,
  });

  return (
    <form id="forgot-pwd" onSubmit={formik.handleSubmit}>
      <h3 style={{ marginTop: "20px" }}>Forgot Password</h3>
      <div style={{ top: "5vh" }}>
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
            disabled={SubmitLoading}
          />
          <label>Email</label>
          {formik.touched.Email && formik.errors.Email && (
            <div className="error">{formik.errors.Email}</div>
          )}
        </div>
        {error ? (
          <div className="error" style={{ paddingTop: "10px" }}>
            {error}
          </div>
        ) : null}

        {msg ? (
          <div
            className="error center-items"
            style={{
              color: "#31ff22",
              marginTop: "10px",
              fontSize: "15px",
              width: "95%",
            }}
          >
            <FaCheckCircle
              size={15}
              style={{ marginRight: "5px", marginBottom: "-2px" }}
            />
            <span>{EmailHighlighted(msg)}</span>
          </div>
        ) : null}
          <button disabled={SubmitLoading || Object.keys(formik.errors).length > 0} type="submit" className="reset-btn">
          <div>
            {SubmitLoading ? (
              <>
                <MoonLoader size={15} color="white" />
              </>
            ) : (
              "Submit"
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
