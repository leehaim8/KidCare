const PeriodicFeedBack = require("../models/PeriodicFeedbackModel");

const PeriodicFeedbackController = {
    async getFeedBacks(req, res) {
        try {
            const feedBacks = await PeriodicFeedBack.find();
            res.status(200).json(feedBacks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async addChildPeriodicFeedback(req, res) {
        const {
            childID,
            firstName,
            lastName,
            energyLevel,
            eatingHabits,
            sleepingQuality,
            physicalActivity,
            mood,
            emotionalExpression,
            socialInteraction,
            groupContribution,
            conflictResolution,
            participationLevel,
            activityFocus,
            teamwork,
            selfInitiative,
            fineMotorSkills,
            grossMotorSkills,
            cognitiveSkills,
            emotionalGrowth,
            specialNotes,
            suggestionsForImprovement,
            overallSatisfaction,
            meetingRequest,
            date
        } = req.body;
        console.log(req.body);
    
    
        try {
            const newFeedBack = new PeriodicFeedBack({
                childID,
                firstName,
                lastName,
                energyLevel,
                eatingHabits,
                sleepingQuality,
                physicalActivity,
                mood,
                emotionalExpression,
                socialInteraction,
                groupContribution,
                conflictResolution,
                participationLevel,
                activityFocus,
                teamwork,
                selfInitiative,
                fineMotorSkills,
                grossMotorSkills,
                cognitiveSkills,
                emotionalGrowth,
                specialNotes,
                suggestionsForImprovement,
                overallSatisfaction,
                meetingRequest,
                date
            });
    
            await newFeedBack.save();
            res.status(201).json({ message: "Feedback added successfully", feedback: newFeedBack });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports =  PeriodicFeedbackController ;
