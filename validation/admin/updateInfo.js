const validator = require('validator');
const isEmpty = require('./../is_empty');

module.exports = data => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.sdt = !isEmpty(data.sdt) ? data.sdt : '';

    if(validator.isEmpty(data.email))
    {
        errors.email = 'Email không được để trống';
    }
    if(!validator.isEmail(data.email))
    {
        errors.email = 'Email không đúng';
    }
    if(!validator.isLength(data.sdt, { min: 10, max: 10 }))
    {
        errors.sdt = 'Số điện thoại gồm 10 số';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};