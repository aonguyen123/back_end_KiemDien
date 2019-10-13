const Classes = require('./../../model/classes');
const createClassValid = require('./../../validation/admin/createClass');
const createMalop = require('./../../helper/createMalop');

exports.createClass = async (req, res) => {
    const { isValid, errors } = createClassValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const { tenlop } = req.body;
    const malop = createMalop(tenlop);
    const classes = await Classes.findOne({malop});
    if(classes)
    {
        return res.status(400).json({
            malop: 'Mã lớp đã tồn tại'
        });
    }
    const newClass = new Classes({
        malop,
        tenlop: req.body.tenlop,
        thoigianbatdau: req.body.thoigianbatdau,
        thoigianketthuc: req.body.thoigianketthuc,
        mota: req.body.mota,
        giobatdau: req.body.giobatdau
    });
    const result = await newClass.save();
    if(!result)
    {
        return res.status(400).json({
            status: 'create class fail'
        });
    }
    res.json(result);
};
exports.getClasses = async (req, res) => {
    const classes = await Classes.find().sort({_id: 'desc'});
    if(classes.length === 0)
    {
        return res.json({
            status: 'Class not found',
            classes
        })
    }
    res.json({
        status: 'Class exits',
        classes
    });
};