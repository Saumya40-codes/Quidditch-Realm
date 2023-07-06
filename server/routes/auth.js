const express = require('express');
const { login } = require('../controllers/auth.js');
const { adminLogin } = require('../controllers/auth.js');

const router = express.Router();

router.post('/login', login);
router.post('/admin/login', adminLogin)

module.exports = router;
