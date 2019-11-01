const passport = require('passport');
const Router = require('express').Router();
const usersController = require('./../controller/users');
const actionUserController = require('./../controller/actionUser');

Router.get('/getUsers', passport.authorize('admin-authz', {session: false}), (req, res) => {
    usersController.getUsers(req, res);
});
Router.get('/getUserConditionStatusTrue', (req, res) => {
    usersController.getUserConditionStatusTrue(req, res);
});
Router.post('/createUser', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionUserController.createUser(req, res);
});
Router.delete('/deleteUsers', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionUserController.deleteUser(req, res);
});
module.exports = Router;