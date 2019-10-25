const Router = require('express').Router();
const passport = require('passport');
const classController = require('./../controller/class');

Router.get('/getClassByIdUser', (req, res) => {
    classController.getClassByIdUser(req, res);
});

module.exports = Router;