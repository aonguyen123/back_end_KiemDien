const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!validator.isLength(data.name, { min: 2, max: 30 }))
    {
        errors.name = 'Tên từ 2 đến 30 kí tự';
    }
    if(validator.isEmpty(data.name))
    {
        errors.name = 'Tên không được để trống';
    }
    if(!validator.isEmail(data.email))
    {
        errors.email = 'Email không đúng';
    }
    if(validator.isEmpty(data.email))
    {
        errors.email = 'Email không được để trống';
    }
    if(!validator.isLength(data.password, { min: 6, max: 30 }))
    {
        errors.password = 'Mật khẩu từ 6 đến 30 kí tự';
    }
    if(validator.isEmpty(data.password))
    {
        errors.password = 'Mật khẩu không được để trống';
    }
    if(!validator.isLength(data.password_confirm, { min: 6, max: 30 }))
    {
        errors.password_confirm = 'Mật khẩu từ 6 đến 30 kí tự';
    }
    if(!validator.equals(data.password, data.password_confirm))
    {
        errors.password_confirm = 'Mật khẩu không trùng khớp';
    }
    if(validator.isEmpty(data.password_confirm))
    {
        errors.password_confirm = 'Mật khẩu không được để trống';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}