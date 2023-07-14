const express = require('express');
const { addTeam } = require('../controllers/teams.js');
const { getTeams } = require('../controllers/teams.js');
const { getTeam } = require('../controllers/teams.js');

const router = express.Router();

router.post('/addTeam', addTeam);
router.get('/getTeams', getTeams);
router.get('/getTeam/:name', getTeam);

module.exports = router;