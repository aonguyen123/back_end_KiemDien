const bcrypt = require('bcryptjs');
const async = require('async');
const User = require('./../../model/user');
const Classes = require('./../../model/classes');
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
    res.json({
        status: 'ADD_USER_SUCCESS',
        message: 'Create user success',
        isSuccess: true
    });
};
exports.deleteUser = async (req, res) => {
    const { idUsers } = req.body;
    if(idUsers.length === 0)
    {
        return res.status(400).json({
            errors: 'id not found'
        });
    }
    async.eachSeries(idUsers, async (_id, done) => {
        done = await Classes.updateMany({idUser: _id}, {idUser: '', managed: false});
        if(done)
        {
            done = await User.findByIdAndDelete(_id);
        }
    }, function allDone(err) {
        if(err)
        {
            return res.json({
                status: 'Delete user fail'
            })
        }
        res.json({
            status: 'DELETE_USER_SUCCESS',
            message: 'Delete user success',
            isSuccess: true
        });    
    });
};