import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { GrTest } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoIosCloseCircle, IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(".");
  const param = useParams();

  useEffect(() => {
    let dotInterval;
    if (loading) {
      dotInterval = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots === "...") return ".";
          return prevDots + ".";
        });
      }, 500);
    }

    return () => clearInterval(dotInterval);
  }, [loading]);

  const verifyEmail = async () => {
    setLoading(true);
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      source.cancel("Request timeout, please try again.");
      toast.error("Request timeout, please try again.");
      setLoading(false);
    }, 10000);

    try {
      const { data, status } = await axios.get(
        `/users/${param.id}/verify/${param.token}`,
        { cancelToken: source.token }
      );
      clearTimeout(timeoutId);

      if (status === 200) {
        toast.success("Email verified successfully!");
        setValidUrl(true);
      } else {
        throw new Error("Unexpected status code received.");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (axios.isCancel(error)) {
        toast.error("Request was cancelled.");
      } else if (error.response) {
        const { status, data } = error.response;
        if (status === 400 || status === 500) {
          toast.error(data.message );
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      setValidUrl(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {validUrl === null ? (
        <div className={styles.container}>
          <div className={styles.flex_center}>
            {" "}
            <GrTest size={40} color="#28a745" /> <h1 className={styles.h1}>Email Verification</h1>
          </div>
          <p className={styles.p}>
            Thank you for registering! To complete your registration, please
            verify your email by clicking the button below. This helps us ensure
            that your email address is valid and that you're able to receive
            important updates from us.
          </p>
          <button
            onClick={verifyEmail}
            className={styles.green_btn}
            disabled={loading}
          >
            {loading ? `Verifying${dots}` : "Verify Email"}
          </button>
        </div>
      ) : validUrl ? (
        <div className={styles.container}>
          <div className={styles.flex_center}>
            {" "}
            <IoMdCheckmarkCircleOutline size={70} color="#28a745" />
            <h1 className={styles.h1}>Email Verified Successfully</h1>
          </div>
          <p className={styles.p}>
            Your email has been successfully verified! You can now proceed to
            log in and access your account. Thank you for confirming your email
            address.
          </p>
          <Link to="/" style={{ all: "unset" }}>
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <div className={styles.container}>
                    <div className={styles.flex_center}>
            {" "}
            <IoIosCloseCircle size={40} color="red" />
            <h1 className={styles.h1}>404 Not Found</h1>
          </div>

          <p>
            The verification link you used is invalid or has expired. Please
            check your email for a valid link or contact support for assistance.
          </p>
        </div>
      )}
    </React.Fragment>
  );
}
