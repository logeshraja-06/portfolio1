const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// Map POST /api/contact directly to the controller
router.post('/', submitContactForm);

module.exports = router;
