const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/verifyToken');

router.get("/:id/verify/:token",verifyToken);

module.exports = router