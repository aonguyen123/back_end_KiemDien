const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        sdt: req.body.sdt,
        city: req.body.city
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
    const { isValid, errors } = loginValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const admin = await Admin.findOne({email: req.body.email});
    if(!admin)
    {
        errors.email = 'Email không tồn tại';
        return res.status(400).json(errors);
    }
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
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
            success: true,
            token: `Bearer ${token}`
        });
    });
};
exports.updateAvatar = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "uploads/";
    form.parse(req, async (err, fields, file) => {
        if(err)
        {
            return res.status(400).json({
                status: 'fail'
            })
        }
        const fileName = file.avatar.name;
        const parts = fileName.split('.');
        const typeFile = (parts[parts.length - 1]);
        if(typeFile === 'png' || typeFile === 'jpg' || typeFile === 'jpeg')
        {
            var path = file.avatar.path;
            var newpath = form.uploadDir + file.avatar.name;
            fs.rename(path, newpath, err => {
                if (err) {
                    return res.status(400).json({
                        status: 'upload fail'
                    });
                }
            });
            const fileName= newpath.split('/')[1];
            const admin = await Admin.findById(fields.idUser);
            if(admin.avatar === fileName)
            {
                return res.status(400).json({
                    status: 'File giống nhau'
                })
            }
            const rs = await Admin.findOneAndUpdate({_id: fields.idUser}, {avatar: fileName});
            if(!rs)
            {
                return res.status(400).json({ status: 'update fail' })
            }
            res.json({
                filePath: newpath
            });
        }
        else
        {
            return res.status(400).json({
                status: 'Sai định dạng file'
            });
        }
    });
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
exports.getInfoUser = async (req, res) => {
    const {id} = req.query;
    if(!id)
    {
        return res.status(400).json({
            status: 'id not found'
        });
    }
    const user = await Admin.findOne({_id: id});
    if(!user)
    {
        return res.status(400).json({
            status: 'get user not found'
        });
    }
    res.json(user);
};