const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', controller.test);
router.post('/create',controller.create_user);

module.exports = router;