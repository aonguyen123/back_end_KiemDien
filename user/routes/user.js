const Router = require('express').Router();
const userController = require('./../controller/user');
const passport = require('passport');

Router.post('/login', (req, res) => {
    userController.login(req, res);
});
Router.post('/updatePassword',passport.authenticate('jwt', {session: false}), (req, res) => {
    userController.updatePassword(req, res);
})
module.exports = Router;