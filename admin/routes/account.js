const Router = require('express').Router();
const passport = require('passport');
const accountController = require('./../controller/account');

Router.put('/updateInfo', passport.authenticate('jwt', { session: false }), (req, res) => {
    accountController.updateInfo(req, res);
});
Router.put('/removeAvatar', passport.authenticate('jwt', { session: false }), (req, res) => {
    accountController.removeAvatar(req, res);
});
Router.put('/updatePassword', passport.authenticate('jwt', { session: false }), (req, res) => {
    accountController.updatePassword(req, res);
});
module.exports = Router;