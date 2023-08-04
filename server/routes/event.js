const express = require('express');
const { addEvent } = require('../controllers/events.js');
const { getEvents } = require('../controllers/events.js');
const { deleteEvent } = require('../controllers/events.js');
const { getEvent } = require('../controllers/events.js');
const { updateEvents } = require('../controllers/events.js');
const { getPastEvents } = require('../controllers/events.js');
const { updateScores } = require('../controllers/events.js');
const { updateInterested } = require('../controllers/events.js');
const { addComments } = require('../controllers/events.js');
const { deleteComment } = require('../controllers/events.js');
const { editComment } = require('../controllers/events.js');
const { ticketChanges } = require('../controllers/events.js');
const { getAllEvents } = require('../controllers/events.js');

const router = express.Router();

router.post('/add', addEvent);
router.get('/get', getEvents);
router.delete('/delete/:id', deleteEvent);
router.get('/get/:id', getEvent);
router.get('/all', getAllEvents);
router.put('/update/:id', updateEvents);
router.get('/past', getPastEvents);
router.put('/updateScore/:id', updateScores);
router.put('/interest/:id', updateInterested);

router.put('/addComment/:id', addComments);
router.put('/deleteComment/:id', deleteComment);
router.put('/editComment/:id', editComment);

router.put('/tickets/change/:id',ticketChanges);

module.exports = router;