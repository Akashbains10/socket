const express = require('express');
const userController = require('../controllers/user.controller');
const { protectAuth } = require('../middlewares/protectAuth');

const router = express.Router();

router.get('/list', protectAuth, userController.getListofUsers)
router.get('/chats', protectAuth, userController.getAllChats)

module.exports = router;