const mongoose = require('mongoose');

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
        type: Date
    },
    thoigianketthuc: {
        type: Date
    },
    mota: {
        type: String,
        default: ''
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
            gioitinh: {
                type: String,
                required: true
            }
        }
    ],
    giobatdau: {
        type: Date,
        default: ''
    },
    idUser: {
        type: String,
        default: ''
    },
    thoigiantao: {
        type: Date,
        default: Date.now
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