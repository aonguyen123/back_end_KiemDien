const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userValid = require('./../../validation/user/login');
const User = require('./../../model/user');
const updatePasswordValid = require('./../../validation/user/updatePassword');
const formidable = require('formidable');
const fs = require('fs');
const updateInfoUserValid = require('./../../validation/user/updateInfoUser');

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
            await User.findByIdAndUpdate(fields.idUser, {status: 2});
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
        if(exists.name === '' || exists.ngaysinh === '' || exists.avatar === '' || exists.sdt === '')
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
    res.json({
        isSuccess: true,
        user
    });
};
exports.getDanhsachKiemdien = async (req, res) => {
    res.json({
        idLop: '5da939aba3c2ea1140993964',
        dssv: [
            {
                "_id": {
                    "$oid": "5da93f71ac69ef1758d48f8f"
                },
                "mssv": "3115410004",
                "ten": "nguyen duc ao",
                "ngaysinh": "20/05/1996"
            },
            {
                "_id": {
                    "$oid": "5da93f71ac69ef1758d48f8e"
                },
                "mssv": "3115410016",
                "ten": "truong tuan dieu",
                "ngaysinh": "21/12/1996"
            },
            {
                "_id": {
                    "$oid": "5da93f71ac69ef1758d48f8a"
                },
                "mssv": "3115410072",
                "ten": "phan hoang tuan",
                "ngaysinh": "21/11/1996"
            }
        ],
        dsKiemdien: [
            {
                mssv: '3115410016',
                ngaykiemdien: '10/10/2019'
            },
            {
                mssv: '3115410004',
                ngaykiemdien: '12/10/2019'
            },
            {
                mssv: '3115410016',
                ngaykiemdien: '12/10/2019'
            },
        ]
    });
};