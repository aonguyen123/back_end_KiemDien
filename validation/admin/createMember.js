const validator = require('validator');
const isEmpty = require('./../is_empty');

module.exports = data => {
    let errors = {};
    data.mssv = !isEmpty(data.mssv) ? data.mssv : '';
    data.ten = !isEmpty(data.ten) ? data.ten : '';

    if(validator.isEmpty(data.mssv))
    {
        errors.mssv = 'Mã thành viên không được để trống';
    }
    if(!validator.isNumeric(data.mssv))
    {
        errors.mssv = 'Mã thành viên phải là số';
    }
    if(!validator.isLength(data.mssv, {min: 10, max: 10}))
    {
        errors.mssv = 'Mã thành viên phải 10 số';
    }
    if(validator.isEmpty(data.ten))
    {
        errors.ten = 'Tên thành viên không được để trống';
    }
    if(!validator.isLength(data.ten, {min: 2, max: 50}))
    {
        errors.ten = 'Tên thành viên từ 2 đến 50 kí tự';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};