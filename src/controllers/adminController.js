const EstimationRule = require('../models/EstimationRule');

// 1. Get all current costs/multipliers to show in the Admin Panel
exports.getRules = async (req, res) => {
    try {
        const rules = await EstimationRule.find();
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rules", error });
    }
};

// 2. Update a specific cost (e.g., change Healthcare multiplier to 1.6)
exports.updateRule = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const updatedRule = await EstimationRule.findByIdAndUpdate(
            id, 
            { value }, 
            { new: true }
        );
        res.status(200).json(updatedRule);
    } catch (error) {
        res.status(500).json({ message: "Error updating rule", error });
    }
};