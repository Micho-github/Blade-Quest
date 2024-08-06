const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test,signupUser,loginUser, CheckUser,getProfile,logoutUser } = require('../controllers/authController')

//middleware
router.use(
    cors(
        {
            origin: ["https://bladequest.vercel.app","http://localhost:3000"],
            methods: ["POST", "GET"],
            credentials: true
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