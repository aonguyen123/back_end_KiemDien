const mongoose = require('mongoose');
const Classes = require('./../../model/classes');
const Presences = require('./../../model/presences');
const CheckDate = require('./../../model/checkDate');

exports.getPresencesDetail = async (req, res) => {
    const { id } = req.query;
    if(mongoose.Types.ObjectId.isValid(id))
    {
        const classes = await Classes.findById(id);
        if(classes === null)
        {
            return res.status(400).json({
                status: 'ID_WRONG'
            });
        }
        const checkDate = await CheckDate.findOne({idClass:classes._id});
        const dsKD = await Presences.findOne({idClass: classes._id});
        const { dssv } = classes;
        const { presenceList } = dsKD;

        let arr = [];
        dssv.forEach(sv => {
            presenceList.forEach(kd => {
                if(kd.memberCode === sv.maSV)
                {
                    arr.push(kd.checkDate);
                }
            });
            sv.set('checkDate', arr, {strict:false}); 
            arr = [];
        });
        return res.json({
            classes,
            checkDate
        });
    }
    return res.status(400).json({
        status: 'ID_WRONG'
    });
};