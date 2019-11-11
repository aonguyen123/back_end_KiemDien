const Router = require('express').Router();
const passport = require('passport');
const actionPresencesController = require('../controller/actionPresences');
const presencesController = require('./../controller/presences');

Router.post('/createPresences', (req, res) => {
    actionPresencesController.createPresences(req, res);
});
Router.get('/getPresences/:id', (req, res) => {
    presencesController.getPresences(req, res);
});
module.exports = Router;