const Children = require("../models/childrenModel");
const weekFeedBackModel = require("../models/weekFeedBackModel");

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
        const { name, age, allergies, motherName, fatherName, phone, gender } = req.body;
        const contactInfo = { mother: motherName, father: fatherName, phone: phone };

        if (!(name, age, allergies, motherName, fatherName, phone)) {
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
                image: imageValue
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
            const weekFeedback = await weekFeedBackModel.find({ name: childDetails.name });

            if (!childDetails) {
                return res.status(404).json({ message: 'Child not found' });
            }

            res.json({ childDetails, weekFeedback });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = { childrenController };