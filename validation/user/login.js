const validator = require('validator');
const isEmpty = require('../is_empty');

module.exports = (data) => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(validator.isEmpty(data.email))
    {
        errors.email = 'Email không được để trống';
    }
    if(!validator.isEmail(data.email))
    {
        errors.email = 'Email không hợp lệ';
    }
    if(!validator.isLength(data.password, { min: 6, max: 30 }))
    {
        errors.password = 'Mật khẩu từ 6 đến 30 kí tự';
    }
    if(validator.isEmpty(data.password))
    {
        errors.password = 'Mật khẩu không được để trống';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}