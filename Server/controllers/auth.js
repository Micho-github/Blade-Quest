const User = require("../Models/user");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const Token = require("../Models/token");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const { emailContent } = require("../helpers/EmailContent");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Constants
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SCORE_THRESHOLD = 0.5;
const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;

// Helper function for reCAPTCHA validation
const validateRecaptcha = async (recaptchaToken) => {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    );
    const { success, score } = response.data;
    return success && score >= RECAPTCHA_SCORE_THRESHOLD;
  } catch (error) {
    console.error("reCAPTCHA verification message:", error);
    return false;
  }
};

// SignUp Endpoint
const signupUser = async (req, res) => {
  try {
    const { email, username, password, recaptchaToken } = req.body;

    if (!await validateRecaptcha(recaptchaToken)) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }

    const Schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: passwordComplexity().required().label("Password"),
      username: Joi.string()
        .min(3)
        .max(20)
        .alphanum() // Only letters and numbers
        .required()
        .label('Username'),
    });

    const { error } = Schema.validate({ email, password,username });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const emailLower = email.toLowerCase();
    const usernameLower = username.toLowerCase();

    const emailExist = await User.findOne({ email: emailLower });
    if (emailExist) return res.status(409).json({ message: "Email is already used." });

    const usernameExist = await User.findOne({ username: usernameLower });
    if (usernameExist) return res.status(409).json({ message: "Username is already used." });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username: usernameLower,
      email: emailLower,
      password: hashedPassword,
    });

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    await token.save();

    const url = `${BASE_URL}/users/${user._id}/verify/${token.token}`;

    await sendEmail(
      user.email,
      "Welcome to Blade Quest! Please Verify Your Email",
      emailContent(url)
    );

    res.status(201).json({
      message: `Verification email sent to ${user.email}. Check your inbox or spam folder.`,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Signup failed, please try again." });
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;

    if (!await validateRecaptcha(recaptchaToken)) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }
    const Schema = Joi.object({
      email: Joi.string().email().required().label('Email'),
      password: Joi.required().label("Password"),
    });

    const { error } = Schema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });


    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Wrong Email or Password." });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong Email or Password." });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
        await token.save();

        const url = `${BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(
          user.email,
          "Welcome to Blade Quest! Please Verify Your Email",
          emailContent(url)
        );

        return res.status(201).json({
          message: `New verification email sent to ${user.email}. Check your inbox or spam folder.`,
        });
      }
      return res.status(200).json({
        message: `Verification email is already sent to ${user.email}. Check your inbox or spam folder.`,
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.username },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed, please try again." });
  }
};

// Get Profile
const getProfile = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification message:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({
      email: decoded.email,
      id: decoded.id,
      name: decoded.name,
    });
  });
};

// Logout
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
};
