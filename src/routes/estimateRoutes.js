const express = require('express');
const router = express.Router();
const { 
  createEstimate, 
  getMyEstimates, 
  getAllEstimates, 
  deleteEstimate 
} = require('../controllers/estimateController');
const { protect } = require('../middleware/authMiddleware');

// Client Routes
router.post('/', protect, createEstimate);
router.get('/my-estimates', protect, getMyEstimates);
router.delete('/:id', protect, deleteEstimate);

// Admin Route
router.get('/admin/all', protect, getAllEstimates);

module.exports = router;