const mongoose = require("mongoose");
const { Schema } = mongoose;

const weekFeedBackSchema = new Schema({
    ChildID: String,
    name: String,
    mood: String,
    activities: [String],
    health: Number,
    socialInteraction: String,
    learningProgress: Number,
    notes: String
}, { collection: "weekFeedBack" });

const weekFeedBack = mongoose.model("weekFeedBack", weekFeedBackSchema);
module.exports = weekFeedBack;