const path = require('path');
const Admin = require('./../../model/admin');

exports.getInfoAccount = async (req, res) => {
    const {id} = req.query;
    if(!id)
    {
        return res.status(400).json({
            status: 'id not found'
        });
    }
    const account = await Admin.findById(id);
    if(!account)
    {
        return res.status(400).json({
            status: 'Get account not found'
        });
    }
    res.json(account);
};
exports.getAvatar = async (req, res) => {
    const fileName = req.params.name;
    if(!fileName)
    {
        return res.status(400).json({
            status: 'no file name'
        });
    }
    res.sendFile(path.resolve(`./uploads/${fileName}`));
};
exports.getMe = async (req, res) => {
    return await res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        avatar: req.user.avatar,
        country: req.user.country,
        sdt: req.user.sdt,
        city: req.user.city
    });
};