const User = require("../Models/user");

// Check Username Endpoint
const CheckUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if username is provided
    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(409).json({
        message: "Username already taken",
      });
    }

    return res.status(200).json({
      message: "Username Available",
    });
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({
      message: "An error occurred while checking the username.",
    });
  }
};

module.exports = {
  CheckUser
};
