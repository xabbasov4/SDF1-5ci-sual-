const express = require('express');
const router = express.Router();
const regController = require('../controllers/registrationController');

router.post('/', regController.registerForEvent);

module.exports = router;