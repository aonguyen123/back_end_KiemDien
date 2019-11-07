const moment = require('moment');
const mongoose = require('mongoose');
const Classes = require('./../../model/classes');
const User = require('./../../model/user');

exports.getClasses = async (req, res) => {
    const classes = await Classes.find();
    if(classes.length !== 0)
    {
        classes.map(async item => {
            if(moment(item.thoigianketthuc).isBefore(moment().toISOString()) && item.status)
            {
                const updated = await Classes.findByIdAndUpdate(item._id, {status: false});
                if(!updated) return ;
            }
        });
    }
    const rs = await Classes.find().sort({_id: 'desc'});
    return res.json({ classes: rs });
};
exports.getClassById = async (req, res) => {
    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id))
    {
        const lop = await Classes.findById(id);
        if(lop === null)
        {
            return res.status(400).json({
                status: 'ID_WRONG'
            });
        }
        if(lop.idUser)
        {
            const user = await User.findById(lop.idUser);
            return res.json({
                lop,
                user
            })
        }
        return res.json({
            lop,
            user: {}
        })
    }
    return res.status(400).json({
        status: 'ID_WRONG'
    });
};
exports.getClassLatest = async (req, res) => {
    const classes = await Classes.find({status: true}).sort({_id: 'desc'}).limit(5);
    if(classes.length !== 0)
    {
        classes.map(async item => {
            if(moment(item.thoigianketthuc).isBefore(moment().toISOString()))
            {
                const updated = await Classes.findByIdAndUpdate(item._id, {status: false});
                if(!updated) return ;
            }
        });
    }
    const rs = await Classes.find({status: true}).sort({_id: 'desc'}).limit(5);
    return res.json({ classes: rs });
};
exports.statisticalTotalClass = async (req, res) => {
    let lopsMonthCurrent = [], lopsMonthLast = [];
    const month = moment().format('MM');
    const lastMonth = moment().subtract(1, 'month').format('MM');
    const lops = await Classes.find();
    if(lops.length !== 0)
    {
        lopsMonthCurrent = lops.filter(lop => moment(lop.createdAt).format('MM') === month);
        lopsMonthLast = lops.filter(lop => moment(lop.createdAt).format('MM') === lastMonth);
    }
    return res.json({
        lopsMonthCurrent,
        lopsMonthLast
    });
};
exports.statisticalTotalMember = async (req, res) => {
    const lops = await Classes.find();
    let count = 0;
    if(lops.length !== 0)
    {
        for(let i = 0; i < lops.length; i++)
        {
            count += lops[i].dssv.length;
        }
    }
    return res.json(count);
};