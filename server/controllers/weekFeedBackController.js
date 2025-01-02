const weekFeedBack = require("../models/weekFeedBackModel");

const weekFeedBackController = {
    async getFeedBacks(req, res) {
        try {
            const feedBacks = await weekFeedBack.find();
            res.status(200).json(feedBacks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async addChildWeekFeedBack(req, res) {
        const { ChildID, name, mood, activities, health, socialInteraction, learningProgress, notes } = req.body;

        if (!(ChildID, name, mood, activities, health, socialInteraction, learningProgress, notes)) {
            return res.status(400).json({ message: "One of the filed are missing!" });
        }

        try {
            const newFeedBack = new weekFeedBack({
                ChildID,
                name,
                mood,
                activities,
                health,
                socialInteraction,
                learningProgress,
                notes
            });

            await newFeedBack.save();
            res.status(201).json({ message: "FeedBack added successfully", feedBack: newFeedBack });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { weekFeedBackController };