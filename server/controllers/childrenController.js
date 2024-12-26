const Children = require("../models/childrenModel");

const childrenController = {
    async getChildren(req, res) {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({ message: "User ID is required" });
        }

        try {
            const children = await Children.find({ userID: userID });
            res.status(200).json(children);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { childrenController };