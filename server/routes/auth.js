const express = require('express')
const authController = require('../controller/auth')
const router = express.Router()
const {authenticateToken, authorize} = require('../middleware/middleware')
//const authenticateTokens = require('../middleware/middleware')


router.post('/signup', authController.signUp)
router.post('/login', authController.logIn);
router.post('/logout', authController.logout)
router.post('/reset-password', authController.postResetPassword);
router.get('/get-password/:token', authController.getNewPassword) 
router.post('/new-password', authController.postNewPassword)

router.get('/me', authenticateToken, authController.getMe); 

//protecting the route with middleware
router.get('/user-dashboard', authenticateToken, authorize('user'), authController.userDashboard)
router.get('/admin-dashboard', authenticateToken, authorize('admin'), authController.adminDashboard)
module.exports = router 