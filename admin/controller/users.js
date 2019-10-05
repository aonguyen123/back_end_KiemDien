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
    const user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({
            email: 'Email đã tồn tại'
        });
    }
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
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
    let err = false;
    ids.forEach(async id => {
        const rs = await User.findByIdAndDelete(id);
        if(!rs)
        {
            err = true;
        }
    });
    if(err)
    {
        return res.status(400).json({
            status: 'delete fail'
        });
    }
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
exports.updateUser = async (req, res) => {
    
};