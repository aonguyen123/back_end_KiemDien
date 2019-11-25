const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginValid = require('../../validation/admin/login');
const registerValid = require('../../validation/admin/register');
const Admin = require('./../../model/admin');

exports.register = async (req, res) => {
    const { errors, isValid } = registerValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const admin = await Admin.findOne({email: req.body.email});
    if(admin)
    {
        return res.status(400).json({
            email: 'Email đã tồn tại'
        });
    }
    const newAdmin = new Admin({
        email: req.body.email,
        password: req.body.password,
        country: 'Việt Nam',
        sdt: req.body.sdt,
    });
    const salt = await bcrypt.genSalt(10);
    if(!salt)
    {
        return res.status(400).json({
            status: 'bcrypt fail'
        });
    }
    const hash = await bcrypt.hash(newAdmin.password, salt);
    if(!hash)
    {
        return res.status(400).json({
            status: 'hash fail'
        })
    }
    newAdmin.password = hash;
    const result = await newAdmin.save();
    if(!result)
    {
        return res.status(400).json({
            status: 'save fail'
        })
    }
    res.json(result);
}
exports.login = async (req, res) => {
    const { account } = req.body;
    const { isValid, errors } = loginValid(account);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const admin = await Admin.findOne({email: account.email});
    if(!admin)
    {
        errors.email = 'Email không tồn tại';
        return res.status(400).json(errors);
    }
    const isMatch = await bcrypt.compare(account.password, admin.password);
    if(!isMatch)
    {
        errors.password = 'Mật khẩu không chính xác';
        return res.status(400).json(errors);
    }
    const payload = {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        avatar: admin.avatar,
        country: admin.country,
        sdt: admin.sdt,
        city: admin.city
    };
    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
        if(err)
        {
            return res.status(400).json({
                status: 'secret fail'
            });
        }
        res.json({
            token: `Bearer ${token}`
        });
    });
};