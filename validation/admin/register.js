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

    if(!validator.isLength(data.firstName, { min: 2, max: 10 }))
    {
        errors.firstName = 'Họ từ 2 đến 10 kí tự';
    }
    if(validator.isEmpty(data.firstName))
    {
        errors.firstName = 'Họ không được để trống';
    }
    if(!validator.isLength(data.lastName, { min: 2, max: 20 }))
    {
        errors.lastName = 'Tên từ 2 đến 20 kí tự';
    }
    if(validator.isEmpty(data.lastName))
    {
        errors.lastName = 'Tên không được để trống';
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
    if(!validator.isLength(data.country, { min: 2, max: 30 }))
    {
        errors.country = 'Quốc gia từ 2 đến 30 kí tự';
    }
    if(validator.isEmpty(data.country))
    {
        errors.country = 'Quốc gia không được để trống';
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
    if(validator.isEmpty(data.city))
    {
        errors.city = 'Thành phố không được để trống';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}