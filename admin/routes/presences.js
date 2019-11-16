const Router = require('express').Router();
const presencesController = require('./../controller/presences');
const passport = require('passport');
const presencesDetailController = require('./../controller/presencesDetail');
const actionPresencesController = require('./../controller/actionPresences');

Router.get('/getClassPresences', (req, res) => {
    presencesController.getClassPresences(req, res);
});
Router.get('/getPresencesDetail', (req, res) => {
    presencesDetailController.getPresencesDetail(req, res);
});
Router.delete('/deletePresenceMember', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionPresencesController.deletePresenceMember(req, res);
});
Router.get('/getPresences', (req, res) => {
    presencesController.getPresences(req, res);
});

module.exports = Router;