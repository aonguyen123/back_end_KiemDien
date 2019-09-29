const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userValid = require('./../../validation/user/login');
const User = require('./../../model/user');
const updatePasswordValid = require('./../../validation/user/updatePassword');

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
        maGV: user.maGV,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        ngaysinh: user.ngaysinh,
        avatar: user.avatar,
        gioitinh: user.gioitinh,
        sdt: user.sdt,
        ngaydangki: user.ngaydangki
    };
    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
        if(err)
        {
            return res.json({
                status: 'secret fail'
            });
        }
        res.json({
            isSuccess: true,
            token: `Bearer ${token}`,
            user
        });
    });
};
exports.updatePassword = async (req, res) => {
    const { isValid, errors } = updatePasswordValid(req.body);
    if(!isValid)
    {
        return res.json({
            isSuccess: false,
            errors
        })
    }
    const salt = await bcrypt.genSalt(10);
    if(!salt)
    {
        return res.json({
            isSuccess: false,
            errors: 'bcrypt fail'
        })
    }
    const hash = await bcrypt.hash(req.body.password, salt);
    if(!hash)
    {
        return res.json({
            isSuccess: false,
            errors: 'hash fail'
        })
    }
    const user = await User.findByIdAndUpdate(req.body._id, {password: hash});
    if(!user)
    {
        return res.json({
            isSuccess: false,
            errors: 'update password fail'
        })
    }
    res.json({
        isSuccess: true,
        user
    })
};