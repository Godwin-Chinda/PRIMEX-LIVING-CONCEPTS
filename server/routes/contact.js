const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markRead } = require('../controllers/contactController');
router.post('/', sendMessage);
router.get('/', getMessages);
router.patch('/:id/read', markRead);
module.exports = router;
