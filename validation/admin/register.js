const validator = require('validator');
const isEmpty = require('../is_empty');

module.exports = data => {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.sdt = !isEmpty(data.sdt) ? data.sdt : '';
    data.city = !isEmpty(data.city) ? data.city : '';

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
    if(!validator.isLength(data.sdt, { min: 10, max: 10 }))
    {
        errors.sdt = 'Số điện thoại gồm 10 số';
    }
    if(validator.isEmpty(data.sdt))
    {
        errors.sdt = 'Số điện thoại không được để trống';
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