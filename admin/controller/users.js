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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
exports.usersPagination = async (req, res) => {
    const pageNum = parseInt(req.query.pageNum);
    const size = parseInt(req.query.size);
    const query = {};
    if(pageNum < 0 || pageNum === 0)
    {
        return res.status(400).json({
            status: 'page start with 1'
        })
    }
    query.skip = size * (pageNum - 1); 
    query.limit = size;
    const userCount = await User.countDocuments();
    if(userCount > 0)
    {
        const users = await User.find({}, {}, query).sort({_id: 'desc'});
        return res.json({
            users,
            userTotal: userCount
        })
    }
    return res.json({
        users: [],
        userTotal: userCount
    });
};
exports.getUsers = async (req, res) => {
    const users = await User.find();
    if(users.length === 0)
    {
        return res.json({
            users: []
        });
    }
    return await res.json({
        users
    });
};