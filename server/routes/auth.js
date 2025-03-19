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
router.get('/fetch-user', authenticateToken, authorize(['user']),  authController.getProtectedData);
router.get('/get-admin', authenticateToken, authorize(['admin']), authController.getAdminDashboard);
//router.get('/get-users', authenticateToken, authorize(['user']), authController.getUserDashboard);
// Protected Routes

module.exports = router 