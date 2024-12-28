const mongoose = require("mongoose");
const { Schema } = mongoose;

const childrenSchema = new Schema({
    userID: String,
    name: String,
    age: Number,
    allergies: [String],
    contactInfo: {
        mother: String,
        father: String,
        phone: String
    },
    childID: Number,
    image: String
}, { collection: "children" });

const Children = mongoose.model("Children", childrenSchema);
module.exports = Children;