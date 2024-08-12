import * as Yup from "yup";

const LoginSchema = Yup.object({
  Email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  Password: Yup.string()
    .required("Password is required"),
});

export default LoginSchema;
