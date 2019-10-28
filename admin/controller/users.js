const User = require('./../../model/user');

exports.getUsers = async (req, res) => {
    const users = await User.find().sort({_id: 'desc'});
    if(users.length === 0)
    {
        return res.json({
            users,
            status: 'USERS_NOTFOUND'
        });
    }
    return res.json({
        users,
        status: 'USERS_EXITS'
    });
};