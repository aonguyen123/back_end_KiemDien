const Router = require('express').Router();
const usersController = require('./../controller/users');

Router.post('/createUser', (req, res) => {
    usersController.createUser(req, res);
});
Router.get('/getUsers', (req, res) => {
    usersController.getUsers(req, res);
});
Router.get('/usersPagination', (req, res) => {
    usersController.usersPagination(req, res)
})
module.exports = Router;