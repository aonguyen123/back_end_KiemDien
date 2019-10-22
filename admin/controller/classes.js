const moment = require('moment');
const mongoose = require('mongoose');
const Classes = require('./../../model/classes');
const User = require('./../../model/user');

exports.getClasses = async (req, res) => {
    const classes = await Classes.find().sort({_id: 'desc'});
    classes.forEach( async value => {
        if(!moment(value.thoigianketthuc).isAfter(moment().toISOString()))
        {
            await Classes.findByIdAndUpdate(value._id, {status: false});
        }
    });
    if(classes.length === 0)
    {
        return res.json({
            status: 'CLASS_NOTFOUND',
            classes
        })
    }
    res.json({
        status: 'CLASS_EXITS',
        classes
    });
};
exports.getClassById = async (req, res) => {
    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id))
    {
        const lop = await Classes.findById(id);
        if(!lop)
        {
            return res.status(400).json({
                message: 'CLASS_NOT_FOUND'
            });
        }
        if(lop.idUser)
        {
            const user = await User.findById(lop.idUser);
            if(Object.entries(user).length === 0)
            {
                return res.json({
                    lop,
                    user: {}
                });
            }
            return res.json({
                lop,
                user
            })
        }
        else
        {
            return res.json({
                lop,
                user: {}
            })
        }
    }
    return res.status(400).json({
        message: 'CLASS_NOT_FOUND'
    });
};