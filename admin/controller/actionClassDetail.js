const moment = require('moment');
const fs = require('fs');
const formidable = require('formidable');
const createClassValid = require('./../../validation/admin/createClass');
const createMemberValid = require('./../../validation/admin/createMember');
const checkSpecialCharacters = require('./../../helper/checkSpecialCharacters');
const Classes = require('./../../model/classes');
const Presences = require('./../../model/presences');

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
    let status = false;
    if(moment(thoigianketthuc).isAfter(moment().toISOString()))
    {
        status = true;
    }
    const classUpdate = await Classes.findByIdAndUpdate(_id, {
        malop, tenlop, thoigianbatdau, thoigianketthuc, mota, giobatdau, status
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
exports.addClassMember = async (req, res) => {
    const {_id, newMember} = req.body;
    const { isValid, errors } = createMemberValid(newMember);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const member = await Classes.findById(_id).find({ 'dssv.maSV': { '$eq': newMember.mssv }});
    if(member.length !== 0)
    {
        return res.status(400).json({
            mssv: 'Mã thành viên đã tồn tại'
        })
    }
    const obj = {};
    obj.maSV = newMember.mssv;
    obj.tenSV = newMember.ten;
    obj.ngaysinh = newMember.ngaysinh;
    obj.gioitinh = (newMember.gioitinh === 'male') ? 'Nam' : 'Nữ';

    const rs = await Classes.updateOne({ _id }, { $push: { dssv: obj }});
    if(!rs)
    {
        return res.status(400).json({status: 'add member fail'});
    }
    res.json({
        status: 'ADD_MEMBER_CLASS_SUCCESS',
        message: 'Add class member success',
        isSuccess: true
    });
};
exports.editMemberClass = async (req, res) => {
    const { member, idClass } = req.body;
    const { isValid, errors } = createMemberValid(member);
    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const lop = await Classes.findById(idClass, 'dssv');
    const {dssv} = lop;
    
    const newDssv = dssv.filter(sv => sv._id.toString() !== member.id);
    const checkMaSv = newDssv.some(sv => sv.maSV === member.mssv);
    if(checkMaSv)
    {
        return res.status(400).json({
            mssv: 'Mã thành viên đã tồn tại'
        })
    }
    const updated = await Classes.updateOne({_id: idClass, 'dssv._id': member.id}, {'$set': {
        'dssv.$.maSV': member.mssv,
        'dssv.$.tenSV': member.ten,
        'dssv.$.ngaysinh': member.ngaysinh,
        'dssv.$.gioitinh': member.gioitinh
    }});
    if(!updated)
    {
        return res.status(400).json({
            status: 'update member fail'
        })
    }
    res.json({
        status: 'UPDATE_CLASS_MEMBER_SUCCESS',
        message: 'Update class member success',
        isSuccess: true
    })
};  
exports.deleteClassMember = async (req, res) => {
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
exports.changeManagerPerson = async (req, res) => {
    const {idUser, idClass} = req.body;
    const lopCurrent = await Classes.findById(idClass);
    if(!lopCurrent.idUser)
    {
        const updated = await Classes.findByIdAndUpdate(idClass, {idUser, managed: true});
            if(!updated)
            {
                return res.status(400).json({status: 'Update manager fail'});
            }
            return res.json({
                status: 'UPDATE_MANAGER_SUCCESS',
                message: 'Update class manager success',
                isSuccess: true
            })
    }
    else
    {
        if(lopCurrent.idUser === idUser)
        {
            return res.json({
                status: 'Manager already exists',
                message: 'Manager already exists',
                isSuccess: false
            });
        }
        const updated = await Classes.findByIdAndUpdate(idClass, {idUser, managed: true});
        if(!updated)
        {
            return res.status(400).json({status: 'Update manager fail'});
        }
        return res.json({
            status: 'UPDATE_MANAGER_SUCCESS',
            message: 'Update class manager success',
            isSuccess: true
        });
    }
};
exports.removeManagerPerson = async (req, res) => {
    const { idClass } = req.body;
    const removed = await Classes.findByIdAndUpdate(idClass, {idUser: '', managed: false});
    if(!removed)
    {
        return res.status(400).json({
            status: 'Remove manager person fail'
        });
    }
    return res.json({
        status: '',
        message: 'Remove manager person success',
        isSuccess: true
    });
};