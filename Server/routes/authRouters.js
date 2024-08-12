const express = require('express');
const router = express.Router();
const { signupUser,loginUser,getProfile,logoutUser } = require('../controllers/auth');
const { CheckUser } = require('../controllers/CheckUser');
const { test } = require('../controllers/test');


router.get('/',test)
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/checkusername',CheckUser)
router.get('/profile',getProfile)
router.post('/logout',logoutUser)

module.exports = router