const Router = require('express').Router();
const passport = require('passport');
const classController = require('./../controller/classes');

Router.post('/createClass', (req, res) => {
    classController.createClass(req, res);
});
Router.get('/getClasses', (req, res) => {
    classController.getClasses(req, res);
});
module.exports = Router;