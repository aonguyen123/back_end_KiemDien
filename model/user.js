const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ngaysinh: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    gioitinh: {
        type: Boolean,
        default: true
    },
    sdt: {
        type: String,
        default: ''
    },
    ngaydangki: {
        type: String,
        default: () => {
            const d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            day < 10 ? day = `0${day}` : day;
            month < 10 ? month = `0${month}` : month;
            return `${day}/${month}/${d.getFullYear()}`;
        }
    },
    status: {
        type: Number,
        default: 0 // 0 Incomplete 1 Complete 2 Missing  
    }
});
const User = mongoose.model('Users', UserSchema);
module.exports = User;