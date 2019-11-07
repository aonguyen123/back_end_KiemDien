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
    let usersMonthCurrent = [], usersMonthLast = [];
    const month = moment().format('MM');
    const lastMonth = moment().subtract(1, 'month').format('MM');
    const users = await User.find();
    if(users.length !== 0)
    {
        usersMonthCurrent = users.filter(user => moment(user.createdAt).format('MM') === month);
        usersMonthLast = users.filter(user => moment(user.createdAt).format('MM') === lastMonth);
    }
    return res.json({
        usersMonthCurrent,
        usersMonthLast
    });
};