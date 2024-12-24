const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.post('/login', usersController.login);
usersRouter.post('/register', usersController.register);

module.exports = { usersRouter };