const Router = require('express').Router();
const passport = require('passport');
const actionPresencesController = require('../controller/actionPresences');

Router.post('/createPresences', (req, res) => {
    actionPresencesController.createPresences(req, res);
});
module.exports = Router;