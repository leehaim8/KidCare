const { Router } = require('express');
const { weekFeedBackController } = require('../controllers/weekFeedBackController');

const weekFeedBackRouter = new Router();


weekFeedBackRouter.post('/:userID/addFeedback', weekFeedBackController.addChildWeekFeedBack);

module.exports = { weekFeedBackRouter };