const User = require("../Models/user");
const Token = require("../Models/token");

const verifyToken = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await Token.deleteOne({ _id: token._id });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  verifyToken,
};
