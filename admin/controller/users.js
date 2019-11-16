const User = require('./../../model/user');
const moment = require('moment');

exports.getUsers = async (req, res) => {
    const users = await User.find().sort({_id: 'desc'});
    return res.json({ users });
};
exports.getUserConditionStatusTrue = async (req, res) => {
    const users = await User.find({status: {$in : [1, 2]}}).sort({_id: 'desc'});
    return res.json(users);
};
exports.statisticalUserTotal = async (req, res) => {
    const users = await User.find({status: {$in: [1, 2]}});
    return res.json({
        users
    });
};