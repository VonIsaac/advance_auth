const express = require('express')
const authController = require('../controller/auth')
const router = express.Router()
//const authenticateTokens = require('../middleware/middleware')


router.post('/signup', authController.signUp)
router.post('/login', authController.logIn);

module.exports = router 