const mongoose = require('mongoose');

const EstimateSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  industryFocus: { type: String, required: true },
  targetPlatform: { type: String, required: true },
  coreProblem: { type: String, required: true },
  projectScale: { type: String, required: true },
  estimatedCost: { type: String, required: true }, // Created by controller
  aiSolutionMessage: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Estimate', EstimateSchema);