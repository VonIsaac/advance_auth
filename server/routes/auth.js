const express = require('express')
const authController = require('../controller/auth')
const router = express.Router()
//const authenticateTokens = require('../middleware/middleware')


router.post('/signup', authController.signUp)
router.post('/login', authController.logIn);
router.post('/logout', authController.logout)
router.post('/reset-password', authController.postResetPassword);
router.post('new-password', authController.postNewPassword)
module.exports = router 