const mongoose = require("mongoose");
const { Schema } = mongoose;

const expertSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
}, { collection: "experts" });

const Expert = mongoose.model("Expert", expertSchema);

module.exports = Expert;
