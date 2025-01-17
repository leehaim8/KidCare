const { Router } = require('express');
const { usersController } = require('../controllers/usersController');
const User = require('../models/userModel');

const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userID', usersController.getUser);
usersRouter.post('/login', usersController.login);
usersRouter.post('/register', usersController.register);

module.exports = { usersRouter };