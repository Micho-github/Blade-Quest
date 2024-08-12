import * as Yup from "yup";

const SignupSchema = Yup.object({
  Email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  UserName: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/, "Username can only contain letters and numbers")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .required("Username is required"),
  Password: Yup.string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters")
    .required("Password is required"),
  RepeatedPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Please confirm your password"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export default SignupSchema;
