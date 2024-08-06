const User = require("../Models/user");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");


//SignUp Endpoint
const signupUser = async (req, res) => {
  try {
    const { email, username, password, recaptchaToken } = req.body;

    //captcha verification
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6Lf7xh4qAAAAAMEpU9zQrjRpUtBhMKQg2rYv_a19&response=${recaptchaToken}`
    );

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.json({
        success: false,
        error: "reCAPTCHA verification failed",
      });
    }
    // check if name was entered
    if (!username) {
      return res.json({
        error: "username is required",
      });
    }
    //check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    // Check email
    const exist = await User.findOne({ email: email.toLowerCase() });
    if (exist) {
      return res.json({
        success: false,
        error: "Email is already used.",
      });
    }
    //check username
    const usernameexist = await User.findOne({
      username: username.toLowerCase(),
    });
    if (usernameexist) {
      return res.json({
        success: false,
        error: "Username is already used.",
      });
    }
    const hashedPassword = await hashPassword(password);
    //create user
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;

    //captcha verification
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6Lf7xh4qAAAAAMEpU9zQrjRpUtBhMKQg2rYv_a19&response=${recaptchaToken}`
    );

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.json({
        success: false,
        error: "reCAPTCHA verification failed",
      });
    }
    // check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({
        success: false,
        error: "Wrong Email or Password.",
      });
    }
    //check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      const isProduction = process.env.NODE_ENV === 'production';
      jwt.sign(
        { email: user.email, id: user._id, name: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;

          res.setHeader("Access-Control-Allow-Credentials", "true");
          res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

          res.cookie('Auth_token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
          }).json(user);
        }
      );
      // return res.json({
      //   success: true,
      //   message: "Passwords match",
      // });
    }
    if (!match) {
      return res.json({
        success: false,
        error: "Wrong Email or Password.",
      });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.json({ success: false, error: "Internal server error" });
  }
};



const getProfile = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
  console.log("Token from cookie:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" }); // Early return if no token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err); // Log error for debugging
      return res.status(401).json({ message: "Invalid token" });
    }

    // If token is valid, return user info
    return res.json({
      email: decoded.email,
      id: decoded.id,
      name: decoded.name,
    });
  });
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
};
