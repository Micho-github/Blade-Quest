import * as Yup from "yup";

const SignupSchema = Yup.object({
  Email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
    UserName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Username can only contain letters and numbers")
    .required("Username is required"),
    Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  RepeatedPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Please confirm your password"),
    terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export default SignupSchema;
