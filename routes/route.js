const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/controller');


// a simple test url to check that all of our files are communicating correctly.

router.post('/login',controller.login);
router.post('/register',controller.register);
router.post('/sendmessage',controller.send_message);
router.get('/inbox',controller.inbox);
router.put('/block/:username',controller.blocked);

module.exports = router;