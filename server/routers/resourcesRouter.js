const express = require('express');
const { resourceController } = require('../controllers/resourcesController');

const resourceRouter = express.Router(); // Use express.Router()

resourceRouter.get('/', resourceController.getResources);

module.exports = resourceRouter; // Export the router directly
