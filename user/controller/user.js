const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const userValid = require('./../../validation/user/login');
const User = require('./../../model/user');

exports.login = async (req, res) => {
    const { isValid, errors } = userValid(req.body);
    if(!isValid)
    {
        return res.json({
            isSuccess: false,
            errors
        })
    }
    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
        errors.email = 'Email không tồn tại';
        return res.json({
            isSuccess: false,
            errors
        });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch)
    {
        errors.password = 'Mật khẩu không chính xác';
        return res.json({
            isSuccess: false,
            errors
        });
    }
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        ngaysinh: user.ngaysinh,
        avatar: user.avatar,
        gioitinh: user.gioitinh,
        sdt: user.sdt
    };
    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
        if(err)
        {
            return res.json({
                status: 'secret fail'
            });
        }
        user.set('ngayDangKi', moment(user.createdAt).format('DD/MM/YYYY'), {strict:false});
        res.json({
            isSuccess: true,
            token: `Bearer ${token}`,
            user
        });
    });
};
exports.getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user)
    {
        return res.json({
            isSuccess: false,
            status: 'get user fail'
        });
    }
    user.set('ngayDangKi', moment(user.createdAt).format('DD/MM/YYYY'), {strict:false});
    res.json({
        isSuccess: true,
        user
    });
};