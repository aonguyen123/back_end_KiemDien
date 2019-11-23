const adminController = require('../controller/admin');
const Router = require('express').Router();

Router.post('/register', (req, res) => {
    adminController.register(req, res);
});
Router.post('/login', (req, res) => {
    adminController.login(req, res);
});
module.exports = Router;