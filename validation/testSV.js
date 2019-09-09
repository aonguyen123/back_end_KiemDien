const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = data => {
    const errors = {};
    data.mssv = !isEmpty(data.mssv) ? data.mssv : '';
    data.ten = !isEmpty(data.ten) ? data.ten : '';

    if(validator.isEmpty(data.mssv))
    {
        errors.mssv = "Mã số sinh viên không được để trống";
    }
    if(validator.isEmpty(data.ten))
    {
        errors.ten = "Tên sinh viên không được để trống";
    }
    if(!validator.isLength(data.ten, {min: 2}))
    {
        errors.ten = "Tên sinh viên ít nhất 2 kí tự"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}