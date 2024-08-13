import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { IoIosCloseCircle } from "react-icons/io";

export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.flex_center}>
        <IoIosCloseCircle size={37} color="red" />
        <h1 className={styles.h1}>404 Page Not Found</h1>
      </div>
      <p className={styles.p}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className={styles.p}>Please try clicking on the button below.</p>
      <Link to="/" style={{ all: "unset" }}>
        <button className={styles.green_btn}>
          Go to the<br></br>Main Page
        </button>
      </Link>
    </div>
  );
}
