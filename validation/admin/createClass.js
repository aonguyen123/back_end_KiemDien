const validator = require('validator');
const isEmpty = require('../is_empty');

module.exports = data => {
    let errors = {};
    data.tenlop = !isEmpty(data.tenlop) ? data.tenlop : '';
    data.thoigianbatdau = !isEmpty(data.thoigianbatdau) ? data.thoigianbatdau : '';
    data.thoigianketthuc = !isEmpty(data.thoigianketthuc) ? data.thoigianketthuc : '';
    data.mota = !isEmpty(data.mota) ? data.mota : '';
    data.giobatdau = !isEmpty(data.giobatdau) ? data.giobatdau : '';

    if(validator.isEmpty(data.tenlop))
    {
        errors.tenlop = 'Tên lớp không được để trống';
    }
    if(!validator.isLength(data.tenlop, { min: 6, max: 30 }))
    {
        errors.tenlop = 'Tên lớp từ 6 đến 30 kí tự';
    }
    if(validator.isEmpty(data.thoigianbatdau))
    {
        errors.thoigianbatdau = 'Thời gian bắt đầu không để trống';
    }
    if(validator.isEmpty(data.thoigianketthuc))
    {
        errors.thoigianketthuc = 'Thời gian kết thúc không để trống';
    }
    if(validator.isEmpty(data.mota))
    {
        errors.mota = 'Mô tả không được để trống';
    }
    if(!validator.isLength(data.mota, { min: 10, max: 150 }))
    {
        errors.mota = 'Mô tả từ 10 đến 150 kí tự';
    }
    if(validator.isEmpty(data.giobatdau))
    {
        errors.giobatdau = 'Giờ bắt đầu không được để trống';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}