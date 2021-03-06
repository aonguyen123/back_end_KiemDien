const validator = require('validator');
const isEmpty = require('../is_empty');

module.exports = data => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.sdt = !isEmpty(data.sdt) ? data.sdt : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if(!validator.isLength(data.name, {min: 2, max: 15 }))
    {
        errors.name = 'Tên từ 2 đến 15 kí tự';
    }
    if(!validator.isEmail(data.email))
    {
        errors.email = 'Email không đúng';
    }
    if(validator.isEmpty(data.email))
    {
        errors.email = 'Email không được để trống';
    }
    if(!validator.isLength(data.sdt, { min: 10, max: 10 }))
    {
        errors.sdt = 'Số điện thoại gồm 10 số';
    }
    if(!validator.isNumeric(data.sdt))
    {
        errors.sdt = 'Số điện thoại không chính xác';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}