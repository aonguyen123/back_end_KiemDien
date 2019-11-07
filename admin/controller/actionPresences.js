const Presences = require('./../../model/presences');
const CheckDate = require('./../../model/checkDate');
const Classes = require('./../../model/classes');
const createPresencesValid = require('./../../validation/admin/createPresences');

exports.createPresences = async (req, res) => {
    const { errors, isValid } = createPresencesValid(req.body);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const { idClass, memberCode, checkDate } = req.body;

    const obj = {};
    obj.date = checkDate;

    const objPresence = {};
    objPresence.memberCode = memberCode;
    objPresence.checkDate = checkDate;

    const classes = await Classes.findById(idClass, 'dssv');
    const { dssv } = classes;
    const checkMember =  dssv.filter(sv => sv.maSV === memberCode);
    if(checkMember.length === 0)
    {
        return res.json({
            isSuccess: false,
            message: 'Member not found'
        });
    }
    const checkClass = await CheckDate.findOne({idClass});
    if(checkClass)
    {
        const checkDatePresence = await CheckDate.findOne({idClass}).find({'dateList.date': { '$eq': checkDate }});
        if(checkDatePresence.length === 0)
        {
            const updated = await CheckDate.updateOne({idClass}, { $push: { dateList: obj } });
            if(!updated)
            {
                return res.json({
                    isSuccess: false,
                    message: 'Update check date fail'
                });
            }
            const updatePresence = await Presences.updateOne({idClass}, { $push: { presenceList: objPresence} });
            if(!updatePresence)
            {
                return res.json({
                    isSuccess: false,
                    message: 'Update presences list fail'
                });
            }
            return res.json({
                isSuccess: true,
            });
        }
        else
        {
            const checkPresence = await Presences.findOne({idClass});
            const check = checkPresence.presenceList.some(obj => obj.memberCode === memberCode && obj.checkDate === checkDate);
            if(check)
            {
                return res.json({
                            isSuccess: false,
                            message: 'Member code checked'
                        });
            }
            const updatePresenceMember = await Presences.updateOne({idClass}, {$push: {presenceList: objPresence}});
            if(!updatePresenceMember)
            {
                return res.json({
                    isSuccess: false,
                    message: 'update presence member fail'
                });
            }
            return res.json({
                isSuccess: true,
            });
        }
    }
    else
    {
        const newCheckDate = new CheckDate({
            idClass
        });
        const result = await newCheckDate.save();
        if(!result)
        {
            return res.json({
                isSuccess: false,
                message: 'Create check date fail'
            });
        }
        const updated = await CheckDate.updateOne({idClass}, { $push: { dateList: obj } });
        if(!updated)
        {
            return res.json({
                isSuccess: false,
                message: 'Update check date fail'
            });
        }
        const newPresence = new Presences({
            idClass
        });
        const rs = await newPresence.save();
        if(!rs)
        {
            return res.json({
                isSuccess: false,
                message: 'Save presences fail'
            });
        }
    
        const updatedPresence = await Presences.updateOne({idClass}, { $push: { presenceList: objPresence } });
        if(!updatedPresence)
        {
            return res.json({
                isSuccess: false,
                message: 'Update presence fail'
            });
        }
        return res.json({
            isSuccess: true
        });
    }
};