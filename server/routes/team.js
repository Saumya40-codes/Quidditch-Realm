const express = require('express');
const { addTeam } = require('../controllers/teams.js');
const { getTeams } = require('../controllers/teams.js');
const { getTeam } = require('../controllers/teams.js');
const { getTeamDetails } = require('../controllers/teams.js');
const { updateTeam } = require('../controllers/teams.js');
const { deleteTeam } = require('../controllers/teams.js');
const { getByName } =  require('../controllers/teams.js');

const router = express.Router();

router.post('/addTeam', addTeam);
router.get('/getTeams', getTeams);
router.get('/getTeam/:name', getTeam);
router.get('/getTeamDetails/:id', getTeamDetails);
router.put('/updateTeam/:id', updateTeam);
router.delete('/del/team/:id',deleteTeam);
router.get('/name/:name',getByName);

module.exports = router;