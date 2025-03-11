const Children = require("../models/childrenModel");
const weekFeedBackModel = require("../models/weekFeedBackModel");
const periodicFeedBack = require("../models/PeriodicFeedbackModel");

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
    },
    async addChild(req, res) {
        const { userID } = req.params;
        const { name, age, allergies, motherName, fatherName, phone, gender, birthday } = req.body;
        const contactInfo = { mother: motherName, father: fatherName, phone: phone };

        if (!(name, age, allergies, motherName, fatherName, phone, birthday)) {
            return res.status(400).json({ message: "One of the filed are missing!" });
        }

        let imageValue = 'boy.png';
        if (gender === "Female") {
            imageValue = 'girl.png';
        }

        try {
            const lastUser = await Children.findOne().sort({ childID: -1 });
            const lastID = lastUser ? lastUser.childID : 0;

            const newChild = new Children({
                userID: userID,
                name,
                age,
                allergies,
                contactInfo,
                childID: lastID + 1,
                image: imageValue,
                birthday
            });

            await newChild.save();
            res.status(201).json({ message: "Child added successfully", child: newChild });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getChildDetails(req, res) {
        const { childID } = req.params;
        if (!childID) {
            return res.status(400).json({ message: "User ID is required" });
        }

        try {
            const childDetails = await Children.findOne({ childID });
            const weekFeedback = await weekFeedBackModel.find({ "name": childDetails.name });
            const periodicFeedback = await periodicFeedBack.find({ "name": childDetails.name });
            if (!childDetails) {
                return res.status(404).json({ message: 'Child not found' });
            }

            res.json({ childDetails, weekFeedback , periodicFeedback});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getChildBirthday(req, res) {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({ message: "User ID is required" });
        }

        try {
            const today = new Date();
            const todayDayMonth = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}`;
            const birthdays = await Children.find({
                userID: userID,
                birthday: { $regex: new RegExp(`^${todayDayMonth}-\\d{4}$`) }
            });

            if (birthdays.length > 0) {
                res.status(200).json({ message: "There are birthdays today!", birthdays });
            } else {
                res.status(200).json({ message: "No birthdays today" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteChildren(req, res) {
        const { childID } = req.params;
        if (!childID) {
            return res.status(400).json({ message: "child ID is required" });
        }

        try {
            const deleteUser = await Children.findOneAndDelete({ childID });
            if (!deleteUser) {
                return res.status(404).json({ message: "Child not found" });
            }

            res.status(200).json({ message: "Child deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    },
    async updateChildren(req, res) {
        const { childID } = req.params;
        const updateData = req.body;

        if (!childID) {
            return res.status(400).json({ message: "Child ID is required" });
        }

        if (!updateData) {
            return res.status(400).json({ message: "One of the filed are missing!" });
        }

        try {
            const updatedChild = await Children.findOneAndUpdate({ childID }, updateData, { new: true });

            if (!updatedChild) {
                return res.status(404).json({ message: "Child not found" });
            }

            res.status(200).json({ message: "Child updated successfully", child: updatedChild });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
};

module.exports = { childrenController };