const User = require("../models/userModel");

const usersController = {
    async register(req, res) {
        const { name, username, password } = req.body;
        if (!(name, username, password)) {
            return res.status(400).json({ message: "One of the filed are missing!" });
        }

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Username already exists" });
            }

            const lastUser = await User.findOne().sort({ userID: -1 });
            const lastID = lastUser ? lastUser.userID : 0;

            const newUser = new User({
                userID: lastID + 1,
                name,
                username,
                password,
                image: 'userImage.jpeg'
            });

            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
    async login(req, res) {
        const { username, password } = req.body;
        if (!(username, password)) {
            return res.status(400).json({ message: "One of the filed are missing!" });
        }

        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (password !== user.password) {
                return res.status(401).json({ message: "Invalid password" });
            }

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error });
        }
    },
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
    async getUser(req, res) {
        const { userID } = req.params;
        try {
            const user = await User.findOne({ userID });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Server error", error });
        }
    }

};

module.exports = { usersController };