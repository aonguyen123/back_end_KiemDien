const validator = require('validator');
const isEmpty = require('./../is_empty');

module.exports = data => {
    let errors = {};
    data.idClass = !isEmpty(data.idClass) ? data.idClass : '';
    data.memberCode = !isEmpty(data.memberCode) ? data.memberCode : '';
    data.checkDate = !isEmpty(data.checkDate) ? data.checkDate : '';

    if(validator.isEmpty(data.idClass))
    {
        errors.idClass = 'Không tìm thấy mã lớp';
    }
    if(!validator.isNumeric(data.memberCode))
    {
        errors.memberCode = 'Mã thành viên phải là số';
    }
    if(validator.isEmpty(data.memberCode))
    {
        errors.memberCode = 'Không tìm thấy mã thành viên';
    }
    if(validator.isEmpty(data.checkDate))
    {
        errors.checkDate = 'Không tìm thấy ngày điểm danh';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};