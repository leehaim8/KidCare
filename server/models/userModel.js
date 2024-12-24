const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    childrenIDs: { type: [String], default: [] },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;