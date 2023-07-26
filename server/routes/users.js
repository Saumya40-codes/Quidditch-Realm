const express = require('express');
const {verifyToken} = require('../middleware/auth.js');
const route = require('./auth.js')
const router = express.Router();


const { getUsers } = require('../controllers/users.js');
const { updateUser } = require('../controllers/users.js');
const { updateProfile } = require('../controllers/users.js');
const { addNotification } = require('../controllers/users.js');
const { deleteNotification } = require('../controllers/users.js');
const { deleteNotif } = require('../controllers/users.js');


router.get('/:id', getUsers);
router.put('/update/:id', updateUser)
router.put('/updateProfile/:id', updateProfile)
router.put('/addNotification/:id', addNotification)
router.put('/del/notif/:id', deleteNotification)
router.put('/del/notification/:id', deleteNotif)

module.exports = router;