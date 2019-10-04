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
        type: Date,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    gioitinh: {
        type: Boolean,
        default: ''
    },
    sdt: {
        type: String,
        default: ''
    },
    ngaydangki: {
        type: Date,
        default: Date.now
    }
});
UserSchema.set('timestamps', true);
const User = mongoose.model('Users', UserSchema);
module.exports = User;