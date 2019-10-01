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
        type: Date,
        required: true
    },
    thoigianketthuc: {
        type: Date,
        required: true
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
            gioitinh: {
                type: String,
                required: true
            }
        }
    ],
    giobatdau: {
        type: Date,
        required: true
    },
    idUser: {
        type: String
    },
    status: {
        type: Boolean,
        default: true //active
    }
});
const Classes = mongoose.model('Classes', classesSchema);
module.exports = Classes;