const Router = require('express').Router();
const cityController = require('./../controller/city');

Router.post('/createCity', (req, res) => {
    cityController.createCity(req, res);
});
Router.get('/getCity', (req, res) => {
    cityController.getCity(req, res);
})
Router.get
module.exports = Router;