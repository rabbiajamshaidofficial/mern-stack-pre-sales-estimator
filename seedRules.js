const mongoose = require('mongoose');
const EstimationRule = require('./src/models/EstimationRule'); // Path to your model
require('dotenv').config(); // If you use a .env file for your DB URL

const seedData = [
  // Platform Base Costs
  { category: "platformBase", key: "Web Application", value: 3500 },
  { category: "platformBase", key: "Mobile App (iOS/Android)", value: 4500 },
  { category: "platformBase", key: "Cross-platform Solution", value: 5500 },

  // Industry Multipliers
  { category: "industryMultipliers", key: "Healthcare", value: 1.45 },
  { category: "industryMultipliers", key: "FinTech", value: 1.5 },
  { category: "industryMultipliers", key: "E-commerce", value: 1.2 },
  { category: "industryMultipliers", key: "Logistics", value: 1.25 },

  // Pain Point Costs
  { category: "painPointEffort", key: "Cloud Spend & FinOps Optimization", value: 2500 },
  { category: "painPointEffort", key: "Agentic AI & LLM Implementation", value: 6000 },
  { category: "painPointEffort", key: "Legacy System & Tech Debt Modernization", value: 4500 },
  { category: "painPointEffort", key: "Zero-Trust Security & Compliance", value: 5000 },

  // Scale Multipliers
  { category: "scaleMultiplier", key: "Startup (MVP)", value: 0.85 },
  { category: "scaleMultiplier", key: "Small-Medium Business", value: 1.2 },
  { category: "scaleMultiplier", key: "Enterprise", value: 1.8 }
];

const seedDB = async () => {
  try {
    // Replace with your actual MongoDB URI
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/presales');
    
    // Clear existing rules to avoid duplicates
    await EstimationRule.deleteMany({});
    
    // Insert the seed data
    await EstimationRule.insertMany(seedData);
    
    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDB();