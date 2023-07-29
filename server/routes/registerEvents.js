const express = require('express');

const { registertoEvent } = require('../controllers/registerEvent.js')
const { getRegisteredIds} = require('../controllers/registerEvent.js');

const router = express.Router();


router.post('/register/events',registertoEvent);
router.get('/register/users/:id',getRegisteredIds);

module.exports = router;