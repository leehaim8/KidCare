const mongoose = require("mongoose");
const { Schema } = mongoose;

const childrenSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    allergies: [{ type: String, required: true }],
    contactInfo: {
        mother: { type: String, required: true },
        father: { type: String, required: true },
        phone: { type: String, required: true }
    },
    childID: { type: Number, required: true },
    image: { type: String, required: true },
    birthday: { type: String, require: true }
}, { collection: "children" });

const Children = mongoose.model("Children", childrenSchema);
module.exports = Children;