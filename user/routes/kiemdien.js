const Router = require('express').Router();
const passport = require('passport');
const kiemdienController = require('./../controller/kiemdien');

Router.get('/getDanhsachKiemdien', (req, res) => {
    kiemdienController.getDanhsachKiemdien(req, res);
});

module.exports = Router;