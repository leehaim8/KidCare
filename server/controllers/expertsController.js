const expertModel = require("../models/expertModel");

const expertController = {
    async getExperts(req, res) {
        try {
            const experts = await expertModel.find();
            res.status(200).json(experts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { expertController };