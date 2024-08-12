import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { useFormik } from "formik";
import SignupSchema from "../../Schemas/SignupSchema";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const PasswordReset = () => {
  const [SubmitLoading, SetSubmitLoading] = React.useState(false);
  const [validUrl, setValidUrl] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `/reset-password/${param.id}/${param.token}`;
  const [IsSuccess, setIsSuccess] =useState(false);


  const HandlePasswordChange = (e) => {
    formik.setFieldValue("Password", e.target.value);
  };

  const HandleRepeatedPasswordChange = (e) => {
    formik.setFieldValue("RepeatedPassword", e.target.value);
  };

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

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
          { action: "submitRequest" }
        );

      const { data,status } = await axios.post(url, { password: values.Password });

      clearTimeout(timeoutId);

      if (status === 200) {
        formik.resetForm()
        if(data.message){
      setMsg(data.message);
      setIsSuccess(true);
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
        if (status === 400) {
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
      Password: "",
      RepeatedPassword: "",
    },
    validationSchema: SignupSchema.pick(["Password","RepeatedPassword"]),
    onSubmit: handleSubmit,
  });

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <form
            className={styles.form_container}
            onSubmit={formik.handleSubmit}
          >
            <h1 className={styles.header}>Reset Password</h1>

			<label className={styles.label}>Password</label>
            <input
              type="password"
              name="Password"
              className={`${styles.input}`}
              id="Password"
              onChange={(e) => HandlePasswordChange(e)}
              onBlur={formik.handleBlur}
              value={formik.values.Password}
              disabled={SubmitLoading}
            />
            {<div className={styles.error}>{formik.errors.Password}</div>}
			<label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="RepeatedPassword"
              className={`${styles.input} ${
                formik.errors.Password && formik.touched.Password
                  ? "invalid"
                  : formik.touched.Password
                  ? "valid"
                  : ""
              }`}
              id="RepeatedPassword"
              onChange={(e) => HandleRepeatedPasswordChange(e)}
              onBlur={formik.handleBlur}
              value={formik.values.RepeatedPassword}
              disabled={SubmitLoading}
            />
            {formik.touched.RepeatedPassword &&
              formik.errors.RepeatedPassword && (
                <div className={styles.error}>{formik.errors.RepeatedPassword}</div>
              )}

            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" disabled={SubmitLoading || Object.keys(formik.errors).length > 0} className={styles.green_btn}>
            {IsSuccess ?
            <Link to='/' style={{all:"unset"}}>
              Login
            </Link>
          :
          <div className={styles.center_spinner}>
            {SubmitLoading ? (
              <>
                <MoonLoader size={15} color="white" />
              </>
            ) : (
              "Submit"
            )}
          </div>
          }
            </button>
          </form>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;
