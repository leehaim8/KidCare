const mongoose = require("mongoose");
const { Schema } = mongoose;

const weekFeedBackSchema = new Schema({
    ChildID: { type: Number },
    name: { type: String, required: true },
    mood: { type: String, required: true },
    activities: [{ type: String, required: true }],
    health: { type: Number, required: true },
    socialInteraction: { type: String, required: true },
    learningProgress: { type: Number, required: true },
    notes: { type: String, required: true },
    Date: { type: String, required: true }
}, { collection: "weekFeedBack" });

const weekFeedBack = mongoose.model("weekFeedBack", weekFeedBackSchema);
module.exports = weekFeedBack;