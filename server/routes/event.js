const express = require('express');
const {verifyToken} = require('../middleware/auth.js');
const route = require('./auth.js')
const { addEvent } = require('../controllers/events.js');
const { getEvents } = require('../controllers/events.js');
const { deleteEvent } = require('../controllers/events.js');
const { getEvent } = require('../controllers/events.js');
const { updateEvents } = require('../controllers/events.js');
const { getPastEvents } = require('../controllers/events.js');

const router = express.Router();

router.post('/add', addEvent);
router.get('/get', getEvents);
router.delete('/delete/:id', deleteEvent);
router.get('/get/:id', getEvent);
router.put('/update/:id', updateEvents);
router.get('/past', getPastEvents);

module.exports = router;