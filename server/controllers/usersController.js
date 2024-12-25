const User = require("../models/userModel");

const usersController = {
    // Register new user
    async register(req, res) {
        const { name, username, password, childrenIDs } = req.body;

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
                childrenIDs,
            });

            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
    // Login user
    async login(req, res) {
        const { username, password } = req.body;

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
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
};

module.exports = { usersController };