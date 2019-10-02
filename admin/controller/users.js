const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../../model/user');
const registerValid = require('./../../validation/user/register');

exports.createUser = async (req, res) => {
    const { isValid, errors } = registerValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const checkEmail = await User.findOne({email: req.body.email});
    if(checkEmail)
    {
        return res.status(400).json({
            email: 'Email đã tồn tại'
        });
    }
    const user = await User.findOne({maGV: req.body.maGV});
    if(user)
    {
        return res.status(400).json({
            maGV: 'Mã giảng viên đã tồn tại'
        })
    }
    const newUser = new User({
        maGV: req.body.maGV,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        ngaysinh: req.body.ngaysinh,
        gioitinh: req.body.gioitinh,
        sdt: req.body.sdt
    });
    const salt = await bcrypt.genSalt(10);
    if(!salt)
    {
        return res.status(400).json({
            status: 'bcrypt fail'
        });
    }
    const hash = await bcrypt.hash(newUser.password, salt);
    if(!hash)
    {
        return res.status(400).json({
            status: 'hash fail'
        })
    }
    newUser.password = hash;
    const result = await newUser.save();
    if(!result)
    {
        return res.status(400).json({
            status: 'save fail'
        })
    }
    res.json(result);
};
exports.getUsers = async (req, res) => {
    const users = await User.find().sort({_id: 'desc'});
    if(users.length === 0)
    {
        return res.json({
            users: [],
            status: 'USERS_NOTFOUND'
        });
    }
    return res.json({
        users,
        status: 'USERS_EXITS'
    });
};
exports.deleteUser = async (req, res) => {
    const { ids } = req.body;
    if(!ids)
    {
        return res.status(400).json({
            errors: 'id not found'
        });
    }
    ids.forEach(async id => {
        const rs = await User.findByIdAndDelete(id);
        if(!rs)
        {
            return res.status(400).json({
                errors: 'delete fail'
            })
        }
    });
    const users = await User.find();
    if(!users)
    {
        return res.status(400).json({ errors: 'users not found' })
    }
    return res.json({
        users,
        status: 'Delete user success'
    });
};