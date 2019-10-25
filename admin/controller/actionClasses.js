const moment = require('moment');
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