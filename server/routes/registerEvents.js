const express = require('express');

const { registertoEvent } = require('../controllers/registerEvent.js')

const router = express.Router();


router.post('/register/events',registertoEvent);

module.exports = router;