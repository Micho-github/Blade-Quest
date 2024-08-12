const  User  = require("../Models/user");
const Token = require("../Models/token");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { ResetPasswordEmail } = require("../helpers/ResetPasswordEmail");
const { hashPassword } = require("../helpers/auth");

// send password link
const send_password_link = async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label('Email'),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).json({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.json({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}/`;
		await sendEmail(user.email, "Blade Quest: Password Reset Request", ResetPasswordEmail(url));

		res
			.status(200)
			.json({ message: `Password Reset link sent to ${user.email} check your inbox or spam folder.` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// verify password reset link
const verify_reset_link = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).json({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).json({ message: "Invalid link" });

		res.status(200).json("Valid Url");
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

//  set new password
const reset_password = async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).json({ message: error.details[0].message });

		const {password} = req.body;
		
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).json({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).json({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		const hashedPassword = await hashPassword(password);

		user.password = hashedPassword;
		await user.save();
		
		await Token.deleteOne({
			userId: user._id,
			token: req.params.token,
		});

		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
    send_password_link,
    verify_reset_link,
    reset_password,
}