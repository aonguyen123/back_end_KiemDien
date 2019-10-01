const Router = require('express').Router();
const classController = require('./../controller/classes');

Router.post('/createClass', (req, res) => {
    classController.createClass(req, res);
});
module.exports = Router;