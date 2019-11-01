const bcrypt = require('bcryptjs');
const User = require('./../../model/user');
const updatePasswordValid = require('./../../validation/user/updatePassword');
const formidable = require('formidable');
const fs = require('fs');
const updateInfoUserValid = require('./../../validation/user/updateInfoUser');

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
exports.uploadAvatar = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "uploads/";
    form.parse(req, async (err, fields, file) => {
        if(err)
        {
            return res.json({
                isSuccess: false,
                status: 'fail'
            });
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
                    return res.json({
                        isSuccess: false,
                        status: 'upload fail'
                    });
                }
            });
            const fileName= newpath.split('/')[1];
            const user = await User.findById(fields.idUser);
            if(user.avatar === fileName)
            {
                return res.json({
                    isSuccess: false,
                    status: 'File giống nhau'
                })
            }
            const rs = await User.findOneAndUpdate({_id: fields.idUser}, {avatar: fileName});
            if(!rs)
            {
                return res.json({isSuccess: false, status: 'update fail' })
            }
            res.json({
                isSuccess: true,
                fileName: fileName
            });
        }
        else
        {
            return res.json({
                isSuccess: false,
                status: 'Sai định dạng file'
            });
        }
    });
};
exports.updateInfoUser = async (req, res) => {
    const { isValid, errors } = updateInfoUserValid(req.body);
    if(!isValid)
    {
        return res.json({
            isSuccess: false,
            errors
        });
    }
    const checkUser = await User.find({_id: {$ne: req.body._id}}).findOne({email: req.body.email});
    if(checkUser)
    {
        return res.json({
            isSuccess: false,
            email: 'Email đã tồn tại'
        });
    }
    const user = req.body;
    const userAfterUpdate = await User.findByIdAndUpdate(user._id, {
        name: user.name, email: user.email, ngaysinh: user.ngaysinh, gioitinh: user.gioitinh,
        sdt: user.sdt
    });
    
    if(!userAfterUpdate)
    {
        return res.json({
            isSuccess: false,
            status: 'Update fail'
        });
    }
    const exists = await User.findById(user._id);
    if(exists)
    {
        if(exists.ngaysinh === '' || exists.avatar === '')
        {
            await User.findByIdAndUpdate(user._id, {status: 2});
        }
        else
        {
            await User.findByIdAndUpdate(user._id, {status: 1});
        }
    }
    res.json({
        isSuccess: true
    })
};