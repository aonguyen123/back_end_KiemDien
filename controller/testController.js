const User = require('./../model/user');

exports.getAllData = async (req, res) => {
    const listUser = await User.find();
    if(!listUser)
    {
        return res.status(404).json({
            success: false
        })
    }
    res.status(200).json({
        users: listUser
    })
}