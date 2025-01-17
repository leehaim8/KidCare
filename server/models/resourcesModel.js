
const mongoose = require("mongoose");
const { Schema } = mongoose;

const resourceSchema = new Schema({
    id: { type: Number, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true }
}, { collection: "Resurces" });

const Resource = mongoose.model("Resources", resourceSchema);
module.exports = Resource;