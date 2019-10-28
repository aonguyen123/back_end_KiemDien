const Router = require('express').Router();
const passport = require('passport');
const accountController = require('./../controller/account');
const actionAccountController = require('./../controller/actionAccount');

Router.put('/updateInfoAccount', passport.authorize('admin-authz', { session: false }), (req, res) => {
    actionAccountController.updateInfo(req, res);
});
Router.put('/removeAvatarAccount', passport.authorize('admin-authz', { session: false }), (req, res) => {
    actionAccountController.removeAvatar(req, res);
});
Router.put('/updatePasswordAccount', passport.authorize('admin-authz', { session: false }), (req, res) => {
    actionAccountController.updatePassword(req, res);
});
Router.post('/updateAvatarAccount',passport.authorize('admin-authz', { session: false }), async (req, res) => {
    actionAccountController.updateAvatar(req, res);
});

Router.get('/getAvatar/:name', (req, res) => {
    accountController.getAvatar(req, res);
});
Router.get('/getInfoAccount',passport.authorize('admin-authz', { session: false }), (req, res) => {
    accountController.getInfoAccount(req, res);
});
Router.get('/me',passport.authorize('admin-authz', { session: false }), (req, res) => {
    accountController.getMe(req, res);
});
module.exports = Router;