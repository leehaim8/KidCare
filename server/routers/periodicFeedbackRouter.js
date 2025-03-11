const { Router } = require('express');
const periodicFeedbackController = require('../controllers/periodicFeedbackController');
const periodicFeedbackRouter = new Router();

// Use the function reference, not the invocation
periodicFeedbackRouter.post('/:userID/addPeriodicFeedback', periodicFeedbackController.addChildPeriodicFeedback);

module.exports = { periodicFeedbackRouter };
