const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    userID: { type: Number, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    childrenIDs: { type: [String], default: [] },
});


// Export the User model
const User = mongoose.model("Users", userSchema);
module.exports = User;
