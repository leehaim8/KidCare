const { Router } = require('express');
const { childrenController } = require('../controllers/childrenController');

const childrenRouter = new Router();

childrenRouter.get('/:userID', childrenController.getChildren);
childrenRouter.get('/birthday/:userID', childrenController.getChildBirthday);
childrenRouter.get('/childDetails/:childID', childrenController.getChildDetails);
childrenRouter.post('/:userID/addChild', childrenController.addChild);
childrenRouter.delete('/:childID', childrenController.deleteChildren);
childrenRouter.put('/:childID', childrenController.updateChildren);

module.exports = { childrenRouter };