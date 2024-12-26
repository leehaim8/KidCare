const mongoose = require("mongoose");
const { Schema } = mongoose;

const childrenSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    allergies: { type: Array, required: true },
    contactInfo: { type: Object, required: true },
    childID: { type: String, required: true },
    image: { type: String, required: true }
}, { collection: "children" });

const Children = mongoose.model("Children", childrenSchema);
module.exports = Children;