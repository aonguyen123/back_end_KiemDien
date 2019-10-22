const moment = require('moment');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const createClassValid = require('./../../validation/admin/createClass');
const checkSpecialCharacters = require('./../../helper/checkSpecialCharacters');
const makeid = require('./../../helper/createCode');
const Classes = require('./../../model/classes');

exports.createClass = async (req, res) => {
    const { isValid, errors } = createClassValid(req.body.newClass);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }    
    const { tenlop } = req.body.newClass;
    if(checkSpecialCharacters(tenlop))
    {
        return res.status(400).json({
            tenlop: 'Tên lớp không được chứa kí tự đặc biệt'
        })
    }
    if(tenlop.trim().indexOf(' ') === -1)
    {
        return res.status(400).json({
            tenlop: 'Tên lớp ít nhất 2 từ'
        })
    }
    const className = await Classes.findOne({tenlop: tenlop});
    if(className)
    {
        return res.status(400).json({
            tenlop: 'Tên lớp đã tồn tại'
        })
    }
    const malop = makeid(5);
    const classes = await Classes.findOne({malop});
    if(classes)
    {
        return res.status(400).json({
            tenlop: 'Mã lớp đã tồn tại'
        });
    }
    let { thoigianbatdau, thoigianketthuc, giobatdau } = req.body.newClass;
    thoigianbatdau = moment(thoigianbatdau).toISOString();
    giobatdau = moment(giobatdau).toISOString();
    thoigianketthuc = moment(thoigianketthuc).toISOString();
    
    const newClass = new Classes({
        malop,
        tenlop,
        thoigianbatdau,
        thoigianketthuc,
        mota: req.body.newClass.mota,
        giobatdau,
        thoigiantao: moment().toISOString()
    });
    const result = await newClass.save();
    if(!result)
    {
        return res.status(400).json({
            err: 'create class fail'
        });
    }
    res.json({
        status: 'ADD_CLASS_SUCCESS',
        message: 'Create class success',
        isSuccess: true
    });
};
exports.updateInfoClass = async (req, res) => {
    const { isValid, errors } = createClassValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const { tenlop } = req.body;
    if(checkSpecialCharacters(tenlop))
    {
        return res.status(400).json({
            tenlop: 'Tên lớp không được chứa kí tự đặc biệt'
        })
    }
    if(tenlop.trim().indexOf(' ') === -1)
    {
        return res.status(400).json({
            tenlop: 'Tên lớp ít nhất 2 từ'
        })
    }
    const className = await Classes.find({_id: {$ne: req.body._id}}).findOne({tenlop});
    if(className)
    {
        return res.status(400).json({
            tenlop: 'Tên lớp đã tồn tại'
        })
    }
    let { _id, malop, mota, thoigianbatdau, thoigianketthuc, giobatdau } = req.body;
    thoigianbatdau = moment(thoigianbatdau).toISOString();
    giobatdau = moment(giobatdau).toISOString();
    thoigianketthuc = moment(thoigianketthuc).toISOString();

    const classUpdate = await Classes.findByIdAndUpdate(_id, {
        malop, tenlop, thoigianbatdau, thoigianketthuc, mota, giobatdau
    });
    if(!classUpdate)
    {
        return res.status(400).json({
            status: 'Update fail'
        })
    }
    res.json({
        status: 'UPDATE_INFO_CLASS_SUCCESS',
        message: 'Update infomation class success',
        isSuccess: true
    })
};
exports.updateAvatarClass = async (req, res) => {
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
            fs.rename(path, newPath, err => {
                if (err) {
                    return res.status(400).json({
                        status: 'upload fail'
                    });
                }
            });
            const fileName= newPath.split('/')[1];
            const lop = await Classes.findById(fields._id);
            if(lop.hinhdaidien === fileName)
            {
                return res.json({
                    status: '',
                    message: 'Avatar already exists',
                    isSuccess: false
                })
            }
            const rs = await Classes.findOneAndUpdate({_id: fields._id}, {hinhdaidien: fileName});
            if(!rs)
            {
                return res.status(400).json({ status: 'Update image fail' })
            }
            res.json({
                status: 'UPLOAD_AVATAR_CLASS_SUCCESS',
                message: 'Upload image success',
                isSuccess: true
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
exports.removeAvatarClass = async (req, res) => {
    const { _id } = req.body;
    const lop = await Classes.updateOne({_id}, {hinhdaidien: null});
    if(!lop)
    {
        return res.status(400).json({
            status: 'remove avatar fail'
        });
    }
    res.json({
        status: 'REMOVE_AVATAR_CLASS_SUCCESS',
        message: 'Remove class avatar success',
        isSuccess: true
    })
};