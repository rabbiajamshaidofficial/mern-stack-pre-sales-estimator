const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get all pricing logic
router.get('/rules', adminController.getRules);

// Route to update a specific price/rule by its ID
router.put('/rules/:id', adminController.updateRule);

module.exports = router;