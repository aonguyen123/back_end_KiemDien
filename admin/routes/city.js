const Router = require('express').Router();
const cityController = require('./../controller/city');
const passport = require('passport');

Router.post('/createCity', (req, res) => {
    cityController.createCity(req, res);
});
Router.get('/getCitys', (req, res) => {
    cityController.getCity(req, res);
});
module.exports = Router;