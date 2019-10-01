const adminController = require('../controller/admin');
const passport = require('passport');
const Router = require('express').Router();

Router.post('/register', (req, res) => {
    adminController.register(req, res);
});
Router.post('/login', (req, res) => {
    adminController.login(req, res);
});
Router.get('/me',passport.authorize('admin-authz', { session: false }), (req, res) => {
    adminController.getMe(req, res);
});
Router.post('/updateAvatar',passport.authorize('admin-authz', { session: false }), async (req, res) => {
    await adminController.updateAvatar(req, res);
});
Router.get('/getAvatar/:name', (req, res) => {
    adminController.getAvatar(req, res);
});
Router.get('/getInfoUser',passport.authorize('admin-authz', { session: false }), (req, res) => {
    adminController.getInfoUser(req, res);
});
module.exports = Router;