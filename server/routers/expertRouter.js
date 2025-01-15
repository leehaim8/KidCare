const { Router } = require('express');
const { expertController } = require('../controllers/expertsController');

const expertRouter = new Router();

expertRouter.get('/', expertController.getExperts);

module.exports = { expertRouter };