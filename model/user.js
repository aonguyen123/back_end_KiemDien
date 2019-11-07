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
    status: {
        type: Number,
        default: 0 // 0 Incomplete 1 Complete 2 Missing  
    }
});
UserSchema.set('timestamps', true);
const User = mongoose.model('Users', UserSchema);
module.exports = User;