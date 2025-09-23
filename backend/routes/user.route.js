const express = require('express');
const upload = require('../storage/storage')
const userController = require('../controllers/user.controller');
const { protectAuth } = require('../middlewares/protectAuth');

const router = express.Router();

router.post('/upload', upload.array('files'), userController.uploadMedia)
router.get('/list', protectAuth, userController.getListofUsers)
router.get('/chats', protectAuth, userController.getAllChats)

module.exports = router;