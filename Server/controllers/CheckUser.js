const User = require("../Models/user");
//Check Username Endpoint
const CheckUser = async (req, res) => {
    try {
      const { username } = req.body;
      // check if user exists
      const user = await User.findOne({ username: username.toLowerCase() });
      if (user) {
        return res.json({
          success: false,
          error: "Username already taken",
        });
      }
      return res.json({
        success: true,
        message: "Username Available",
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = {
    CheckUser
  };