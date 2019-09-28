const Router = require('express').Router();
Router.get('/randomNumber', (req, res) => {
    const num = [1, 2, 3];
    const number = Math.floor(Math.random() * Math.floor(100));
    return res.json({
        rs: number
    })
});
module.exports = Router;