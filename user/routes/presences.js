const Router = require('express').Router();
const passport = require('passport');
const actionPresencesController = require('../controller/actionPresences');
const presencesController = require('./../controller/presences');

Router.post('/createPresences', passport.authenticate('jwt', {session: false}), (req, res) => {
    actionPresencesController.createPresences(req, res);
});
Router.get('/getPresences/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    presencesController.getPresences(req, res);
});
module.exports = Router;