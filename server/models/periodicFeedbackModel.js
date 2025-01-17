
const mongoose = require("mongoose");
const { Schema } = mongoose;

const periodicFeedBackSchema = new Schema({
    childDeatails: { type: String },

    // General Well-being
    energyLevel: { type: Number, required: true, min: 0, max: 5 },
    eatingHabits: { type: String, required: true },
    sleepingQuality: { type: Boolean, required: true },
    physicalActivity: { type: Boolean, required: true },
    mood: { type: Number, required: true, min: 0, max: 5 },
    emotionalExpression: { type: String, required: true },

    // Social Well-being
    socialInteraction: { type: String, required: true },
    groupContribution: { type: Boolean, required: true },
    conflictResolution: { type: String, required: true },

    // Learning & Participation
    participationLevel: { type: String, enum: ["low", "moderate", "high"], required: true },
    activityFocus: { type: String, enum: ["low", "moderate", "high"], required: true },
    teamwork: { type: String, enum: ["low", "moderate", "high"], required: true },
    selfInitiative: { type: String, enum: ["low", "moderate", "high"], required: true },
    fineMotorSkills: { type: String, enum: ["low", "moderate", "high"], required: true },
    grossMotorSkills: { type: String, enum: ["low", "moderate", "high"], required: true },
    cognitiveSkills: { type: String, enum: ["low", "moderate", "high"], required: true },
    emotionalGrowth: { type: String, required: true },

    // Additional Feedback
    specialNotes: { type: String, required: false },
    suggestionsForImprovement: { type: String, required: false },
    overallSatisfaction: { type: String, enum: ["not_satisfied", "neutral", "satisfied", "very_satisfied"], required: true },
    meetingRequest: { type: Boolean, required: true },

    // Metadata
    date: { type: Date, default: Date.now, required: true }
}, { collection: "periodicFeedBack" });

const periodicFeedBack = mongoose.model("periodicFeedBack", periodicFeedBackSchema);
module.exports = periodicFeedBack;
