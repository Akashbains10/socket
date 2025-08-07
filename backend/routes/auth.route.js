const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')

router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.get('/me', authController.me);
router.get('/logout', authController.logout);

module.exports = router;   
