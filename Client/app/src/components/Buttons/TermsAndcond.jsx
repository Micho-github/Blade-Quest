import React from "react";
import "./styles.css";
export default function TermsAndcond({ formik,SetTermModalIsOpen }) {
  return (
    <>
      <div className="term-container" onClick={()=>SetTermModalIsOpen(true)}>
        <input
          type="checkbox"
          checked={formik.values.terms}
          readOnly
        />
        <div className="checkmark"></div>
        <div>I agree with terms and conditions</div>
      </div>
      {formik.touched.terms && formik.errors.terms && (
        <div className="error">{formik.errors.terms}</div>
      )}
    </>
  );
}
