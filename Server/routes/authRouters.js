const express = require('express');
const router = express.Router()
const cors = require('cors')
const { signupUser,loginUser,getProfile,logoutUser } = require('../controllers/authController');
const { CheckUser } = require('../controllers/CheckUser');
const { test } = require('../controllers/test');

//middleware
router.use(
    cors(
        {
            origin: ["https://bladequest.vercel.app","http://localhost:3000"],
            methods: ["POST", "GET"],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        }
    )
)

router.get('/',test)
router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/checkusername',CheckUser)
router.get('/profile',getProfile)
router.post('/logout',logoutUser)

module.exports = router