const Router = require('express').Router();
const passport = require('passport');
const classController = require('./../controller/classes');
const actionClassesController = require('./../controller/actionClasses');
const actionClassDetailController = require('./../controller/actionClassDetail');
const importFileController = require('./../controller/importFile');

Router.get('/getClasses', (req, res) => {
    classController.getClasses(req, res);
});
Router.get('/getClassById/:id', (req, res) => {
    classController.getClassById(req, res);
});
Router.get('/getClassLatest', (req, res) => {
    classController.getClassLatest(req, res);
});
Router.get('/statisticalTotalClass', (req, res) => {
    classController.statisticalTotalClass(req, res);
});
Router.get('/statisticalTotalMember', (req, res) => {
    classController.statisticalTotalMember(req, res);
});

Router.post('/createClass', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassesController.createClass(req, res);
});
Router.delete('/deleteClass', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassesController.deleteClass(req, res);
});

Router.put('/updateInfoClass', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.updateInfoClass(req, res);
});
Router.post('/updateAvatarClassById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.updateAvatarClass(req, res);
});
Router.delete('/removeAvatarClassById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.removeAvatarClass(req, res);
});
Router.post('/addClassMemberById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.addClassMember(req, res);
});
Router.put('/editMemberClassById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.editMemberClass(req, res);
});
Router.delete('/deleteClassMemberById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.deleteClassMember(req, res);
});
Router.post('/changeManagerPerson', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.changeManagerPerson(req, res);
});
Router.put('/removeManagerPerson', passport.authorize('admin-authz', {session: false}), (req, res) => {
    actionClassDetailController.removeManagerPerson(req, res);
});

Router.post('/importDssvClassById', passport.authorize('admin-authz', {session: false}), (req, res) => {
    importFileController.importDssvClass(req, res);
});
module.exports = Router;