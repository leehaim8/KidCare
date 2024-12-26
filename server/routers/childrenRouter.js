const {Router} = require('express');
const {childrenController} = require('../controllers/childrenController');

const childrenRouter = new Router();

childrenRouter.get('/:userID', childrenController.getChildren);
//childrenRouter.post('/addChild', childrenController.addChild);

module.exports = {childrenRouter};