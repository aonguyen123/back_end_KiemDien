const Classes = require('./../../model/classes');
const Presences = require('./../../model/presences');

exports.deletePresenceMember = async (req, res) => {
    const { idClass, members, listMssv } = req.body;
    const deleted = await Classes.updateOne({_id: idClass}, {$pull: {dssv: {_id: {$in: members}}}}, null);
    if(!deleted)
    {
        return res.status(400).json({
            status: 'Delete class member fail'
        });
    }
    const deleteMemberInPresence = await Presences.updateOne({idClass}, {$pull: {presenceList: {memberCode: {$in: listMssv}}}}, null);
    if(!deleteMemberInPresence)
    {
        return res.status(400).json({
            status: 'Delete class member in presences fail'
        });
    }
    res.json({
        status: 'DELETE_CLASS_MEMBER_SUCCESS',
        message: 'Delete class member success',
        isSuccess: true
    });
};