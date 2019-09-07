const userController = require('./../controller/user');
const passport = require('passport');
const testController = require('./../controller/testController');

module.exports = app => {
    app.post('/api/register', (req, res) => {
        userController.register(req, res);
    });
    app.post('/api/login', (req, res) => {
        userController.login(req, res);
    });
    app.get('/api/me',passport.authenticate('jwt', { session: false }), (req, res) => {
        userController.getMe(req, res);
    })

    //test
    app.get('/api/getAllData', (req, res) => {
        testController.getAllData(req, res);
    })
    app.post('/api/createUser', (req, res) => {
        testController.createUser(req, res);
    })
}