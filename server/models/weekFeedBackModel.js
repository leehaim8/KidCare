const mongoose = require("mongoose");
const { Schema } = mongoose;

const weekFeedBackSchema = new Schema({
    ChildID: Number,
    name: String,
    mood: String,
    activities: [String],
    health: Number,
    socialInteraction: String,
    learningProgress: Number,
    notes: String,
    Date: Date
}, { collection: "weekFeedBack" });

const weekFeedBack = mongoose.model("weekFeedBack", weekFeedBackSchema);
module.exports = weekFeedBack;