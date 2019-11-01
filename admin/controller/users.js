const User = require('./../../model/user');

exports.getUsers = async (req, res) => {
    const users = await User.find().sort({_id: 'desc'});
    return res.json({ users });
};
exports.getUserConditionStatusTrue = async (req, res) => {
    const users = await User.find({status: 1}).sort({_id: 'desc'});
    return res.json(users);
};