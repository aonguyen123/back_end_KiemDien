const Router = require('express').Router();
const passport = require('passport');
const userController = require('./../controller/user');
const actionUserController = require('./../controller/actionUser');

Router.post('/login', (req, res) => {
    userController.login(req, res);
});
Router.get('/getUser/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    userController.getUser(req, res);
});


Router.post('/updatePassword', passport.authenticate('jwt', {session: false}), (req, res) => {
    actionUserController.updatePassword(req, res);
})
Router.post('/uploadAvatar', passport.authenticate('jwt', {session: false}), (req, res) => {
    actionUserController.uploadAvatar(req, res);
});
Router.put('/updateInfoUser', (req, res) => {
    actionUserController.updateInfoUser(req, res);
});

module.exports = Router;