const validator = require('validator');
const isEmpty = require('../is_empty');

module.exports = data => {
    let errors = {};
    data.tenlop = !isEmpty(data.tenlop) ? data.tenlop : '';
    data.mota = !isEmpty(data.mota) ? data.mota : '';

    if(validator.isEmpty(data.tenlop))
    {
        errors.tenlop = 'Tên lớp không được để trống';
    }
    if(!validator.isLength(data.tenlop, { min: 10, max: 30 }))
    {
        errors.tenlop = 'Tên lớp từ 10 đến 30 kí tự';
    }
    if(validator.isEmpty(data.mota))
    {
        errors.mota = 'Mô tả không được để trống';
    }
    if(!validator.isLength(data.mota, { min: 10, max: 150 }))
    {
        errors.mota = 'Mô tả từ 10 đến 150 kí tự';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}