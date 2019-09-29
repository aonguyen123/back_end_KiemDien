const Router = require('express').Router();
const usersController = require('./../controller/users');

Router.post('/createUser', (req, res) => {
    usersController.createUser(req, res);
});
module.exports = Router;