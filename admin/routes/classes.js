const Router = require('express').Router();
const passport = require('passport');
const classController = require('./../controller/classes');
const actionClassesController = require('./../controller/actionClasses');

Router.get('/getClasses', (req, res) => {
    classController.getClasses(req, res);
});
Router.get('/getClassById/:id', (req, res) => {
    classController.getClassById(req, res);
});
Router.post('/createClass', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassesController.createClass(req, res);
});
Router.put('/updateInfoClass', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassesController.updateInfoClass(req, res);
});
Router.post('/updateAvatarClassById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassesController.updateAvatarClass(req, res);
});
Router.delete('/removeAvatarClassById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassesController.removeAvatarClass(req, res);
});
module.exports = Router;