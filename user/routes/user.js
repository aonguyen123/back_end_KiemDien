const Router = require('express').Router();
const userController = require('./../controller/user');

Router.post('/login', (req, res) => {
    userController.login(req, res);
});
module.exports = Router;