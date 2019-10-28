const bcrypt = require('bcryptjs');
const fs = require('fs');
const formidable = require('formidable');
const Admin = require('./../../model/admin');
const updateInfoValid = require('./../../validation/admin/updateInfo');
const updatePasswordValid = require('./../../validation/admin/updatePassword');

exports.updateInfo = async (req, res) => {
    const { account } = req.body;
    const { errors, isValid } = updateInfoValid(account);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const admin = await Admin.find({_id: {$ne: account._id}}).findOne({email: account.email});
    if(admin)
    {
        return res.status(400).json({
            email: 'Email đã tồn tại'
        });
    }
    
    const updated = await Admin.findByIdAndUpdate(account._id, {
        firstName: account.firstName, lastName: account.lastName, email: account.email, country: account.country,
        sdt: account.sdt, city: account.city
    });
    if(!updated)
    {
        return res.status(400).json({
            status: 'Update profile fail'
        })
    }
    res.json({
        status: 'UPDATE_iNFO_ACCOUNT_SUCCESS',
        message: 'Update account information successfully',
        isSuccess: true
    });
};
exports.removeAvatar = async (req, res) => {
    const { idAccount } = req.body;    
    const rs = await Admin.updateOne({_id: idAccount}, {avatar: ''});
    if(!rs)
    {
        return res.status(400).json({
            status: 'Remove avatar fail'
        });
    }
    res.json({
        status: 'REMOVE_AVATAR_ACCOUNT_SUCCESS',
        message: 'Successfully deleted the account avatar',
        isSuccess: true
    });
};
exports.updatePassword = async (req, res) => {
    const { password, idAccount } = req.body;
    const { errors, isValid } = updatePasswordValid(password);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const salt = await bcrypt.genSalt(10);
    if(!salt)
    {
        return res.status(400).json({
            status: 'salt fail'
        });
    }
    const hash = await bcrypt.hash(password.password, salt);
    if(!hash)
    {
        return res.status(400).json({
            status: 'hash fail'
        });
    }
    password.password = hash;
    const admin = await Admin.findByIdAndUpdate(idAccount, {password: password.password});
    if(!admin)
    {
        return res.status(400).json({
            status: 'updata password fail'
        });
    }
    res.json({
        status: 'UPDATE_PASSWORD_SUCCESS',
        message: 'Password updated successfully',
        isSuccess: true
    });
};
exports.updateAvatar = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = 'uploads/';
    form.parse(req, async (err, fields, file) => {
        if(err)
        {
            return res.status(400).json({ status: 'fail' });
        }
        const fileName = file.avatar.name;
        const parts = fileName.split('.');
        const typeFile = (parts[parts.length - 1]);
        if(typeFile === 'png' || typeFile === 'jpg' || typeFile === 'jpeg')
        {
            const { path } = file.avatar;
            const newPath = form.uploadDir + file.avatar.name;
            fs.rename(path, newPath, async err => {
                if (err) {
                    return res.status(400).json({
                        status: 'upload fail'
                    });
                }
                const fileName= newPath.split('/')[1];
                const account = await Admin.findById(fields.idAccount);
                if(account.avatar === fileName)
                {
                    return res.json({
                        status: 'AVATAR_ALREADY_EXISTS',
                        message: 'Avatar already exists',
                        isSuccess: false
                    })
                }
                const rs = await Admin.findOneAndUpdate({_id: fields.idAccount}, {avatar: fileName});
                if(!rs)
                {
                    return res.status(400).json({ status: 'Update image fail' })
                }
                res.json({
                    status: 'UPLOAD_AVATAR_ACCOUNT_SUCCESS',
                    message: 'Upload avatar success',
                    isSuccess: true
                });
            });
        }
        else
        {
            return res.json({ 
                status: '',
                message: 'Wrong file format',
                isSuccess: false
            });
        }
    });
};