const mongoose = require('mongoose');
const moment = require('moment');
const Classes = require('./../../model/classes');
const Presences = require('./../../model/presences');
const CheckDate = require('./../../model/checkDate');

exports.getPresences = async (req, res) => {
    const { id } = req.params;
    if(mongoose.Types.ObjectId.isValid(id))
    {
        const classes = await Classes.findById(id);
        if(classes === null)
        {
            return res.json({
                isSuccess: false,
                status: 'ID_WRONG'
            });
        }
        const checkDate = await CheckDate.findOne({idClass: classes._id});
        if(checkDate === null)
        {
            return res.json({
                classes,
                checkDate
            });    
        }
        checkDate.dateList.sort((left, right) => {
            return moment.utc(moment(left.date, 'DD/MM/YYYY')).diff(moment.utc(moment(right.date, 'DD/MM/YYYY')));
        });

        const dsKD = await Presences.findOne({idClass: classes._id});
        const { dssv } = classes;
        const { presenceList } = dsKD;

        let arr = [];
        let obj = {};
        dssv.forEach(sv => {
            presenceList.forEach(kd => {
                if(kd.memberCode === sv.maSV)
                {
                    obj.date = kd.checkDate;
                    obj.status = kd.status;
                    arr.push(obj);
                    obj = {};
                }
            });
            sv.set('checkDate', arr, {strict:false}); 
            arr = [];
            obj = {};
        });
        return res.json({
            classes,
            checkDate
        });
    }
    return res.status(400).json({
        isSuccess: false,
        status: 'ID_WRONG'
    });
};