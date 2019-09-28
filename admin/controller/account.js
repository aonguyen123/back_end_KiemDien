const Admin = require('./../../model/admin');
const updateInfoValid = require('./../../validation/admin/updateInfo');
const updatePasswordValid = require('./../../validation/admin/updatePassword');
const bcrypt = require('bcryptjs');

exports.updateInfo = async (req, res) => {
    const { errors, isValid } = updateInfoValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const admin = await Admin.find({email: req.body.email});
    if(admin.length > 1)
    {
        return res.status(400).json({
            email: 'Email đã tồn tại'
        });
    }
    const user = req.body;
    const adminAfterUpdate = await Admin.findByIdAndUpdate(user.id, {
        firstName: user.firstName, lastName: user.lastName, email: user.email, country: user.country,
        sdt: user.sdt, city: user.city
    });
    if(!adminAfterUpdate)
    {
        return res.status(400).json({
            status: 'Update profile fail'
        })
    }
    res.json({
        user: adminAfterUpdate,
        status: 'Update profile success'
    });
};
exports.removeAvatar = async (req, res) => {
    const { idUser } = req.body;
    const admin = await Admin.findById(idUser);
    if(!admin)
    {
        return res.status(400).json({
            status: 'Admin not found'
        });
    }
    if(!admin.avatar)
    {
        return res.status(400).json({
            status: 'Avatar not found'
        });
    }
    const rs = await Admin.updateOne({_id: idUser}, {avatar: null});
    if(!rs)
    {
        return res.status(400).json({
            status: 'Remove avatar fail'
        });
    }
    res.json({
        success: 'Remove success'
    });
};
exports.updatePassword = async (req, res) => {
    const { errors, isValid } = updatePasswordValid(req.body.user);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const { user } = req.body;
    const salt = await bcrypt.genSalt(10);
    if(!salt)
    {
        return res.status(400).json({
            status: 'salt fail'
        });
    }
    const hash = await bcrypt.hash(user.password, salt);
    if(!hash)
    {
        return res.status(400).json({
            status: 'hash fail'
        });
    }
    user.password = hash;
    const admin = await Admin.findByIdAndUpdate(user.id, {password: user.password});
    if(!admin)
    {
        return res.status(400).json({
            status: 'updata password fail'
        });
    }
    res.json({
        admin,
        status: 'Update password success'
    });
};