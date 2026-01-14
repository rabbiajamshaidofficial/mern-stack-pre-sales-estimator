const mongoose = require('mongoose');

const EstimationRuleSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "platformBase", "industryMultipliers"
  key: { type: String, required: true },      // e.g., "Healthcare", "Web Application"
  value: { type: Number, required: true }     // e.g., 1.45 or 3500
});

module.exports = mongoose.model('EstimationRule', EstimationRuleSchema);