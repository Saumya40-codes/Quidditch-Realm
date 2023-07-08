const express = require('express');
const {verifyToken} = require('../middleware/auth.js');
const route = require('./auth.js')
const { addEvent } = require('../controllers/events.js');

const router = express.Router();

router.post('/add', addEvent);

module.exports = router;