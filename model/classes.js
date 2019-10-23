const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;
const classesSchema = new Schema({
    malop: {
        type: String,
        required: true
    },
    tenlop: {
        type: String,
        required: true
    },
    thoigianbatdau: {
        type: String
    },
    thoigianketthuc: {
        type: String
    },
    mota: {
        type: String,
        required: true
    },
    hinhdaidien: {
        type: String,
        default: ''
    },
    dssv: [
        {
            maSV: {
                type: String,
                required: true
            },
            tenSV: {
                type: String,
                required: true
            },
            ngaysinh: {
                type: String,
                require: true
            },
            gioitinh: {
                type: String,
                required: true
            }
        }
    ],
    giobatdau: {
        type: String,
    },
    idUser: {
        type: String,
        default: ''
    },
    thoigiantao: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true //active nếu vẫn còn thời hạn trước thời gian kết thúc
    },
    managed: {
        type: Boolean,
        default: false
    }
});
const Classes = mongoose.model('Classes', classesSchema);
module.exports = Classes;