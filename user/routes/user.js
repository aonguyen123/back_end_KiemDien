const Router = require('express').Router();
const userController = require('./../controller/user');
const passport = require('passport');

Router.post('/login', (req, res) => {
    userController.login(req, res);
});
Router.post('/updatePassword', passport.authenticate('jwt', {session: false}), (req, res) => {
    userController.updatePassword(req, res);
})
Router.post('/uploadAvatar', passport.authenticate('jwt', {session: false}), (req, res) => {
    userController.uploadAvatar(req, res);
});
Router.put('/updateInfoUser', (req, res) => {
    userController.updateInfoUser(req, res);
});
Router.get('/getUser/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    userController.getUser(req, res);
});
module.exports = Router;