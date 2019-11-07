const Router = require('express').Router();
const presencesController = require('./../controller/presences');
const presencesDetailController = require('./../controller/presencesDetail');
const actionPresencesController = require('./../controller/actionPresences');

Router.get('/getClassPresences', (req, res) => {
    presencesController.getClassPresences(req, res);
});
Router.get('/getPresencesDetail', (req, res) => {
    presencesDetailController.getPresencesDetail(req, res);
});

Router.post('/createPresences', (req, res) => {
    actionPresencesController.createPresences(req, res);
});
module.exports = Router;