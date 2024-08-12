const express = require('express');
const router = express.Router();
const { send_password_link, verify_reset_link, reset_password } = require("../controllers/resetPassword");


// send password link
router.post("/", send_password_link)

// verify password reset link
router.get("/:id/:token", verify_reset_link)

//  set new password
router.post("/:id/:token", reset_password)

module.exports = router