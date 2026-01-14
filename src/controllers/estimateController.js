const Estimate = require('../models/Estimate');

// 🔹 FIX: This solves the "Generation Failed" (400 Error)
exports.createEstimate = async (req, res) => {
  try {
    const { industryFocus, targetPlatform, coreProblem, projectScale } = req.body;

    // Logic to generate the required fields for your Schema
    const basePrice = projectScale === 'Enterprise' ? 15000 : 5000;
    const generatedCost = `$${(basePrice + Math.floor(Math.random() * 2000)).toLocaleString()}`;

    const newEstimate = await Estimate.create({
      userId: req.user._id, // From your protect middleware
      industryFocus,
      targetPlatform,
      coreProblem,
      projectScale,
      estimatedCost: generatedCost, // Fulfills 'required: true' in Schema
      aiSolutionMessage: `Discovery report generated for ${industryFocus}.`
    });

    res.status(201).json({ success: true, data: newEstimate });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(400).json({ success: false, message: "Required fields missing" });
  }
};

// 🔹 FIX: This solves the "Cards not showing" (500 Error)
exports.getMyEstimates = async (req, res) => {
  try {
    // Queries MongoDB for cards belonging to THIS user ID
    const estimates = await Estimate.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: estimates || [] // Returns empty array instead of crashing if new user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

// 🔹 ADMIN: Fetch All
exports.getAllEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: estimates });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// 🔹 DELETE: Remove Card
exports.deleteEstimate = async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id);
    if (!estimate) return res.status(404).json({ message: "Not found" });

    if (estimate.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await estimate.deleteOne();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};