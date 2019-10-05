const passport = require('passport');
const Router = require('express').Router();
const usersController = require('./../controller/users');

Router.post('/createUser', passport.authorize('admin-authz', {session: false}), (req, res) => {
    usersController.createUser(req, res);
});
Router.get('/getUsers', passport.authorize('admin-authz', {session: false}), (req, res) => {
    usersController.getUsers(req, res);
});
Router.delete('/deleteUsers', passport.authorize('admin-authz', {session: false}), (req, res) => {
    usersController.deleteUser(req, res);
});
Router.post('/updateUser', passport.authorize('admin-authz', {session: false}), (req, res) => {
    usersController.updateUser(req, res);
});
module.exports = Router;