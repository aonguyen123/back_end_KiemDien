const Router = require('express').Router();
const assignesController = require('./../controller/assignes');

Router.get('/getClassAssignes', (req, res) => {
    assignesController.getClassAssignes(req, res);
});
module.exports = Router;